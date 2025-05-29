import React from "react";
import FeatherIcon from "feather-icons-react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import PropTypes from "prop-types";
// Dropdown Component
import ProfileDD from "./ProfileDD";
import Months from "./Months";
import CurrentYearContainer from "./Year";

const Header = ({ sx, customClass, toggleMobileSidebar, position }) => {
  return (
    <AppBar sx={sx} position={position} elevation={0} 
            className={customClass} 
            style={{backgroundColor:'#15659a'}} 
    >
      <Toolbar>
        
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        {/* <SearchDD /> */}
        {/* ------------ End Menu icon ------------- */}
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "flex",
            },
          }}
        >
          <FeatherIcon color='#F6EEFA' icon="menu" width="30" height="30" />
        </IconButton>


        <Box flexGrow={1} >
           <Typography
              color={"#F6EEFA"} //2596be

              fontSize="20px" fontWeight={'600'} variant="h3"
              sx={{
                ml: 1,
              }}
              display={'flex'}
              justifyContent={'center'}
            >
              MARCHANDISES & PRODUITS DE BEAUTE & NECESSITES DE CUISINE
            </Typography>
          </Box>

        {/* <Box style={{width:'50px'}} /> */}
        {/* <Box style={{width:'100px'}} /> */}
        
        <Box flexGrow={1} />
        {/* <CurrentYearContainer /> */}
        <Box flexGrow={1} />

        {/* <Months /> */}
        {/* <Box style={{width:'100px'}} /> */}
        <Box flexGrow={1} />

        <ProfileDD />
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  position: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
