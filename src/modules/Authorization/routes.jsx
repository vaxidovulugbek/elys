import React, { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const PhoneConfirm = lazy(() => import("./pages/PhoneConfirm"));
const SuccesLogin = lazy(() => import("./pages/SuccesLogin"));

export const AuthRoutes = [
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/phone-confirm",
		element: <PhoneConfirm />,
	},
];
export const SuccesLoginRoutes = [
	{
		path: "/succes-login",
		element: <SuccesLogin />,
	},
];
