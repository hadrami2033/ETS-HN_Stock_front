import React, { useEffect } from "react";
import { Alert, Tooltip, Snackbar, Box, CircularProgress, Select, MenuItem, Checkbox, Tabs, Tab  } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EnhancedTableHead from "../src/components/Table/TableHeader";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import useAxios from "../src/utils/useAxios";
import { useContext } from "react";
import AuthContext from "../src/context/AuthContext";
import EnhancedTableToolbar from "../src/components/Table/TableStockMouvmentsToolbar"; 
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import Infos from "./mouvment_info";

const headCellsOpperation = [
    {
      id: 'nom',
      numeric: false,
      disablePadding: false,
      label: 'Libelé',
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
    }
]

const headCellsOpperation2 = [
  {
    id: 'nom',
    numeric: false,
    disablePadding: false,
    label: 'Libelé',
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
  const [openFailedToast, setOpenFailedToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [hasNext, setHasNext] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [data, setData] = React.useState([]); 
  const [hasNext2, setHasNext2] = React.useState(false);
  const [pageSize2, setPageSize2] = React.useState(10);
  const [totalPages2, setTotalPages2] = React.useState(0);
  const [total2, setTotal2] = React.useState(0);
  const [pageNumber2, setPageNumber2] = React.useState(0);
  const [data2, setData2] = React.useState([]); 
  const [getBy, setGetBy] = React.useState("")
  const [type, setType] = React.useState("product")
  const [search, setSearch] = React.useState("")
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [magasinSelected, setMagasinSelected] = React.useState(null);
  const [magasins, setMagasins] = React.useState([]); 
  const [typeId, setTypeId] = React.useState(1); 
  const [quantityEnStock, setQuantityEnStock] = React.useState(0); 
   const [value, setValue] = React.useState(0);
 
  const axios = useAxios();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true)
    axios.get(`products/all?nom=${getBy}&pageNo=${pageNumber}&pageSize=${pageSize}`).then(
        res => {
          setData(res.data.content);
          setHasNext(!res.data.last)
          setTotalPages(res.data.totalPages)
          setTotal(res.data.totalElements)
          setPageNumber(res.data.pageNo)
        }, 
        error => {
          console.log(error)
          if(error.response && error.response.status === 401)
          logoutUser()
        }
      )
      .then(() => {
        axios.get(`units/all?nom=${getBy}&pageNo=${pageNumber2}&pageSize=${pageSize2}`).then(
          res => {
            setData2(res.data.content);
            setHasNext2(!res.data.last)
            setTotalPages2(res.data.totalPages)
            setTotal2(res.data.totalElements)
            setPageNumber2(res.data.pageNo)
          }, 
          error => {
            console.log(error)
            if(error.response && error.response.status === 401)
            logoutUser()
          }
        )
      })
      .then(() => {
      setLoading(false)
      })
  }, [pageSize, pageNumber, pageSize2, pageNumber2, getBy])

    useEffect(() => {
      axios.get(`magasins/all`).then(
          res => {
              setMagasins(res.data);
              if(res.data.length > 0)
                setMagasinSelected(res.data[0])
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
      setOpen(false);
    }
  };

  const showFailedToast = () => {
    setOpenFailedToast(true);
  };

  const showSuccessToast = () => {
    setOpenSuccessToast(true);
  };

  const openModal = () =>{
    setOpen(true)
  }

  const isSelected = (id) => {
    return selected !== null && selected.id === id;
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
    setPageNumber2(pageNumber+1)
  }
  const previous2 = () => {
    setPageNumber2(pageNumber-1)
  }
  
  const handleClick = (event, row) => {
    if(!isSelected(row.id)){
        setSelected(row);
        setType("product")
      }else{
        setSelected(null);
    }
   }

   const handleClick2 = (event, row) => {
    if(!isSelected(row.id)){
        setSelected(row);
        setType("unit")
      }else{
        setSelected(null);
    }
   }

  const importProduct = () => {
    setTypeId(1)
    openModal();
  }

  const exportProduct = () => {
    setTypeId(2)
    if(type=="product")
    axios.get(`magasinmouvments/stockproduct?magasin=${magasinSelected.id}&product=${selected.id}`).then(
        res => {
            console.log(res.data);
            setQuantityEnStock(res.data.quantity)
        }, 
        error => {
          console.log(error)
          //if(error.response && error.response.status === 401)
          //logoutUser()
        }
      )
      .then(() => {
        openModal();
    })
    else
    axios.get(`magasinunitsmouvments/stockunit?magasin=${magasinSelected.id}&unit=${selected.id}`).then(
      res => {
          console.log(res.data);
          setQuantityEnStock(res.data.quantity)
      }, 
      error => {
        console.log(error)
        //if(error.response && error.response.status === 401)
        //logoutUser()
      }
    )
    .then(() => {
      openModal();
    })
  }

  const selectMagasin = (event) => {
    setMagasinSelected(event.target.value)
  };

  return (
    <BaseCard title={"Nouveau mouvement de stock"}>

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

      <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={handleClose}>
          <DialogContent>
          <div style={{display:"flex", justifyContent:"end"}}>
            <IconButton onClick={handleClose}>
              <Close fontSize='medium'/>
            </IconButton>
          </div>
          <Infos
              productId = {selected && selected.id}
              magasinId = {magasinSelected && magasinSelected.id}
              type = {type}
              typeId = {typeId}
              quantityEnStock = {quantityEnStock}
              title= {(typeId == 1 && selected) ? "Importer " + selected.nom + " dans " + magasinSelected.label : selected && "Exporter " + selected.nom + " de " + magasinSelected.label  }
              showSuccessToast={showSuccessToast}
              showFailedToast={showFailedToast}
              handleClose={handleClose}
          /> 
          </DialogContent>
      </Dialog>

      <EnhancedTableToolbar
        magasins = {magasins}
        magasinSelected = {magasinSelected}
        selectMagasin = {selectMagasin}
        importProduct = {importProduct}
        exportProduct = {exportProduct}
        productSelected = {selected}
        onSearch = {onSearch}
        search={search}
        goSearch = {goSearch}
      />

    <Box sx={{ width: '100%', marginTop:'35px', marginLeft: '15px', whiteSpace: "nowrap", overflowX: 'auto', overflowY: 'hidden'}}>
 
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="tabs">
              <Tab style={{fontWeight:'bold', fontSize:'20px', width:'50%'}} label="Les produits" {...a11yProps(0)} />
              <Tab style={{fontWeight:'bold', fontSize:'20px', width:'50%'}} label="Les unités des produits" {...a11yProps(1)} />
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
                      <TableCell align="left">{pounds.format(row.prixAchat)} CFA</TableCell>
                      <TableCell align="left">{pounds.format(row.prixVente)} CFA</TableCell>
                      <TableCell align="left">{formatDate(row.dateCreation)} </TableCell>
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
                  headCells={headCellsOpperation2}
                  headerBG="#15659a"
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
                          onClick={(event) => handleClick2(event, row)}
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
                        <TableCell align="left">{pounds.format(row.prixVente)} CFA</TableCell>
                        <TableCell align="left">{row.product && formatDate(row.product.dateCreation)} </TableCell>
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
                  value={pageSize2}
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

export default Products;
