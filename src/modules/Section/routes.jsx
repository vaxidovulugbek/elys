import { lazy } from "react";

const Create = lazy(() => import("./pages/Create"));
const Update = lazy(() => import("./pages/Update"));

export const SectionsRoute = [
	{
		path: "complex/update/:complexID/section/create",
		element: <Create />,
	},
	{
		path: "complex/update/:complexID/section/:sectionID/update",
		element: <Update />,
	},
];
