import { lazy } from "react";
import { Route } from "react-router-dom";

const List = lazy(() => import("./pages/List"));
const Create = lazy(() => import("./pages/Create"));
const Update = lazy(() => import("./pages/Update"));

export const ApartmentRoute = (
	<>
		<Route
			path="complex/:complexID/section/:sectionID/floor/:floorID/apartment"
			element={<List />}
		/>
		<Route
			path="complex/:complexID/section/:sectionID/floor/:floorID/apartment/create"
			element={<Create />}
		/>
		<Route
			path="complex/:complexID/section/:sectionID/floor/:floorID/apartment/:apartmentID/update"
			element={<Update />}
		/>
	</>
);
