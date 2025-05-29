import React, { useEffect, useState } from "react";
import { Alert, Tooltip, Stack,Snackbar, Box, CircularProgress, Fab, Select, MenuItem, DialogContentText, Button, DialogActions, DialogTitle, Paper } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Add, Close, CreateOutlined} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import useAxios from "../src/utils/useAxios";
import { useContext } from "react";
import AuthContext from "../src/context/AuthContext";
import Commission from "./new_commission";
import EnhancedTableHead from "../src/components/Table/TableHeader";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import Client from "./client";
import Magasin from "./magasin";
import Draggable from 'react-draggable';
import DeleteIcon from '@mui/icons-material/Delete';

const headCells = [
    {
      id: 'label',
      numeric: false,
      disablePadding: false,
      label: 'Label',
    },
    {
      id: 'dateCreation',
      numeric: false,
      disablePadding: false,
      label: 'Date de création',
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

const Magasins = () => {
  const [openFailedToast, setOpenFailedToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openVer, setOpenVer] = React.useState(false);
  const [opperationSelected, setOpperationSelected] = React.useState(null);
  const [data, setData] = useState([]);
  const [hasNext, setHasNext] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [todeleted, setToDeleted] = React.useState(null);
  const [updated, setUpdate] = React.useState(false);

  const axios = useAxios();
  const { logoutUser } = useContext(AuthContext);


  useEffect(() => {
    setLoading(true)
    axios.get(`magasins/all`).then(
        res => {
            console.log("data  ", res.data);
            setData(res.data);
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
            //logoutUser()
            console.log(error);
          }
      )
    .then(() => {
      setLoading(false)
    })
  }, [updated])

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
    axios.get(`magasins/all`).then(
        res => {
          setData(res.data);
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          //logoutUser()
          console.log(error);
          
        }
      )  
      .then(() => {
      setLoading(false)
      })
  }

  const updateVer = (e) =>{
    setOpperationSelected(null)
    setLoading(true)
    axios.get(`magasins/all`).then(
        res => {
          setData(res.data);
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          //logoutUser()
          console.log(error);
        
        }
      )
      .then(() => {
      setLoading(false)
      })
  }

  const editVer = (e) =>{
    setOpperationSelected(e)
    setOpenVer(true)
  }
 
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

  
  const handleCloseModalDelete = () =>{
    setOpenDelete(false)
    setToDeleted(null)
  }

  const handleOpenModalDelete = () =>{
    setOpenDelete(true)
  }

  const deleteClick = (row) => {
    setToDeleted(row)
    handleOpenModalDelete()
  }

  const remove = () =>{
    axios.delete(`magasins/${todeleted.id}`).then(
      res => {
          const index = data.indexOf(todeleted);
          data.splice(index, 1);
          setUpdate(!updated)
          handleCloseModalDelete()
          showSuccessToast()
      },
      error => {
        console.log(error)
        showFailedToast()
      }
    )  
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

  return (
    <BaseCard title={"Les magasins"}>
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

            <Dialog 
              open={openDelete}
              onClose={handleCloseModalDelete}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move', display:"flex" ,justifyContent:"end" , fontSize:"24px",fontWeight:"bold" }} id="draggable-dialog-title">
                  Suppression
                </DialogTitle>
                <DialogContent style={{width:300,display:"flex" ,justifyContent:"center" }}>
                  <DialogContentText>
                    Confirmer l'oppération
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button style={{fontSize:"24px",fontWeight:"bold"}} autoFocus onClick={handleCloseModalDelete}>
                    Annuler
                  </Button>
                  <Button style={{fontSize:"24px",fontWeight:"bold"}} onClick={remove}>
                    Supprimer
                  </Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={'sm'} open={openVer} onClose={handleCloseVer}>
                <DialogContent>
                <div style={{display:"flex", justifyContent:"end"}}>
                    <IconButton onClick={handleCloseVer}>
                    <Close fontSize='medium'/>
                    </IconButton>
                </div>
                <Magasin
                    magasin = {opperationSelected}
                    title={"Ajouter une magasin"}
                    push={pushVer}
                    update={updateVer}
                    showSuccessToast={showSuccessToast}
                    showFailedToast={showFailedToast}
                /> 
                </DialogContent>
            </Dialog>

            <Box sx={{ width: '100%', marginTop:'35px', marginLeft: '15px', whiteSpace: "nowrap", overflowX: 'auto', overflowY: 'hidden'}}>
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
                                    
                                        <TableCell align="left">{row.label}  </TableCell>
                                        <TableCell align="left">{formatDate(row.dateCreation)}  </TableCell>
                                        <TableCell align="left">
                                        <Box style={{display:"flex", flexDirection:"row"}} >
                                            <Tooltip onClick={() => editVer(row)} title="Detail">
                                                <IconButton>
                                                <CreateOutlined fontSize='medium' />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip onClick={() => deleteClick(row)} title="Supprimer">
                                                <IconButton>
                                                    <DeleteIcon color='danger' fontSize='large'/>
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
            </Box>

          
    </BaseCard>

  );
};

export default Magasins;
