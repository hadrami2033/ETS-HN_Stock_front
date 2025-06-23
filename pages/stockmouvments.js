import React, { useEffect } from "react";
import { Button, Tooltip, Stack, Box, Tab ,Tabs, CircularProgress, Fab, Select, MenuItem  } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Add, Close} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import useAxios from "../src/utils/useAxios";
import { useContext } from "react";
import AuthContext from "../src/context/AuthContext";
import EnhancedTableToolbar from "../src/components/Table/TableStockMouvmentsToolbar"; 
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import fr from "date-fns/locale/fr";
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { BsCalendar4Range } from "react-icons/bs";
import Controls from "../src/components/controls/Controls";
import EnhancedTableHead from "../src/components/Table/TableHeader";
import { useRouter } from "next/router";

const headCellsOpperation = [
    {
      id: 'produit',
      numeric: false,
      disablePadding: false,
      label: 'Produit',
    },
    {
      id: 'magasin',
      numeric: false,
      disablePadding: false,
      label: "Magasin"
    },
    {
       id: 'quantity',
       numeric: false,
       disablePadding: false,
       label: "Quantité"
    },
    {
      id: 'rest',
      numeric: false,
      disablePadding: false,
      label: "Quantité aprés mvmnt"
   },
    {
      id: 'type',
      numeric: false,
      disablePadding: false,
      label: "Type"
    },

    {
      id: 'dateCreation',
      numeric: false,
      disablePadding: false,
      label: 'Date création',
    }
]

