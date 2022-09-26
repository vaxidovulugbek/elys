import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { App } from "App";
import { MainLayout } from "layouts";
import { Overlay } from "layouts/components";
import { Spinner } from "components";
import { ComplexRoutes } from "modules/Complex";
import { AuthRoutes } from "modules/Authorization";
import { ApartmentRoutes } from "modules/Apartment";
import { FloorRoutes } from "modules/Floor";
import { CrossTabRoutes } from "modules/Crosstab";

const loggedInRoutes = [
	{
		layout: <MainLayout />,
		routes: [...ComplexRoutes, ...ApartmentRoutes, ...FloorRoutes],
	},
	{
		layout: false,
		routes: [...CrossTabRoutes],
	},
];

export const AppRoutes = () => {
	const user = useSelector((state) => state.auth.username);
	return (
		<App>
			{({ isFetching, error }) => (
				<>
					<Overlay />
					<ToastContainer
						position="top-right"
						autoClose={3000}
						newestOnTop
						closeOnClick
						draggable
						pauseOnHover
					/>
					<div id="modal-root"></div>

					{isFetching && <Spinner />}

					{user && (
						<Routes>
							{loggedInRoutes.map((item, outerIndex) =>
								item.routes.map((route, innerIndex) =>
									item.layout ? (
										<Route key={outerIndex} path="/" element={item.layout}>
											<Route
												key={innerIndex}
												{...route}
												element={
													<Suspense fallback={<Spinner />}>
														{route.element}
													</Suspense>
												}
											/>
										</Route>
									) : (
										<React.Fragment key={outerIndex}>
											{item.routes.map((route, innerIndex) => (
												<Route
													key={innerIndex}
													index={route.index}
													path={route.path}
													element={
														<Suspense fallback={<Spinner />}>
															{route.element}
														</Suspense>
													}
												/>
											))}
										</React.Fragment>
									)
								)
							)}
						</Routes>
					)}

					{!isFetching && !user && (
						<Suspense fallback={<Spinner />}>
							<Routes>
								{AuthRoutes.map((route, index) => (
									<Route ket={index} {...route} />
								))}
							</Routes>
						</Suspense>
					)}
				</>
			)}
		</App>
	);
};
