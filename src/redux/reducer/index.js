import { combineReducers } from "redux";
import userreducer from "./userreducer";
import tenantreducer from "./tenantreducer";

const reducers = combineReducers({

  userreducer,
  tenantreducer
});

export default reducers;
