import { get } from "lodash";
import { functions } from "services";

const fixPassportInput = (e) => {
	const letters = /[A-Z]/;
	const numbers = /[0-9]/;
	const charArray = e.target.value.toUpperCase().split("");
	const correctCharArray = charArray.filter((char, i) => {
		if (i <= 10) {
			if (i < 2) {
				return char.match(letters);
			} else if (i >= 2) {
				return char.match(numbers);
			}
		}
		return false;
	});
	e.target.value = correctCharArray.join("");
};

const handleContractSuccess = ({
	notifications,
	setActiveApartment,
	setCurrentTab,
	queryClient,
}) => {
	return (response) => {
		const download = document.createElement("a");
		download.download = true;
		download.href = get(response, "data.destination");
		document.body.appendChild(download);
		download.target = "_blank";

		notifications.success("Contract created");
		setActiveApartment(null);
		setCurrentTab(1);
		queryClient.invalidateQueries().then((res) => {
			download.click();
			document.body.removeChild(download);
		});
	};
};

const calculateCredit = ({ price, setItems }) => {
	return (formik_values) => {
		let { month_count, initial_payment, price_area, plan } = formik_values;
		month_count = Number(month_count);
		initial_payment = Number(initial_payment);
		const priceArea =
			typeof price_area === "string"
				? Number(price_area.replace(/\s/g, ""))
				: Number(price_area);
		const totalPrice = Number(priceArea * get(plan, "area"));

		const credit = totalPrice - (totalPrice * initial_payment) / 100;

		const newItems = Array(month_count || 1)
			.fill(1)
			.map((_, index) => ({
				month: index + 1,
				fee: functions.convertToReadable((credit / month_count).toFixed(2)),
			}));

		console.log(initial_payment);

		newItems.unshift({
			month: "Initial",
			fee: functions.convertToReadable((totalPrice * initial_payment) / 100),
		});
		newItems.push({ month: "Total", fee: functions.convertToReadable(totalPrice?.toFixed(2)) });

		setItems(newItems);
	};
};

const handleContractError = (notifications) => {
	return (data, formHelpers) => {
		const errors = get(data, "response.data.errors");

		formHelpers.setErrors(errors);

		if (errors && Object.keys(errors).includes("document_id")) {
			notifications.error("You have to create document first");
		} else {
			notifications.error("Что то пошло не так");
		}
	};
};

const filterFuncCreator = ({ lngCode, params, STATUS_FREE }) => {
	return (apartment) => {
		let active = true;
		const { id, sort, price, discount, status, section_id, type } = apartment;
		const apartmentClass = get(apartment, "class", 0);
		const room_count = get(apartment, "plan.room.count", 0);
		const square_meter = get(apartment, "plan.area", 0);
		const name = get(apartment, `plan.name.${lngCode}`, 0);
		const planName = get(apartment, `name.${lngCode}`, 0);
		const meter_price = price / square_meter;

		// Filter apartments
		const filter = {
			room_count: get(params, "room_count", []),
			price: get(params, "price", [0, Infinity]),
			square_meter: get(params, "square_meter", [0, Infinity]),
			meter_price: get(params, "meter_price", ""),
			discount: get(params, "discount", ""),
			status: get(params, "status", ""),
			type: get(params, "type.value", ""),
			class: get(params, "class.value", ""),
			section_id: get(params, "section_id", ""),
			search: get(params, "search", ""),
		};

		if (
			(filter.room_count.length > 0 && !filter.room_count.includes(room_count)) ||
			filter.price[0] > price ||
			filter.price[1] < price ||
			filter.square_meter[0] > square_meter ||
			filter.square_meter[1] < square_meter ||
			filter.meter_price[0] > meter_price ||
			filter.meter_price[1] < meter_price ||
			(filter.discount && !discount) ||
			(filter.status && status !== STATUS_FREE) ||
			(filter.type && filter.type !== type) ||
			(filter.class && filter.class !== apartmentClass) ||
			(filter.section_id && filter.section_id !== section_id)
		) {
			active = false;
		}

		// Search apartments by area, id, number
		const search = new RegExp(`${filter.search}`, "ig");

		const hasMatchWithSearch =
			String(square_meter).match(search) ||
			String(id) === filter.search ||
			String(sort).match(search) ||
			String(name).match(search) ||
			String(planName).match(search);

		if (!hasMatchWithSearch) active = false;

		return active;
	};
};

export const crosstab_functions = {
	fixPassportInput,
	handleContractSuccess,
	calculateCredit,
	handleContractError,
	filterFuncCreator,
};
