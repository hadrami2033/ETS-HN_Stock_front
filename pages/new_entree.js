import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Stack,
  CircularProgress
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { Form } from "../src/components/Form";
import Controls from "../src/components/controls/Controls";
import { useContext } from "react";
import AuthContext from "../src/context/AuthContext";
import useAxios from "../src/utils/useAxios";
import { useRouter } from "next/router";


const Opperation = (props) => {
  const {showSuccessToast,showFailedToast, opperation, type, month, year, title, push,update } = props;

  const { authTokens } = useContext(AuthContext);
  const axios = useAxios();
  const router = useRouter()
  const { logoutUser } = useContext(AuthContext);

  const defaultValues = !opperation ? {
    phone: "00000000",
    trsId: "00000000000000",
    amount: 0,
    commission: 0,
    status: "P",
    dateCreation: "",
    updatedAt: "",
    description: "",
    typeId: type.id,
    monthId: month,
    yearId: year
  } : opperation;

  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = React.useState(false);


  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("amount" in fieldValues)
      temp.amount = (fieldValues.amount && fieldValues.amount != "0") ? "" : "Le montant de l'oppération est requis";
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
      var opp = { ...values, dateCreation : opperation === null ? formatDate(now) : opperation.dateCreation , updatedAt : formatDate(now), amount: parseFloat(values.amount)};
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
              update(res.data)
              showSuccessToast()
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

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12} lg={12} alignItems="center" justify="center">
        <BaseCard title={title}>
          <Stack style={styles.stack} spacing={2} direction="column">
           <Controls.Input
              id="amount-input"
              name="amount"
              label="Le montant المبلغ"
              type="number"
              value={values.amount}
              onChange={handleInputChange}
              error={errors.amount}
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
