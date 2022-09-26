import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { App } from "App";
import { MainLayout } from "layouts";
import { Overlay } from "layouts/components";
import { Spinner } from "components";
import { ComplexRoute } from "modules/Complex";
import { AuthRoute } from "modules/Authorization";
import { ApartmentRoute } from "modules/Apartment";
import { FloorRoute } from "modules/Floor";
import { CrossTabRoute } from "modules/Crosstab";

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
								{CrossTabRoute}
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
