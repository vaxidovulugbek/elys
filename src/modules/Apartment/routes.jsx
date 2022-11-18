import { lazy } from "react";

const List = lazy(() => import("./pages/List"));
const Create = lazy(() => import("./pages/Create"));
const Update = lazy(() => import("./pages/Update"));

const PlanCreate = lazy(() => import("./pages/PlanCreate"));
const PlanUpdate = lazy(() => import("./pages/PlanUpdate"));

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
	{
		path: "complex/:complexID/plan/:planID/update",
		element: <PlanUpdate />,
	},
	{
		path: "complex/:complexID/plan/create",
		element: <PlanCreate />,
	},
];
