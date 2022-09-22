import React from "react";
import cn from "classnames";

import { isFunction } from "lodash";

export const AddObject = ({
	onClick,
	src,
	innerText = "ADD OBJECT",
	className,
	imageStyle = {},
}) => {
	const classNames = cn("object__add", className);
	return (
		<button className={classNames} onClick={isFunction(onClick) ? onClick : null}>
			<img src={src} alt="object-add" style={imageStyle} />
			{innerText}
		</button>
	);
};
