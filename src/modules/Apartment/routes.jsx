import { lazy } from "react";

const List = lazy(() => import("./pages/List"));
const Create = lazy(() => import("./pages/Create"));
const Update = lazy(() => import("./pages/Update"));

export const ApartmentRoutes = [
	{
		path: "complex/:complexID/section/:sectionID/floor/:floorID/apartment",
		element: <List />,
	},
	{
		path: "complex/:complexID/section/:sectionID/floor/:floorID/apartment/create",
		element: <Create />,
	},
	{
		path: "complex/:complexID/section/:sectionID/floor/:floorID/apartment/:apartmentID/update",
		element: <Update />,
	},
];
