import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Controls from "../../components/controls/Controls";
import { useRouter } from "next/router";
import useAxios from "../../utils/useAxios";
import baseURL from "../../utils/baseURL";
import AuthContext from "../../context/AuthContext";

const Buynow = () => {

  const [yearId, setYearId] = React.useState(null);
  const [years, setYears] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentYear, setCurrentYear] = React.useState(null);
  const router = useRouter()
  const axios = useAxios();
  const { logoutUser } = useContext(AuthContext);

  React.useEffect(() => {
    if(localStorage.getItem("currentYear"))
    setCurrentYear(JSON.parse(localStorage.getItem("currentYear")))
    axios.get(`point/years`).then(
      res => {
        setYears(res.data);
      }, 
      error => {
        console.log(error)
        if(error.response && error.response.status === 401)
        logoutUser()
      }
    )
  }, [])

  const handleClose = () =>{
    setOpen(false)
  }

  const handlOpen = async () => {
    setOpen(true)
  }

  const goTrash = () =>{
    router.push('/trash')
  }

  const saveYear = () =>{
    if(yearId){
      setCurrentYear(years.filter(e => e.id === yearId)[0])
      localStorage.setItem("currentYear", JSON.stringify(years.filter(e => e.id === yearId)[0]))
      router.reload()
    }
    handleClose()
  }

  const getYear = e =>{
    setYearId(e.target.value)
  }

 return( 
  <Box pb={5} mt={5}>
    <Box
      pl={3}
      pr={3}
      m={1}
      textAlign="center"
      bottom={2}
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.light,
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Box pb={3} pt={3}>

      <Dialog 
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move', display:"flex" ,justifyContent:"center", fontSize:"24px",fontWeight:"bold", paddingInline:"20px" }} id="draggable-dialog-title">
          Modifier l'année  تغيير السنة
        </DialogTitle>
        <DialogContent style={{width:500,display:"flex" ,justifyContent:"center", fontSize:'25px' }}>
          <DialogContentText style={{width:"80%"}}>
            <br></br>
            <Box  style={{width:'100%' ,display:'flex', justifyContent:'center'}}>
              <Controls.Select
                style={{width:'100%'}}
                name="yearId"
                label="année"
                value={yearId}
                onChange={getYear}
                options={years}
              />
            </Box>
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            style={{fontSize:"24px",fontWeight:"bold"}}
          >
            Annuler
          </Button>

          <Button
            disabled={yearId === null}
            onClick={saveYear}
            style={{fontSize:"24px",fontWeight:"bold"}}
          >
            Confirmer
                    </Button>
        </DialogActions>
        </Dialog>

        <Typography variant="h4" fontWeight="700" mb={2}>
          {currentYear && currentYear.year}
        </Typography>
        <Button
         onClick={handlOpen} 
          variant="contained"
          color="primary"
          fullWidth
          target="_blank"
          title="Modifier l'année  تغيير السنة"
          sx={{ 
            fontSize: "h5.fontSize",
            fontWeight: "700",
            marginBottom: "10px" 
          }}
        >
          Modifier تغيير
        </Button>

      </Box>
    </Box>
  </Box>
  ) 
}
;
export default Buynow;