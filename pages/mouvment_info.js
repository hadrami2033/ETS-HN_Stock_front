import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Stack,
  CircularProgress,
  Typography
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { Form } from "../src/components/Form";
import Controls from "../src/components/controls/Controls";
import { useContext } from "react";
import AuthContext from "../src/context/AuthContext";
import useAxios from "../src/utils/useAxios";
import { useRouter } from "next/router";

const Infos = (props) => {
  const {showSuccessToast,showFailedToast, productId, 
    title, quantityEnStock, typeId, magasinId, handleClose } = props;

  const { authTokens } = useContext(AuthContext);
  const axios = useAxios();
  const router = useRouter()
  const { logoutUser } = useContext(AuthContext);

  const defaultValues = {
    productId: productId,
    typeId: typeId,
    magasinId: magasinId,
    quantity: 0,
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = React.useState(false);


  const validate = (fieldValues = values) => {
    let temp = { ...errors };
      if ("quantity" in fieldValues)
      temp.quantity = (fieldValues.quantity && parseInt(fieldValues.quantity) > 0 && fieldValues.quantity != "" && !( typeId == 2 && parseInt(fieldValues.quantity) > quantityEnStock )) ? "" 
      : (typeId == 2 && parseInt(fieldValues.quantity) > quantityEnStock) ? `la quantité disponible est ${quantityEnStock}` : "La quantité est requise";
    
    /* if ("commission" in fieldValues)
      temp.commission = fieldValues.commission ? "" : "Commission est requise "; */
   setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  useEffect(() => {
    console.log("product : ", productId);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    let now = new Date()
    console.log(values);

    if (validate()) {
      setLoading(true)
      //console.log(values);
      var magasinmouvment = { ...values, dateCreation : formatDate(now), 
        quantity: typeId === 1 ? parseInt(values.quantity) : parseInt(values.quantity)*-1 };
      console.log(magasinmouvment);
      axios.post(`magasinmouvments/add`, magasinmouvment).then(
          (res) => {
            console.log("added => " ,res);
            if(res.data){
              resetForm();
              handleClose()
              showSuccessToast() 
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
    } 
    //console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12} lg={12}  alignItems="center" justify="center">
        <BaseCard title={title}>
          <Stack style={styles.stack} spacing={2} direction="column">
           {typeId === 2 &&
           <Typography
             color="#837B7B"
             sx={{
               fontSize: "h6.fontSize",
               //fontWeight: "bold",
               fontStyle:'initial',
               width:'40%'
             }}
           >
             Quantité en stock : {quantityEnStock}
           </Typography>
           }
           <Controls.Input
              id="quantite"
              name="quantity"
              label="Quantité"
              type="number"
              value={values.quantity}
              onChange={handleInputChange}
              error={errors.quantity}
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
            Valider
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
export default Infos;
