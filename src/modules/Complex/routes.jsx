import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Spinner } from "components";

const Create = lazy(() => import("./pages/Create"));
const List = lazy(() => import("./pages/List"));
const Update = lazy(() => import("./pages/Update"));

export const ComplexRoute = (
	<>
		<Route
			index
			element={
				<Suspense fallback={<Spinner />}>
					<List />
				</Suspense>
			}
		/>
		<Route
			path="/complex/create"
			element={
				<Suspense fallback={<Spinner />}>
					<Create />
				</Suspense>
			}
		/>
		<Route
			path="/complex/update/:complexID"
			element={
				<Suspense fallback={<Spinner />}>
					<Update />
				</Suspense>
			}
		/>
	</>
);
