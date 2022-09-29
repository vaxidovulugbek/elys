import React, { lazy } from "react";

const Translations = lazy(() => import("./pages/Translations"));

export const SettingsRoutes = [
	{
		path: "/translations",
		element: <Translations />,
	},
];
