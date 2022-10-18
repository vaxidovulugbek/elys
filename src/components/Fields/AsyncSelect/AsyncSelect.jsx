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
	optionValue = "id",
	optionLabel = "name",
	form,
	field,
	onValueChange = () => {},
	urlSearchParams = () => {},
	searchKey,
	...props
}) => {
	const loadOptions = async (search, prevOptions, params) => {
		const { data } = await httpCLient.get(
			queryBuilder(url, {
				page: get(params, "page", 1),
				...urlSearchParams(search),
			})
		);

		const options = get(data, "data", []).map((item) => {
			return {
				value: get(item, optionValue, ""),
				label: get(item, optionLabel, ""),
			};
		});
		return {
			options,
			hasMore: get(data, "meta.currentPage", 1) < get(data, "meta.pageCount", 1),
			additional: { page: get(data, "meta.currentPage", 1) + 1 },
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
					isSearchable
					onBlur={() => form.setFieldTouched(field.name)}
					classNamePrefix="select"
					loadOptions={loadOptions}
					debounceTimeout={300}
					onChange={(option) => {
						form.setFieldValue(field.name, option);
						onValueChange(option);
					}}
					{...props}
				/>

				<ControlError form={form} field={field} custom={`${field.name}.value`} />
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
