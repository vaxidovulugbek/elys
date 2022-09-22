import React from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";

import { ReactComponent as HomeSvg } from "assets/images/home.svg";
import { ReactComponent as User } from "assets/images/user.svg";
import { ReactComponent as Settings } from "assets/images/settings.svg";
import angleRight from "assets/images/angle-right.svg";
import { useState } from "react";
import { useEffect } from "react";
import { find } from "lodash";

const settingSubLinks = [
	{
		url: "/translations",
		name: "Translations",
	},
	{
		url: "/statuses-replacement",
		name: "Substitution of statuses",
	},
	{
		url: "/permissions",
		name: "Access rights",
	},
];

export const Sidebar = ({ isOpen }) => {
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
			<h3 className="sidebar__title">Navigation</h3>
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
						<span className="sidebar__link-text">Objects</span>
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
						<span className="sidebar__link-text">Settings</span>
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
							<span className="sidebar__link-text">{el.name}</span>
						</NavLink>
					))}
				</div>
			</div>

			<h3 className="sidebar__title">Account</h3>

			<div className="sidebar__submenu">
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
			</div>
		</aside>
	);
};
