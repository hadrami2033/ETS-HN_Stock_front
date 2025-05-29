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
import Opperation from "./product";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

const headCellsOpperation = [
    {
      id: 'amount',
      numeric: false,
      disablePadding: false,
      label: 'Montant المبلغ',
    },
    {
      id: 'dateCreation',
      numeric: false,
      disablePadding: false,
      label: 'Création الإضافة',
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




const Entrees = () => {
  const [value, setValue] = React.useState(0);
  const [openFailedToast, setOpenFailedToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [deleted, setDelete] = React.useState(false);
  const [commToDelete, setCommToDelete] = React.useState(null);
  const [hasNextVer, setHasNextVer] = React.useState(false);
  const [pageNumberVer, setPageNumberVer] = React.useState(0);
  const [pageSizeVer, setPageSizeVer] = React.useState(10);
  const [totalPagesVer, setTotalPagesVer] = React.useState(0);
  const [totalVers, setTotalVers] = React.useState(0);

  const [hasNextVer2, setHasNextVer2] = React.useState(false);
  const [pageNumberVer2, setPageNumberVer2] = React.useState(0);
  const [pageSizeVer2, setPageSizeVer2] = React.useState(10);
  const [totalPagesVer2, setTotalPagesVer2] = React.useState(0);
  const [totalVers2, setTotalVers2] = React.useState(0);
  const [allMonths, setAllMonths] = React.useState([]); 
  const [types, setTypes] = React.useState([]); 
  const [entrees, setEntrees] = React.useState([]); 
  const [wallets, setWallets] = React.useState([]); 
  const [entreeType, setEntreeType] = React.useState([]); 
  const [walletType, setWalletType] = React.useState([]); 
  const [currentMonth, setCurrentMonth] = React.useState(localStorage.getItem("currentMonth") ? JSON.parse(localStorage.getItem("currentMonth")) : null);
  const [getBy, setGetBy] = React.useState("")
  const [search, setSearch] = React.useState("")
  const [openVer, setOpenVer] = React.useState(false);
  const [openVer2, setOpenVer2] = React.useState(false);
  const [opperationSelected, setOpperationSelected] = React.useState(null);
  const [openDeleteComm, setOpenDeleteComm] = React.useState(false);

  const axios = useAxios();
  const { logoutUser } = useContext(AuthContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
              let entree = res.data.filter(e => e.label === "entree")[0] ? res.data.filter(e => e.label === "entree")[0] : {};
              let wallet = res.data.filter(e => e.label === "wallets")[0] ? res.data.filter(e => e.label === "wallets")[0] : {};
              setEntreeType(entree);
              setWalletType(wallet);
              setTypes(res.data);
            }, 
            error => {
              console.log(error)
              if(error.response && error.response.status === 401)
              logoutUser()
            }
        )
    })
  }, [])


