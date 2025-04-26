import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Stack,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { Form } from "../src/components/Form";
import Controls from "../src/components/controls/Controls";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import baseURL from "../src/utils/baseURL";
import { useContext } from "react";
import AuthContext from "../src/context/AuthContext";
import jwt_decode from "jwt-decode";
import useAxios from "../src/utils/useAxios";
import { useRouter } from "next/router";


const Opperation = (props) => {
  const {showSuccessToast,showFailedToast, opperation, type, month, year, title, push,update, coef=1, wallet, caisse } = props;

  const { authTokens } = useContext(AuthContext);
  const axios = useAxios();
  const router = useRouter()
  const { logoutUser } = useContext(AuthContext);

  const defaultValues = !opperation ? {
    phone: "",
    trsId: "",
    amount: 0,
    commission: 0,
    status: "P",
    dateCreation: "",
    updatedAt: "",
    description: "",
    typeId: type.id,
    monthId: month,
    yearId: year
  } : opperation

  const [formValues, setFormValues] = useState(defaultValues);
  const [commissionsWithdrawal, setCommissionsWithdrawal] = useState([]);
  const [commissionsVersement, setCommissionsVersement] = useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    axios.get(`point/commissionswithdrawal`).then(
      res => {
          //console.log("commissionswithdrawal  ", res.data);
          setCommissionsWithdrawal(res.data);
      }, 
      error => {
        console.log(error)
        if(error.response && error.response.status === 401)
        logoutUser()
      }
    ).then(() => {
      axios.get(`point/commissionsversement`).then(
        res => {
          //console.log("commissionsversement  ", res.data);
          setCommissionsVersement(res.data);
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          logoutUser()
        }
      )
    })
  }, [])

  const getRetraitCommission = (amount) => {
    if(amount > 300000){
      return 1000;
    }else{
      var com = commissionsWithdrawal ? commissionsWithdrawal.reduce((accumulator, e) => {
        if (e.min <= amount && amount <= e.max) return e.commission; else return accumulator;
      },0) : 0;
      return com;
    }
  }

  const getVersementCommission = (amount) => {
    if(amount > 300000){
      return 175;
    }else{
      var com = commissionsVersement ? commissionsVersement.reduce((accumulator, e) => {
        if (e.min <= amount && amount <= e.max) return e.commission; else return accumulator;
      },0) : 0;
      return com;
    }
  }

  const validAmount = (amount) => {
    if(type.label === "versement" && parseFloat(amount) <= wallet ){
      return true;
    }else if(type.label != "versement" && parseFloat(amount) <= caisse) {
      return true;
    }else return false
  }

  const maxAmount = () => {
    if(type.label === "versement" ){
      return wallet;
    }else return caisse
  }

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("phone" in fieldValues)
      temp.phone = /^[234][\d]{7}$/.test(fieldValues.phone) ? "" : "Télephone du client incorrect ";
    if ("trsId" in fieldValues)
      temp.trsId = fieldValues.trsId ? "" : "Reference de la transaction  ";
    if ("amount" in fieldValues)
      temp.amount = (fieldValues.amount && fieldValues.amount != "0" && validAmount(fieldValues.amount)) ? "" : `Le montant est requis et ne déppasse pas ${maxAmount()}`;
    /* if ("commission" in fieldValues)
      temp.commission = fieldValues.commission ? "" : "Commission est requise "; */
   setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  /* useEffect(() => {
    if(client !== null){
      console.log("element to edit => ",client);
      setFormValues(client)
    }
  }, [client]) */

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = Form(formValues, true, validate);

  const formatDate = (date) => {
    if(date){
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
          /* hour = '' + d.getHours(),
          min = '' + d.getMinutes(); */

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
      /* if (hour.length < 2) 
          hour = '0' + hour;
      if (min.length < 2) 
          min = '0' + min; */
  
      return [year, month, day ].join('-'); //+ "  " + [hour, min].join(':')
      
    }else return null
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let now = new Date()
    console.log(values);
    if (validate()) {
      setLoading(true)
      //console.log(values);
      var opp = { ...values, dateCreation : opperation === null ? formatDate(now) : opperation.dateCreation , updatedAt : formatDate(now), amount: parseFloat(values.amount), 
        commission: type.label === "versement" ? getVersementCommission(parseFloat(values.amount))  : getRetraitCommission(parseFloat(values.amount))*coef };
      if(opperation === null){
        console.log(opp);
        axios.post(`point/operations`, opp).then(
          (res) => {
            console.log("added => " ,res);
            if(res.data){
              resetForm();
              showSuccessToast() 
              push(res.data)
            }else{
              showFailedToast()
            }
          },
          (error) => {
            console.log(error);
            showFailedToast()
          } 
        ).then(() => {
          setLoading(false)
        }); 
      }else{
        axios.put(`point/operations/${values.id}`, opp).then(
          (res) => {
            console.log("updated => ", res);
            if(!res.data){
              resetForm();
              showFailedToast();
            }else{
              showSuccessToast()
              update(res.data)
            }
          },
          (error) => {
            console.log(error);
            showFailedToast()
          } 
        ).then(() => {
          setLoading(false)
        });
      }
    } 
    //console.log(formValues);
  };


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12} lg={12} alignItems="center" justify="center">
        <BaseCard title={title}>
          <Stack style={styles.stack} spacing={2} direction="column">
            <Controls.Input
              id="phone-input"
              name="phone"
              label="Client الزبون"
              type="number"
              value={values.phone}
              onChange={handleInputChange}
              error={errors.phone}
            />
            <Controls.Input
              id="trsId-input"
              name="trsId"
              label="Reférence مرجع المعاملة"
              type="text"
              value={values.trsId}
              onChange={handleInputChange}
              error={errors.trsId}
            />
           <Controls.Input
              id="amount-input"
              name="amount"
              label="Le montant المبلغ"
              type="number"
              value={values.amount}
              onChange={handleInputChange}
              error={errors.amount}
            />
            <Controls.TextArea
              id="description-input"
              name="description"
              label="Description تعليق"
              type="text"
              value={values.description}
              onChange={handleInputChange}
            />
          </Stack>

          <br />
          <Stack>
          <Button
            type="submit"
            style={{ fontSize: "20px" }}
            variant="contained"
            disabled={loading}
            mt={4}
            fullWidth
          >
            Sauvegarder  حفظ
            {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: 'primary',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
            )}
          </Button>
          </Stack>

        </BaseCard>
      </Grid>
    </form>
  );
};

const styles = {
  stack: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
};
export default Opperation;
