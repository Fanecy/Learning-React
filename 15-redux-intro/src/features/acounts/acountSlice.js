import { createSlice } from "@reduxjs/toolkit";

const initAcount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initAcount,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan(state, action) {
      if (state.loan > 0) return;
      state.loanPurpose = action.payload.purpose;
      state.loan = action.payload.loan;
      state.balance += action.payload.loan;
    },

    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
    },

    loading(state) {
      state.isLoading = true;
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan, loading } =
  accountSlice.actions;

export default accountSlice.reducer;

/* export default function accountReducer(state = initAcount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: " ",
        balance: state.balance - state.loan,
      };

    case "loading":
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "loading" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    dispatch({ type: "account/deposit", payload: data.rates.USD });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
 */
