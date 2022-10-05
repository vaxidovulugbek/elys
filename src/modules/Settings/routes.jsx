import React, { lazy } from "react";

const Translations = lazy(() => import("./pages/Translations"));
const Document = lazy(() => import("./pages/Document"));

export const SettingsRoutes = [
	{
		path: "/translations",
		element: <Translations />,
	},
	{
		path: "/document",
		element: <Document />,
	},
];
