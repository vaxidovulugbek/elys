import React from "react";
import { Link } from "react-router-dom";

import cn from "classnames";

import { useOutsideClick } from "hooks";

import { ReactComponent as Logo } from "assets/images/logo.svg";
import { ReactComponent as Menu } from "assets/images/menu.svg";
import { ReactComponent as Bell } from "assets/images/bell.svg";
import { ReactComponent as World } from "assets/images/world.svg";
import { ReactComponent as Fullscreen } from "assets/images/fullscreen.svg";

export const Topbar = ({ setIsOpen, isOpen }) => {
	const toggle = () => {
		setIsOpen((prev) => !prev);
	};

	const lngDropDown = useOutsideClick();
	const profileDropDown = useOutsideClick(false);

	return (
		<header className={cn("header", { close: !isOpen })}>
			<div className="d-flex align-items-center">
				<Link to="/" className="header__logo">
					<Logo
						className="header__open-logo"
						style={{ display: "block" }}
						width="100px"
						height="35px"
					/>
				</Link>

				<button onClick={toggle} style={{ marginLeft: "20px" }}>
					<Menu />
				</button>
			</div>
			<div className="d-flex header__right">
				<div className="drop-down" ref={lngDropDown.ref}>
					<div className="drop-down__btn" onClick={lngDropDown.handleMenuOpen}>
						<button className="header__action">
							<World />
						</button>
					</div>
					<div
						className={cn("drop-down__options", {
							"drop-down__options_active": lngDropDown.isVisible,
						})}
					>
						<Link to="#" className="drop-down__item drop-down__item_active">
							EN
						</Link>
						<Link to="#" className="drop-down__item">
							UZ
						</Link>
					</div>
				</div>
				<button className="header__action">
					<Bell />
				</button>
				<button className="header__action">
					<Fullscreen />
				</button>
				<div className="drop-down" ref={profileDropDown.ref}>
					<div className="drop-down__btn" onClick={profileDropDown.handleMenuOpen}>
						<button className="header__action">
							<img
								src={require("assets/images/profile.png")}
								alt="world"
								className="img-fluid"
							/>
						</button>
					</div>

					<div
						className={cn("drop-down__options", {
							"drop-down__options_active": profileDropDown.isVisible,
						})}
					>
						<h4 className="drop-down__title">Burxon</h4>
						<Link to="" className="drop-down__item">
							My profile
						</Link>
						<Link to="" className="drop-down__item">
							Change password
						</Link>
						<Link to="" className="drop-down__item">
							To the website
						</Link>
						<Link to="" className="drop-down__item">
							Exit
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};
