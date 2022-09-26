import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Spinner } from "components";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

export const AuthRoute = (
	<>
		<Route
			path="/login"
			element={
				<Suspense fallback={<Spinner />}>
					<Login />
				</Suspense>
			}
		/>
		,
		<Route
			path="/register"
			element={
				<Suspense fallback={<Spinner />}>
					<Login />
				</Suspense>
			}
		/>
		,
	</>
);
