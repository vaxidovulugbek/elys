import { lazy } from "react";

const Create = lazy(() => import("./pages/Create"));
const Update = lazy(() => import("./pages/Update"));
const PriceList = lazy(() => import("./pages/PriceList"));

export const SectionsRoute = [
	{
		path: "complex/update/:complexID/section/create",
		element: <Create />,
	},
	{
		path: "complex/update/:complexID/section/:sectionID/update",
		element: <Update />,
	},
	{
		path: "price-list/section/:sectionID",
		element: <PriceList />,
	},
];
