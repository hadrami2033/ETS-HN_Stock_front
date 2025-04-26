import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, CircularProgress, Fab, IconButton, InputBase, Paper, Stack, Tooltip, MenuItem, Select,  } from '@mui/material';
import { FileDownloadOutlined, Save, PlusOne } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { GiMoneyStack, GiWallet } from 'react-icons/gi';
//import { SheetJSFT } from '../../lib/types';

const EnhancedTableToolbar = (props) => {
    const { onSearch, search, openModal, goSearch,
      currentMonth, selectMonth, months, caisse = 0, wallet = 0 } = props;
  
    let pounds = Intl.NumberFormat({
      style: 'currency',
      maximumSignificantDigits: 3,
      minimumFractionDigits: 2
    });

    return (
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
                {openModal &&
                <Tooltip onClick={openModal} title="إضافة">
                   <Fab color="primary" aria-label="add">
                        <PlusOne/>
                    </Fab>
                </Tooltip>
                }

                {months && 
                <Stack spacing={2} direction="row">
                  <Select
                    id="page-size-select"
                    value={currentMonth}
                    onChange={selectMonth }
                    label="month"
                    style={{fontSize:"h5.fontSize", paddingInline: '10px', borderBottomWidth: 0}}
                    variant ="standard"
                  >
                      {currentMonth &&
                        <MenuItem style={{fontSize:"h5.fontSize", fontWeight:'600'}} value={currentMonth}>
                          <em>{ currentMonth.code +"  "+ currentMonth.month}</em>
                        </MenuItem>
                      }
                      {
                        months.map(
                          month => <MenuItem key={month.code} style={{fontSize:"h5.fontSize", fontWeight:'600'}} value={month}>{month.code +"  "+month.month}</MenuItem>
                        )
                      }
                  </Select>
                </Stack>
                }

                {wallet>0 &&
                  <Stack spacing={1} direction="row" style={{ marginInlineStart:'100px' }}>
                      
                  <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <GiWallet 
                    fontSize='30px'
                    color='primary'
                  />
                  
                  <Typography
                    sx={{
                      fontSize: "h5.fontSize",
                      fontWeight: "600",
                      fontStyle:'initial',
                      display:'flex', 
                      justifyContent: 'center',
                      marginInlineStart: "10px"
                    }}
                  >
                   : {pounds.format(wallet)} MRU
                  </Typography>
                </Box>
                  </Stack>
                }

                {caisse>0 &&
                  <Stack spacing={1} direction="row" style={{ marginInlineStart:'100px' }}>
                      
                  <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <GiMoneyStack 
                    fontSize='30px'
                    color='primary'
                  />
                  
                  <Typography
                    sx={{
                      fontSize: "h5.fontSize",
                      fontWeight: "600",
                      fontStyle:'initial',
                      display:'flex', 
                      justifyContent: 'center',
                      marginInlineStart: "10px"
                    }}
                  >
                   : {pounds.format(caisse)} MRU
                  </Typography>
                </Box>
                </Stack>
                }
                
            </Stack>

            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Chercher ..."
                    value={search}
                    onChange={onSearch}
                />
                <IconButton onClick={goSearch} type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
  
        
      </Toolbar>
    );
  };

  export default EnhancedTableToolbar;