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


const Debt = (props) => {
  const {showSuccessToast,showFailedToast, selected, 
    title, onUpdate, clientId, employeId} = props;

  const { authTokens } = useContext(AuthContext);
  const axios = useAxios();
  const router = useRouter()
  const { logoutUser } = useContext(AuthContext);

  const defaultValues = !selected ? {
    clientId: clientId,
    employeId: employeId,
    amount: 0,
    description: "",
    amountPayed: 0,
    newPayed: 0
  } : {...selected, newPayed:0};

  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [cachier, setCachier] = useState(0);


  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("amount" in fieldValues)
      temp.amount = (fieldValues.amount && fieldValues.amount != "") ? "" : "le montant est requis";
    if ("newPayed" in fieldValues)
      temp.newPayed = (!selected || !clientId || (fieldValues.newPayed && fieldValues.newPayed != "" && 
      !(parseFloat(fieldValues.newPayed) > (parseFloat(values.amount)-parseFloat(values.amountPayed)) ) )) ? 
      "" : `montant payé est requis et ne dépasse pas ${(parseFloat(values.amount)-parseFloat(values.amountPayed))} CFA`;
   setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  useEffect(() => {
    axios.get(`cachier/1`).then(
      res => {
        setCachier(res.data.solde)
      }, 
      error => {
        console.log(error)
      }
    )
  }, [])

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

  const formatDate2 = (date) => {
    if(date){
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear(),
          hour = '' + d.getHours(),
          min = '' + d.getMinutes();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
      if (hour.length < 2) 
          hour = '0' + hour;
      if (min.length < 2) 
          min = '0' + min;
  
      return [year, month, day ].join('-')+ "  " + [hour, min].join(':');
      
    }else return null
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let now = new Date()
    let payed = parseFloat(values.newPayed);
    let cachierUpdate = {
      solde: selected ? (parseFloat(cachier)+payed) : (parseFloat(cachier)-parseFloat(values.amount))
    }
    let cachierMouvment = {
      amount: payed,
      dateCreation: formatDate(now),
      description : "paiement " + title + " le " +formatDate2(now)
    }

    let cachierMouvment2 = {
      amount: (parseFloat(values.amount)*-1),
      dateCreation: formatDate(now),
      description :  clientId ? title + " le " +formatDate2(now) : title + " le " +formatDate2(now)
    }
    
    console.log("cachierUpdate" ,cachierUpdate);
    if (validate()) {
      setLoading(true)
      var prod = { ...values, dateCreation : selected === null ? formatDate(now) : selected.dateCreation , 
        updatedAt : formatDate(now), amount: parseFloat(values.amount), amountPayed: (parseFloat(values.amountPayed)+parseFloat(values.newPayed)),
        payed : parseFloat(values.amount) === (parseFloat(values.amountPayed)+parseFloat(values.newPayed)) ? 1 : 0
      };
      if(selected === null){
        axios.post(`debts/add`, prod).then(
          (res) => {
            console.log("added => " ,res);
            if(res.data){
              resetForm();
              showSuccessToast() 
              onUpdate()
              
                axios.put(`cachier/${1}`, cachierUpdate).then(
                  (res) => {
                    console.log("cachierUpdate => " ,res.data);
                    setCachier(cachierUpdate.solde)
                  },
                  (error) => {
                    console.log(error);
                    //showFailedToast()
                  } 
                ).then(() => 
                  axios.post(`cachiermouvments/add`, cachierMouvment2).then(
                    (res) => {
                      console.log("cachiermouvments added => " ,res.data);
                    },
                    (error) => {
                      console.log(error);
                      //showFailedToast()
                    } 
                  )
                )
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
        axios.put(`debts/${values.id}`, prod).then(
          (res) => {
            console.log("updated => ", res);
            if(!res.data){
              resetForm();
              showFailedToast();
            }else{
              onUpdate()
              showSuccessToast()
              if(payed > 0)
                axios.put(`cachier/${1}`, cachierUpdate).then(
                  (res) => {
                    console.log("cachierUpdate => " ,res.data);
                    setCachier(cachierUpdate.solde)
                  },
                  (error) => {
                    console.log(error);
                    //showFailedToast()
                  } 
                ).then(() => 
                  axios.post(`cachiermouvments/add`, cachierMouvment).then(
                    (res) => {
                      console.log("cachiermouvments added => " ,res.data);
                    },
                    (error) => {
                      console.log(error);
                      //showFailedToast()
                    } 
                  )
                )
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
      <Grid item xs={12} lg={12}  alignItems="center" justify="center">
        <BaseCard title={title}>
          <Stack style={styles.stack} spacing={2} direction="column">
            {!selected ?
            <Controls.Input
              id="amount-input"
              name="amount"
              label="Montant"
              type="number"
              value={values.amount}
              onChange={handleInputChange}
              error={errors.amount}
            />
            : clientId &&
            <Controls.Input
              id="newPayed-input"
              name="newPayed"
              label="Montant payé"
              type="number"
              value={values.newPayed}
              onChange={handleInputChange}
              error={errors.newPayed}
            />
            }
            <Controls.Input
              id="description-input"
              name="description"
              label="Description"
              type="text"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
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
            Sauvegarder 
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
export default Debt;
