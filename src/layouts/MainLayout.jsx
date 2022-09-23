import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import cn from "classnames";

import { Sidebar, Topbar } from "./components";

export const MainLayout = () => {
	const [isOpen, setIsOpen] = useState(true);

	const classnames = cn("main-wrapper", { "pl-200": isOpen });

	return (
		<>
			<Topbar setIsOpen={setIsOpen} isOpen={isOpen} />
			<Sidebar isOpen={isOpen} />
			<main className={cn("main", { "sidebar-close": !isOpen })}>
				<div className={classnames}>
					<Outlet />
				</div>

				<footer className={cn("footer", { "pl-200": isOpen })}>
					© 2017 - 2022. All rights reserved.
				</footer>
			</main>
		</>
	);
};
