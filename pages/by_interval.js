import React, { useEffect } from "react";
import { Typography, Button, Grid, Tooltip, Stack,Snackbar, Box, Tab ,Tabs, CircularProgress, Fab, Paper, Select, MenuItem  } from "@mui/material";
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
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import fr from "date-fns/locale/fr";
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { BsCalendar4Range } from "react-icons/bs";
import Controls from "../src/components/controls/Controls";


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
      id: 'type',
      numeric: false,
      disablePadding: true,
      label: 'Type نوع العملية',
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

const Byinterval = () => {
  const [loading, setLoading] = React.useState(false);
  const [hasNextVer, setHasNextVer] = React.useState(false);
  const [pageNumberVer, setPageNumberVer] = React.useState(0);
  const [pageSizeVer, setPageSizeVer] = React.useState(10);
  const [totalPagesVer, setTotalPagesVer] = React.useState(0);
  const [totalVers, setTotalVers] = React.useState(0);
  const [entrees, setEntrees] = React.useState([]); 
  const [valid, setValid] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false)
  const [commissions, setCommissions] = React.useState(0)
  const [rets, setRets] = React.useState(0)
  const [vers, setVers] = React.useState(0)
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
  const [selected, setSelected] = React.useState(false);

  const axios = useAxios();
  const { logoutUser } = useContext(AuthContext);


  const getCommissions = (data) => {
    var sum = data ? data.reduce((accumulator, e) => {
        return accumulator+e.commission;
    },0) : 0;
    setCommissions(sum);
  }

  const getRets = (data) => {
    setRets(data.filter(e => e.type.label === "withdrawal" || e.type.label === "withdrawal2").length);
  }

  const getVers = (data) => {
    setVers(data.filter(e => e.type.label === "versement").length);
  }

  useEffect(() => {
    setLoading(true)
    axios.get(`point/operations/byinterval?startDate=${interval.startDate}&endDate=${interval.endDate}&pageNo=${pageNumberVer}&pageSize=${pageSizeVer}`).then(
        res => {
        console.log("versments data : ",res.data);
        setEntrees(res.data.content);
        setHasNextVer(!res.data.last)
        setTotalPagesVer(res.data.totalPages)
        setTotalVers(res.data.totalElements)
        getVers(res.data.content)
        getRets(res.data.content)
        getCommissions(res.data.content)
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
  }, [pageSizeVer, pageNumberVer, interval])


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

  const handleSelectSizeChangeVer = (event) => {
    return setPageSizeVer(event.target.value);
  };


  const nextVer = () => {
    setPageNumberVer(pageNumberVer+1)
  }
  const previousVer = () => {
    setPageNumberVer(pageNumberVer-1)
  }

  const handleCloseDate = () => {
    setOpenDate(false)
  }

  const handleOpenDate = () => {
    setOpenDate(true)
    setSelected(true)
  }

  const validSelect = () => {
    handleCloseDate()
    setInterval({
        startDate: formatDate2(date[0].startDate),
        endDate: formatDate2(date[0].endDate)
    })
    setPageNumberVer(0);
    setPageSizeVer(10);
    setValid(!valid);
  }

  const getType = (opp) =>{
    if(opp.type.label === "entree") return "Alimentation de caisse دخل نقدي"
    if(opp.type.label === "versement") return "Versement إيداع"
    if(opp.type.label === "withdrawal") return "Retrait client سحب زبون"
    if(opp.type.label === "withdrawal2") return "Retrait benéficiaire سحب مستفيد"
    if(opp.type.label === "wallets") return "Versement dans wallet  إيداع في المحفظة"
    return '';
  }

  
  const changeRefundRangeDate = (val) =>{
    console.log(val);
    setDate(val)
  }


  
  return (
    <BaseCard titleColor={"secondary"} title={"Relève du point   العمليات حسب التاريخ"}>
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
                VALIDER تم
                </Button>
            </div> 
            </DialogContent>
        </Dialog>

        <Toolbar
            style={{display:"flex", justifyContent: "space-between", marginBottom:30}}
            sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...({
                bgcolor: (theme) =>
                alpha(theme.palette.grey.A100, theme.palette.action.disabledOpacity),
            }),
            }}
        >
            <Stack spacing={2} direction="row">
              <Box style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                    align="right"
                    color="primary"
                    variant="subtitle1"
                    component="div"
                    fontSize={14}
                    fontWeight={'bold'}
                    marginRight="10px"
                    >
                    Versements : {totalVers} : العمليات
                </Typography>
              </Box>
              {/* <Box style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                    align="right"
                    color="primary"
                    variant="subtitle1"
                    component="div"
                    fontSize={14}
                    fontWeight={'bold'}
                    marginRight="10px"
                    >
                    Retraits  : {rets} : سحب
                </Typography>
              </Box> */}
              <Box style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                    align="right"
                    color="primary"
                    variant="subtitle1"
                    component="div"
                    fontSize={14}
                    fontWeight={'bold'}
                    marginRight="10px"
                    >
                    Commissions  : {pounds.format(commissions)} MRU
                </Typography>
              </Box>
            </Stack>

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
                <IconButton title="Selectionner un intervalle اختر التاريخ" onClick={() => handleOpenDate() }>
                    <BsCalendar4Range
                        fontSize='30px'
                        color="#1a7795"
                    />
                </IconButton>
            </Stack>

      </Toolbar>


            <Box sx={{ width: '100%', marginTop:'35px', marginLeft: '15px', whiteSpace: "nowrap", overflowX: 'auto', overflowY: 'hidden'}}>


                    <Stack spacing={2} direction="row" mb={2} >
                      
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
                                    
                                        <TableCell align="left">{row.phone}</TableCell>
                                        <TableCell align="left">{pounds.format(row.amount)} MRU</TableCell>
                                        <TableCell align="left">{row.trsId}</TableCell>
                                        <TableCell align="left">{formatDate(row.dateCreation)} </TableCell>
                                        <TableCell align="left">{formatDate(row.updatedAt)} </TableCell>
                                        <TableCell align="left">{pounds.format(row.commission)} MRU</TableCell> 
                                        <TableCell align="left">{row.description} </TableCell> 
                                        <TableCell align="left">{getType(row)} </TableCell> 

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
            </Box>

          
    </BaseCard>

  );
};

export default Byinterval;
