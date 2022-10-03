import React from "react";

import cn from "classnames";
import { isFunction } from "lodash";

export const AddObject = ({
	onClick,
	src,
	innerText = "ADD OBJECT",
	className,
	imageStyle = {},
	...props
}) => {
	const classNames = cn("object__add", className);
	return (
		<button {...props} className={classNames} onClick={isFunction(onClick) ? onClick : null}>
			<img src={src} alt="object-add" style={imageStyle} />
			{innerText}
		</button>
	);
};
