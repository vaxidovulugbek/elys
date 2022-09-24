import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";

import store from "store";

import "assets/styles/reset.scss";
import "assets/styles/common.css";
import "assets/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

import "services/i18n";
import { AppRoutes } from "routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});

root.render(
	<Router>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<AppRoutes />
				{process.env.NODE_ENV === "development" && (
					<ReactQueryDevtools initialIsOpen={false} />
				)}
			</QueryClientProvider>
		</Provider>
	</Router>
);
