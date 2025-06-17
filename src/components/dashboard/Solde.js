import React, { useContext } from "react";
import { Card, CardContent, Typography, Grid, Box, Snackbar, Alert, DialogContent, IconButton, Dialog, Tooltip, Fab, TextField, Button } from "@mui/material";
import { GiMoneyStack } from 'react-icons/gi';
import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";
import { IoMdTime } from "react-icons/io";
import Opperation from "../../../pages/product";
import { Add, Close } from "@mui/icons-material";
import { GiWallet } from "react-icons/gi";



const Solde = (props) => {
  const { loading } = props;

  const { logoutUser } = useContext(AuthContext);

  const [openFailedToast, setOpenFailedToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [cachier, setCachier] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [description, setDescription] = React.useState("");

  const axios = useAxios();

  React.useEffect(() => {
    axios.get(`cachier/1`).then(
      res => {
        setCachier(res.data.solde)
      }, 
      error => {
        console.log(error)
      }
    )
  }, [])

  let pounds = Intl.NumberFormat({
    style: 'currency',
    maximumSignificantDigits: 3,
    minimumFractionDigits: 2
  });


  const showFailedToast = () => {
    setOpenFailedToast(true);
  };

  const showSuccessToast = () => {
    setOpenSuccessToast(true);
  };

  const closeFailedToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFailedToast(false);
  };

  const closeSuccessToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessToast(false);
  };


  const openAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const saveUpdate = () => {
    let now = new Date()
    let cachierMouvment = {
      amount: parseFloat(amount),
      dateCreation: formatDate(now),
      description : description
    }
    if(parseFloat(amount) && parseFloat(amount) != 0 && description.length > 0){
      let cachierUpdate = {
        solde: cachier+parseFloat(amount)
      }
      axios.put(`cachier/${1}`, cachierUpdate).then(
        (res) => {
          setCachier(cachierUpdate.solde)
          showSuccessToast()
        },
        (error) => {
          console.log(error);
          showFailedToast()
        } 
      )
      .then(() => {
        axios.post(`cachiermouvments/add`, cachierMouvment).then(
          (res) => {
            console.log("cachiermouvments added => " ,res.data);
          },
          (error) => {
            console.log(error);
            //showFailedToast()
          } 
        )
        .then(() => {
          loading();
        })
      })
      .then(() => {
        handleClose();
        setAmount(0)
        setDescription("")
      })
    }else{
      console.log(parseFloat(amount));
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setAmount(value);
  }

  const onChangeDescription = (e) => {
    const { value } = e.target;
    setDescription(value);
  }

  return (
    <Grid container style={{display:'flex', justifyContent:'center'}} >

      <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={handleClose}>
        <DialogContent>
        <div style={{display:"flex", justifyContent:"end"}}>
            <IconButton onClick={handleClose}>
            <Close fontSize='medium'/>
            </IconButton>
        </div>
        
        <TextField
            fullWidth={true}
            variant="standard"
            label="Montant"
            name="amount"
            defaultValue={amount}
            type="number"
            id={'amount'}
            onChange={(event) => onChange(event)}
        />

          <TextField
            fullWidth={true}
            variant="standard"
            label="Description"
            name="description"
            defaultValue={description}
            type="text"
            id={'description'}
            onChange={(event) => onChangeDescription(event)}
          />

        <Button
            //type="submit"
            style={{ fontSize: "20px", width: "100%", marginTop: "30px" }}
            variant="contained"
            mt={4}
            //fullWidth
            onClick={() => saveUpdate()}
          >
            Valider le montant  
          </Button>

        </DialogContent>
      </Dialog>

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={openSuccessToast} autoHideDuration={6000} onClose={closeSuccessToast}>
        <Alert onClose={closeSuccessToast} severity="success" sx={{ width: '100%' }} style={{fontSize:"24px",fontWeight:"bold"}}>
            L'oppération réussie
        </Alert>
      </Snackbar>

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={openFailedToast} autoHideDuration={6000} onClose={closeFailedToast}>
        <Alert onClose={closeFailedToast} severity="error" sx={{ width: '100%' }} style={{fontSize:"24px",fontWeight:"bold"}}>
            L'oppération a échoué
        </Alert>
      </Snackbar>

        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              boxShadow:3,
              bgcolor:'#1a7795'
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >  

              <Box style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <GiMoneyStack 
                    fontSize='30px'
                    color='white'
                  />
                  
                  <Typography
                    color={"#F6EEFA"}
                    sx={{
                      fontSize: "h5.fontSize",
                      fontWeight: "600",
                      fontStyle:'initial',
                      display:'flex', 
                      justifyContent: 'center',
                      marginInlineStart: "10px"
                    }}
                  >
                     Solde de caisse 
                  </Typography>
                </Box>
                <Tooltip title="Ajouter">
                  <Fab color="info" size="small" aria-label="Ajouter" onClick={openAdd}>
                      <Add/>
                  </Fab>
                 </Tooltip>
              </Box>
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

              <Typography
                //color="primary"
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h2.fontSize",
                  fontWeight: "1000",
                  marginTop:1,
                  display:'flex', 
                  justifyContent: 'center',
                }}
              >
                {pounds.format(cachier)}
              </Typography>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    marginTop:1,
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  CFA
                </Typography>
              </Box>
            </CardContent>
          </Card>

        </Grid>

    </Grid>
  );
};

export default Solde;
