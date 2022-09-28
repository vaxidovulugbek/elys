import { get } from "lodash";

const convertToReadable = (number) => {
	number = number || 0;
	function isFloat(n) {
		return Number(n) === n && n % 1 !== 0;
	}

	let newValue;
	if (isFloat(Number(number))) {
		newValue = number.toString().split(".");
		newValue[0] = newValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		newValue = newValue.join(".");
	} else {
		newValue = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}

	return newValue;
};

const meterPrice = (item) => {
	const price = Math.floor(get(item, "price") / get(item, "plan.area"));
	if (price) return price;
};

export const functions = { convertToReadable, meterPrice };
