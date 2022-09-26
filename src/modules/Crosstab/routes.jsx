import React, { lazy } from "react";

const Crosstab = lazy(() => import("./pages/Crosstab"));

export const CrossTabRoutes = [
	{
		path: "/crosstab/:id",
		element: <Crosstab />,
	},
];
