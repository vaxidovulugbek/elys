import React, { lazy } from "react";
import { Route } from "react-router-dom";

const List = lazy(() => import("./pages/List"));

export const FloorRoute = (
	<>
		<Route path="complex/:complexID/section/:sectionID/floor" element={<List />} />
	</>
);
