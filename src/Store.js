import {combineReducers, createStore} from 'redux'
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";

const rootReducer = combineReducers({
  userReducer,
  notificationReducer,
});

const store = createStore(rootReducer);

export default store;
