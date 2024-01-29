import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts, mockUser } from "../data/mockData";
import Header from "../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const Statements = ({ dataArray }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // console.log("Statements "+JSON.stringify(dataArray))


  // dataArray = mockUser;

  console.log("dataArray "+dataArray)
  console.log("mockDataContacts "+mockDataContacts)
  console.log("mockUser "+mockUser)

  const [hasValues, setHasValues] = useState(false);

  useEffect(() => {
    setHasValues(dataArray && Object.keys(dataArray).length !== 0);
  }, [dataArray]);

  const columns = [
    { 
      field: "id", 
      headerName: "ID", 
      // flex: 0.5, 
      cellClassName: "name-column--cell", 
    },
    { 
      field: "transactionId", 
      headerName: "Transaction Id", 
      flex: 0.2, 
    },
    {
      field: "amount",
      headerName: "Amount",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell", 
    },
    {
      field: "recepient",
      headerName: "Recepient",
      flex: 0.2,
    },
    {
      field: "transactionStatusString",
      headerName: "Status",
      flex: 0.2,
    },
    {
      field: "readableTimeStamp",
      headerName: "Time Stamp",
      flex: 0.5,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Statements" subtitle="List of Transaction Statements" />
      {!hasValues ? (
        <Box m="40px 0 0 0">
          <h2>No values found. Please check your data or try again later.</h2>
        </Box>
      ) : (
        <Box
          m="40px 0 0 0"
          height="45vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              fontSize: "16px",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
              fontSize: "16px",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            // "& .MuiDataGrid-colCell": {
            //   marginRight: "1000px", 
            // },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
              fontSize: "16px",
            },
          }}
        >
          <DataGrid
            rows={dataArray}
            columns={columns}
            components={{ 
              Toolbar: GridToolbar 
              }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Statements;
