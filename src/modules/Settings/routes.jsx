import React, { lazy } from "react";

const Translations = lazy(() => import("./pages/Translations"));
const PlanField = lazy(() => import("./pages/PlanField"));

export const SettingsRoutes = [
	{
		path: "/translations",
		element: <Translations />,
	},
	{
		path: "/plan-field",
		element: <PlanField />,
	},
];
