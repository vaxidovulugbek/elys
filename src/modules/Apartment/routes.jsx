import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Spinner } from "components";

const List = lazy(() => import("./pages/List"));
const Create = lazy(() => import("./pages/Create"));
const Update = lazy(() => import("./pages/Update"));

export const ApartmentRoute = (
	<>
		<Route
			path="complex/:complexID/section/:sectionID/floor/:floorID/apartment"
			element={
				<Suspense fallback={<Spinner />}>
					<List />
				</Suspense>
			}
		/>
		<Route
			path="complex/:complexID/section/:sectionID/floor/:floorID/apartment/create"
			element={
				<Suspense fallback={<Spinner />}>
					<Create />
				</Suspense>
			}
		/>
		<Route
			path="complex/:complexID/section/:sectionID/floor/:floorID/apartment/:apartmentID/update"
			element={
				<Suspense fallback={<Spinner />}>
					<Update />
				</Suspense>
			}
		/>
	</>
);
