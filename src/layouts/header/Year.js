import React, { useContext } from "react";
import {
  Box,
  Typography
} from "@mui/material";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";
//import apiService from "../../services/apiService";

const CurrentYearContainer = () => {
    const [currentYear, setCurrentYear] = React.useState(localStorage.getItem("currentYear") ? JSON.parse(localStorage.getItem("currentYear")) : null);
    const { logoutUser } = useContext(AuthContext);
    const axios = useAxios();

    React.useEffect(() => {
      const now = new Date()
      console.log("cuur year : ", now.getFullYear());
      if(!localStorage.getItem("currentYear"))
      axios.get(`point/years/byyear/${now.getFullYear()}`).then(
        res => {
          console.log("current yearr : ",res.data);
          localStorage.setItem("currentYear",  JSON.stringify((res.data)))
          setCurrentYear(res.data);
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
            {currentYear &&
            <Typography
              variant="h1"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
              color={"#F6EEFA"} 
            >
              {currentYear.year}
            </Typography>
            }
          </Box>
        </Box>
  );
};

export default CurrentYearContainer;