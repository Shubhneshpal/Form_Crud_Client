import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk"
import { reducer } from "./Reduser/Reducer";

export const store = createStore(reducer,applyMiddleware(thunk));