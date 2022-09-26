import { lazy } from "react";
import { Route } from "react-router-dom";

const List = lazy(() => import("./pages/List"));
const Plan = lazy(() => import("./pages/Plan"));

export const RoomRoute = (
	<>
		<Route path="room" element={<List />} />
		<Route path="room/:roomID/plan" element={<Plan />} />
	</>
);
