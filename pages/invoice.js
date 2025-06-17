import React, { useEffect } from "react";
import {
  Button,
  Grid,
  Stack,
  CircularProgress,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import Controls from "../src/components/controls/Controls";
import { useContext } from "react";
import AuthContext from "../src/context/AuthContext";
import useAxios from "../src/utils/useAxios";
import { useRouter } from "next/router";
import EnhancedTableHead from "../src/components/Table/TableHeader";
import Invoice2 from "./print_invoice";
import DeleteIcon from '@mui/icons-material/Delete';


const headCells = [
  {
    id: 'nom',
    numeric: false,
    disablePadding: false,
    label: 'Produit',
  }, 
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: "Quantité"
  },
  {
    id: 'prixVente',
    numeric: true,
    disablePadding: false,
    label: "Prix unitaire"
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: true,
    label: 'Total',
  }
]

const Invoice = (props) => {
  const {products=[], title, handleCloseInvoice } = props;

  const { authTokens } = useContext(AuthContext);
  const axios = useAxios();
  const router = useRouter()
  const { logoutUser } = useContext(AuthContext);
  const typesPayment = [
    {id:1, name:"cash"},
    {id:2, name:"partiel"},
    {id:3, name:"dette"}
  ];
  
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [loading3, setLoading3] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [step, setStep] = React.useState(1);
  const [error, setError] = React.useState(null);
  const [invoiceAmount, setInvoiceAmount] = React.useState(0);
  const [paidAmount, setPaidAmount] = React.useState(0);
  const [cachier, setCachier] = React.useState(0);
  const [client, setClient] = React.useState('');
  const [clients, setClients] = React.useState([]);
  const [units, setUnits] = React.useState([]);
  const [praint, setPraint] = React.useState(false);

  const [type, setType] = React.useState(
    {id:1, name:"cash"}
  );

  let pounds = Intl.NumberFormat( {
    style: 'currency',
    maximumSignificantDigits: 3,
    minimumFractionDigits: 2
  });

  useEffect(() => {
    //console.log("product : ", product);
    setOrders(products)
    axios.get(`clients/allclients`).then(
      res => {
        setClients(res.data)
      }, 
      error => {
        console.log(error)
        if(error.response && error.response.status === 401)
        logoutUser()
      }
    ).then(() => {
      axios.get(`cachier/1`).then(
        res => {
          setCachier(res.data.solde)
        }, 
        error => {
          console.log(error)
        }
      )
    })
  }, [])
  
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

  const selectClient = (event) => {
    setClient(event.target.value)
  };
  
  const selectType = (event) => {
    setType(event.target.value)
    setClient('')
    setPaidAmount(0)
  };

  const onChangePaidAmount = (e) => {
    const { value } = e.target
    setPaidAmount(value);
    console.log(value);
  }

  const openPaquet = (e, index) => {
    setLoading2(true)
    let temp2 = orders;
    let temp = units
    axios.get(`units/byproduct/${e.id}`).then(
      (res) => { 
        if(res.data){
          const exist = units.filter(e => e.id === res.data.id);
          if(exist.length == 0){
            temp.push({...res.data, quantityCommand: 1, dispoQuantity: res.data.quantite, prixTotal: res.data.prixVente, prodQuantity : (e.quantiteEnStock-1)});            
            setLoading3(true)
            const obj = {...e, uniteEnStock: res.data.quantite, quantiteEnStock: e.quantiteEnStock-1, hasDetail: true}
            temp2[index] = obj;
        
            setOrders(temp2); 
          }
        }
      },
      (err) => {console.log(err)},
    ).then(() => {
      setUnits(temp)
      setLoading2(false) 
      setLoading3(false)
    })
  }
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const deleteOrder = (index) => {
    orders.splice(index, 1);
    setLoading3(true)
    sleep(1 / 90000000).then(() => {
      setLoading3(false)
    })
  }

  const addDetail = (e, dispoQuantity, index) => {
    setLoading2(true)
    let temp = units
    let temp2 = orders
    axios.get(`units/byproduct/${e.id}`).then(
      (res) => { 
        if(res.data){
          const exist = units.filter(e => e.id === res.data.id);
          if(exist.length == 0){ 
            temp.push({...res.data, quantityCommand: 1, dispoQuantity: dispoQuantity, prixTotal: res.data.prixVente});
            setLoading3(true)
            const obj = {...e, hasDetail: true}
            temp2[index] = obj;
            setOrders(temp2);
          }
        }
      },
      (err) => {console.log(err)},
    ).then(() => {
      setUnits(temp)
      setLoading2(false) 
      setLoading3(false) 
    })
  }

  const onChangeQuantity = (e, el, index) => {
    const { value } = e.target
    let temp = orders;
    const obj = {...el, quantite: value, prixTotal: el.prixVente*value}
    temp[index] = obj;

    setOrders(temp);
  }

  const onChangeQuantity2 = (e, el, index) => {
    const { value } = e.target
    let temp = units;
    const obj = {...el, quantityCommand: value, prixTotal: el.prixVente*value}
    temp[index] = obj;

    setUnits(temp);
  }

  const suivante = (stp) => {
    setStep(stp);
    var sumamount = orders ? orders.reduce((accumulator, e) => {
      return accumulator + e.prixTotal
    },0) : 0; 
    var sumamount2 = units ? units.reduce((accumulator, e) => {
      return accumulator + e.prixTotal
    },0) : 0;
    orders.map((e) => {
      if(e.quantite > e.quantiteEnStock || e.prixTotal==0){
        setStep(1); 
        setError("error")
      }
    })
    units.map((e) => {
      if(e.quantityCommand > e.dispoQuantity || e.prixTotal==0){
        setStep(1); 
        setError("error")
      }
    })
    setInvoiceAmount(sumamount+sumamount2);
  }

  const setUniteEnStock = (prod) => {
    let unit = units.filter(e => e.productId == prod.id)
    if(unit.length == 0)
      return prod.uniteEnStock
    else return (prod.uniteEnStock - parseInt(unit[0].quantityCommand))
  }
  const addMouvmentsAndUpdateProducts = (now, invoiceId) =>{
    orders.map((e) => {
      let mvmnt = {
        quantity: e.quantite,
        amount: e.prixTotal,
        dateCreation: formatDate(now),
        userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : 1,
        productId: e.id,
        typeId: 2,
        invoiceId: invoiceId
      }
      let product = {
        id: e.id,
        nom: e.nom,
        quantiteEnStock: e.quantiteEnStock - e.quantite,
        prixAchat: e.prixAchat,
        prixVente: e.prixVente,
        dateCreation: e.dateCreation,
        description: e.description,
        uniteEnStock: setUniteEnStock(e)
      }
      axios.post(`mouvments/add`, mvmnt).then(
        (res) => {
          console.log("added => " ,res);
          if(res.data){
            console.log(res.data);
          }
        },
        (error) => {
          console.log(error);
          //showFailedToast()
        } 
      ).then(() => {
        axios.put(`products/${e.id}`, product).then(
          (res) => {
            console.log("updated => " ,res);
          },
          (error) => {
            console.log(error);
            //showFailedToast()
          } 
        )
      })
    })

    units.map((e) => {
      let mvmnt = {
        quantity: e.quantityCommand,
        amount: e.prixTotal,
        dateCreation: formatDate(now),
        userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : 1,
        unitId: e.id,
        typeId: 2,
        invoiceId: invoiceId
      }
      const inorders = orders.filter(e => e.id === e.productId);
      if(inorders.length == 0){
        axios.get(`products/${e.productId}`).then(
          (res) => {
            axios.put(`products/${e.productId}`, {...res.data, quantiteEnStock : e.prodQuantity ? e.prodQuantity : res.data.quantiteEnStock, uniteEnStock: (e.dispoQuantity-e.quantityCommand)}).then(
              (res) => {
                console.log("update prod without order => " ,res);
              },
              (error) => {
                console.log(error);
                //showFailedToast()
              } 
            )
          },
          (error) => {
            console.log(error);
            //showFailedToast()
          } 
        )


      }
      axios.post(`mouvments/add`, mvmnt).then(
        (res) => {
          console.log("added => " ,res);
          if(res.data){
            console.log(res.data);
          }
        },
        (error) => {
          console.log(error);
          //showFailedToast()
        } 
      )
    })
  }

  const valider = () => {
    let now = new Date()
    let cachierUpdate = {
      solde: (type.id !== 1) ? (parseFloat(cachier)+parseFloat(paidAmount)) 
             : (parseFloat(cachier)+parseFloat(invoiceAmount))
    }

    let invoice = {
      amount: invoiceAmount,
      dateCreation: formatDate(now),
      client: client.id ? client.name : null,
      amountPartiel : (client.id && paidAmount>0) ? paidAmount : null,
      typePaiement : type.name
    }

    let cachierMouvment = {
      amount: invoiceAmount,
      dateCreation: formatDate(now),
      description : "facture le "+formatDate2(now)
    }
    
    if(type.id !== 1){
      if(client.id){
        setLoading(true)

        let debt = {
          dateCreation: formatDate(now),
          updatedAt: formatDate(now),
          amount: invoiceAmount-paidAmount,
          clientId: client.id,
          payed: 0,
          amountPayed:0,
          description: ""
        }

        //console.log(debt);
        axios.post(`mouvments/addinvoice`, invoice).then(
          (res) => {
            console.log("added => " ,res);
            if(res.data){
              console.log(res.data);
              addMouvmentsAndUpdateProducts(now, res.data.id)
            }
          },
          (error) => {
            console.log(error);
            //showFailedToast()
          } 
        ).then( () =>
          axios.post(`debts/add`, debt).then(
            (res) => {
              console.log("debt added => " ,res);
              if(res.data){
                console.log(res.data);
              }
            },
            (error) => {
              console.log(error);
              //showFailedToast()
            } 
          ))
        .then(() => {
          setLoading(false)
          setPraint(true)
        })
        //console.log('new debt ',  debt);
        if( type.id == 2 && paidAmount>0 )
          axios.put(`cachier/${1}`, cachierUpdate).then(
            (res) => {
              console.log("cachierUpdate => " ,res.data);
              setCachier((parseFloat(cachier)+parseFloat(paidAmount)))
            },
            (error) => {
              console.log(error);
              //showFailedToast()
            } 
          ).then(() => 
            axios.post(`cachiermouvments/add`, {...cachierMouvment, amount: parseFloat(paidAmount)}).then(
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
        console.log("no client selected !");
      }
      
    }
    else{
      setLoading(true)
      axios.post(`mouvments/addinvoice`, invoice).then(
        (res) => {
          console.log("added => " ,res);
          if(res.data){
            console.log(res.data);
            addMouvmentsAndUpdateProducts(now, res.data.id)
          }
        },
        (error) => {
          console.log(error);
          //showFailedToast()
        } 
      ).then( () =>
      axios.put(`cachier/${1}`, cachierUpdate).then(
        (res) => {
          console.log("cachierUpdate => " ,res.data);
          setCachier((parseFloat(cachier)+parseFloat(invoiceAmount)))
        },
        (error) => {
          console.log(error);
          //showFailedToast()
        } 
      )
      ).then(() => 
        axios.post(`cachiermouvments/add`, {...cachierMouvment, amount: parseFloat(invoiceAmount)}).then(
          (res) => {
            console.log("cachiermouvments added => " ,res.data);
          },
          (error) => {
            console.log(error);
            //showFailedToast()
          } 
        )
      )
      .then(() => {
        setLoading(false)
        setPraint(true)
      })
    }
  }

  return (
      <Grid item xs={12} lg={12}  alignItems="center" justify="center">
      {step == 1 &&
        <BaseCard title={title}>
          {loading3 ? (
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
            )
          :
          orders.map((e, index) => {
          return(
          <Stack key={e.id} style={styles.stack} spacing={2} direction="row">
            <Controls.Input
              id={e.id+'nom'}
              name="nom"
              label="Produit"
              type="text"
              disabled={true}
              value={e.nom}
            />
            <Controls.Input
              id={e.id+'quantite-stock'}
              name="quantiteEnStock"
              label="Quantité En Stock"
              type="number"
              value={e.quantiteEnStock}
              disabled={true}
            />

            <TextField
                fullWidth={true}
                variant="standard"
                label="Quantité demmandée"
                name="quantite"
                defaultValue={e.quantite}
                type="number"
                id={e.id+'quantite-commande'}
                onChange={(event) => onChangeQuantity(event, e, index)}
                {...( e.quantite > e.quantiteEnStock && {error:true,helperText:`quantité en stock est ${e.quantiteEnStock}`})}
            />

            <Controls.Input
              id={e.id+'prixVente'}
              name="prixVente"
              label="Prix unitaire"
              type="number"
              value={e.prixVente}
              disabled={true}
            />
            <Controls.Input
              id={e.id+'uniteEnStock'}
              name="uniteEnStock"
              label="Unité en stock"
              type="number"
              value={e.uniteEnStock}
              disabled={true}
            />
            {e.hasDetail ?
            <Tooltip onClick={() => deleteOrder(index)} title="Supprimer">
              <IconButton>
                <DeleteIcon color='danger' fontSize='medium'/>
              </IconButton>
            </Tooltip>
            : e.uniteEnStock > 0 ?
            <Button onClick={() => addDetail(e, e.uniteEnStock, index)} variant="contained" color="primary" style={{fontSize:"12"}}>
              Detail
            </Button>
            :
            <Button onClick={() => openPaquet(e, index)} variant="contained" color="primary" style={{fontSize:"12"}}>
              Ouvrir
            </Button>
            }
          </Stack>
          )
          }
          )}
          
          {loading2 ? (
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
            )
          :
          units.map((e, index) => {
          return(
          <Stack key={e.id} style={styles.stack} spacing={2} direction="row">
            <Controls.Input
              id={e.id+'nom'}
              name="nom"
              label="Unité de produit"
              type="text"
              disabled={true}
              value={e.nom}
            />
            <Controls.Input
              id={e.id+'quantite'}
              name="quantite"
              label="Nombre d'unité"
              type="number"
              value={e.quantite}
              disabled={true}
            />

            <Controls.Input
              id={e.id+'dispoQuantity'}
              name="dispoQuantity"
              label="Quantité disponible"
              type="number"
              value={e.dispoQuantity}
              disabled={true}
            />

            <TextField
                fullWidth={true}
                variant="standard"
                label="Quantité demmandée"
                name="quantite"
                defaultValue={e.quantityCommand}
                type="number"
                id={e.id+'quantite-commande'}
                onChange={(event) => onChangeQuantity2(event, e, index)}
                {...( e.quantityCommand > e.dispoQuantity && {error:true,helperText:`quantité disponible est ${e.dispoQuantity}`})}
            />

            <Controls.Input
              id={e.id+'prixVente'}
              name="prixVente"
              label="Prix d'unité"
              type="number"
              value={e.prixVente}
              disabled={true}
            />

          </Stack>
          )
          }
          )}
          <br />
          <Stack style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            //type="submit"
            style={{ fontSize: "20px", width: "30%" }}
            variant="contained"
            disabled={loading}
            mt={4}
            //fullWidth
            onClick={() => handleCloseInvoice()}
          >
            Annuler  إلغاء
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
          <Button
            //type="submit"
            style={{ fontSize: "20px", width: "30%" }}
            variant="contained"
            disabled={loading}
            mt={4}
            //fullWidth
            
            onClick={() => suivante(2)}
          >
            Etape suivante  التالي
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
      }

      {step == 2 &&
        <BaseCard title={title}>

        <Stack style={{width:'100%', justifyContent: 'center', alignItems:"center"}}>  

        <Stack style={{display:"flex", justifyContent:"space-between"}} > 
        <EnhancedTableHead
          headCells={headCells}
          headerBG="#15659a"
          txtColor="#DCDCDC"
        />
        {orders.map((e, index) => {
        return(
        <TableRow
              key={e.id}
              style={{display:"flex", justifyContent:"space-between"}}
          >
          <TableCell align="left">{e.nom }</TableCell>
          <TableCell align="left">{e.quantite}</TableCell>
          <TableCell align="left">{pounds.format(e.prixVente)} CFA</TableCell>
          <TableCell align="left">{pounds.format(e.prixTotal)} CFA</TableCell>
        </TableRow>
        )})
        }
       {units.map((e, index) => {
        return(
        <TableRow
              key={e.id}
              style={{display:"flex", justifyContent:"space-between"}}
          >
          <TableCell align="left">{e.nom }</TableCell>
          <TableCell align="left">{e.quantityCommand}</TableCell>
          <TableCell align="left">{pounds.format(e.prixVente)} CFA</TableCell>
          <TableCell align="left">{pounds.format(e.prixTotal)} CFA</TableCell>
        </TableRow>
        )})
        }
        </Stack>
        </Stack>
        <br />
        {praint ?
          <Stack style={{...styles.stack}} spacing={2} direction="column">
          <Typography
            color="#837B7B"
            sx={{
              fontSize: "h6.fontSize",
              //fontWeight: "bold",
              fontStyle:'initial',
              width:'40%'
            }}
          >
            Type de paiement : {type.name}
          </Typography>
          {type.id != 1 &&
            <Typography
              color="#837B7B"
              sx={{
                fontSize: "h6.fontSize",
                //fontWeight: "bold",
                fontStyle:'initial',
                width:'40%'
              }}
            >
              Client : {client.name}
            </Typography>
            }

            {type.id === 2 &&
              <Typography
              color="#837B7B"
              sx={{
                fontSize: "h6.fontSize",
                //fontWeight: "bold",
                fontStyle:'initial',
                width:'40%'
              }}
            >
              Montant payé : {pounds.format(paidAmount)} CFA
            </Typography>
            }

            <Typography
              color="#837B7B"
              sx={{
                fontSize: "h4.fontSize",
                fontWeight: "bold",
                fontStyle:'initial',
                width:'40%'
              }}
            >
              Montant net : {pounds.format(invoiceAmount)} CFA
            </Typography>
          </Stack>
          :
          <Stack style={{...styles.stack, alignItems: 'center'}} spacing={2} direction="row">

            <Typography
              color="#837B7B"
              sx={{
                fontSize: "h4.fontSize",
                fontWeight: "bold",
                fontStyle:'initial',
                width:'40%'
              }}
            >
              Montant net : {pounds.format(invoiceAmount)} MRU
            </Typography>
            {type.id === 2 &&
            <TextField
              //fullWidth={true}
              variant="standard"
              label="Montant payé"
              //size={size}
              style={{width:'20%'}}
              name="paidamount"
              defaultValue={0}
              type="number"
              id={'paid-amount'}
              onChange={(event) => onChangePaidAmount(event)}
              {...( paidAmount > invoiceAmount && {error:true,helperText:`montant total est ${invoiceAmount}`})}
            />
            }

          {type.id != 1 && 
          <FormControl style={{width:'20%'}} >
            <InputLabel id="client-select">Client</InputLabel>
            <Select
              id="client-select"
              value={client}
              onChange={selectClient}
              label="Client"
              style={{fontSize:"h5.fontSize", paddingInline: '10px', borderBottomWidth: 0}}
              variant ="standard"
            >
                {client &&
                  <MenuItem style={{fontSize:"h5.fontSize", fontWeight:'600'}} value={client}>
                    <em>{client.name}</em>
                  </MenuItem>
                }
                {
                  clients.map(
                    c => <MenuItem key={c.id} style={{fontSize:"h5.fontSize", fontWeight:'600'}} value={c}>{c.name}</MenuItem>
                  )
                }
            </Select>
          </FormControl>
          }

          <FormControl style={{width:'20%'}} >
            <InputLabel id="type-select">Type de paiement</InputLabel>

            <Select
              id="type-select"
              value={type}
              onChange={selectType}
              label="Type de paiement"
              style={{fontSize:"h5.fontSize", paddingInline: '10px', borderBottomWidth: 0}}
              variant ="standard"
            >
                  <MenuItem style={{fontSize:"h5.fontSize", fontWeight:'600'}} value={type}>
                    <em>{type.name}</em>
                  </MenuItem>
                
                {
                  typesPayment.map(
                    t => <MenuItem key={t.id} style={{fontSize:"h5.fontSize", fontWeight:'600'}} value={t}>{t.name}</MenuItem>
                  )
                }
            </Select>
          </FormControl>
            
            
          </Stack>
        }
        <br />

          <Stack>
        {praint ?
          <Stack style={{ width:"100%", display: "flex", flexDirection: "column" }}>
          <Button
            //type="submit"
            style={{ fontSize: "20px", width: "30%", marginBottom: "15px" }}
            variant="contained"
            disabled={loading}
            mt={4}
            //fullWidth
            onClick={() => handleCloseInvoice()}
          >
            Quiter  خروج
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
            <Invoice2
              tableData={orders}
              tableData2={units}
              paymentType = {type.name}
              typeId = {type.id}
              client = {client}
              paidAmount = {paidAmount}
              invoiceAmount = {invoiceAmount}
            ></Invoice2>
          </Stack> 
          :
          <Stack style={{ width:"100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            //type="submit"
            style={{ fontSize: "20px", width: "30%" }}
            variant="contained"
            disabled={loading}
            mt={4}
            //fullWidth
            onClick={() => handleCloseInvoice()}
          >
            Annuler  إلغاء
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
          <Button
            //type="submit"
            style={{ fontSize: "20px", width: "30%" }}
            variant="contained"
            disabled={loading}
            mt={4}
            //fullWidth
            onClick={() => valider()}
            >
              Valider la facture  تأكيد
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
        }
          </Stack>
          
        </BaseCard>
      }
      
      </Grid>
  );
};

const styles = {
  stack: {
    display: "flex",
    justifyContent: 'space-between',
    marginBottom: 10,
  },
};
export default Invoice;
