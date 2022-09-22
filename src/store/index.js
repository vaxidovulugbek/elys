import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./rootReducer";
import { middlewares } from "./middlewares";

let store = null;
if (process.env.NODE_ENV === "development")
	store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
else store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
