import React from "react";
import {CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import BaseCard from "../baseCard/BaseCard";
import useAxios from "../../utils/useAxios";
import BlogCard from "./BlogCard";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Solde from "./Solde";
//import Solde from "./Solde";


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
 
const Dashboard = () => {
  const [loading, setLoading] = React.useState(false);
  const [yearstatistics, setYearstatistics] = React.useState([])
  const [openVer, setOpenVer] = React.useState(false);

  const axios = useAxios();
  const { logoutUser } = useContext(AuthContext);

  const handleCloseVer = (event, reason) => {
    if (reason === "backdropClick") {
      console.log(reason);
    } else {
      setOpenVer(false);
    }
  };
/*   React.useEffect(() => {
    if(localStorage.getItem("currentYear")){
      setLoading(true)
      axios.get(`point/operations/yearstatistics?yearId=${JSON.parse(localStorage.getItem("currentYear")).id}`).then(
        res => {
          console.log("yearstatistics  : ",res.data);
          //console.log("max amount  : ",res.data[12].montantValid);
          setYearstatistics(res.data);
          //setSelected(res.data[0])
        }, 
        error => {
          console.log(error)
          //if(error.response && error.response.status === 401)
          //logoutUser()
        }
      ) 
      .then(() => {
        setLoading(false)
      })
    }
  }, []) */

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      //stackType: '100%',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      }
    },
    colors: ["#6ebb4b", "#079ff0" //, "#cc7c67", "#1a7795"
  ],
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    xaxis: {
      //type: 'datetime',
      categories: [
        "Jan يناير",
        "Fev فبراير",
        "Mar مارس",
        "Avr ابريل",
        "Mai مايو",
        "Juin يونيو",
        "Juil يوليو",
        "Aout  أغشت",
        "Sept سبتمبر",
        "Oct أكتوبر",
        "Nov  نفمبر",
        "Dec ديسمبر"
      ],
    },
    yaxis: {
      show: true,
      min: 0,
      max: yearstatistics.length > 0 ? yearstatistics[12].operationValid : 0,
      tickAmount: 3,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  }


  const seriesyearstatistics = [
    {
      name: "Retrait السحب",
      data: [
        yearstatistics.length > 0 && yearstatistics[0].operationRetrait,
        yearstatistics.length > 0 && yearstatistics[1].operationRetrait,
        yearstatistics.length > 0 && yearstatistics[2].operationRetrait,
        yearstatistics.length > 0 && yearstatistics[3].operationRetrait,
        yearstatistics.length > 0 && yearstatistics[4].operationRetrait,
        yearstatistics.length > 0 && yearstatistics[5].operationRetrait,
        yearstatistics.length > 0 && yearstatistics[6].operationRetrait,
        yearstatistics.length > 0 && yearstatistics[7].operationRetrait,
        yearstatistics.length > 0 && yearstatistics[8].operationRetrait,
        yearstatistics.length > 0 && yearstatistics[9].operationRetrait,
        yearstatistics.length > 0 && yearstatistics[10].operationRetrait,
        yearstatistics.length > 0 && yearstatistics[11].operationRetrait
      ],
    },
    {
      name: "Versement الإيداع",
      data: [
        yearstatistics.length > 0 && yearstatistics[0].operationVersement,
        yearstatistics.length > 0 && yearstatistics[1].operationVersement,
        yearstatistics.length > 0 && yearstatistics[2].operationVersement,
        yearstatistics.length > 0 && yearstatistics[3].operationVersement,
        yearstatistics.length > 0 && yearstatistics[4].operationVersement,
        yearstatistics.length > 0 && yearstatistics[5].operationVersement,
        yearstatistics.length > 0 && yearstatistics[6].operationVersement,
        yearstatistics.length > 0 && yearstatistics[7].operationVersement,
        yearstatistics.length > 0 && yearstatistics[8].operationVersement,
        yearstatistics.length > 0 && yearstatistics[9].operationVersement,
        yearstatistics.length > 0 && yearstatistics[10].operationVersement,
        yearstatistics.length > 0 && yearstatistics[11].operationVersement
      ],
    }
  ];  

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

      
        <Solde/>
    
    </BaseCard>
    </>
    )
  }
  </>
  );
};

export default Dashboard;
