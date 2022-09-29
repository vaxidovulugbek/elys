import { lazy } from "react";

const List = lazy(() => import("./pages/List"));
const Plan = lazy(() => import("./pages/Plan"));
const PlanCreate = lazy(() => import("./pages/PlanCreate"));
const PlanUpdate = lazy(() => import("./pages/PlanUpdate"));

export const RoomRoute = [
	{
		path: "room",
		element: <List />,
	},
	{
		path: "room/:roomID/plan",
		element: <Plan />,
	},
	{
		path: "room/:roomID/plan/create",
		element: <PlanCreate />,
	},
	{
		path: "room/:roomID/plan/:planID/update",
		element: <PlanUpdate />,
	},
];
