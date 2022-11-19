const { get } = require("lodash");

const getOptions = (data, optionLabel, optionValue) =>
	get(data, "data", []).map((item) => ({
		label: get(item, optionLabel, ""),
		value: get(item, optionValue, ""),
	}));

export const complex_functions = {
	getOptions,
};
