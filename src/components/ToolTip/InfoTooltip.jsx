import React, { useState } from "react";
import cn from "classnames";

import "./InfoTooltip.scss";

export const InfoTooltip = ({ innerText }) => {
	const [activeClass, setActiveClass] = useState("");

	const classNames = cn("toolTip__content", activeClass);

	return (
		<>
			<span
				className="toolTip__wrapper"
				onMouseEnter={() => setActiveClass("active")}
				onMouseLeave={() => setActiveClass("")}
			>
				<img src={require("assets/images/infoIcon.svg").default} alt="info" />
				<div className={classNames}>{innerText}</div>
			</span>
		</>
	);
};
