export const EnumsFactory = {
  EnumsAtLarge: {
    AuthTypes: {
      None: 0,
      Registration: 1,
      Authentication: 2,
      Unregister: 3,
    },
    TransactionTypes: {
      None: 0,
      Withdraw: 1,
      Deposit: 2,
      GetBalance: 3,
      CreditTransfer: 4,
    },
  },
};

export const transactionTypes = [
  { label: "Select transaction type...", value: "select" },
  { label: "Deposit", value: "deposit" },
  { label: "Withdraw", value: "withdraw" },
  { label: "Transfer", value: "transfer" },
  // { label: "Check Balance", value: "balance" },
];

export const transactionTypeDetails = {
  deposit: {
    URL: "transactions/deposit",
    AUTH_TYPE: EnumsFactory.EnumsAtLarge.TransactionTypes.Deposit,
  },
  withdraw: {
    URL: "transactions/withdraw",
    AUTH_TYPE: EnumsFactory.EnumsAtLarge.TransactionTypes.Withdraw,
  },
  transfer: {
    URL: "transactions/credit-transfer",
    AUTH_TYPE: EnumsFactory.EnumsAtLarge.TransactionTypes.CreditTransfer,
  },
  balance: {
    URL: "transactions/get-balance",
    AUTH_TYPE: EnumsFactory.EnumsAtLarge.TransactionTypes.GetBalance,
  },
};
