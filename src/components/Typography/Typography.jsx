import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { isFunction } from "lodash";

export const Typography = ({
	Type = "h1",
	text = "",
	className = "",
	style,
	append,
	prepend,
	children,
	...props
}) => {
	const { t } = useTranslation();

	return (
		<Type className={className} {...props}>
			{prepend}
			{t(text)}
			{append}

			{isFunction(children) && children(t)}
		</Type>
	);
};

Typography.propTypes = {
	Type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "small", "label"]),
	text: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	append: PropTypes.element,
	prepend: PropTypes.element,
	children: PropTypes.func,
};
