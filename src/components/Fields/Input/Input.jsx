import React from "react";
import { get } from "lodash";

import PropTypes from "prop-types";
import cn from "classnames";

import { ControlLabel, ControlError } from "../../common";

import "./Input.scss";

export const Input = ({
	label = "",
	placeholder = "",
	type = "text",
	isDisabled = false,
	size = "sm",
	outerClass = "",
	inputProps = {},
	field,
	form,
	onInput,
	onlyNumber,
}) => {
	const outerClasses = cn("form-wrapper", outerClass, size, {
		form_disabled: isDisabled,
	});

	return (
		<div className={outerClasses}>
			<ControlLabel label={label} />

			<label className="form-control cursor_text">
				<input
					type={type}
					onInput={onInput}
					disabled={isDisabled}
					placeholder={placeholder}
					className="form-control__input"
					{...field}
					{...inputProps}
					onChange={(event) => {
						const value = event.target.value;

						if (onlyNumber && (value.match(/^[\s\d]+$/) || value === "")) {
							field.onChange(event);
							get(inputProps, "onChange", () => {})(event);
						}
						if (!onlyNumber) {
							field.onChange(event);
							get(inputProps, "onChange", () => {})(event);
						}
					}}
				/>
			</label>

			<ControlError field={field} form={form} />
		</div>
	);
};

Input.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	placeholder: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	outerClass: PropTypes.string,
	inputProps: PropTypes.object,
	field: PropTypes.object,
	form: PropTypes.object,
};
