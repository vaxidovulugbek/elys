import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout } from "layouts";
import { App } from "App";
import { Spinner } from "components";
import { ComplexRoute } from "modules/Complex";
import { AuthRoute } from "modules/Authorization";
import { ApartmentRoute } from "modules/Apartment";
import { FloorRoute } from "modules/Floor";

export const AppRoutes = () => {
	return (
		<App>
			{({ isFetching, error }) =>
				!error && !isFetching ? (
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" element={<MainLayout />}>
								{ComplexRoute}
								{ApartmentRoute}
								{FloorRoute}
							</Route>
						</Routes>
					</Suspense>
				) : isFetching ? (
					<Spinner />
				) : (
					<Suspense fallback={<Spinner />}>
						<Routes>{AuthRoute}</Routes>
					</Suspense>
				)
			}
		</App>
	);
};
