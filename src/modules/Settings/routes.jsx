import React, { lazy } from "react";

const Translations = lazy(() => import("./pages/Translations"));
const PlanField = lazy(() => import("./pages/PlanField"));
const Contracts = lazy(() => import("./pages/Contracts"));
const Clients = lazy(() => import("./pages/Clients"));
const ClientView = lazy(() => import("./pages/ClientView"));

export const SettingsRoutes = [
	{
		path: "/translations",
		element: <Translations />,
	},
	{
		path: "/plan-field",
		element: <PlanField />,
	},
	{
		path: "/contract",
		element: <Contracts />,
	},
	{
		path: "/client",
		element: <Clients />,
	},
	{
		path: "/client/:clientID",
		element: <ClientView />,
	},
];
