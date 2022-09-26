import React, { lazy } from "react";

const List = lazy(() => import("./pages/List"));

export const FloorRoutes = [
	{
		path: "complex/:complexID/section/:sectionID/floor",
		element: <List />,
	},
];
