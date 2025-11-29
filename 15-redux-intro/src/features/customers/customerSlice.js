import { createSlice } from "@reduxjs/toolkit";

const initCustomer = {
  fullName: " ",
  nationalID: " ",
  createdAt: " ",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initCustomer,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID, createdAt) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    changeName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, changeName } = customerSlice.actions;
export default customerSlice.reducer;

/* export default function customerReducer(state = initCustomer, action) {
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
 */
