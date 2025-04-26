import React, { useEffect, useState } from "react";
import { Alert, Typography, Button, Grid, Tooltip, Stack,Snackbar, Box, Tab ,Tabs, CircularProgress, Fab, Paper, Select, MenuItem  } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EnhancedTableHead from "../src/components/Table/TableHeader";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import { Add, Close, CreateOutlined, Delete, InfoOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import useAxios from "../src/utils/useAxios";
import { useContext } from "react";
import AuthContext from "../src/context/AuthContext";
import EnhancedTableToolbar from "../src/components/Table/TableOpperationsToolbar"; 
import Opperation from "./new_opperation";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

const headCellsOpperation = [
    {
      id: 'phone',
      numeric: false,
      disablePadding: false,
      label: 'Client الزبون',
    }, 
    {
      id: 'amount',
      numeric: false,
      disablePadding: false,
      label: 'Montant المبلغ',
    },
    {
      id: 'trsId',
      numeric: false,
      disablePadding: false,
      label: 'Reférence المرجع',
    },
    {
      id: 'dateCreation',
      numeric: false,
      disablePadding: false,
      label: 'Création الإضافة',
    },
    {
      id: 'updatedAt',
      numeric: false,
      disablePadding: true,
      label: 'Modification آخر تغيير',
    },
    {
      id: 'commission',
      numeric: false,
      disablePadding: true,
      label: 'Commission',
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: true,
      label: 'Commentaire شرح',
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: true,
      label: 'Action',
    }
]


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }




