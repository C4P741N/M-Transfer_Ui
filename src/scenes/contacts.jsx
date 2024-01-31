import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataInvoices } from "../data/mockData";
import Header from "../components/Header";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { transactionTypeMap } from "../data/utilsAtLarge";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";

const Contacts = () => {
  const { auth } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();

  const [updatedContacts, setUpdatedContacts] = useState({});
  const [hasValues, setHasValues] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth?.userId;

      const { URL, AUTH_TYPE } = transactionTypeMap["contacts"] || {};

      if (URL && AUTH_TYPE) {
        await dataParser(URL, AUTH_TYPE, userId);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setHasValues(updatedContacts && Object.keys(updatedContacts).length !== 0);
  }, [updatedContacts]);

  const dataParser = async (URL, AUTH_TYPE, userId) => {
    const controller = new AbortController();

    console.log(`Contacts ${userId}  path is ${URL}, ${AUTH_TYPE}`);
    try {
      const response = await axiosPrivate.post(
        URL,
        JSON.stringify({
          userId: userId,
          amount: 0,
          recepient: "",
          trasactionType: AUTH_TYPE,
        }),
        {
          signal: controller.signal,
        }
      );

      const contacts = response?.data?.contacts;

      console.log("Contacts response is " + JSON.stringify(contacts));

      setUpdatedContacts(contacts);
      // const bal = response?.data?.balance;
      // const sent = response?.data?.amountSent;
      // const received = response?.data?.amountReceived;
      // const statmnts = response?.data?.statements;

      // // console.log("Dashboard response is " + JSON.stringify(statmnts));

      // console.log(`received ${received} sent ${sent}`)

      // setBalance(bal);
      // setAmountSent(sent);
      // setAmountReceived(received);
      // setStatements(statmnts);
      // // setTransaction("select");
      // // setAmount("");
      // // setTransferUser("");
      // // if(AUTH_TYPE != transactionTypeMap['balance'].AUTH_TYPE) setSuccMsg("Success");
    } catch (err) {
      console.error("Contacts error is " + JSON.parse(err?.response));

      // setErrMsg(err?.data);

      // errRef.current.focus();
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "recepient",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "totalSent",
    //   headerName: "Total Sent",
    //   flex: 1,
    // },
    {
      field: "totalReceived",
      headerName: "Total Received",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]} className="custom-cell">
          Ksh {params.row.totalReceived}
        </Typography>
      ),
    },
    {
      field: "totalSent",
      headerName: "Total Sent",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.redAccent[500]} className="custom-cell">
          Ksh {params.row.totalSent}
        </Typography>
      ),
    },
    {
      field: "readableTimeStamp",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="INVOICES"
        subtitle="List of Contacts for Future Reference"
      />

      {!hasValues ? (
        <Box m="40px 0 0 0">
          <h2>
            Contacts you transact with will automatically be displayed here.
          </h2>
        </Box>
      ) : (
        <Box
          m="40px 0 0 0"
          height="75vh"
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
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
            "& .custom-cell": {
              fontSize: "16px",
            },
          }}
        >
          <DataGrid rows={updatedContacts} columns={columns} />
        </Box>
      )}
    </Box>
  );
};

export default Contacts;
