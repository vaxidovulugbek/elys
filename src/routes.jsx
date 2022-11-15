import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { ScrollTop } from "hooks";
import { App } from "App";
import { MainLayout } from "layouts";
import { Overlay } from "layouts/components";
import { Spinner } from "components";
import { ComplexRoutes } from "modules/Complex";
import { AuthRoutes } from "modules/Authorization";
import { ApartmentRoutes } from "modules/Apartment";
import { FloorRoutes } from "modules/Floor";
import { CrossTabRoutes } from "modules/Crosstab";
import { RoomRoute } from "modules/Room";
import { SettingsRoutes } from "modules/Settings";
import { SectionsRoute } from "modules/Section";
import { SuccesLoginRoutes } from "modules/Authorization/routes";

const loggedInRoutes = [
	{
		layout: <MainLayout />,
		routes: [
			...ComplexRoutes,
			...ApartmentRoutes,
			...FloorRoutes,
			...RoomRoute,
			...SettingsRoutes,
			...SectionsRoute,
		],
	},
	{
		layout: false,
		routes: [...CrossTabRoutes],
	},
];

export const AppRoutes = () => {
	const user = useSelector((state) => state.auth);
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

					{user.username && user.status === 10 && (
						<Routes>
							{loggedInRoutes.map((item, outerIndex) =>
								item.routes.map((route, innerIndex) => {
									const Page = ScrollTop(
										<Suspense fallback={<Spinner />}>{route.element}</Suspense>
									);
									return item.layout ? (
										<Route key={outerIndex} path="/" element={item.layout}>
											<Route {...route} element={<Page />} />
										</Route>
									) : (
										<React.Fragment key={outerIndex}>
											{item.routes.map((route, innerIndex) => (
												<Route
													key={innerIndex}
													index={route.index}
													path={route.path}
													element={<Page />}
												/>
											))}
										</React.Fragment>
									);
								})
							)}
						</Routes>
					)}

					{!isFetching && !user?.username && (
						<Suspense fallback={<Spinner />}>
							<Routes>
								{AuthRoutes.map((route, index) => (
									<Route key={index} {...route} />
								))}
							</Routes>
						</Suspense>
					)}
					{!isFetching && user && user.status === 9 && (
						<Suspense fallback={<Spinner />}>
							<Routes>
								{SuccesLoginRoutes.map((route, index) => (
									<Route key={index} {...route} />
								))}
							</Routes>
						</Suspense>
					)}
				</>
			)}
		</App>
	);
};