const mouvmentType = [
  {
    id: 1,
    label: 'Les gros'
  },
  {
    id: 2,
    label: "Les unités"
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




const StockMouvments = () => {
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
  const [magasins, setMagasins] = React.useState([]); 
  const [data2, setData2] = React.useState([]); 
  const [getBy, setGetBy] = React.useState("")
  const [search, setSearch] = React.useState("")
  const [magasinId, setMagasinId] = React.useState(null);
  const [magasinSelected, setMagasinSelected] = React.useState(null);
  const [valid, setValid] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false)
  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  ])
  const formatDate2 = (date) => {
    if(date){
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day ].join('-') //+ "  " + [hour, min].join(':')
      ;
    }else return null
  }
  const [interval, setInterval] = React.useState(
    {
      startDate: formatDate2(new Date()),
      endDate: formatDate2(new Date())
    }
  )
  const [mouvmentTypeSelected, setMouvmentTypeSelected] = React.useState(
    {
      id: 1,
      label: 'Les gros'
    }
  )

  const router = useRouter()
  const axios = useAxios();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { logoutUser } = useContext(AuthContext);



  useEffect(() => {
    if(magasinId){
    setLoading(true)
    axios.get(`magasinmouvments/bymagasinproductinterval?type=2&magasin=${magasinId}&product=${getBy}&startDate=${interval.startDate}&endDate=${interval.endDate}&pageNo=${pageNumber}&pageSize=${pageSize}`).then(
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
        axios.get(`magasinmouvments/bymagasinproductinterval?type=1&magasin=${magasinId}&product=${getBy}&startDate=${interval.startDate}&endDate=${interval.endDate}&pageNo=${pageNumber2}&pageSize=${pageSize2}`).then(
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
    }
  }, [pageSize, pageNumber, getBy, pageSize2, pageNumber2, interval, magasinId])

  useEffect(() => {
    axios.get(`magasins/all`).then(
        res => {
            setMagasins(res.data);
            if(res.data.length > 0){
                setMagasinId(res.data[0].id)
                setMagasinSelected(res.data[0])
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

  const addMouvement = () =>{
    router.push({
        pathname: '/new_mouvment'
    })
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

  const handleCloseDate = () => {
    setOpenDate(false)
  }
  const handleOpenDate = () => {
    setOpenDate(true)
  }

  const validSelect = () => {
    handleCloseDate()
    setInterval({
        startDate: formatDate2(date[0].startDate),
        endDate: formatDate2(date[0].endDate)
    })
    setPageNumber(0);
    setPageSize(10);
    setPageNumber2(0);
    setPageSize2(10);
    setValid(!valid);
  }

  const changeRefundRangeDate = (val) =>{
    console.log(val);
    setDate(val)
  }

  const selectMagasin = (event) => {
    setMagasinSelected(event.target.value)
    setMagasinId(event.target.value.id)
  };

  const selectMouvment = (event) => {
    setMouvmentTypeSelected(event.target.value)
    if(event.target.value && event.target.value.id === 1 && magasinId){
        setLoading(true)
        axios.get(`magasinmouvments/bymagasinproductinterval?type=2&magasin=${magasinId}&product=${getBy}&startDate=${interval.startDate}&endDate=${interval.endDate}&pageNo=${pageNumber}&pageSize=${pageSize}`).then(
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
            axios.get(`magasinmouvments/bymagasinproductinterval?type=1&magasin=${magasinId}&product=${getBy}&startDate=${interval.startDate}&endDate=${interval.endDate}&pageNo=${pageNumber2}&pageSize=${pageSize2}`).then(
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
    }else if(event.target.value && event.target.value.id === 2 && magasinId){
      setLoading(true)
      axios.get(`magasinunitsmouvments/bymagasinunitinterval?type=2&magasin=${magasinId}&unit=${getBy}&startDate=${interval.startDate}&endDate=${interval.endDate}&pageNo=${pageNumber}&pageSize=${pageSize}`).then(
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
          axios.get(`magasinunitsmouvments/bymagasinunitinterval?type=1&magasin=${magasinId}&unit=${getBy}&startDate=${interval.startDate}&endDate=${interval.endDate}&pageNo=${pageNumber2}&pageSize=${pageSize2}`).then(
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
    }
  };

  return (
    <BaseCard titleColor={"primary"} title={"Suivi mouvement de stock"}>
            <Dialog maxWidth={'md'} open={openDate} onClose={handleCloseDate}>
                        <DialogContent>
                        <div style={{display:"flex", justifyContent:"end"}}>
                            <IconButton onClick={handleCloseDate}>
                            <Close fontSize='medium'/>
                            </IconButton>
                        </div>
                        <div style={{width:'100%', display:'flex', justifyContent:'center'}} className='calendar'>
                            <DateRange 
                            locale={fr} 
                            editableDateInputs={ true } 
                            onChange={ (item) => changeRefundRangeDate([item.selection]) } 
                            moveRangeOnFirstSelection={ true } 
                            ranges={ date } 
                            className="date" 
                            calendarFocus="forwards"
                            /> 
                        </div> 
                        <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <Button
                                type="submit"
                                style={{ fontSize: "20px", borderRadius:"10px", width:'100%' }}
                                variant="contained"
                                mt={4}
                                color="success"
                                onClick={validSelect}
                            >
                            VALIDER
                            </Button>
                        </div> 
                        </DialogContent>
                    </Dialog>
            
                    <Toolbar
                        style={{display:"flex", justifyContent: "center", marginBottom:30}}
                        sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        ...({
                            bgcolor: (theme) =>
                            alpha(theme.palette.grey.A100, theme.palette.action.disabledOpacity),
                        }),
                        }}
                    >
            
                        <Stack spacing={2} direction="row" style={{ width:"50%",display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <Stack style={{display:'flex', flexDirection:'row', alignItems: 'center', justifyContent:'space-between', width:'80%'}}>
                                <Controls.Input
                                    style={{width:'50%', marginRight:'10px'}}
                                    id="object-input"
                                    name="object"
                                    label={formatDate(date[0].startDate)}
                                    size='small'
                                    disabled={true}
                                />
                                -
                                <Controls.Input
                                    style={{width:'50%', marginLeft:'10px'}}
                                    id="object-input"
                                    label={formatDate(date[0].endDate)}
                                    size='small'
                                    disabled={true}
                                />
                            </Stack>
                            <IconButton title="Selectionner un intervalle" onClick={() => handleOpenDate() }>
                                <BsCalendar4Range
                                    fontSize='30px'
                                    color="#1a7795"
                                />
                            </IconButton>
                        </Stack>
            
                  </Toolbar>

          <EnhancedTableToolbar
            magasins = {magasins}
            magasinSelected = {magasinSelected}
            selectMagasin = {selectMagasin}
            selectMouvment = {selectMouvment}
            mouvmentType = {mouvmentType}
            mouvmentTypeSelected = {mouvmentTypeSelected}
            onSearch = {onSearch}
            search={search}
            goSearch = {goSearch}
          />
          <Stack spacing={2} direction="row" mb={2} ml={10} justifyContent={'start'}>
            <Tooltip title="Ajouter">
              <Fab color="primary" size="medium" aria-label="Ajouter" onClick={addMouvement}>
                  <Add/>
              </Fab>
            </Tooltip>
          </Stack>
        <Box sx={{ width: '100%', marginTop:'35px', marginLeft: '15px', whiteSpace: "nowrap", overflowX: 'auto', overflowY: 'hidden'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="tabs">
                  <Tab style={{fontWeight:'bold', fontSize:'20px', width:'50%'}} label="Les Sorties" {...a11yProps(0)} />
                  <Tab style={{fontWeight:'bold', fontSize:'20px', width:'50%'}} label="Les entrées" {...a11yProps(1)} />
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
                        return (
                        <TableRow
                            hover
                            tabIndex={-1}
                            key={row.id}
                        >
                          <TableCell align="left"></TableCell>
                          <TableCell align="left">{row.product ? row.product.nom : row.unit && row.unit.nom }</TableCell>
                          <TableCell align="left">{row.magasin && row.magasin.label}</TableCell>
                          <TableCell align="left">{row.quantity}</TableCell>
                          <TableCell align="left">{row.rest}</TableCell>
                          <TableCell align="left">{row.type && row.type.label}</TableCell>
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
                    headCells={headCellsOpperation}
                    headerBG="#1A7795"
                    txtColor="#DCDCDC"
                />
                <TableBody>
                    {data2
                    .map((row, index) => {
                        return (
                        <TableRow
                            hover
                            //aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            //selected={isItemSelected}
                        >
                          <TableCell align="left"></TableCell>
                          <TableCell align="left">{row.product ? row.product.nom : row.unit && row.unit.nom }</TableCell>
                          <TableCell align="left">{row.magasin && row.magasin.label}</TableCell>
                          <TableCell align="left">{row.quantity}</TableCell>
                          <TableCell align="left">{row.rest}</TableCell>
                          <TableCell align="left">{row.type && row.type.label}</TableCell>
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

export default StockMouvments;
