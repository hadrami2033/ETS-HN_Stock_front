import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, CircularProgress, Fab, IconButton, InputBase, Paper, Stack, Tooltip, MenuItem, Select,  } from '@mui/material';
import { FileDownloadOutlined, Save, PlusOne, CreateOutlined } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { SheetJSFT } from '../../lib/types';

const EnhancedTableToolbar = (props) => {
    const { selected, deleteClick, editClick, commandClick, onSearch, search, goSearch, productSelected} = props;
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


        {selected.length > 0 && 
        <Stack spacing={2} direction="row">
         {selected.map((e) => {
            return(
                <Typography
                key={e.id}
                align="right"
                color="inherit"
                variant="subtitle1"
                component="div"
                fontSize={20}
                //marginRight="30px"
                >
                {e.nom}
                </Typography>
            )
        })
    
        }
          </Stack>
        }

        

        {selected.length > 0 &&
            <Stack spacing={2} direction="row">
              {deleteClick && productSelected && 
                <Tooltip onClick={deleteClick} title="Supprimer">
                    <IconButton>
                        <DeleteIcon color='danger' fontSize='large'/>
                    </IconButton>
                </Tooltip>
              }
              {editClick && productSelected && 
                <Tooltip onClick={editClick} title="Editer">
                    <IconButton>
                        <CreateOutlined fontSize='large'/>
                    </IconButton>
                </Tooltip>
              }
              {commandClick && 
                <Tooltip onClick={commandClick} title="Vendre">
                    <IconButton>
                        <AddShoppingCartIcon color='primary' fontSize='large'/>
                    </IconButton>
                </Tooltip>
              }
            </Stack>
            }

            <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', 
                alignItems: 'center', width: selected.length > 0 ? 200 : '100%' }}
            >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Recherche ...."
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