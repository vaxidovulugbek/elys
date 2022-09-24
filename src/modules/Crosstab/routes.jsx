import React, { lazy } from "react";
import { Route } from "react-router-dom";

const Crosstab = lazy(() => import("./pages/Crosstab"));

export const CrossTabRoute = () => {
	return (
		<>
			<Route path="/crosstab/:id" element={<Crosstab />} />
		</>
	);
};
