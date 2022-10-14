import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import cn from "classnames";

import { Sidebar, Topbar } from "./components";
import { useTranslation } from "react-i18next";

export const MainLayout = () => {
	const { t } = useTranslation();
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

				<footer className={cn("footer")}>© 2017 - 2022. {t("All rights reserved")}.</footer>
			</main>
		</>
	);
};
