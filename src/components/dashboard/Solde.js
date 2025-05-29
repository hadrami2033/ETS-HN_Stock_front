import React, { useContext } from "react";
import { Card, CardContent, Typography, Grid, Box, Snackbar, Alert, DialogContent, IconButton, Dialog, Tooltip, Fab } from "@mui/material";
import { GiMoneyStack } from 'react-icons/gi';
import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";
import { IoMdTime } from "react-icons/io";
import Opperation from "../../../pages/product";
import { Add, Close } from "@mui/icons-material";
import { GiWallet } from "react-icons/gi";



const Solde = (props) => {
  const { logoutUser } = useContext(AuthContext);

  const [yearSolde, setYearSolde] = React.useState(0);
  const [yearWalletSolde, setYearWalletSolde] = React.useState(0);
  const [yearVersementSolde, setYearVersementSolde] = React.useState(0);
  const [yearWithdrawalSolde, setYearWithdrawalSolde] = React.useState(0);
  const [yearWithdrawal2Solde, setYearWithdrawal2Solde] = React.useState(0);
  const [yearEntreeSolde, setYearEntreeSolde] = React.useState(0);
  const [entreeType, setEntreeType] = React.useState([]); 
  const [walletType, setWalletType] = React.useState([]); 
  const [openFailedToast, setOpenFailedToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const [openVer, setOpenVer] = React.useState(false);
  const [openVer2, setOpenVer2] = React.useState(false);

  const axios = useAxios();
  const now_date = new Date();

  React.useEffect(() => {
    if(localStorage.getItem("currentYear")) 
    axios.get(`point/operations/yearsolde/${JSON.parse(localStorage.getItem("currentYear")).id}`).then(
      res => {
        setYearSolde(res.data.solde);
      }, 
      error => {
        console.log(error)
        //if(error.response && error.response.status === 401)
        //logoutUser()
      }
    )
    axios.get(`point/types`).then(
      res => {
        let entree = res.data.filter(e => e.label === "entree")[0] ? res.data.filter(e => e.label === "entree")[0] : {};
        let wallets = res.data.filter(e => e.label === "wallets")[0] ? res.data.filter(e => e.label === "wallets")[0] : {};
        let withdrawal = res.data.filter(e => e.label === "withdrawal")[0] ? res.data.filter(e => e.label === "withdrawal")[0] : {};
        let versement = res.data.filter(e => e.label === "versement")[0] ? res.data.filter(e => e.label === "versement")[0] : {};
        let withdrawal2 = res.data.filter(e => e.label === "withdrawal2")[0] ? res.data.filter(e => e.label === "withdrawal2")[0] : {};
        setEntreeType(entree);
        setWalletType(wallets);

        if(localStorage.getItem("currentYear")){ 
          if(entree.id)
          axios.get(`point/operations/yearsolde/bytype?yearId=${JSON.parse(localStorage.getItem("currentYear")).id}&typeId=${entree.id}`).then(
            res => {
              setYearEntreeSolde(res.data.solde);
            }, 
            error => {
              console.log(error)
              if(error.response && error.response.status === 401)
              logoutUser()
            }
          )
          .then(() => {
            if(versement.id)
            axios.get(`point/operations/yearsolde/bytype?yearId=${JSON.parse(localStorage.getItem("currentYear")).id}&typeId=${versement.id}`).then(
              res => {
                setYearVersementSolde(res.data.solde);
              }, 
              error => {
                console.log(error)
                if(error.response && error.response.status === 401)
                logoutUser()
              }
            )
          })
          .then(() => {
            if(withdrawal.id)
            axios.get(`point/operations/yearsolde/bytype?yearId=${JSON.parse(localStorage.getItem("currentYear")).id}&typeId=${withdrawal.id}`).then(
              res => {
                setYearWithdrawalSolde(res.data.solde);
              }, 
              error => {
                console.log(error)
                if(error.response && error.response.status === 401)
                logoutUser()
              }
            )
          })
          .then(() => {
            if(withdrawal2.id)
            axios.get(`point/operations/yearsolde/bytype?yearId=${JSON.parse(localStorage.getItem("currentYear")).id}&typeId=${withdrawal2.id}`).then(
              res => {
                setYearWithdrawal2Solde(res.data.solde);
              }, 
              error => {
                console.log(error)
                if(error.response && error.response.status === 401)
                logoutUser()
              }
            )
          })
          .then(() => {
            if(wallets.id)
            axios.get(`point/operations/yearsolde/bytype?yearId=${JSON.parse(localStorage.getItem("currentYear")).id}&typeId=${wallets.id}`).then(
              res => {
                setYearWalletSolde(res.data.solde);
              }, 
              error => {
                console.log(error)
                if(error.response && error.response.status === 401)
                logoutUser()
              }
            )
          })
        }
      }, 
      error => {
        console.log(error)
        if(error.response && error.response.status === 401)
        logoutUser()
      }
    ) 
  }, [])

  let pounds = Intl.NumberFormat({
    style: 'currency',
    maximumSignificantDigits: 3,
    minimumFractionDigits: 2
  });




  const formatDate = (date) => {
    if(date){
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

      return [day, month, year].join('-');
    }else return null
  }

  const push = (opp) => {
    setYearEntreeSolde(yearEntreeSolde+opp.amount);
  };

  const push2 = (opp) => {
    setYearWalletSolde(yearWalletSolde+opp.amount);
  };

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

  const handleCloseVer = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
    } else {
      setOpenVer(false);
    }
  };

  const handleCloseVer2 = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
    } else {
      setOpenVer2(false);
    }
  };

  const openAddVersement = () => {
    setOpenVer(true);
  };

  const openAddVersement2 = () => {
    setOpenVer2(true);
  };

  return (
    <Grid container>

      <Dialog fullWidth={true} maxWidth={'sm'} open={openVer} onClose={handleCloseVer}>
        <DialogContent>
        <div style={{display:"flex", justifyContent:"end"}}>
            <IconButton onClick={handleCloseVer}>
            <Close fontSize='medium'/>
            </IconButton>
        </div>
        <Opperation
            opperation = {null}
            type = {entreeType}
            month = {JSON.parse(localStorage.getItem("currentMonth")).id}
            year={JSON.parse(localStorage.getItem("currentYear")).id} 
            title={"Alimentation de caisse دخل "}
            push={push}
            update={null}
            showSuccessToast={showSuccessToast}
            showFailedToast={showFailedToast}
        /> 
        </DialogContent>
      </Dialog>

      <Dialog fullWidth={true} maxWidth={'sm'} open={openVer2} onClose={handleCloseVer2}>
                <DialogContent>
                <div style={{display:"flex", justifyContent:"end"}}>
                    <IconButton onClick={handleCloseVer2}>
                      <Close fontSize='medium'/>
                    </IconButton>
                </div>
                <Opperation
                    opperation = {null}
                    type = {walletType}
                    month = {JSON.parse(localStorage.getItem("currentMonth")).id}
                    year={JSON.parse(localStorage.getItem("currentYear")).id} 
                    title={"Alimentation de portefeuille  دخل في المحفظة "}
                    push={push2}
                    update={null}
                    showSuccessToast={showSuccessToast}
                    showFailedToast={showFailedToast}
                /> 
                </DialogContent>
            </Dialog>

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={openSuccessToast} autoHideDuration={6000} onClose={closeSuccessToast}>
        <Alert onClose={closeSuccessToast} severity="success" sx={{ width: '100%' }} style={{fontSize:"24px",fontWeight:"bold"}}>
            L'oppération réussie تمت العملية بنجاح
        </Alert>
      </Snackbar>

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={openFailedToast} autoHideDuration={6000} onClose={closeFailedToast}>
        <Alert onClose={closeFailedToast} severity="error" sx={{ width: '100%' }} style={{fontSize:"24px",fontWeight:"bold"}}>
            L'oppération a échoué فشل في العملية!
        </Alert>
      </Snackbar>

{/*         <Grid
          item
          xs={12}
          lg={2}
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
              bgcolor:'#ecac64'
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >  
            <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <IoMdTime 
                    fontSize='30px'
                    style={{
                      color: "white",
                    }}                      
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
                Datte d'aujourd'hui
              </Typography>
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
                {formatDate(now_date)}
              </Typography>
              </Box>
            </CardContent>
          </Card>

        </Grid>
         */}
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
              bgcolor:'#079ff0'
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
                  <GiWallet 
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
                    Solde Portefeuille  رصيد المحفظة
                  </Typography>
                </Box>
                <Tooltip title="Ajouter">
                  <Fab color="info" size="small" aria-label="Ajouter" onClick={openAddVersement2}>
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
                {pounds.format(yearWalletSolde+yearWithdrawalSolde+yearWithdrawal2Solde-yearVersementSolde)}
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
                  MRU
                </Typography>
              </Box>
            </CardContent>
          </Card>

        </Grid>
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
                     Solde Caisse  الرصيد النقدي
                  </Typography>
                </Box>
                <Tooltip title="Ajouter">
                  <Fab color="info" size="small" aria-label="Ajouter" onClick={openAddVersement}>
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
                {pounds.format(yearVersementSolde+yearEntreeSolde-yearWithdrawalSolde-yearWithdrawal2Solde)}
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
                  MRU
                </Typography>
              </Box>
            </CardContent>
          </Card>

        </Grid>

    </Grid>
  );
};

export default Solde;
