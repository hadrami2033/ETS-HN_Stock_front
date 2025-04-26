import React, { useContext } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";
import months from "../../helper/months";
//import apiService from "../../services/apiService";

const Months = () => {
  const [currentMonth, setCurrentMonth] = React.useState(null);
  const [currentMonthAr, setCurrentMonthAr] = React.useState(null);
  const { logoutUser } = useContext(AuthContext);
  const axios = useAxios();

  React.useEffect(() => {
    const now = new Date()
    if(localStorage.getItem("currentMonth") && JSON.parse(localStorage.getItem("currentMonth")).code === (now.getMonth()+1)){
      setCurrentMonth(JSON.parse(localStorage.getItem("currentMonth")))
      const code = JSON.parse(localStorage.getItem("currentMonth")).code
      setCurrentMonthAr(months.filter(e => e.code === code)[0])
    }
    else
    axios.get(`point/months/bycode/${(now.getMonth()+1)}`).then(
      res => {
        console.log("current month : ",res.data);
        localStorage.setItem("currentMonth",  JSON.stringify((res.data)))
        setCurrentMonth(res.data);
        setCurrentMonthAr(months.filter(e => e.code === res.data.code)[0])
      },
      error => {
        console.log(error)
        if(error.response && error.response.status === 401)
        logoutUser()
      }
    )
  }, [])

  return (
    <Box display="flex" alignItems="center">
    <Box
      sx={{
        display: {
          xs: "none",
          sm: "flex",
        },
        alignItems: "center",
      }}
    >
    {currentMonth &&
      <Typography
        variant="h1"
        fontWeight="700"
        sx={{
          ml: 1,
        }}
        color={"#F6EEFA"} 
      >
        {currentMonth.month}
      </Typography>
    }
    {currentMonthAr &&
      <Typography
        variant="h1"
        fontWeight="700"
        sx={{
          ml: 1,
        }}
        color={"#F6EEFA"} 
      >
        {currentMonthAr.label}
      </Typography>
    }
    </Box>
  </Box>
  );
};

export default Months;
