import React from "react";
import PropTypes from "prop-types";
import SelectComponent from "react-select";
import cn from "classnames";
import { isFunction, get } from "lodash";

import "./Select.scss";
import { ControlError, ControlLabel } from "components/common";

export const Select = ({
	label = "",
	placeholder = "",
	options = [],
	size = "sm",
	className = "",
	isMulti = false,
	isDisabled = false,
	isSearchable = false,
	isClearable = false,
	defaultValue,
	optionLabel = "label",
	optionValue = "value",
	onValueChange,
	field,
	form,
	closeMenuOnSelect = true,
}) => {
	const classNames = cn(className, size);

	const handleChange = (option, action) => {
		form.setFieldValue(field.name, option);
		onValueChange && onValueChange(option);
	};

	const handleBlur = (event) => {
		form.setFieldTouched(field.name, true);
	};

	return (
		<>
			<ControlLabel label={label} />
			<div className="form-select">
				<SelectComponent
					defaultValue={defaultValue}
					placeholder={placeholder}
					className={classNames}
					getOptionLabel={(option) =>
						isFunction(optionLabel) ? optionLabel(option) : get(option, optionLabel)
					}
					getOptionValue={(option) =>
						isFunction(optionValue) ? optionLabel(option) : get(option, optionValue)
					}
					isDisabled={isDisabled}
					isMulti={isMulti}
					isSearchable={isSearchable}
					isClearable={isClearable}
					blurInputOnSelect={true}
					classNamePrefix="select"
					options={options}
					onChange={handleChange}
					onBlur={handleBlur}
					// menuIsOpen={true}
				/>

				<ControlError form={form} field={field} />
			</div>
		</>
	);
};

Select.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.array,
	size: PropTypes.string,
	className: PropTypes.string,
	isMulti: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isSearchable: PropTypes.bool,
	isClearable: PropTypes.bool,
	defaultValue: PropTypes.object,
	optionValue: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	onValueChange: PropTypes.func,
	field: PropTypes.object,
	form: PropTypes.object,
};
