import { lazy } from "react";

const List = lazy(() => import("./pages/List"));

export const RoomRoute = [
	{
		path: "room",
		element: <List />,
	},
];
