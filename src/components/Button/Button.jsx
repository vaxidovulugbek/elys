import React from "react";

import { isFunction } from "lodash";
import PropTypes from "prop-types";
import cn from "classnames";

import "components/Button/Button.scss";

export const Button = React.memo(
	({
		innerText,
		append,
		prepend,
		isLoading = false,
		className = "",
		isDisabled = false,
		size = "sm",
		type,
		onClick,
		...buttonProps
	}) => {
		const classNames = cn(className, `btn_${size}`, {
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
				{innerText}
				{append}

				{isLoading && <span className="btn-spinner"></span>}
			</button>
		);
	}
);

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
