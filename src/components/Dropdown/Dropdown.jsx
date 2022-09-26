import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import PropTypes from "prop-types";

import { useOutsideClick } from "hooks";

import { Button } from "components/Button/Button";

import "./Dropdown.scss";

const links = [
	{
		name: "Display",
		url: "/",
	},
	{
		name: "Substitution of statuses",
		url: "/",
	},
	{
		name: "Setting fields",
		url: "/",
	},
	{
		name: "Access rights",
		url: "/",
	},
];

export const Dropdown = ({
	options,
	btnInnerText = "Settings",
	append,
	prepend,
	variantSelect = false,
}) => {
	const { ref, isVisible, handleMenuOpen } = useOutsideClick();

	const [value, setValue] = useState("EN");

	const dropdown = cn("dropdown__menu", { active: isVisible, variant__select: variantSelect });

	const handleClick = (value) => {
		if (variantSelect) {
			setValue(value);
			handleMenuOpen();
		}
	};

	return (
		<div className="dropdown__wrapper" ref={ref}>
			<Button
				className="btn btn-default"
				innerText={!variantSelect ? btnInnerText : value}
				append={append}
				prepend={prepend}
				onClick={() => handleMenuOpen()}
			/>

			<div className={dropdown}>
				{!variantSelect &&
					options.map((el) => (
						<Link key={el.name} className="dropdown__item" to={el.url}>
							{el.name}
						</Link>
					))}
				{variantSelect &&
					options.map((el) => (
						<span
							className={
								value === el.value ? "dropdown__item active" : "dropdown__item"
							}
							key={el}
							onClick={() => handleClick(el.value)}
						>
							{el.name}
						</span>
					))}
			</div>
		</div>
	);
};

Dropdown.prototype = {
	options: PropTypes.array,
};

Dropdown.defaultProps = {
	options: links,
	append: (
		<svg width="12px" height="14px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path
				fill="#fff"
				d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"
			/>
		</svg>
	),
	prepend: (
		<svg
			width="15px"
			height="15px"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 320 512"
			style={{ marginLeft: "5px" }}
		>
			<path
				fill="#fff"
				d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"
			/>
		</svg>
	),
};
