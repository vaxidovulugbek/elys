import { lazy } from "react";

const List = lazy(() => import("./pages/List"));

export const UserRoute = [
	{
		path: "user",
		element: <List />,
	},
];
