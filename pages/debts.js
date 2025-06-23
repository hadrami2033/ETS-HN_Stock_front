import React, { useEffect } from "react";
import { Alert, Tooltip, Box, Tab , Snackbar,Tabs, CircularProgress, Fab, Select, MenuItem  } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import useAxios from "../src/utils/useAxios";
import { useContext } from "react";
import AuthContext from "../src/context/AuthContext";
import EnhancedTableToolbar from "../src/components/Table/TableDebtsToolbar"; 
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import EnhancedTableHead from "../src/components/Table/TableHeader";
import { useRouter } from "next/router";
import { Close, CreateOutlined} from '@mui/icons-material';
import Debt from "./debt";

const headCells = [
    {
      id: 'client',
      numeric: false,
      disablePadding: false,
      label: 'Client',
    },
    {
      id: 'amount',
      numeric: false,
      disablePadding: false,
      label: "Montant"
    },
    {
        id: 'amountPayed',
        numeric: false,
        disablePadding: false,
        label: "Montant payé"
      },
    {
       id: 'dateCreation',
       numeric: false,
       disablePadding: false,
       label: "Date création"
    },
    {
        id: 'updatedAt',
        numeric: false,
        disablePadding: false,
        label: "Modifié le"
     },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'Description',
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




const Debts = () => {updated
  const [openFailedToast, setOpenFailedToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [hasNext, setHasNext] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [hasNext2, setHasNext2] = React.useState(false);
  const [pageSize2, setPageSize2] = React.useState(10);
  const [totalPages2, setTotalPages2] = React.useState(0);
  const [total2, setTotal2] = React.useState(0);
  const [pageNumber2, setPageNumber2] = React.useState(0);
  const [data, setData] = React.useState([]); 
  const [clients, setClients] = React.useState([]); 
  const [data2, setData2] = React.useState([]); 
  const [clientId, setClientId] = React.useState(null);
  const [clientSelected, setClientSelected] = React.useState(null);
  const [clientDebt, setClientDebt] = React.useState(0);
  const [clientPaid, setClientPaid] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [updated, setUpdated] = React.useState(false)


  const router = useRouter()
  const axios = useAxios();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { logoutUser } = useContext(AuthContext);

  let pounds = Intl.NumberFormat( {
    style: 'currency',
    maximumSignificantDigits: 3,
    minimumFractionDigits: 2
  });

  useEffect(() => {
    if(clientId){
    setLoading(true)
    axios.get(`debts/byclientpayed?client=${clientId}&payed=${0}&pageNo=${pageNumber}&pageSize=${pageSize}`).then(
        res => {
          console.log("all payed : ",res.data);
          setData(res.data.content);
          setHasNext(!res.data.last)
          setTotalPages(res.data.totalPages)
          setTotal(res.data.totalElements)
          setPageNumber(res.data.pageNo)
        }, 
        error => {
          console.log(error)
          //if(error.response && error.response.status === 401)
          //logoutUser()
        }
      )  
      .then(() => {
        axios.get(`debts/byclientpayed?client=${clientId}&payed=${1}&pageNo=${pageNumber2}&pageSize=${pageSize2}`).then(
            res => {
            console.log("all no payed : ",res.data);
            setData2(res.data.content);
            setHasNext2(!res.data.last)
            setTotalPages2(res.data.totalPages)
            setTotal2(res.data.totalElements)
            setPageNumber2(res.data.pageNo)
          }, 
          error => {
            console.log(error)
            //if(error.response && error.response.status === 401)
            logoutUser()
          }
        )  
        }) 
        .then(() => {
          axios.get(`debts/clientdebt?client=${clientId}&payed=${0}`).then(
              res => {
              setClientDebt(res.data.debt)
            }, 
            error => {
              console.log(error)
              //if(error.response && error.response.status === 401)
              logoutUser()
            }
          )  
          }) 
          .then(() => {
            axios.get(`debts/clientpaiddebt?client=${clientId}&payed=${0}`).then(
                res => {
                setClientPaid(res.data.debt)
              }, 
              error => {
                console.log(error)
                //if(error.response && error.response.status === 401)
                logoutUser()
              }
            )  
            })
      .then(() => {
      setLoading(false)
      })
    }
  }, [pageSize, pageNumber, pageSize2, pageNumber2, updated, clientId])

  useEffect(() => {
    axios.get(`clients/allclients`).then(
        res => {
            setClients(res.data);
            if(res.data.length > 0){
                setClientId(res.data[0].id)
                setClientSelected(res.data[0])
            }
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
            //logoutUser()
            console.log(error);
          }
      )
    }, [])

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

  const handleSelectSizeChange = (event) => {    
    return setPageSize(event.target.value);
  };

  const next = () => {
    setPageNumber(pageNumber+1)
  }
  const previous = () => {
    setPageNumber(pageNumber-1)
  }

  const handleSelectSizeChange2 = (event) => {    
    return setPageSize2(event.target.value);
  };

  const next2 = () => {
    setPageNumber2(pageNumber2+1)
  }
  const previous2 = () => {
    setPageNumber2(pageNumber2-1)
  }

  const onUpdate = () => {
    setUpdated(!updated)
  }

  const selectClient = (event) => {
    setClientSelected(event.target.value)
    setClientId(event.target.value.id)
  };

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
    } else {
      setSelected(null)
      setOpen(false);
    }
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

  const showFailedToast = () => {
    setOpenFailedToast(true);
  };

  const showSuccessToast = () => {
    setOpenSuccessToast(true);
  };

  const openAdd = () => {
    setOpen(true);
  };

  const edit = (e) =>{
    setSelected(e)
    setOpen(true)
  }

  return (
    <BaseCard titleColor={"primary"} title={"Les dettes"}>
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
        <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={handleClose}>
            <DialogContent>
            <div style={{display:"flex", justifyContent:"end"}}>
                <IconButton onClick={handleClose}>
                <Close fontSize='medium'/>
                </IconButton>
            </div>
            <Debt
                selected = {selected}
                title={`Dette sur ${clientSelected && clientSelected.name}`}
                showSuccessToast={showSuccessToast}
                showFailedToast={showFailedToast}
                onUpdate = {onUpdate}
                clientId = {clientId}
            /> 
            </DialogContent>
        </Dialog>

          <EnhancedTableToolbar
            clients = {clients}
            debt = {(clientDebt-clientPaid)}
            clientSelected = {clientSelected}
            selectClient = {selectClient}
            openAdd = {openAdd}
          />
        <Box sx={{ width: '100%', marginTop:'35px', marginLeft: '15px', whiteSpace: "nowrap", overflowX: 'auto', overflowY: 'hidden'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="tabs">
                  <Tab style={{fontWeight:'bold', fontSize:'20px', width:'50%'}} label="Dettes non payés" {...a11yProps(0)} />
                  <Tab style={{fontWeight:'bold', fontSize:'20px', width:'50%'}} label="Dettes payés" {...a11yProps(1)} />
              </Tabs>
          </Box> 

    <CustomTabPanel value={value} index={0}>
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
        {data.length > 0 ?
            <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        >
                            <EnhancedTableHead
                                rowCount={data.length}
                                headCells={headCells}
                                headerBG="#1A7795"
                                txtColor="#DCDCDC"
                            />
                            <TableBody>
                                {data
                                .map((row, index) => {
                                    return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left">{row.client.name} </TableCell>
                                        <TableCell align="left">{pounds.format(row.amount)} CFA </TableCell>
                                        <TableCell align="left">{pounds.format(row.amountPayed)} CFA </TableCell>
                                        <TableCell align="left">{formatDate(row.dateCreation)}  </TableCell>
                                        <TableCell align="left">{formatDate(row.updatedAt)}  </TableCell>
                                        <TableCell align="left">{row.description} </TableCell>
                                        <TableCell align="left">
                                        <Box style={{display:"flex", flexDirection:"row"}} >
                                            <Tooltip onClick={() => edit(row)} title="Detail">
                                                <IconButton>
                                                 <CreateOutlined fontSize='medium' />
                                                </IconButton>
                                            </Tooltip>
                                         </Box>
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
      </Box>
      }

        {data.length > 0 &&
          <div style={{width: "100%", marginTop: '20px', display: 'flex', justifyContent: "space-between"}}>
            <div style={{width:"50%", display:'flex', alignItems:'center'}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'bold', color:"GrayText"}} >
              Total : {total}
              </Box>
            </div>
            <div style={{width:"50%", display:'flex', alignItems:'center', justifyContent:"end"}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'normal', color:"GrayText"}} >
                {pageNumber}/{totalPages}
              </Box>

              <Tooltip title="Précédente">
               <span>
                <IconButton disabled={(pageNumber==0)} onClick={previous}>
                  <ArrowBack/>
                </IconButton>
                </span>
              </Tooltip>

              <Select
                id="page-size-select"
                value={pageSize}
                onChange={handleSelectSizeChange }
                label="pageSize"
              >
                <MenuItem value={pageSize}>
                  <em>{pageSize}</em>
                </MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>  

              <Tooltip title="Suivante">
                <span>
                <IconButton disabled={!hasNext} onClick={next} >
                  <ArrowForward/>
                </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>
        }
    </CustomTabPanel>

    <CustomTabPanel value={value} index={1}>
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
        {data2.length > 0 ?
        <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
            >
            <EnhancedTableHead
                headCells={headCells}
                headerBG="#1A7795"
                txtColor="#DCDCDC"
            />
            <TableBody>
                {data2
                .map((row, index) => {
                    return (
                    <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                    >
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">{row.client.name} </TableCell>
                        <TableCell align="left">{pounds.format(row.amount)} CFA </TableCell>
                        <TableCell align="left">{pounds.format(row.amountPayed)} CFA </TableCell>
                        <TableCell align="left">{formatDate(row.dateCreation)}  </TableCell>
                        <TableCell align="left">{formatDate(row.updatedAt)}  </TableCell>
                        <TableCell align="left">{row.description} </TableCell>
                        <TableCell align="left"></TableCell>
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
      </Box>
      }

        {data2.length > 0 &&
          <div style={{width: "100%", marginTop: '20px', display: 'flex', justifyContent: "space-between"}}>
            <div style={{width:"50%", display:'flex', alignItems:'center'}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'bold', color:"GrayText"}} >
              Total : {total2}
              </Box>
            </div>
            <div style={{width:"50%", display:'flex', alignItems:'center', justifyContent:"end"}}>
              <Box style={{display:'flex', alignItems:'center', marginInline:"20px", fontWeight:'normal', color:"GrayText"}} >
                {pageNumber2}/{totalPages2}
              </Box>

              <Tooltip title="Précédente">
               <span>
                <IconButton disabled={(pageNumber2==0)} onClick={previous2}>
                  <ArrowBack/>
                </IconButton>
                </span>
              </Tooltip>

              <Select
                id="page-size-select"
                value={setPageSize2}
                onChange={handleSelectSizeChange2 }
                label="pageSize"
              >
                <MenuItem value={pageSize2}>
                  <em>{pageSize2}</em>
                </MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>  

              <Tooltip title="Suivante">
                <span>
                <IconButton disabled={!hasNext2} onClick={next2} >
                  <ArrowForward/>
                </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>
        }
    </CustomTabPanel>
</Box>


          
    </BaseCard>
    
  );
};

export default Debts;