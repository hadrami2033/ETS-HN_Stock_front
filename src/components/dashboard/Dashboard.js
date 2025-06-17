import React, { useEffect } from "react";
import { Button, Tooltip, Stack, Box, CircularProgress, Select, MenuItem  } from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import useAxios from "../../utils/useAxios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Solde from "./Solde";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import fr from "date-fns/locale/fr";
import { alpha } from '@mui/material/styles';
import { BsCalendar4Range } from "react-icons/bs";
import Controls from "../../../src/components/controls/Controls";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { DateRange } from 'react-date-range'
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EnhancedTableHead from "../../../src/components/Table/TableHeader";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


const headCellsOpperation = [
    {
      id: 'amount',
      numeric: false,
      disablePadding: true,
      label: 'Montant',
    },  
    {
      id: 'dateCreation',
      numeric: false,
      disablePadding: false,
      label: 'Date de création',
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'Description',
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

const Dashboard = () => {
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [hasNext, setHasNext] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [data, setData] = React.useState([]); 
  const [valid, setValid] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false)
  const [updated, setUpdated] = React.useState(false)
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

  const axios = useAxios();
  const { logoutUser } = useContext(AuthContext);



  
    useEffect(() => {
      setLoading2(true)
      axios.get(`cachiermouvments/byinterval?startDate=${interval.startDate}&endDate=${interval.endDate}&pageNo=${pageNumber}&pageSize=${pageSize}`).then(
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
            console.log(error);
            
          //logoutUser()
        }
      ) 
      .then(() => {
        setLoading2(false)
      })
    }, [pageSize, pageNumber, interval, updated])


    
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

  const handleSelectSize = (event) => {
    return setPageSize(event.target.value);
  };


  const next = () => {
    setPageNumber(pageNumber+1)
  }
  const previous = () => {
    setPageNumber(pageNumber-1)
  }
  const getLoading2 = () => {
    setUpdated(!updated)
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
    setValid(!valid);
  }

  
  const changeRefundRangeDate = (val) =>{
    console.log(val);
    setDate(val)
  }

  return (
    <>
    {loading ? (
      <div 
          style={{
            width:'100%', 
            marginTop:'25%',
            display:'flex',
            justifyContent:'center'
          }} 
        >
      <CircularProgress
          size={60}
          sx={{
            color: 'primary',
          }}
      />  
    </div>

      ) : (<>
    <BaseCard titleColor={"primary"} title={`SOLDE DE LA CAISSE`}>

      
        <Solde loading = {getLoading2} />

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
                    style={{display:"flex", justifyContent: "center", marginTop:'30px'}}
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
                    <Box sx={{ width: '100%', marginTop:'10px', marginLeft: '15px', whiteSpace: "nowrap", overflowX: 'auto', overflowY: 'hidden'}}>
                          <Stack spacing={2} direction="row" mb={2} >
                            </Stack>
                            {loading2 ?
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
                                        headCells={headCellsOpperation}
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
                                            
                                                <TableCell align="left">{pounds.format(row.amount)} CFA</TableCell>
                                                <TableCell align="left">{formatDate(row.dateCreation)} </TableCell>
                                                <TableCell align="left">{row.description}</TableCell>

        
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
                        <IconButton disabled={(pageNumber === 0)} onClick={previous}>
                          <ArrowBack/>
                        </IconButton>
                        </span>
                      </Tooltip>
        
                      <Select
                        id="page-size-select"
                        value={pageSize}
                        onChange={handleSelectSize }
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
                            </Box>
                          }
                    </Box>
        
                  
    
    </BaseCard>
    </>
    )
  }
  </>
  );
};

export default Dashboard;
