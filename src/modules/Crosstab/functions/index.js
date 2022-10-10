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
		let { month_count, initial_payment, discount } = formik_values;
		month_count = Number(month_count);
		initial_payment = Number(initial_payment);
		discount = Number(discount);

		let credit = 0;
		if (100 - discount > 0 && 100 - initial_payment > 0) {
			credit = Number(price) * (1 - discount / 100) * (1 - initial_payment / 100);
		}

		const newItems = Array(month_count || 1)
			.fill(1)
			.map((_, index) => ({
				month: index + 1,
				fee: functions.convertToReadable((credit / month_count).toFixed(2)),
			}));

		newItems.push({ month: "Total", fee: functions.convertToReadable(credit?.toFixed(2)) });

		setItems(newItems);
	};
};

const handleContractError = (notifications) => {
	return (data) => {
		const errors = get(data, "response.data.errors");

		errors &&
			Object.keys(errors).includes("document_id") &&
			notifications.error("You have to create document first");
	};
};

export const crosstab_functions = {
	fixPassportInput,
	handleContractSuccess,
	calculateCredit,
	handleContractError,
};
