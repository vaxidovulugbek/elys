import React, { lazy } from "react";

const Translations = lazy(() => import("./pages/Translations"));
const PlanField = lazy(() => import("./pages/PlanField"));
const Contracts = lazy(() => import("./pages/Contracts"));

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
];
