import {
    Page,
    Text,
    View,
    Document,
    PDFViewer,
    PDFDownloadLink    
  } from "@react-pdf/renderer";
  import { styles } from "../styles/invoiceStyle.js";
  import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { Button, Stack } from "@mui/material";

  export default function Invoice2(props) {
    const { closePrint=null, tableData=[], tableData2=[], tableData3=[], paymentType, typeId, client, paidAmount, invoiceAmount, date = null } = props;

    const formatDate = (date) => {
        if(date){
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear(),
              hour = '' + d.getHours(),
              min = '' + d.getMinutes();
    
          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
              if (hour.length < 2) 
              hour = '0' + hour;
          if (min.length < 2) 
              min = '0' + min;
      
          return [day, month, year].join('-') + "  " + [hour, min].join(':')
          ;
        }else return null
      }
    let pounds = Intl.NumberFormat( {
        style: 'currency',
        maximumSignificantDigits: 3,
        minimumFractionDigits: 2
      });
    
    let now = new Date()

    const InvoicePDF = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, styles.textBold]}>FACTURE</Text>
              <Text style={styles.textBold}>ETS HN</Text>
              <Text style={{marginTop:5}}>ALIMENTATION GÉNÉRALE</Text>
              {/* <Text>MARCHANDISES & PRODUITS DE BEAUTÉ & NÉCESSITES DE CUISINE</Text> */}
              <Text style={{marginTop:5}} >Bétou le {date ? formatDate(date) : formatDate(now)}</Text>
            </View>
            <View style={styles.spaceY}>
              <Text>Bétou-Congo</Text>
              <Text>Tél : (+242) 06 503 40 50 / 05 588 19 18</Text>
              <Text>etshn@gmail.com</Text>
            </View>
          </View>
  
        {(typeId && typeId != 1) &&
          <View style={styles.spaceY}>
            <Text style={[styles.billTo, styles.textBold]}>Client:</Text>
            <Text>{client.name ? client.name : client}</Text>
          </View>
        }
        {(client && !client.name) &&
          <View style={styles.spaceY}>
            <Text style={[styles.billTo, styles.textBold]}>Client:</Text>
            <Text>{client}</Text>
          </View>
        }
          {/* Render the table */}
          <Table style={styles.table}>
            <TH style={[styles.tableHeader, styles.textBold]}>
              <TD style={styles.td}>Produit</TD>
              <TD style={styles.td}>Quantité</TD>
              <TD style={styles.td}>Prix unitaire</TD>
              <TD style={styles.td}>Total</TD>
            </TH>
            {tableData.map((item, index) => (
              <TR key={index}>
                <TD style={styles.td}>{item.nom}</TD>
                <TD style={styles.td}>{item.quantite}</TD>
                <TD style={styles.td}>{pounds.format(item.prixVente)} CFA</TD>
                <TD style={styles.td}>{pounds.format(item.prixTotal)} CFA</TD>
              </TR>
            ))}
            {tableData2.map((item, index) => (
              <TR key={index}>
                <TD style={styles.td}>{item.nom}</TD>
                <TD style={styles.td}>{item.quantityCommand}</TD>
                <TD style={styles.td}>{pounds.format(item.prixVente)} CFA</TD>
                <TD style={styles.td}>{pounds.format(item.prixTotal)} CFA</TD>
              </TR>
            ))}
            {tableData3.map((item, index) => (
              <TR key={index}>
                <TD style={styles.td}>{item.product ? item.product.nom : item.unit ? item.unit.nom : null}</TD>
                <TD style={styles.td}>{item.quantity}</TD>
                <TD style={styles.td}>{ item.product ? pounds.format(item.product.prixVente) : item.unit ? pounds.format(item.unit.prixVente) : null } CFA</TD>
                <TD style={styles.td}>{ item.product ? pounds.format(item.product.prixVente*item.quantity) : item.unit ? pounds.format(item.unit.prixVente*item.quantity) : null } CFA</TD>
              </TR>
            ))}
          </Table>
  
          <View style={styles.totals}>
            <View
              style={{
                minWidth: "256px",
              }}
            >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <Text>
                  Type de paiement
                  </Text>
                  <Text>
                    {paymentType}
                  </Text>
                </View>
                {/* {typeId != 1 &&
                 <View
                     style={{
                       flexDirection: "row",
                       justifyContent: "space-between",
                       marginBottom: "8px",
                     }}
                   >
                     <Text>
                       Client
                     </Text>
                     <Text>
                       {client.name}
                     </Text>
                 </View>
                } */}
                {(typeId === 2 || (typeId == null && paidAmount)) &&
                 <View
                     style={{
                       flexDirection: "row",
                       justifyContent: "space-between",
                       marginBottom: "8px",
                     }}
                   >
                     <Text>
                     Montant payé
                     </Text>
                     <Text>
                     {pounds.format(paidAmount)} CFA
                     </Text>
                 </View>
                }
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <Text style={styles.textBold}>
                    Montant net
                  </Text>
                  <Text style={styles.textBold}>
                   {pounds.format(invoiceAmount)} CFA
                  </Text>
                </View>

            </View>
          </View>
        </Page>
      </Document>
    );
    return (
      <div className="max-w-2xl mx-auto my-10">
        <div className="w-full h-[500px]">
          <PDFViewer width="100%" height="100%">
            <InvoicePDF />
          </PDFViewer>
        </div>
        <div className="mt-6 flex justify-center">
          <PDFDownloadLink document={<InvoicePDF />} fileName={`facture le ${date ? formatDate(date) : formatDate(now)}.pdf`}>
            {/* <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Imprimer la facture
            </button> */}
            <Button
              style={{ fontSize: "20px",  marginBottom: "15px" }}
              variant="contained"
              mt={4}
              fullWidth
            >
              Imprimer la facture
              
            </Button>
          </PDFDownloadLink>
          {closePrint &&
            <Stack style={{width:"100%", display: "flex",  justifyContent: "center", marginTop:"15px"  }}>
              <Button
                      //type="submit"
                      style={{ fontSize: "20px", width: "30%" }}
                      variant="contained"
                      mt={4}
                      //fullWidth
                      onClick={() => closePrint()}
                    >
                    Retourner
              </Button>
            </Stack>
          }
        </div>
      </div>
    );
  }