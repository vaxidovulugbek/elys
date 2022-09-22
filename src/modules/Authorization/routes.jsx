import { lazy } from "react";
import { Route } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

export const AuthRoute = (
	<>
		<Route path="/login" element={<Login />} />,
		<Route path="/register" element={<Register />} />,
	</>
);
