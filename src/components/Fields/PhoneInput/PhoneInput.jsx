import React from "react";
import PropTypes from "prop-types";
import { PatternFormat } from "react-number-format";
import cn from "classnames";

import { ControlError, ControlLabel } from "components/common";

export const PhoneInput = ({
	label = "",
	type = "text",
	isDisabled = false,
	size = "sm",
	outerClass = "",
	placeholder = "+998 (##) ###-##-##",
	format = "+998 (##) ###-##-##",
	mask = " ",
	inputProps = {},
	field,
	form,
}) => {
	const outerClasses = cn("form-wrapper", outerClass, size, {
		form_disabled: isDisabled,
	});

	return (
		<div className={outerClasses}>
			<ControlLabel label={label} />

			<label className="form-control cursor_text">
				<PatternFormat
					format={format}
					mask={mask}
					type={type}
					disabled={isDisabled}
					placeholder={placeholder}
					className="form-control__input"
					displayType="input"
					{...field}
					{...inputProps}
				/>
			</label>

			<ControlError form={form} field={field} />
		</div>
	);
};

PhoneInput.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.array]),
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	outerClass: PropTypes.string,
	format: PropTypes.string,
	mask: PropTypes.string,
	inputProps: PropTypes.object,
	field: PropTypes.object,
	form: PropTypes.object,
};
