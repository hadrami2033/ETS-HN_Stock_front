import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import {  Fab, Stack, Tooltip, MenuItem, Select,  } from '@mui/material';
import { Add } from '@mui/icons-material';

const EnhancedTableToolbar = (props) => {
    const { clients, clientSelected, selectClient, openAdd } = props;
    //console.log(selected);
   
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
            {clients && 
            <Stack spacing={2} direction="row">
              <Select
                id="page-size-select"
                value={clientSelected}
                onChange={selectClient}
                label="pageSize"
                style={{fontSize:'15px', paddingInline: '10px', borderBottomWidth: 0}}
                variant ="standard"
              >
                  {clientSelected &&
                    <MenuItem style={{fontSize:'15px', fontWeight:'bold'}} value={clientSelected}>
                      <em>{clientSelected.name}</em>
                    </MenuItem>
                  }
                  {
                    clients.map(
                      m => <MenuItem style={{fontSize:'15px', fontWeight:'bold'}} value={m}>{m.name}</MenuItem>
                    )
                  }
              </Select>
            </Stack>
            }



            <Tooltip title="Ajouter">
              <Fab color="primary" size="medium" aria-label="Ajouter" onClick={openAdd}>
                  <Add/>
              </Fab>
            </Tooltip>
        
      </Toolbar>
    );
  };

  export default EnhancedTableToolbar;