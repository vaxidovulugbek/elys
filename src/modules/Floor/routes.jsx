import React, { lazy } from "react";

const Create = lazy(() => import("./pages/Create"));
const List = lazy(() => import("./pages/List"));
const Update = lazy(() => import("./pages/Update"));

export const FloorRoutes = [
	{
		path: "complex/:complexID/section/:sectionID/floor",
		element: <List />,
	},
	{
		path: "complex/:complexID/section/:sectionID/floor/create",
		element: <Create />,
	},
	{
		path: "complex/:complexID/section/:sectionID/floor/:floorID/update",
		element: <Update />,
	},
];
