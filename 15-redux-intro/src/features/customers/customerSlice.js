const initCustomer = {
  fullName: " ",
  nationalID: " ",
  createdAt: " ",
};

export default function customerReducer(state = initCustomer, action) {
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

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function changeCustomerName(fullName) {
  return {
    type: "customer/changeName",
    payload: fullName,
  };
}
