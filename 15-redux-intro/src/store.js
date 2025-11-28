/* import { applyMiddleware, combineReducers, createStore } from "redux"; */
import accountReducer from "./features/acounts/acountSlice";
import customerReduce from "./features/customers/customerSlice";
/* import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk"; */
import { configureStore } from "@reduxjs/toolkit";

/* const reducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
 */

const store = configureStore({
  reducer: { account: accountReducer, customer: customerReduce },
});
export default store;
