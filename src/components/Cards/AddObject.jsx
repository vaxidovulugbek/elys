import React from "react";

import cn from "classnames";
import { isFunction } from "lodash";
import { useTranslation } from "react-i18next";

export const AddObject = ({
	onClick,
	src,
	innerText = "ADD COMPLEX",
	className,
	LoadingIcon = null,
	isLoading = false,
	imageStyle = {},
	...props
}) => {
	const classNames = cn("object__add", className);
	const { t } = useTranslation();
	return (
		<button {...props} className={classNames} onClick={isFunction(onClick) ? onClick : null}>
			{isLoading ? LoadingIcon : <img src={src} alt="object-add" style={imageStyle} />}
			{t(innerText)}
		</button>
	);
};
