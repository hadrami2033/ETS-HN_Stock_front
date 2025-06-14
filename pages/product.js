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


const Product = (props) => {
  const {showSuccessToast,showFailedToast, product, 
    title, push,update, ProdUnite, handleClose } = props;

  const { authTokens } = useContext(AuthContext);
  const axios = useAxios();
  const router = useRouter()
  const { logoutUser } = useContext(AuthContext);

  var defaultValues = !product ? {
    nom: "",
    quantiteEnStock: 0,
    prixAchat: 0.00,
    prixVente: 0.00,
    dateCreation: "",
    description: "",
    uniteEnStock:0,
    quantite2: 0,
    prixVente2: 0.00

  } : ProdUnite ? {...product, quantite2:ProdUnite.quantite, prixVente2:ProdUnite.prixVente} : {...product, quantite2:null, prixVente2:null};

  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = React.useState(false);
  const [withunite, setWithUnit] = React.useState(true);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("prixAchat" in fieldValues)
      temp.prixAchat = (fieldValues.prixAchat && fieldValues.prixAchat != 0.00) ? "" : "prix d'achat est requis";
    if ("prixVente" in fieldValues)
      temp.prixVente = (fieldValues.prixVente && fieldValues.prixVente != 0.00) ? "" : "prix de vente est requis";
    if ("quantiteEnStock" in fieldValues)
      temp.quantiteEnStock = (fieldValues.quantiteEnStock) ? "" : "la quantité est requise";
    if ("nom" in fieldValues)
      temp.nom = (fieldValues.nom && fieldValues.nom != "") ? "" : "le nom du produit est requis";
    if ("prixVente2" in fieldValues)
      temp.prixVente2 = ((fieldValues.prixVente2 && parseInt(fieldValues.prixVente2) && parseInt(fieldValues.prixVente2) != 0) || !withunite)? "" : "prix d'unité est requis";
    if ("quantite2" in fieldValues)
      temp.quantite2 = ((fieldValues.quantite2 && parseInt(fieldValues.quantite2) && parseInt(fieldValues.quantite2) != 0) || !withunite)? "" : "le nombre est requis";

    /* if ("commission" in fieldValues)
      temp.commission = fieldValues.commission ? "" : "Commission est requise "; */
   setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  useEffect(() => {
    console.log("ProdUnite : ", ProdUnite);
    console.log("defaultValues : ", defaultValues);
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
      var prod = {
        id: product ? product.id : null,
        dateCreation : product === null ? formatDate(now) : product.dateCreation , 
        uniteEnStock : product === null ? values.uniteEnStock : product.uniteEnStock ? product.uniteEnStock : 0, 
        prixAchat: parseFloat(values.prixAchat), 
        prixVente: parseFloat(values.prixVente),
        description: values.description,
        quantiteEnStock: values.quantiteEnStock,
        nom: values.nom
      };
      var unit = withunite ? { 
        productId : product === null ? null : product.id , 
        quantite: parseInt(values.quantite2), 
        nom: "U "+values.nom, 
        prixVente: parseFloat(values.prixVente2)
      } : null;
        
      if(product === null){
        console.log(prod);
        axios.post(`products/add`, prod).then(
          (res) => {
            console.log("added => " ,res);
            if(res.data){
              resetForm();
              showSuccessToast() 
              if(withunite)
              axios.post(`units/add`, {...unit, productId: res.data.id}).then(
                (res) => {console.log(res.data)},
                (err) => {console.log(err)},
              )
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
        axios.put(`products/${values.id}`, prod).then(
          (res) => {
            console.log("updated => ", res);
            if(!res.data){
              showFailedToast();
            }else{
              update(res.data)
              showSuccessToast()
              handleClose();
              if(withunite){
                if(ProdUnite)
                  axios.put(`units/${ProdUnite.id}`, {...unit, productId: res.data.id, id: ProdUnite.id}).then(
                    (res) => {console.log(res.data)},
                    (err) => {console.log(err)},
                  )
                else           
                  axios.post(`units/add`, {...unit, productId: res.data.id}).then(
                    (res) => {console.log(res.data)},
                    (err) => {console.log(err)},
                  )
              }
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
        <BaseCard title={title}>
          <Stack style={styles.stack} spacing={2} direction="column">
          <Stack style={styles.stack} spacing={2} direction="row">
            <Controls.Input
              style={{width:'50%'}}
              id="nom-input"
              name="nom"
              label="Nom de produit"
              type="text"
              value={values.nom}
              onChange={handleInputChange}
              error={errors.nom}
            />
            <Controls.Input
              style={{width:'50%'}}
              id="quantiteEnStock-input"
              name="quantiteEnStock"
              label="Quantité En Stock"
              type="number"
              value={values.quantiteEnStock}
              onChange={handleInputChange}
              error={errors.quantiteEnStock}
            />
          </Stack>
          <Stack style={styles.stack} spacing={2} direction="row">
           <Controls.Input
              style={{width:'50%'}}
              id="prixAchat-input"
              name="prixAchat"
              label="Prix d'achat"
              type="number"
              value={values.prixAchat}
              onChange={handleInputChange}
              error={errors.prixAchat}
            />
            <Controls.Input
              style={{width:'50%'}}
              id="prixVente-input"
              name="prixVente"
              label="Prix de vente"
              type="number"
              value={values.prixVente}
              onChange={handleInputChange}
              error={errors.prixVente}
            />

            </Stack>

            <Controls.Checkbox
              id="withunite-input"
              name="unite"
              label="Avec unité"
              value={withunite}
              onChange={() => setWithUnit(!withunite)}
            />
            {withunite &&
            <Typography
                color="#837B7B"
                sx={{
                fontWeight: "bold",
                fontStyle:'initial'
                }}
            >
                Uninté de produit
            </Typography>
            }
            {withunite && 
            <Stack style={styles.stack} spacing={2} direction="row">
            <Controls.Input
              style={{width:'50%'}}
              id="quantite2-input"
              name="quantite2"
              label="Nombre"
              type="number"
              value={values.quantite2}
              onChange={handleInputChange}
              error={errors.quantite2}
            />
            <Controls.Input
              style={{width:'50%'}}
              id="prixVente2-input"
              name="prixVente2"
              label="Prix d'unité"
              type="number"
              value={values.prixVente2}
              onChange={handleInputChange}
              error={errors.prixVente2}
            />
            </Stack>
            }
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

        </BaseCard>
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
export default Product;
