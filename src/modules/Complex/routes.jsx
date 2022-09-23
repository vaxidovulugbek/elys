import React, { lazy } from "react";
import { Route } from "react-router-dom";

const Create = lazy(() => import("./pages/Create"));
const List = lazy(() => import("./pages/List"));
const Update = lazy(() => import("./pages/Update"));

export const ComplexRoute = (
	<>
		<Route index element={<List />} />
		<Route path="/complex/create" element={<Create />} />
		<Route path="/complex/update/:complexID" element={<Update />} />
	</>
);
