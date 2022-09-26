import { lazy } from "react";

const List = lazy(() => import("./pages/List"));
const Plan = lazy(() => import("./pages/Plan"));

export const RoomRoute = [
	{
		path: "room",
		element: <List />,
	},
	{
		path: "room/:roomID/plan",
		element: <Plan />,
	},
];
