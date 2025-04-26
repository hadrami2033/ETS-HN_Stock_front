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


const Commission = (props) => {
  const {showSuccessToast,showFailedToast, opperation, type, title, push,update } = props;

  const { authTokens } = useContext(AuthContext);
  const axios = useAxios();
  const router = useRouter()
  const { logoutUser } = useContext(AuthContext);

  const defaultValues = !opperation ? {
    min: 0,
    max: 0,
    commission: 0
  } : {...opperation}

  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = React.useState(false);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("min" in fieldValues)
      temp.min = (fieldValues.min) ? "" : "Le montant est requis";
    if ("max" in fieldValues)
      temp.max = (fieldValues.max && fieldValues.max != "0") ? "" : "Le montant est requis";
    if ("commission" in fieldValues)
      temp.commission = (fieldValues.commission && fieldValues.commission != "0") ? "" : "La commission est requise";
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


  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true)
      var opp = {min : parseFloat(values.min), max : parseFloat(values.max), commission: parseFloat(values.commission)};
      if(type === 'ret'){
        if(opperation === null){
            console.log(opp);
            axios.post(`point/commissionswithdrawal`, opp).then(
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
            axios.put(`point/commissionswithdrawal/${values.id}`, opp).then(
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
      }else{
        if(opperation === null){
            console.log(opp);
            axios.post(`point/commissionsversement`, opp).then(
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
            axios.put(`point/commissionsversement/${values.id}`, opp).then(
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
    } 
    //console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12} lg={12} alignItems="center" justify="center">
        <BaseCard title={title}>
          <Stack style={styles.stack} spacing={2} direction="column">
            <Controls.Input
              id="min-input"
              name="min"
              label="De من"
              type="number"
              value={values.min}
              onChange={handleInputChange}
              error={errors.min}
            />
            <Controls.Input
              id="max-input"
              name="max"
              label="Jusqu'a إلى"
              type="number"
              value={values.max}
              onChange={handleInputChange}
              error={errors.max}
            />
           <Controls.Input
              id="commission-input"
              name="commission"
              label="Commission"
              type="number"
              value={values.commission}
              onChange={handleInputChange}
              error={errors.commission}
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
export default Commission;
