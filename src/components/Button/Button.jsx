import React from "react";
import { useTranslation } from "react-i18next";
import { isFunction } from "lodash";
import PropTypes from "prop-types";
import cn from "classnames";

import "./Button.scss";

export const Button = ({
	innerText,
	append,
	prepend,
	isLoading = false,
	className = "",
	isDefault = true,
	isDisabled = false,
	size = "sm",
	type,
	onClick,
	...buttonProps
}) => {
	const { t } = useTranslation();

	const classNames = cn(className, {
		[`btn_${size}`]: isDefault,
		btn_disabled: isDisabled,
		btn_spinning: isLoading,
	});

	return (
		<button
			className={classNames}
			type={type}
			onClick={isFunction(onClick) ? onClick : null}
			// disabled={isDisabled || isLoading}
			{...buttonProps}
		>
			{prepend}
			{t(innerText)}
			{append}

			{isLoading && <span className="btn-spinner"></span>}
		</button>
	);
};

Button.propTypes = {
	innerText: PropTypes.string,
	append: PropTypes.node,
	prepend: PropTypes.node,
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	size: PropTypes.string,
	type: PropTypes.string,
	onClick: PropTypes.func,
};
