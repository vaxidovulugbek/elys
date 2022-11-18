import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import { useOutsideClick } from "hooks";
import { system } from "store/actions";

import { Button } from "components";

import { ReactComponent as Logo } from "assets/images/logo.svg";
import { ReactComponent as Menu } from "assets/images/menu.svg";
import { ReactComponent as Bell } from "assets/images/bell.svg";
import { ReactComponent as World } from "assets/images/world.svg";
import { ReactComponent as Fullscreen } from "assets/images/fullscreen.svg";
import { storage } from "services";

export const Topbar = ({ setIsOpen, isOpen }) => {
	const dispatch = useDispatch();
	const username = useSelector((state) => state.auth.username);
	const { i18n, t } = useTranslation();

	const toggle = () => {
		setIsOpen((prev) => !prev);
	};

	const lngDropDown = useOutsideClick();
	const profileDropDown = useOutsideClick(false);

	const changeLng = (lng) => {
		dispatch(system.changeLanguage(lng));
		storage.set("lngCode", lng);
		i18n.changeLanguage(lng);
	};

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
						<Button
							className={cn("drop-down__item", {
								"drop-down__item_active": i18n.language === "uz",
							})}
							isDefault={false}
							innerText="UZ"
							onClick={(event) => {
								changeLng("uz");
								lngDropDown.handleMenuClose();
							}}
						/>

						<Button
							className={cn("drop-down__item", {
								"drop-down__item_active": i18n.language === "ru",
							})}
							isDefault={false}
							innerText="RU"
							onClick={(event) => {
								changeLng("ru");
								lngDropDown.handleMenuClose();
							}}
						/>

						<Button
							className={cn("drop-down__item", {
								"drop-down__item_active": i18n.language === "en",
							})}
							isDefault={false}
							innerText="EN"
							onClick={(event) => {
								changeLng("en");
								lngDropDown.handleMenuClose();
							}}
						/>
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
						<p className="drop-down__subtitle">{t("username")}:</p>
						<h4 className="drop-down__title">{username}</h4>
					</div>
				</div>
			</div>
		</header>
	);
};
