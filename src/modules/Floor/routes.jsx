import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

import { Spinner } from "components";

const List = lazy(() => import("./pages/List"));

export const FloorRoute = (
	<>
		<Route
			path="complex/:complexID/section/:sectionID/floor"
			element={
				<Suspense fallback={<Spinner />}>
					<List />
				</Suspense>
			}
		/>
	</>
);
