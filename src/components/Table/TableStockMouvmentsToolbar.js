import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, CircularProgress, Fab, IconButton, InputBase, Paper, Stack, Tooltip, MenuItem, Select,  } from '@mui/material';
import { FileDownloadOutlined, Save, PlusOne, CreateOutlined } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import FileUploadSharpIcon from '@mui/icons-material/FileUploadSharp';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';

const EnhancedTableToolbar = (props) => {
    const { onSearch, search, goSearch, magasins, magasinSelected, selectMagasin, importProduct, exportProduct, productSelected } = props;
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
            {magasins && 
            <Stack spacing={2} direction="row">
              <Select
                id="page-size-select"
                value={magasinSelected}
                onChange={selectMagasin}
                label="pageSize"
                style={{fontSize:'15px', paddingInline: '10px', borderBottomWidth: 0}}
                variant ="standard"
              >
                  {magasinSelected &&
                    <MenuItem style={{fontSize:'15px', fontWeight:'bold'}} value={magasinSelected}>
                      <em>{magasinSelected.label}</em>
                    </MenuItem>
                  }
                  {
                    magasins.map(
                      m => <MenuItem style={{fontSize:'15px', fontWeight:'bold'}} value={m}>{m.label}</MenuItem>
                    )
                  }
              </Select>
            </Stack>
            }

        {productSelected && 
        <Stack spacing={2} direction="row">
            <Typography
                align="right"
                color="inherit"
                variant="subtitle1"
                component="div"
                fontSize={20}
                //marginRight="30px"
                >
                {productSelected.nom}
            </Typography>
          </Stack>
        }

        

        {productSelected &&
            <Stack spacing={2} direction="row">
              {exportProduct &&  
                <Tooltip onClick={exportProduct} title="Sortie">
                    <IconButton>
                        <FileUploadSharpIcon color='danger' fontSize='large'/>
                    </IconButton>
                </Tooltip>
              }
              {importProduct && 
                <Tooltip onClick={importProduct} title="Entree">
                    <IconButton>
                        <FileDownloadSharpIcon color='primary' fontSize='large'/>
                    </IconButton>
                </Tooltip>
              }
            </Stack>
        }


            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', 
                    alignItems: 'center', width: '30%' }}
            >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Produit ..."
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