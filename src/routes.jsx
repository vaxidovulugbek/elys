import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout } from "layouts";
import { App } from "App";
import { Spinner } from "components";
import { ComplexRoute } from "modules/Complex";
import { AuthRoute } from "modules/Authorization";
import { ApartmentRoute } from "modules/Apartment";
import { FloorRoute } from "modules/Floor";
import { Overlay } from "layouts/components";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

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

					{isFetching ? (
						<Spinner />
					) : user ? (
						<Suspense fallback={<Spinner />}>
							<Routes>
								<Route path="/" element={<MainLayout />}>
									{ComplexRoute}
									{ApartmentRoute}
									{FloorRoute}
								</Route>
							</Routes>
						</Suspense>
					) : (
						<Suspense fallback={<Spinner />}>
							<Routes>{AuthRoute}</Routes>
						</Suspense>
					)}
				</>
			)}
		</App>
	);
};
