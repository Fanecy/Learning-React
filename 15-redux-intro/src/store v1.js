import { combineReducers, createStore } from "redux";

const initState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initCustomer = {
  fullName: " ",
  nationalID: " ",
  createdAt: " ",
};

function accountReducer(state = initState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

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

    default:
      return state;
  }
}

function customerReducer(state = initCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/changeName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

const reducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const redux = createStore(reducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function changeCustomerName(fullName) {
  return {
    type: "customer/changeName",
    payload: fullName,
  };
}

redux.dispatch(deposit(1000));
console.log(redux.getState());

redux.dispatch(withdraw(100));
console.log(redux.getState());

redux.dispatch(requestLoan(2000, "buy a gun"));
console.log(redux.getState());

redux.dispatch(payLoan());
console.log(redux.getState());

redux.dispatch(createCustomer("Fane", 298517));
console.log(redux.getState());

redux.dispatch(changeCustomerName("Raven and Kara"));
console.log(redux.getState());