const Opperations = () => {
  const [value, setValue] = React.useState(0);
  const [openFailedToast, setOpenFailedToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openDeleteComm, setOpenDeleteComm] = React.useState(false);
  const [deleted, setDelete] = React.useState(false);
  const [commToDelete, setCommToDelete] = React.useState(null);
  const [hasNextVer, setHasNextVer] = React.useState(false);
  const [pageNumberVer, setPageNumberVer] = React.useState(0);
  const [pageSizeVer, setPageSizeVer] = React.useState(10);
  const [totalPagesVer, setTotalPagesVer] = React.useState(0);
  const [totalVers, setTotalVers] = React.useState(0);
  const [totalRets, setTotalRets] = React.useState(0);
  const [totalRets2, setTotalRets2] = React.useState(0);
  const [hasNextRet, setHasNextRet] = React.useState(false);
  const [pageNumberRet, setPageNumberRet] = React.useState(0);
  const [pageSizeRet, setPageSizeRet] = React.useState(10);
  const [totalPagesRet, setTotalPagesRet] = React.useState(0);
  const [hasNextRet2, setHasNextRet2] = React.useState(false);
  const [pageNumberRet2, setPageNumberRet2] = React.useState(0);
  const [pageSizeRet2, setPageSizeRet2] = React.useState(10);
  const [totalPagesRet2, setTotalPagesRet2] = React.useState(0);
  const [allMonths, setAllMonths] = React.useState([]); 
  const [types, setTypes] = React.useState([]); 
  const [retraits, setRetraits] = React.useState([]); 
  const [retraits2, setRetraits2] = React.useState([]); 
  const [versements, setVersements] = React.useState([]); 
  const [retraitType, setRetraitType] = React.useState([]); 
  const [retrait2Type, setRetrait2Type] = React.useState(null); 
  const [versementType, setVersementType] = React.useState([]); 
  const [currentMonth, setCurrentMonth] = React.useState(localStorage.getItem("currentMonth") ? JSON.parse(localStorage.getItem("currentMonth")) : null);
  const [getBy, setGetBy] = React.useState("")
  const [search, setSearch] = React.useState("")
  const [openVer, setOpenVer] = React.useState(false);
  const [openRet, setOpenRet] = React.useState(false);
  const [openRet2, setOpenRet2] = React.useState(false);
  const [opperationSelected, setOpperationSelected] = React.useState(null);
  const [yearWalletSolde, setYearWalletSolde] = React.useState(0);
  const [yearVersementSolde, setYearVersementSolde] = React.useState(0);
  const [yearWithdrawalSolde, setYearWithdrawalSolde] = React.useState(0);
  const [yearWithdrawal2Solde, setYearWithdrawal2Solde] = React.useState(0);
  const [yearEntreeSolde, setYearEntreeSolde] = React.useState(0);
  const [newOpp, setNewOpp] = React.useState(false);

  const axios = useAxios();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`point/months`).then(
      res => {
        setAllMonths(res.data);
      }, 
      error => {
        console.log(error)
        if(error.response && error.response.status === 401)
        logoutUser()
      }
    ).then(() => {
      axios.get(`point/types`).then(
        res => {
          console.log("type opp : ", res.data);
          let entree = res.data.filter(e => e.label === "entree")[0] ? res.data.filter(e => e.label === "entree")[0] : {};
          let wallets = res.data.filter(e => e.label === "wallets")[0] ? res.data.filter(e => e.label === "wallets")[0] : {};
          let withdrawal = res.data.filter(e => e.label === "withdrawal")[0] ? res.data.filter(e => e.label === "withdrawal")[0] : {};
          let versement = res.data.filter(e => e.label === "versement")[0] ? res.data.filter(e => e.label === "versement")[0] : {};
          let withdrawal2 = res.data.filter(e => e.label === "withdrawal2")[0] ? res.data.filter(e => e.label === "withdrawal2")[0] : {};
          setVersementType(versement);
          setRetraitType(withdrawal);
          setRetrait2Type(withdrawal2);
          setTypes(res.data);

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
    })
  }, [newOpp])


  useEffect(() => {
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/versements?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&search=${getBy}&pageNo=${pageNumberVer}&pageSize=${pageSizeVer}`).then(
        res => {
          console.log("versments data : ",res.data);
          setVersements(res.data.content);
          setHasNextVer(!res.data.last)
          setTotalPagesVer(res.data.totalPages)
          setTotalVers(res.data.totalElements)
          //setPageNumberVer(res.data.pageNo)
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          logoutUser()
        }
      )   
      .then(() => {
      setLoading(false)
      })
      else
      setLoading(false)
  }, [pageSizeVer, pageNumberVer, currentMonth, getBy])

  useEffect(() => {
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/withdrawals?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&search=${getBy}&pageNo=${pageNumberRet}&pageSize=${pageSizeRet}`).then(
        res => {
          console.log("withdrawals data : ",res.data);
          setRetraits(res.data.content);
          setHasNextRet(!res.data.last)
          setTotalPagesRet(res.data.totalPages)
          setTotalRets(res.data.totalElements)
          //setPageNumberRet(res.data.pageNo)
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          logoutUser()
        }
      )   
      .then(() => {
      setLoading(false)
      })
      else
      setLoading(false)
  }, [pageSizeRet, pageNumberRet, currentMonth, getBy])

  useEffect(() => {
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/withdrawals2?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&search=${getBy}&pageNo=${pageNumberRet2}&pageSize=${pageSizeRet2}`).then(
        res => {
          console.log("withdrawals2 data : ",res.data);
          setRetraits2(res.data.content);
          setHasNextRet2(!res.data.last)
          setTotalPagesRet2(res.data.totalPages)
          setTotalRets2(res.data.totalElements)
          //setPageNumberRet(res.data.pageNo)
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          logoutUser()
        }
      )   
      .then(() => {
      setLoading(false)
      }) 
      else
      setLoading(false)
  }, [pageSizeRet2, pageNumberRet2, currentMonth, getBy])





  const formatDate = (date) => {
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
  
      return [day, month, year].join('-') //+ "  " + [hour, min].join(':')
      ;
    }else return null
  }

  let pounds = Intl.NumberFormat( {
    style: 'currency',
    maximumSignificantDigits: 3,
    minimumFractionDigits: 2
  });

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
      setOpperationSelected(null)
      setOpenVer(false);
    }
  };

  const handleCloseRet = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
    } else {
      setOpperationSelected(null)
      setOpenRet(false);
    }
  };

  const handleCloseRet2 = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
    } else {
      setOpperationSelected(null)
      setOpenRet2(false);
    }
  };

  const openAddRetrait = () => {
    setOpenRet(true);
  };

  const openAddRetrait2 = () => {
    setOpenRet2(true);
  };

  const openAddVersement = () => {
    setOpenVer(true);
  };

  const showFailedToast = () => {
    setOpenFailedToast(true);
  };

  const showSuccessToast = () => {
    setOpenSuccessToast(true);
  };

  const pushVer = (e) =>{
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/versements?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&search=${getBy}&pageNo=${pageNumberVer}&pageSize=${pageSizeVer}`).then(
        res => {
          setVersements(res.data.content);
          setHasNextVer(!res.data.last)
          setTotalPagesVer(res.data.totalPages)
          setTotalVers(res.data.totalElements)
          //setPageNumberVer(res.data.pageNo)
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          logoutUser()
        }
      )   
      .then(() => {
        setLoading(false)
        setNewOpp(!newOpp)
      })
      else
      setLoading(false)
  }

  const updateVer = (e) =>{
    setOpperationSelected(null)
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/versements?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&search=${getBy}&pageNo=${pageNumberVer}&pageSize=${pageSizeVer}`).then(
        res => {
          setVersements(res.data.content);
          setHasNextVer(!res.data.last)
          setTotalPagesVer(res.data.totalPages)
          setTotalVers(res.data.totalElements)
          //setPageNumberVer(res.data.pageNo)
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          logoutUser()
        }
      )   
      .then(() => {
      setLoading(false)
      setNewOpp(!newOpp)
      })
      else
      setLoading(false)
  }

  const pushRet = (e) =>{
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/withdrawals?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&search=${getBy}&pageNo=${pageNumberRet}&pageSize=${pageSizeRet}`).then(
        res => {
          console.log("withdrawals data : ",res.data);
          setRetraits(res.data.content);
          setHasNextRet(!res.data.last)
          setTotalPagesRet(res.data.totalPages)
          setTotalRets(res.data.totalElements)
          //setPageNumberRet(res.data.pageNo)
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          logoutUser()
        }
      )   
      .then(() => {
        setNewOpp(!newOpp)
        setLoading(false)
      })
      else
      setLoading(false)
  }

  const updateRet = (e) =>{
    setOpperationSelected(null)
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/withdrawals?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&search=${getBy}&pageNo=${pageNumberRet}&pageSize=${pageSizeRet}`).then(
        res => {
          console.log("withdrawals data : ",res.data);
          setRetraits(res.data.content);
          setHasNextRet(!res.data.last)
          setTotalPagesRet(res.data.totalPages)
          setTotalRets(res.data.totalElements)
          //(res.data.pageNo)
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          logoutUser()
        }
      )   
      .then(() => {
        setNewOpp(!newOpp)
        setLoading(false)
      })
      else
      setLoading(false)
  }


  
  const pushRet2 = (e) =>{
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/withdrawals2?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&search=${getBy}&pageNo=${pageNumberRet2}&pageSize=${pageSizeRet2}`).then(
      res => {
        console.log("withdrawals2 data : ",res.data);
        setRetraits2(res.data.content);
        setHasNextRet2(!res.data.last)
        setTotalPagesRet2(res.data.totalPages)
        setTotalRets2(res.data.totalElements)
        //setPageNumberRet(res.data.pageNo)
      },
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          logoutUser()
        }
      )   
      .then(() => {
        setNewOpp(!newOpp)
        setLoading(false)
      })
      else
      setLoading(false)
  }

  const updateRet2 = (e) =>{
    setOpperationSelected(null)
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/withdrawals2?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&search=${getBy}&pageNo=${pageNumberRet2}&pageSize=${pageSizeRet2}`).then(
      res => {
        console.log("withdrawals2 data : ",res.data);
        setRetraits2(res.data.content);
        setHasNextRet2(!res.data.last);
        setTotalPagesRet2(res.data.totalPages);
        setTotalRets2(res.data.totalElements);
        //setPageNumberRet(res.data.pageNo)
      },
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          logoutUser()
        }
      )   
      .then(() => {
        setNewOpp(!newOpp)
        setLoading(false)
      })
      else
      setLoading(false)
  }


  const editRet = (e) =>{
    setOpperationSelected(e)
    setOpenRet(true)
  }
  const editVer = (e) =>{
    setOpperationSelected(e)
    setOpenVer(true)
  }

  const handleOpenModalDeleteComm = () =>{
    setOpenDeleteComm(true)
  }

  const deleteClickComm = (row) => {
    setCommToDelete(row)
    handleOpenModalDeleteComm()
  }

  const remove = () =>{
    if(commToDelete !== null){
      axios.delete(`point/operations/${commToDelete.id}`).then(
        res => {
          if(commToDelete.type.label === "versement"){
            const index = versements.indexOf(commToDelete);
            versements.splice(index, 1);
            setDelete(!deleted)
            handleCloseModalDeleteComm()
            showSuccessToast()
          }else if(commToDelete.type.label === "withdrawal"){
            const index = retraits.indexOf(commToDelete);
            retraits.splice(index, 1);
            setDelete(!deleted)
            handleCloseModalDeleteComm()
            showSuccessToast()
          }else{
            const index = retraits2.indexOf(commToDelete);
            retraits2.splice(index, 1);
            setDelete(!deleted)
            handleCloseModalDeleteComm()
            showSuccessToast()
          }
        },
        error => {
          console.log(error)
          showFailedToast()
        }
      ).then(() => {
        setNewOpp(!newOpp)
      })  
    }
  }

  const PaperComponent = (props) => {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  } 
  const handleCloseModalDeleteComm = () =>{
    setOpenDeleteComm(false)
  }

  const selectMonth = (event) => {
    setCurrentMonth(event.target.value)
    console.log("month selected => ",event.target.value);
  };

  const goSearch = () => {
    console.log(search);
    setGetBy(search)
  }

  const onSearch = e => {
    const { value } = e.target
    setSearch(value)
    if(value === ""){
      setGetBy("")
    }
  }

  const handleSelectSizeChangeVer = (event) => {
    return setPageSizeVer(event.target.value);
  };

  const handleSelectSizeChangeRet = (event) => {
    return setPageSizeRet(event.target.value);
  };

  const handleSelectSizeChangeRet2 = (event) => {
    return setPageSizeRet2(event.target.value);
  };

  const nextVer = () => {
    setPageNumberVer(pageNumberVer+1)
  }
  const previousVer = () => {
    setPageNumberVer(pageNumberVer-1)
  }

  const nextRet = () => {
    setPageNumberRet(pageNumberRet+1)
  }
  const nextRet2 = () => {
    setPageNumberRet2(pageNumberRet2+1)
  }
  const previousRet = () => {
    setPageNumberRet(pageNumberRet-1)
  }

  const previousRet2 = () => {
    setPageNumberRet2(pageNumberRet2-1)
  }

  return (
    <BaseCard titleColor={"secondary"} title={"Les oppérations  العمليات"}>

      <Dialog 
        open={openDeleteComm}
        onClose={handleCloseModalDeleteComm}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move', display:"flex" ,justifyContent:"end" , fontSize:"24px",fontWeight:"bold" }} id="draggable-dialog-title">
          Suppression حذف
        </DialogTitle>
        <DialogContent style={{width:300,display:"flex" ,justifyContent:"center" }}>
          <DialogContentText>
            Confirmer l'oppération تأكيد العملية
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{fontSize:"24px",fontWeight:"bold"}} autoFocus onClick={handleCloseModalDeleteComm}>
            Annuler إلغاء
          </Button>
          <Button style={{fontSize:"24px",fontWeight:"bold"}} onClick={remove}>Supprimer  تأكيد</Button>
        </DialogActions>
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
            
            <Dialog fullWidth={true} maxWidth={'sm'} open={openVer} onClose={handleCloseVer}>
                <DialogContent>
                <div style={{display:"flex", justifyContent:"end"}}>
                    <IconButton onClick={handleCloseVer}>
                    <Close fontSize='medium'/>
                    </IconButton>
                </div>
                <Opperation
                    opperation = {opperationSelected}
                    type = {versementType}
                    month = {currentMonth.id}
                    year={JSON.parse(localStorage.getItem("currentYear")).id} 
                    title={"Versement  إيداع"}
                    caisse={yearVersementSolde+yearEntreeSolde-yearWithdrawalSolde-yearWithdrawal2Solde}
                    wallet={yearWalletSolde+yearWithdrawalSolde+yearWithdrawal2Solde-yearVersementSolde}
                    push={pushVer}
                    update={updateVer}
                    showSuccessToast={showSuccessToast}
                    showFailedToast={showFailedToast}
                /> 
                </DialogContent>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={'sm'} open={openRet2} onClose={handleCloseRet2}>
                <DialogContent>
                <div style={{display:"flex", justifyContent:"end"}}>
                    <IconButton onClick={handleCloseRet2}>
                    <Close fontSize='medium'/>
                    </IconButton>
                </div>
                <Opperation
                    opperation = {opperationSelected}
                    type = {retrait2Type}
                    month = {currentMonth.id}
                    year={JSON.parse(localStorage.getItem("currentYear")).id} 
                    title={"Retrait bénéficiaire سحب مستفيد"}
                    coef={2}
                    caisse={yearVersementSolde+yearEntreeSolde-yearWithdrawalSolde-yearWithdrawal2Solde}
                    wallet={yearWalletSolde+yearWithdrawalSolde+yearWithdrawal2Solde-yearVersementSolde}
                    push={pushRet2}
                    update={updateRet2}
                    showSuccessToast={showSuccessToast}
                    showFailedToast={showFailedToast}
                /> 
                </DialogContent>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={'sm'} open={openRet} onClose={handleCloseRet}>
                <DialogContent>
                <div style={{display:"flex", justifyContent:"end"}}>
                    <IconButton onClick={handleCloseRet}>
                    <Close fontSize='medium'/>
                    </IconButton>
                </div>
                <Opperation
                    opperation = {opperationSelected}
                    type = {retraitType}
                    month = {currentMonth.id}
                    year={JSON.parse(localStorage.getItem("currentYear")).id} 
                    title={"Retrait client سحب زبون"}
                    push={pushRet}
                    caisse={yearVersementSolde+yearEntreeSolde-yearWithdrawalSolde-yearWithdrawal2Solde}
                    wallet={yearWalletSolde+yearWithdrawalSolde+yearWithdrawal2Solde-yearVersementSolde}
                    update={updateRet}
                    showSuccessToast={showSuccessToast}
                    showFailedToast={showFailedToast}
                /> 
                </DialogContent>
            </Dialog>

          <EnhancedTableToolbar
            onSearch = {onSearch}
            search={search}
            caisse={yearVersementSolde+yearEntreeSolde-yearWithdrawalSolde-yearWithdrawal2Solde}
            wallet={yearWalletSolde+yearWithdrawalSolde+yearWithdrawal2Solde-yearVersementSolde}
            goSearch = {goSearch}
            selectMonth = {selectMonth}
            months = {allMonths}
            currentMonth = {currentMonth}
          />

            <Box sx={{ width: '100%', marginTop:'35px', marginLeft: '15px', whiteSpace: "nowrap", overflowX: 'auto', overflowY: 'hidden'}}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="tabs">
                            <Tab style={{fontWeight:'bold', fontSize:'20px', width:'50%'}} label="Versements الإيداع" {...a11yProps(0)} />
                            <Tab style={{fontWeight:'bold', fontSize:'20px', width:'50%'}} label="Retraits clients سحب زبون" {...a11yProps(1)} />
                            <Tab style={{fontWeight:'bold', fontSize:'20px', width:'50%'}} label="Retraits bénéficiaires سحب مستفيد" {...a11yProps(2)} />
                        </Tabs>
                    </Box>  

                    <CustomTabPanel value={value} index={0}>
                    <Stack spacing={2} direction="row" mb={2} ml={10} justifyContent={'start'}>
                      <Tooltip title="Ajouter إيداع">
                        <Fab color="primary" size="medium" aria-label="Ajouter" onClick={openAddVersement}>
                            <Add/>
                        </Fab>
                      </Tooltip>
                    </Stack>
                    {loading ?
                      <Box style={{width:'100%', display:'flex', justifyContent:"center" }}>
                        <CircularProgress
                          size={24}
                            sx={{
                            color: 'primary',
                            position: 'absolute',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                    </Box>
                    :
                  <Box style={{width:'100%'}}>
                    {versements.length > 0 ?
                        <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        >
                            <EnhancedTableHead
                                headCells={headCellsOpperation}
                                headerBG="#1A7795"
                                txtColor="#DCDCDC"
                            />
                            <TableBody>
                                {versements
                                .map((row, index) => {
                                    return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell align="left"></TableCell>
                                    
                                        <TableCell align="left">{row.phone}</TableCell>
                                        <TableCell align="left">{pounds.format(row.amount)} MRU</TableCell>
                                        <TableCell align="left">{row.trsId}</TableCell>
                                        <TableCell align="left">{formatDate(row.dateCreation)} </TableCell>
                                        <TableCell align="left">{formatDate(row.updatedAt)} </TableCell>
                                        <TableCell align="left">{pounds.format(row.commission)} MRU</TableCell> 
                                        <TableCell align="left">{row.description} </TableCell> 
                                        <TableCell align="left">
                                          <Tooltip onClick={() => editVer(row)} title="Edit">
                                            <IconButton>
                                              <CreateOutlined fontSize='medium' />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip onClick={() => deleteClickComm(row)} title="Supprimer">
                                              <IconButton>
                                                <Delete color='danger' fontSize='medium' />
                                              </IconButton>
                                          </Tooltip>
                                        </TableCell>

                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    :
                    <div style={{width: "100%", marginTop: '20px', display: 'flex', justifyContent: "center"}}>
                        <Box style={{fontSize: '16px'}}>
                        Liste vide
                        </Box>
                    </div>
                    }

      {versements.length > 0 &&
       <div style={{width: "100%", marginTop: '20px', display: 'flex', justifyContent: "space-between"}}>
            <div style={{width:"50%", display:'flex', alignItems:'center'}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'bold', color:"GrayText"}} >
              Total المجموع : {totalVers}
              </Box>
            </div>
            <div style={{width:"50%", display:'flex', alignItems:'center', justifyContent:"end"}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'normal', color:"GrayText"}} >
                {pageNumberVer}/{totalPagesVer}
              </Box>

              <Tooltip title="Précédente السابق">
               <span>
                <IconButton disabled={(pageNumberVer === 0)} onClick={previousVer}>
                  <ArrowBack/>
                </IconButton>
                </span>
              </Tooltip>

              <Select
                id="page-size-select"
                value={pageSizeVer}
                onChange={handleSelectSizeChangeVer }
                label="pageSize"
              >
                <MenuItem value={pageSizeVer}>
                  <em>{pageSizeVer}</em>
                </MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>  

              <Tooltip title="Suivante التالي">
                <span>
                <IconButton disabled={!hasNextVer} onClick={nextVer} >
                  <ArrowForward/>
                </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>
          }
                    </Box>
                  }
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                    <Stack spacing={2} direction="row" mb={2} justifyContent={'center'}>
                      <Tooltip title="Ajouter سحب زبون">
                        <Fab color="primary" size="medium" aria-label="Ajouter" onClick={openAddRetrait}>
                            <Add/>
                        </Fab>
                      </Tooltip>
                    </Stack>
                  {loading ?
                    <Box style={{width:'100%', display:'flex', justifyContent:"center" }}>
                        <CircularProgress
                          size={24}
                            sx={{
                            color: 'primary',
                            position: 'absolute',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                    </Box>
                    :
                  <Box style={{width:'100%'}}>
                    {retraits.length > 0 ?
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        >
                        <EnhancedTableHead
                            headCells={headCellsOpperation}
                            headerBG="#1A7795"
                            txtColor="#DCDCDC"
                        />
                        <TableBody>
                            {retraits
                            .map((row, index) => {
                                return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    
                                  <TableCell align="left"></TableCell>
                                  <TableCell align="left">{row.phone}</TableCell>
                                  <TableCell align="left">{pounds.format(row.amount)} MRU</TableCell>
                                  <TableCell align="left">{row.trsId}</TableCell>
                                  <TableCell align="left">{formatDate(row.dateCreation)} </TableCell>
                                  <TableCell align="left">{formatDate(row.updatedAt)} </TableCell>
                                  <TableCell align="left">{pounds.format(row.commission)} MRU</TableCell> 
                                  <TableCell align="left">{row.description} </TableCell> 

                                  <TableCell align="left">
                                     <Tooltip onClick={() => editRet(row)} title="Edit">
                                          <IconButton>
                                            <CreateOutlined fontSize='medium' />
                                          </IconButton>
                                     </Tooltip>
                                     <Tooltip onClick={() => deleteClickComm(row)} title="Supprimer">
                                         <IconButton>
                                          <Delete color='danger' fontSize='medium' />
                                         </IconButton>
                                     </Tooltip>
                                  </TableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    :
                    <div style={{width: "100%", marginTop: '20px', display: 'flex', justifyContent: "center"}}>
                        <Box style={{fontSize: '16px'}}>
                        Liste vide
                        </Box>
                    </div>
                    }

      {retraits.length > 0 &&
       <div style={{width: "100%", marginTop: '20px', display: 'flex', justifyContent: "space-between"}}>
            <div style={{width:"50%", display:'flex', alignItems:'center'}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'bold', color:"GrayText"}} >
              Total المجموع : {totalRets}
              </Box>
            </div>
            <div style={{width:"50%", display:'flex', alignItems:'center', justifyContent:"end"}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'normal', color:"GrayText"}} >
                {pageNumberRet}/{totalPagesRet}
              </Box>

              <Tooltip title="Précédente السابق">
               <span>
                <IconButton disabled={(pageNumberRet === 0)} onClick={previousRet}>
                  <ArrowBack/>
                </IconButton>
                </span>
              </Tooltip>

              <Select
                id="page-size-select"
                value={pageSizeRet}
                onChange={handleSelectSizeChangeRet }
                label="pageSize"
              >
                <MenuItem value={pageSizeRet}>
                  <em>{pageSizeRet}</em>
                </MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>  

              <Tooltip title="Suivante التالي">
                <span>
                <IconButton disabled={!hasNextRet} onClick={nextRet} >
                  <ArrowForward/>
                </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>
          }

                  </Box>
                  }
                    </CustomTabPanel> 

                    <CustomTabPanel value={value} index={2}>
                    <Stack spacing={2} direction="row" mb={2} mr={15} justifyContent={'end'}>
                      <Tooltip title="Ajouter سحب مستفيد">
                        <Fab color="primary" size="medium" aria-label="Ajouter" onClick={openAddRetrait2}>
                            <Add/>
                        </Fab>
                      </Tooltip>
                    </Stack>
                  {loading ?
                    <Box style={{width:'100%', display:'flex', justifyContent:"center" }}>
                        <CircularProgress
                          size={24}
                            sx={{
                            color: 'primary',
                            position: 'absolute',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                    </Box>
                    :
                  <Box style={{width:'100%'}}>
                    {retraits2.length > 0 ?
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        >
                        <EnhancedTableHead
                            headCells={headCellsOpperation}
                            headerBG="#1A7795"
                            txtColor="#DCDCDC"
                        />
                        <TableBody>
                            {retraits2
                            .map((row, index) => {
                                return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    
                                  <TableCell align="left"></TableCell>
                                  <TableCell align="left">{row.phone}</TableCell>
                                  <TableCell align="left">{pounds.format(row.amount)} MRU</TableCell>
                                  <TableCell align="left">{row.trsId}</TableCell>
                                  <TableCell align="left">{formatDate(row.dateCreation)} </TableCell>
                                  <TableCell align="left">{formatDate(row.updatedAt)} </TableCell>
                                  <TableCell align="left">{pounds.format(row.commission)} MRU</TableCell> 
                                  <TableCell align="left">{row.description} </TableCell> 

                                  <TableCell align="left">
                                     <Tooltip onClick={() => editRet(row)} title="Edit">
                                          <IconButton>
                                            <CreateOutlined fontSize='medium' />
                                          </IconButton>
                                     </Tooltip>
                                     <Tooltip onClick={() => deleteClickComm(row)} title="Supprimer">
                                         <IconButton>
                                          <Delete color='danger' fontSize='medium' />
                                         </IconButton>
                                     </Tooltip>
                                  </TableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    :
                    <div style={{width: "100%", marginTop: '20px', display: 'flex', justifyContent: "center"}}>
                        <Box style={{fontSize: '16px'}}>
                        Liste vide
                        </Box>
                    </div>
                    }

      {retraits2.length > 0 &&
       <div style={{width: "100%", marginTop: '20px', display: 'flex', justifyContent: "space-between"}}>
            <div style={{width:"50%", display:'flex', alignItems:'center'}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'bold', color:"GrayText"}} >
              Total المجموع : {totalRets2}
              </Box>
            </div>
            <div style={{width:"50%", display:'flex', alignItems:'center', justifyContent:"end"}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'normal', color:"GrayText"}} >
                {pageNumberRet2}/{totalPagesRet2}
              </Box>

              <Tooltip title="Précédente السابق">
               <span>
                <IconButton disabled={(pageNumberRet2 === 0)} onClick={previousRet2}>
                  <ArrowBack/>
                </IconButton>
                </span>
              </Tooltip>

              <Select
                id="page-size-select"
                value={pageSizeRet2}
                onChange={handleSelectSizeChangeRet2 }
                label="pageSize"
              >
                <MenuItem value={pageSizeRet2}>
                  <em>{pageSizeRet2}</em>
                </MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>  

              <Tooltip title="Suivante التالي">
                <span>
                <IconButton disabled={!hasNextRet2} onClick={nextRet2} >
                  <ArrowForward/>
                </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>
          }

                  </Box>
                  }
                    </CustomTabPanel> 
            </Box>

          
    </BaseCard>

  );
};

export default Opperations;
