import React, { useEffect } from "react";
import { Alert, Button, Tooltip, Stack,Snackbar, Box, Tab ,Tabs, CircularProgress, Fab, Paper, Select, MenuItem, Checkbox  } from "@mui/material";
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
import { Add, Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import useAxios from "../src/utils/useAxios";
import { useContext } from "react";
import AuthContext from "../src/context/AuthContext";
import EnhancedTableToolbar from "../src/components/Table/TableProductsToolbar"; 
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import Product from "./product";
import Invoice from "./invoice";

const headCellsOpperation = [
    {
      id: 'nom',
      numeric: false,
      disablePadding: false,
      label: 'Libelé',
    }, 
    {
      id: 'quantiteEnStock',
      numeric: false,
      disablePadding: false,
      label: 'Quantité en stock',
    },
    {
      id: 'uniteEnStock',
      numeric: false,
      disablePadding: false,
      label: 'Unités en stock',
    },
    {
      id: 'prixAchat',
      numeric: false,
      disablePadding: false,
      label: "Prix d'achat"
    },
    {
      id: 'prixVente',
      numeric: false,
      disablePadding: false,
      label: "Prix de vente"
    },
    {
      id: 'dateCreation',
      numeric: false,
      disablePadding: false,
      label: 'Date création',
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: true,
      label: 'Commentaire',
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




const Products = () => {
  const [value, setValue] = React.useState(0);
  const [openFailedToast, setOpenFailedToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [updated, setUpdate] = React.useState(false);
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
  const [data2, setData2] = React.useState([]); 
  const [getBy, setGetBy] = React.useState("")
  const [search, setSearch] = React.useState("")
  const [open, setOpen] = React.useState(false);
  const [openInvoice, setOpenInvoice] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [listSelected, setListSelected] = React.useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [productSelected, setProductSelected] = React.useState(null);
  const [prodUnite, setProdUnit] = React.useState(null);

  const axios = useAxios();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setListSelected([])
  };
  const { logoutUser } = useContext(AuthContext);



  useEffect(() => {
    setLoading(true)
    axios.get(`products/alldispo?nom=${getBy}&pageNo=${pageNumber}&pageSize=${pageSize}`).then(
        res => {
          console.log("all dispo : ",res.data);
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
        axios.get(`products/allindispo?nom=${getBy}&pageNo=${pageNumber2}&pageSize=${pageSize2}`).then(
          res => {
            console.log("all indspo : ",res.data);
            setData2(res.data.content);
            setHasNext2(!res.data.last)
            setTotalPages2(res.data.totalPages)
            setTotal2(res.data.totalElements)
            setPageNumber2(res.data.pageNo)
          }, 
          error => {
            console.log(error)
            //if(error.response && error.response.status === 401)
            //logoutUser()
          }
        )  
        }) 
      .then(() => {
      setLoading(false)
      })
  }, [pageSize, pageNumber, getBy, pageSize2, pageNumber2, openInvoice, open])

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

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
    } else {
      setListSelected([])
      setProductSelected(null)
      setProdUnit(null)
      setOpen(false);
    }
  };

  const handleCloseInvoice = () => {
      setListSelected([])
      setProductSelected(null)
      setOpenInvoice(false);
      setUpdate(!updated)
  };

  const showFailedToast = () => {
    setOpenFailedToast(true);
  };

  const showSuccessToast = () => {
    setOpenSuccessToast(true);
  };

  const push = (e) =>{
    setProductSelected(null)
    setProdUnit(null)
    setLoading(true)
    axios.get(`products/all?nom=${getBy}&pageNo=${pageNumber}&pageSize=${pageSize}`).then(
      res => {
        //console.log("all products : ",res.data);
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
    setLoading(false)
    })
  }

  const editClick = () =>{
    setOpen(true)
  }

  const openModal = () =>{
    setOpen(true)
  }
  
  const commandClick = () =>{
    setOpenInvoice(true)
  }

  const remove = () =>{
      axios.delete(`products/${productSelected.id}`).then(
        res => {
            const index = data.indexOf(productSelected);
            data.splice(index, 1);
            setUpdate(!updated)
            handleCloseModalDelete()
            showSuccessToast()
            setProductSelected(null)
            setListSelected([])
        },
        error => {
          console.log(error)
          showFailedToast()
        }
      )  
  }

/*   const isSelected = (id) => {
    //console.log("idddd ", id);
    return selected !== null && selected.id === id; //selected.indexOf(id) !== -1;
  } */

  const isSelected = (id) => {
    return listSelected.map(e => e.id).indexOf(id) !== -1 //selected !== null && selected.numeroId === id; //selected.indexOf(id) !== -1;
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
  
  const handleClick = (event, row) => {
    // console.log("select => ", phone);
     if(listSelected.length == 0){
      setProductSelected(row);
      axios.get(`units/byproduct/${row.id}`).then(
        (res) => { 
          if(res.data)
          setProdUnit(res.data)
        },
        (err) => {console.log(err)},
      )
     }
     else{
      setProductSelected(null);
      setProdUnit(null)
     } 
     //let obj = {id : id, nom: nom}
     let index = listSelected.map(e => e.id).indexOf(row.id)
     if(index === -1){
       console.log("slct => ", listSelected);
       listSelected.push({...row, "quantite":1, "prixTotal": row.prixVente}) 
       setSelected(!selected)
     }else{
       listSelected.splice(index, 1); 
       setSelected(!selected)
     }
 
   }

   const handleOpenModalDelete = () =>{
    setOpenDelete(true)
  }
  const handleCloseModalDelete = () =>{
    setOpenDelete(false)
  }

   const deleteClick = () => {
    console.log("delete => ", listSelected);
    handleOpenModalDelete()
  }


  return (
    <> { openInvoice ?
    <Invoice
        products = {listSelected}
        title={"Opération de vente"}
        handleCloseInvoice={handleCloseInvoice}
        showSuccessToast={showSuccessToast}
        showFailedToast={showFailedToast}
    /> 
    :
    <BaseCard titleColor={"primary"} title={"Les produits"}>

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

            <Dialog fullWidth={true} maxWidth={'md'} open={open} onClose={handleClose}>
                <DialogContent>
                <div style={{display:"flex", justifyContent:"end"}}>
                    <IconButton onClick={handleClose}>
                    <Close fontSize='medium'/>
                    </IconButton>
                </div>
                <Product
                    product = {productSelected}
                    title={"Ajouter/Modifier un produit"}
                    push={push}
                    update={push}
                    ProdUnite={prodUnite}
                    handleClose={handleClose}
                    showSuccessToast={showSuccessToast}
                    showFailedToast={showFailedToast}
                /> 
                </DialogContent>
            </Dialog>

          <EnhancedTableToolbar
            selected={listSelected}
            onSearch = {onSearch}
            search={search}
            goSearch = {goSearch}
            deleteClick = {deleteClick}
            editClick = {editClick}
            commandClick = {commandClick}
            productSelected = {productSelected}
            //openModal = {openModal}
          />
          {(listSelected.length == 0) &&
          <Stack spacing={2} direction="row" mb={2} ml={10} justifyContent={'start'}>
            <Tooltip title="Ajouter">
              <Fab color="primary" size="medium" aria-label="Ajouter" onClick={openModal}>
                  <Add/>
              </Fab>
            </Tooltip>
          </Stack>
          }
      <Box sx={{ width: '100%', marginTop:'35px', marginLeft: '15px', whiteSpace: "nowrap", overflowX: 'auto', overflowY: 'hidden'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="tabs">
                  <Tab style={{fontWeight:'bold', fontSize:'20px', width:'50%'}} label="Produits disponibles" {...a11yProps(0)} />
                  <Tab style={{fontWeight:'bold', fontSize:'20px', width:'50%'}} label="Produits non disponibles" {...a11yProps(1)} />
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
                headCells={headCellsOpperation}
                headerBG="#15659a"
                txtColor="#DCDCDC"
            />
            <TableBody>
                {data
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                    <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        //aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        //selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          //color="secondary"
                          checked={isItemSelected}
                          inputProps={{ 
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.nom}</TableCell>
                      <TableCell align="left">{row.quantiteEnStock}</TableCell>
                      <TableCell align="left">{row.uniteEnStock}</TableCell>
                      <TableCell align="left">{pounds.format(row.prixAchat)} CFA</TableCell>
                      <TableCell align="left">{pounds.format(row.prixVente)} CFA</TableCell>
                      <TableCell align="left">{formatDate(row.dateCreation)} </TableCell>
                      <TableCell align="left">{row.description} </TableCell> 
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
                headCells={headCellsOpperation}
                headerBG="#1A7795"
                txtColor="#DCDCDC"
            />
            <TableBody>
                {data2
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                    <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        //aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        //selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.nom}</TableCell>
                      <TableCell align="left">{row.quantiteEnStock}</TableCell>
                      <TableCell align="left">{row.uniteEnStock}</TableCell>
                      <TableCell align="left">{pounds.format(row.prixAchat)} </TableCell>
                      <TableCell align="left">{pounds.format(row.prixVente)} </TableCell>
                      <TableCell align="left">{formatDate(row.dateCreation)} </TableCell>
                      <TableCell align="left">{row.description} </TableCell> 
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
    }
  </>
  );
};

export default Products;
