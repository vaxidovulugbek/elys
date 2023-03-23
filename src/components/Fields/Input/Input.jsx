import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
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
	isValid,
	isComment = false,
}) => {
	const { t } = useTranslation();

	const outerClasses = cn("form-wrapper", outerClass, size, {
		form_disabled: isDisabled,
	});

	return (
		<div className={outerClasses}>
			<ControlLabel label={label} />

			<label className="form-control cursor_text">
				{isComment ? (
					<textarea
						onInput={onInput}
						disabled={isDisabled}
						placeholder={t(placeholder)}
						className="form-control__input h_120"
						{...field}
						{...inputProps}
					></textarea>
				) : (
					<input
						type={type}
						onInput={onInput}
						disabled={isDisabled}
						placeholder={t(placeholder)}
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
				)}
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
