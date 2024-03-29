import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { find, get } from "lodash";
import { useSelector } from "react-redux";

import { ReactComponent as HomeSvg } from "assets/images/home.svg";
import { ReactComponent as UserSvg } from "assets/images/user.svg";
import { ReactComponent as Settings } from "assets/images/settings.svg";
import { ReactComponent as Grid } from "assets/images/grid.svg";
import { ReactComponent as Room } from "assets/images/room.svg";
import angleRight from "assets/images/angle-right.svg";
import { Typography } from "components";
import { constants } from "services";

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
	const location = useLocation();
	const [isSubActive, setIsSubActive] = useState(true);
	const userRole = useSelector((state) => get(state, "auth.role"));

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

			{(userRole === constants.ROLE_ADMIN || userRole === constants.ROLE_MANAGER) && (
				<>
					<div className="sidebar__submenu">
						<NavLink
							to="/room"
							className={({ isActive }) =>
								isActive ? "sidebar__link sidebar__link-active" : "sidebar__link"
							}
						>
							<div className="d-flex align-items-center">
								<Room />
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
								<Grid />
								<span className="sidebar__link-text">{t("Category")}</span>
							</div>
						</NavLink>
					</div>

					<div className="sidebar__submenu">
						<NavLink
							to="/user"
							end
							className={({ isActive }) =>
								isActive ? "sidebar__link sidebar__link-active" : "sidebar__link"
							}
						>
							<div className="d-flex align-items-center">
								<UserSvg />
								<span className="sidebar__link-text">{t("User")}</span>
							</div>
						</NavLink>
					</div>

					<div className="sidebar__submenu">
						<NavLink
							to="/settings"
							onClick={handleSubMenu}
							className={cn("sidebar__link", {
								"sidebar__link-active": !!find(settingSubLinks, {
									url: location.pathname,
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
										cn("sidebar__link sub__link", {
											"sidebar__link-active": isActive,
										})
									}
								>
									<span className="sidebar__link-text">{t(el.name)}</span>
								</NavLink>
							))}
						</div>
					</div>
				</>
			)}

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
