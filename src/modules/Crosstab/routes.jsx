import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

import { Spinner } from "components";

const Crosstab = lazy(() => import("./pages/Crosstab"));

export const CrossTabRoute = (
	<>
		<Route
			path="/crosstab/:id"
			element={
				<Suspense fallback={<Spinner />}>
					<Crosstab />
				</Suspense>
			}
		/>
	</>
);
