import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockTransactions } from "../data/mockData";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { transactionTypeMap } from "../data/utilsAtLarge";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Statements from "./statements";

const Dashboard = () => {
  const { auth } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [balance, setBalance] = useState("0.00");
  const [amountSent, setAmountSent] = useState("0.00");
  const [amountReceived, setAmountReceived] = useState("0.00");
  const [statements, setStatements] = useState({});

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth?.userId;

      const { URL, AUTH_TYPE } = transactionTypeMap["dashboard"] || {};

      if (URL && AUTH_TYPE) {
        await dataParser(URL, AUTH_TYPE, userId);
      }
    };

    fetchData();
  }, []);

  const dataParser = async (URL, AUTH_TYPE, userId) => {
    const controller = new AbortController();

    console.log(`${userId}  path is ${URL}, ${AUTH_TYPE}`);
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

      // console.log("Dashboard response is " + JSON.stringify(response.data));

      const bal = response?.data?.balance;
      const sent = response?.data?.amountSent;
      const received = response?.data?.amountReceived;
      const statmnts = response?.data?.statements;

      // console.log("Dashboard response is " + JSON.stringify(statmnts));

      console.log(`received ${received} sent ${sent}`)

      setBalance(bal);
      setAmountSent(sent);
      setAmountReceived(received);
      setStatements(statmnts);
      // setTransaction("select");
      // setAmount("");
      // setTransferUser("");
      // if(AUTH_TYPE != transactionTypeMap['balance'].AUTH_TYPE) setSuccMsg("Success");
    } catch (err) {
      console.error("Dashboard error is " + JSON.parse(err?.response));

      // setErrMsg(err?.data);

      // errRef.current.focus();
    }
  };

  return (
    <Box m="50px" p="0 100px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(6, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          mt="25px"
          p="0 40px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            mt="25px"
            color={colors.grey[100]}
          >
            Balance
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            Ksh {balance}
          </Typography>
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          mt="25px"
          p="0 40px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            mt="25px"
            color={colors.grey[100]}
          >
            Sent
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            Ksh {amountSent}
          </Typography>
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          mt="25px"
          p="0 40px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            mt="25px"
            color={colors.grey[100]}
          >
            Received
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            Ksh {amountReceived}
          </Typography>
        </Box>
      </Box>
      <Statements dataArray={statements} />
    </Box>
  );
};

export default Dashboard;
