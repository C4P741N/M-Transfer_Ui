import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { transactionTypes } from "../../data/utilsAtLarge";

const Transact = () => {
  const userRef = useRef();
  const errRef = useRef();
  const DIGITS_REGEX = /^[0-9]*(\.[0-9]{0,2})?$/;

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [amount, setAmount] = useState("0.00");
  const [user, setUser] = useState("User");
  const [transferUser, setTransferUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const [balance, setBalance] = useState("0.00");

  const [userFocus, setUserFocus] = useState(false);

  const [init, setInit] = useState(false);
  const [transferSelected, setTransferSelected] = useState(false);

  const [transaction, setTransaction] = useState("select");

  const handleAmountInput = (value) => {
    if (DIGITS_REGEX.test(value)) {
      setAmount(value);
    }
    console.log(amount);
  };

  useEffect(() => {
    setTransferSelected(transaction === "transfer");
  }, [transaction]);

  useEffect(() => {
    setSuccMsg("");
    setErrMsg("");
  }, [userFocus]);

  const handleFormSubmit = async (e) => {};

  return (
    <Box m="50px" p="0 100px">
      <Header title="Transact" subtitle="Deposit, Withdraw and Transfer funds" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {() => (
          <form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/*Grid First row*/}
              <TextField
                label="Amount"
                name="amount"
                type="text"
                id="amount"
                variant="filled"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => handleAmountInput(e.target.value)} //{(e) => setAmount(e.target.value)}
                value={amount}
                required
                // placeholder="Enter amount"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                InputLabelProps={{style: {fontSize: 20}}}
                inputProps={{style: {fontSize: 40}}}
                // sx={{width: 'calc(200% - 5px)'}}
                // onChange="this.style.width = ((this.value.length + 1) * 8) + 'px';"
              />
              {transferSelected ? (
                <>
                  <TextField
                    label="Recepient"
                    name="recepient"
                    type="text"
                    id="username"
                    variant="filled"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setTransferUser(e.target.value)}
                    value={transferUser}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    inputProps={{style: {fontSize: 40}}}
                  />
                </>
              ) : (
                <></>
              )}

              {/*Grid seconf row*/}
              <Box display="flex" justifyContent="start" mt="0px"  sx={{ gridColumn: "span 4" }}>
              <Dropdown
                label="Transaction type"
                options={transactionTypes}
                value={transaction}
                onChange={(e) => setTransaction(e.target.value)}
              />
              </Box>

              {/*Grid third row*/}
              <Box display="flex" justifyContent="start" mt="0px" sx={{ gridColumn: "span 4" }}>
                <Button type="submit" color="secondary" variant="contained" sx={{ fontSize: 20 }}>
                  Process
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  amount: yup.string().required("required"),
  recepient: yup.string().required("required"),
});
const initialValues = {
  amount: "",
  recepient: "",
};

export default Transact;
