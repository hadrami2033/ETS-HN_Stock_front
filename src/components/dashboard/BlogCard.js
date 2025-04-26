import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { CiCalendar } from "react-icons/ci";


const BlogCard = (props) => {
  const {statics} = props;
  //colors: ['#6ebb4b', '#1a7795',  '#a52e36' , '#079ff0', '#cc7c67' , '#c8d789']


  let pounds = Intl.NumberFormat( {
    style: 'currency',
    maximumSignificantDigits: 3,
    minimumFractionDigits: 2
  });

  return (
    <Grid container>
    
        <Grid
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch"
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              bgcolor:'#6ebb4b',
              boxShadow:3
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <CiCalendar color="white" fontSize='30px' />
              <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
              >
                Janvier  يناير
              </Typography>
              </Box>
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[0].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[0].montantRetrait < 0 ? -1*statics[0].montantRetrait : statics[0].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[0].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              boxShadow:3,
              bgcolor:'#1a7795',
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >

              <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <CiCalendar 
                  color="white"                     
                  fontSize='30px'
                />
               <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
                >
                Février 	فبراير
                </Typography>
              </Box>
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[1].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[1].montantRetrait < 0 ? -1*statics[1].montantRetrait : statics[1].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[1].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              boxShadow:3,
              bgcolor:'#079ff0'
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >  

            <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <CiCalendar
                    fontSize='30px'
                    style={{
                      color: "white",
                    }}                      
              />
              <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
              >
                Mars  مارس
              </Typography>
              </Box>
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[2].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[2].montantRetrait < 0 ? -1*statics[2].montantRetrait : statics[2].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[2].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>


        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              boxShadow:3,
              bgcolor:'#839192'
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >  

            <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <CiCalendar 
                fontSize='30px'
                color='white'
              />
              
              <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
              >
                Avrile ابريل
              </Typography>
              </Box>
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[3].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[3].montantRetrait < 0 ? -1*statics[3].montantRetrait : statics[3].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[3].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              boxShadow:3,
              bgcolor:'#cc7c67',
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >

            <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <CiCalendar  
                        color="white"                     
                        fontSize='30px'
                      />
              <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
              >
                Mais مايو
              </Typography>
            </Box>
            <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[4].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[4].montantRetrait < 0 ? -1*statics[4].montantRetrait : statics[4].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[4].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              boxShadow:3,
              bgcolor:'#ecac64'
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >  
            <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <CiCalendar 
                    fontSize='30px'
                    style={{
                      color: "white",
                    }}                      
              />
              <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
              >
                Juin يونيو
              </Typography>
            </Box>
            <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[5].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[5].montantRetrait < 0 ? -1*statics[5].montantRetrait : statics[5].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[5].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>

        <Grid
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch"
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              bgcolor:'#6ebb4b',
              boxShadow:3
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
            <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <CiCalendar color="white" fontSize='30px' />
              <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
              >
                Juillet  يوليو
              </Typography>
              </Box>
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[6].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[6].montantRetrait < 0 ? -1*statics[6].montantRetrait : statics[6].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[6].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              boxShadow:3,
              bgcolor:'#1a7795',
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >

              <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <CiCalendar 
                  color="white"                     
                  fontSize='30px'
                />
               <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
                >
                Août أغشت
                </Typography>
              </Box>
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[7].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[7].montantRetrait < 0 ? -1*statics[7].montantRetrait : statics[7].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[7].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              boxShadow:3,
              bgcolor:'#079ff0'
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >  

            <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <CiCalendar
                    fontSize='30px'
                    style={{
                      color: "white",
                    }}                      
              />
              <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
              >
                Septembre  سبتمبر
              </Typography>
              </Box>
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[8].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[8].montantRetrait < 0 ? -1*statics[8].montantRetrait : statics[8].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[8].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>


        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              boxShadow:3,
              bgcolor:'#839192'
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >  

            <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <CiCalendar 
                fontSize='30px'
                color='white'
              />
              
              <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
              >
                Octobre  أكتوبر
              </Typography>
              </Box>
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[9].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[9].montantRetrait < 0 ? -1*statics[9].montantRetrait : statics[9].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[9].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              boxShadow:3,
              bgcolor:'#cc7c67',
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >

            <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <CiCalendar  
                        color="white"                     
                        fontSize='30px'
                      />
              <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
              >
                Novembre  نفمبر
              </Typography>
            </Box>
            <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[10].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[10].montantRetrait < 0 ? -1*statics[10].montantRetrait : statics[10].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[10].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              p: 0,
              width: "100%",
              boxShadow:3,
              bgcolor:'#ecac64'
            }}
          >
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >  
            <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <CiCalendar 
                    fontSize='30px'
                    style={{
                      color: "white",
                    }}                      
              />
              <Typography
                color={"#F6EEFA"}
                sx={{
                  fontSize: "h5.fontSize",
                  fontWeight: "600",
                  fontStyle:'initial',
                  display:'flex', 
                  justifyContent: 'center',
                  marginInlineStart: "10px"
                }}
              >
                Decembre ديسمبر
              </Typography>
            </Box>
            <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Versements :
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[11].montantVersement)} 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex',
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box>              
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Retraits : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                  {pounds.format(statics[11].montantRetrait < 0 ? -1*statics[11].montantRetrait : statics[11].montantRetrait)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
              <Box style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    display:'flex', 
                    marginInlineEnd:'5px',
                    justifyContent: 'center',
                  }}
                >
                  Commissions : 
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h4.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    justifyContent: 'center',
                  }}
                >
                 {pounds.format(statics[11].commissions)}
                </Typography>
                <Typography
                  //color="primary"
                  color={"#F6EEFA"}
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "1000",
                    display:'flex', 
                    marginInlineStart:'5px',
                    justifyContent: 'center',
                  }}
                >
                  MRU
                </Typography>
              </Box> 
            </CardContent>
          </Card>

        </Grid>
    </Grid>
  );
};

export default BlogCard;
