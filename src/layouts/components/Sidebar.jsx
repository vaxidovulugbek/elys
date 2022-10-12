import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { find } from "lodash";

import { ReactComponent as HomeSvg } from "assets/images/home.svg";
import { ReactComponent as Settings } from "assets/images/settings.svg";
import angleRight from "assets/images/angle-right.svg";
import { Typography } from "components";

const settingSubLinks = [
	{
		url: "/translations",
		name: "Translations",
	},
	{
		url: "/plan-field",
		name: "Plan Field",
	},
];

export const Sidebar = ({ isOpen }) => {
	const { t } = useTranslation();
	const [isSubActive, setIsSubActive] = useState(true);

	const subMenu = cn("sidebar__submenu-content", { sidebar__submenu_active: isSubActive });
	const arrow = cn("img-fluid arrow", { active: isSubActive });

	const handleSubMenu = (e) => {
		e.preventDefault();
		if (isOpen) setIsSubActive(!isSubActive);
	};

	useEffect(() => {
		setIsSubActive(false);
	}, [isOpen]);

	return (
		<aside
			className={cn("sidebar", {
				"sidebar-close": !isOpen,
			})}
		>
			<Typography Type="h3" className="sidebar__title" text="Navigation" />

			<div className="sidebar__submenu">
				<NavLink
					to=""
					end
					className={({ isActive }) =>
						isActive ? "sidebar__link sidebar__link-active" : "sidebar__link"
					}
				>
					<div className="d-flex align-items-center">
						<HomeSvg />
						<span className="sidebar__link-text">{t("Complex")}</span>
					</div>
				</NavLink>
			</div>

			<div className="sidebar__submenu">
				<NavLink
					to="/room"
					className={({ isActive }) =>
						isActive ? "sidebar__link sidebar__link-active" : "sidebar__link"
					}
				>
					<div className="d-flex align-items-center">
						<HomeSvg />
						<span className="sidebar__link-text">{t("Room")}</span>
					</div>
				</NavLink>
			</div>

			<div className="sidebar__submenu">
				<NavLink
					to="/category"
					className={({ isActive }) =>
						isActive ? "sidebar__link sidebar__link-active" : "sidebar__link"
					}
				>
					<div className="d-flex align-items-center">
						<HomeSvg />
						<span className="sidebar__link-text">{t("Category")}</span>
					</div>
				</NavLink>
			</div>

			<div className="sidebar__submenu">
				<NavLink
					to="settings/"
					onClick={handleSubMenu}
					className={cn("sidebar__link", {
						"sidebar__link-active": !!find(settingSubLinks, {
							url: window.location.pathname,
						}),
					})}
				>
					<div className="d-flex align-items-center">
						<Settings />
						<span className="sidebar__link-text">{t("Settings")}</span>
					</div>

					<div className="sidebar__arrow">
						<img src={angleRight} alt="angle right" className={arrow} />
					</div>
				</NavLink>

				<div className={subMenu}>
					{settingSubLinks.map((el, index) => (
						<NavLink
							to={el.url}
							key={el.url}
							className={({ isActive }) =>
								cn("sidebar__link sub__link", { "sidebar__link-active": isActive })
							}
						>
							<span className="sidebar__link-text">{t(el.name)}</span>
						</NavLink>
					))}
				</div>
			</div>

			{/* <h3 className="sidebar__title">Account</h3> */}

			{/* <div className="sidebar__submenu">
				<NavLink
					to="/profile"
					className={({ isActive }) =>
						isActive ? "sidebar__link sidebar__link-active" : "sidebar__link"
					}
				>
					<div className="d-flex align-items-center">
						<User />
						<span className="sidebar__link-text">Profile</span>
					</div>
				</NavLink>
			</div> */}
		</aside>
	);
};
