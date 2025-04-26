import React, { useEffect, useState } from "react";
import { Alert, Tooltip, Stack,Snackbar, Box, CircularProgress, Fab } from "@mui/material";
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

const headCellsOpperation = [
    {
      id: 'min',
      numeric: false,
      disablePadding: false,
      label: 'De من',
    },
    {
      id: 'max',
      numeric: false,
      disablePadding: false,
      label: "Jusqu'a إلى",
    },
    {
        id: 'commission',
        numeric: false,
        disablePadding: false,
        label: 'Commission',
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

const Commissions = () => {
  const [openFailedToast, setOpenFailedToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openVer, setOpenVer] = React.useState(false);
  const [opperationSelected, setOpperationSelected] = React.useState(null);
  const [commissionsWithdrawal, setCommissionsWithdrawal] = useState([]);

  const axios = useAxios();
  const { logoutUser } = useContext(AuthContext);


  useEffect(() => {
    setLoading(true)
    axios.get(`point/commissionswithdrawal`).then(
        res => {
            //console.log("commissionswithdrawal  ", res.data);
            setCommissionsWithdrawal(res.data);
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
  }, [])

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
    axios.get(`point/commissionswithdrawal`).then(
        res => {
            //console.log("commissionswithdrawal  ", res.data);
            setCommissionsWithdrawal(res.data);
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
    axios.get(`point/commissionswithdrawal`).then(
        res => {
            //console.log("commissionswithdrawal  ", res.data);
            setCommissionsWithdrawal(res.data);
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

  const editVer = (e) =>{
    setOpperationSelected(e)
    setOpenVer(true)
  }
 



  return (
    <BaseCard titleColor={"secondary"} title={"Commissions de retrait"}>
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
                <Commission
                    opperation = {opperationSelected}
                    type = {'ret'}
                    title={"Commission de retrait"}
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
                    {commissionsWithdrawal.length > 0 ?
                        <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        >
                            <EnhancedTableHead
                                rowCount={commissionsWithdrawal.length}
                                headCells={headCellsOpperation}
                                headerBG="#1A7795"
                                txtColor="#DCDCDC"
                            />
                            <TableBody>
                                {commissionsWithdrawal
                                .map((row, index) => {
                                    return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell align="left"></TableCell>
                                    
                                        <TableCell align="left">{pounds.format(row.min)} MRU</TableCell>
                                        <TableCell align="left">{pounds.format(row.max)} MRU </TableCell>
                                        <TableCell align="left">{pounds.format(row.commission)} MRU </TableCell>
                                        <TableCell align="left">
                                          <Tooltip onClick={() => editVer(row)} title="Detail">
                                            <IconButton>
                                              <CreateOutlined fontSize='medium' />
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
                    </Box>
                  }
            </Box>

          
    </BaseCard>

  );
};

export default Commissions;
