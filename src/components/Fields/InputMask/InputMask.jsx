import React from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import cn from "classnames";

import "./InputMask.scss";
import { ControlError, ControlLabel } from "components/common";

export const InputMask = ({
	label = "",
	placeholder = "",
	type = "text",
	isDisabled = false,
	size = "sm",
	outerClass = "",
	thousandSeparator,
	decimalScale = 10,
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
				<NumericFormat
					type={type}
					disabled={isDisabled}
					placeholder={placeholder}
					className="form-control__input"
					displayType="input"
					thousandSeparator={thousandSeparator}
					allowNegative={false}
					decimalScale={decimalScale}
					allowedDecimalSeparators={[","]}
					allowLeadingZeros
					{...field}
					{...inputProps}
				/>
			</label>

			<ControlError form={form} field={field} />
		</div>
	);
};

InputMask.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.array]),
	placeholder: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	outerClass: PropTypes.string,
	mask: PropTypes.string,
	inputProps: PropTypes.object,
	field: PropTypes.object,
	form: PropTypes.object,
};
