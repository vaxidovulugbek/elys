import React, { lazy } from "react";

const Category = lazy(() => import("./pages/Category"));

export const CategoryRoute = [
	{
		path: "category",
		element: <Category />,
	},
];
