import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../components/Dropdown";
import { transactionTypeMap, transactionTypes } from "../data/utilsAtLarge";
import { axiosPrivate } from "../api/axios";
import dataParser from "../api/dataParser";
import privateDataParser from "../api/dataParser";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import TextBox from "../components/TextBox";
import useAuth from "../hooks/useAuth";

const Transact = () => {
  const userRef = useRef();
  const errRef = useRef();
  const DIGITS_REGEX = /^[0-9]*(\.[0-9]{0,2})?$/;

  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [amount, setAmount] = useState("");
  // const [user, setUser] = useState("User");
  const [transferUser, setTransferUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const { auth } = useAuth();

  const [balance, setBalance] = useState("0.00");

  const [userFocus, setUserFocus] = useState(false);
  const [invalidValues, setInvalidValues] = useState(false);

  const [errors, setErrors] = useState({});

  const [init, setInit] = useState(false);
  const [transferSelected, setTransferSelected] = useState(false);

  const [transaction, setTransaction] = useState("select");

  const handleAmountInput = (value) => {
    console.log(value);

    if (DIGITS_REGEX.test(value)) {
      setAmount(value);
    }
    console.log(amount);
  };

  useEffect(() => {
    let invalid = transaction !== "select" && Boolean(amount.trim());

    if (transferSelected) {
      invalid = Boolean(transferUser.trim());
    }

    if (transaction !== "select") {
      setSuccMsg("");
    }

    setTransferSelected(transaction === "transfer");
    setInvalidValues(invalid);
    // setSuccMsg("");
    setErrMsg("");
  }, [userFocus, transaction, amount, transferUser, transferSelected]);

  const handleFormSubmit = async () => {
    // e.preventDefault();

    console.log("In handleSubmit");

    const { URL, AUTH_TYPE } = transactionTypeMap[transaction] || {};

    if (URL && AUTH_TYPE) {
      // await dataParser(URL, AUTH_TYPE, user);

      // const response = await privateDataParser(URL, AUTH_TYPE, user, amount);

      console.log(`${URL} ${AUTH_TYPE} `);

      const user = auth?.userId;

      try {
        const response = await axiosPrivate.post(
          URL,
          JSON.stringify({
            userId: user,
            recepient: transferUser,
            amount: parseFloat(amount),
            trasactionType: AUTH_TYPE,
          }),
          {
            signal: controller.signal,
          }
        );
        setTransaction("select");
        setAmount("");
        setTransferUser("");

        //JavaScript object to map transaction types
        const successMessages = {
          transfer: `Transfer successful! Ksh${amount} has been sent to ${transferUser}.`,
          deposit: `Deposit successful! Ksh${amount} has been added to your account.`,
          withdraw: `Withdrawal successful! Ksh${amount} has been deducted from your account.`,
        };

        const successMessage = successMessages[transaction] || "";

        setSuccMsg(successMessage);

        console.log("Dashboard response is " + JSON.stringify(response.data));

        // console.log(`${response.hasError} ${response.data}`);

        // return {data: response, hasError: false};
      } catch (err) {
        console.log(
          "Dashboard error response is " + JSON.stringify(err.response.status)
        );
        // return {data: err?.data, hasError: true};
        if (err?.response?.status === 400) {
          setErrMsg("Insufficient funds");
        } else {
          setErrMsg(err?.message);
        }
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      // alignItems="center"
      // justifyContent="center"
      m="20px"
      minHeight="50vh"
      backgroundColor={colors.primary[500]}
    >
      <Header
        title="Transact"
        subtitle="Deposit, Withdraw and Transfer funds"
      />
      {errMsg && (
        <Typography
          variant="h4"
          fontWeight="bold"
          color={colors.redAccent[500]}
          mb={4}
        >
          {errMsg}
        </Typography>
      )}
      {succMsg && (
        <Typography
          variant="h4"
          fontWeight="bold"
          color={colors.greenAccent[400]}
          mb={4}
        >
          {succMsg}
        </Typography>
      )}
      <Box
        width={500}
        p={3}
        borderRadius={4}
        boxShadow={3}
        bgcolor={colors.primary[400]}
      >
        <TextBox
          label="Amount"
          value={amount}
          onChange={(value) => handleAmountInput(value)}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        {transferSelected && (
          <TextBox
            label="Recepient"
            value={transferUser}
            onChange={(value) => setTransferUser(value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            // error={errors.transferUser}
          />
        )}

        <Box
          display="flex"
          justifyContent="start"
          m="20px"
          sx={{ gridColumn: "span 4" }}
        >
          <Dropdown
            label="Transaction type"
            options={transactionTypes}
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
          />
        </Box>

        <Button
          variant="contained"
          color="secondary"
          // fullWidth
          size="large"
          onClick={handleFormSubmit}
          mt={2}
          sx={{
            fontSize: "18px",
            color: "white",
          }}
          disabled={!invalidValues}
        >
          Process
        </Button>
      </Box>
    </Box>
  );
};

export default Transact;
