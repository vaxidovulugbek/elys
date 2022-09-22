import { combineReducers } from "redux";
import { overlayReducer, authReducer, systemReducer } from "./reducers";

export const rootReducer = combineReducers({
	overlay: overlayReducer,
	auth: authReducer,
	system: systemReducer,
});
