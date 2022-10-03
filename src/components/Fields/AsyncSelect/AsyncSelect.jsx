import React from "react";

import PropTypes from "prop-types";
import { get } from "lodash";
import { AsyncPaginate } from "react-select-async-paginate";

import { ControlError, ControlLabel } from "components/common";
import { httpCLient, queryBuilder } from "services";

import "../Select/Select.scss";

const AsyncSelect = ({
	url,
	label,
	optionValue,
	optionLabel,
	form,
	field,
	onValueChange = () => {},
	params = {},
	...props
}) => {
	const loadOptions = async () => {
		const res = await httpCLient.get(queryBuilder(url, params));

		const options = get(res, "data.data", []).map((item) => {
			return {
				value: get(item, optionValue || "id", ""),
				label: get(item, optionLabel || "name", ""),
			};
		});
		return {
			options,
		};
	};

	return (
		<>
			<ControlLabel label={label} />
			<div className="form-select">
				<AsyncPaginate
					defaultOptions={field.value}
					value={field.value}
					blurInputOnSelect={true}
					classNamePrefix="select"
					loadOptions={loadOptions}
					debounceTimeout={300}
					onChange={(option) => {
						form.setFieldValue(field.name, option);
						onValueChange(option);
					}}
					{...props}
				/>

				<ControlError form={form} field={field} />
			</div>
		</>
	);
};

AsyncSelect.propTypes = {
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
	optionValue: PropTypes.string,
	optionLabel: PropTypes.string,
	onValueChange: PropTypes.func,
	field: PropTypes.object,
	form: PropTypes.object,
};

export default AsyncSelect;