/*   useEffect(() => {
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/entrees?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&pageNo=${pageNumberVer}&pageSize=${pageSizeVer}`).then(
      res => {
        console.log("versments data : ",res.data);
        setEntrees(res.data.content);
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
  }, [pageSizeVer, pageNumberVer, currentMonth, search])


  useEffect(() => {
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/wallets?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&pageNo=${pageNumberVer2}&pageSize=${pageSizeVer2}`).then(
      res => {
        console.log("wallets data : ",res.data);
        setWallets(res.data.content);
        setHasNextVer2(!res.data.last)
        setTotalPagesVer2(res.data.totalPages)
        setTotalVers2(res.data.totalElements)
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
  }, [pageSizeVer2, pageNumberVer2, currentMonth, search])
 */
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

  const handleCloseVer2 = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
    } else {
      setOpperationSelected(null)
      setOpenVer2(false);
    }
  };

  const openAddVersement = () => {
    setOpenVer(true);
  };

  const openAddVersement2 = () => {
    setOpenVer2(true);
  };


  const showFailedToast = () => {
    setOpenFailedToast(true);
  };

  const showSuccessToast = () => {
    setOpenSuccessToast(true);
  };

  const pushVer = (e) =>{
    setLoading(true)
    axios.get(`point/operations/entrees?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&pageNo=${pageNumberVer}&pageSize=${pageSizeVer}`).then(
        res => {
          console.log("versments data : ",res.data);
          setEntrees(res.data.content);
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
  }

  const updateVer = (e) =>{
    setOpperationSelected(null)
    setLoading(true)
    axios.get(`point/operations/entrees?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&pageNo=${pageNumberVer}&pageSize=${pageSizeVer}`).then(
        res => {
          console.log("versments data : ",res.data);
          setEntrees(res.data.content);
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
  }

  const pushVer2 = (e) =>{
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/wallets?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&pageNo=${pageNumberVer2}&pageSize=${pageSizeVer2}`).then(
      res => {
        console.log("wallets data : ",res.data);
        setWallets(res.data.content);
        setHasNextVer2(!res.data.last)
        setTotalPagesVer2(res.data.totalPages)
        setTotalVers2(res.data.totalElements)
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
  }

  const updateVer2 = (e) =>{
    setOpperationSelected(null)
    setLoading(true)
    if(localStorage.getItem("currentYear") && currentMonth)
    axios.get(`point/operations/wallets?status=P&month=${currentMonth.id}&year=${JSON.parse(localStorage.getItem("currentYear")).id}&pageNo=${pageNumberVer2}&pageSize=${pageSizeVer2}`).then(
      res => {
        console.log("wallets data : ",res.data);
        setWallets(res.data.content);
        setHasNextVer2(!res.data.last)
        setTotalPagesVer2(res.data.totalPages)
        setTotalVers2(res.data.totalElements)
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
  }

  const editVer = (e) =>{
    setOpperationSelected(e)
    setOpenVer(true)
  }

  const editVer2 = (e) =>{
    setOpperationSelected(e)
    setOpenVer2(true)
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
          const index = entrees.indexOf(commToDelete);
          entrees.splice(index, 1);
          setDelete(!deleted)
          handleCloseModalDeleteComm()
          showSuccessToast()
        },
        error => {
          console.log(error)
          showFailedToast()
        }
      )      
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

  const handleSelectSizeChangeVer2 = (event) => {
    return setPageSizeVer2(event.target.value);
  };


  const nextVer = () => {
    setPageNumberVer(pageNumberVer+1)
  }
  const previousVer = () => {
    setPageNumberVer(pageNumberVer-1)
  }

  const nextVer2 = () => {
    setPageNumberVer2(pageNumberVer2+1)
  }
  const previousVer2 = () => {
    setPageNumberVer2(pageNumberVer2-1)
  }


  return (
    <BaseCard titleColor={"secondary"} title={"Alimentations  الدخل"}>


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
                    type = {entreeType}
                    month = {currentMonth.id}
                    year={JSON.parse(localStorage.getItem("currentYear")).id} 
                    title={"Alimentation de caisse دخل "}
                    push={pushVer}
                    update={updateVer}
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
                    opperation = {opperationSelected}
                    type = {walletType}
                    month = {currentMonth.id}
                    year={JSON.parse(localStorage.getItem("currentYear")).id} 
                    title={"Alimentation de portefeuille  دخل في المحفظة "}
                    push={pushVer2}
                    update={updateVer2}
                    showSuccessToast={showSuccessToast}
                    showFailedToast={showFailedToast}
                /> 
                </DialogContent>
            </Dialog>

          <EnhancedTableToolbar
            onSearch = {onSearch}
            search={search}
            goSearch = {goSearch}
            selectMonth = {selectMonth}
            months = {allMonths}
            currentMonth = {currentMonth}
          />

            <Box sx={{ width: '100%', marginTop:'35px', marginLeft: '15px', whiteSpace: "nowrap", overflowX: 'auto', overflowY: 'hidden'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="tabs">
                      <Tab style={{fontWeight:'bold', fontSize:'20px', width:'60%'}} label="Alimentation de caisse دخل نقدي" {...a11yProps(0)} />
                      <Tab style={{fontWeight:'bold', fontSize:'20px', width:'60%'}} label="Portefeuille إيداع في المحفظة" {...a11yProps(1)} />
                  </Tabs>
                </Box>  
                <CustomTabPanel value={value} index={0}>

                    <Stack spacing={2} direction="row" mb={2} >
                      <Tooltip title="Ajouter">
                        <Fab color="primary"  size="medium" aria-label="Ajouter" onClick={openAddVersement}>
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
                    {entrees.length > 0 ?
                        <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        >
                            <EnhancedTableHead
                                rowCount={entrees.length}
                                headCells={headCellsOpperation}
                                headerBG="#1A7795"
                                txtColor="#DCDCDC"
                            />
                            <TableBody>
                                {entrees
                                .map((row, index) => {
                                    return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell align="left"></TableCell>
                                    
                                        <TableCell align="left">{pounds.format(row.amount)} MRU</TableCell>
                                        <TableCell align="left">{formatDate(row.dateCreation)} </TableCell>
                                        <TableCell align="left">
                                          <Tooltip onClick={() => editVer(row)} title="Detail">
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

                {entrees.length > 0 &&
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

                    <Stack spacing={2} direction="row" mb={2} >
                      <Tooltip title="Ajouter">
                        <Fab color="primary"  size="medium" aria-label="Ajouter" onClick={openAddVersement2}>
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
                    {wallets.length > 0 ?
                        <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        >
                            <EnhancedTableHead
                                rowCount={wallets.length}
                                headCells={headCellsOpperation}
                                headerBG="#1A7795"
                                txtColor="#DCDCDC"
                            />
                            <TableBody>
                                {wallets
                                .map((row, index) => {
                                    return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell align="left"></TableCell>
                                    
                                        <TableCell align="left">{pounds.format(row.amount)} MRU</TableCell>
                                        <TableCell align="left">{formatDate(row.dateCreation)} </TableCell>
                                        <TableCell align="left">
                                          <Tooltip onClick={() => editVer2(row)} title="Detail">
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

      {wallets.length > 0 &&
       <div style={{width: "100%", marginTop: '20px', display: 'flex', justifyContent: "space-between"}}>
            <div style={{width:"50%", display:'flex', alignItems:'center'}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'bold', color:"GrayText"}} >
              Total المجموع : {totalVers2}
              </Box>
            </div>
            <div style={{width:"50%", display:'flex', alignItems:'center', justifyContent:"end"}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'normal', color:"GrayText"}} >
                {pageNumberVer2}/{totalPagesVer2}
              </Box>

              <Tooltip title="Précédente السابق">
               <span>
                <IconButton disabled={(pageNumberVer2 === 0)} onClick={previousVer2}>
                  <ArrowBack/>
                </IconButton>
                </span>
              </Tooltip>

              <Select
                id="page-size-select"
                value={pageSizeVer}
                onChange={handleSelectSizeChangeVer2 }
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
                <IconButton disabled={!hasNextVer} onClick={nextVer2} >
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

export default Entrees;
