import { get, isArray, isNumber } from "lodash";
import { notifications } from "services/notifacations";

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
	const price = convertToReadable(Number(get(item, "price") / get(item, "plan.area")).toFixed(1));
	if (price) return price;
	else return "";
};

const toFixed = (number, fix) => {
	if (isNumber(number)) {
		return Number(number.toFixed(fix));
	}

	return null;
};

const apartmentStatusInPiece = (apartments) => {
	const statuses = {
		// status_inactive: 0,
		status_free: 0,
		status_interest: 0,
		status_sold: 0,
		status_not_for_sale: 0,
		status_construction: 0,
	};
	if (isArray(apartments)) {
		for (let i = 0; i < apartments.length; i++) {
			// if (apartments[i]?.status === 0) statuses.status_inactive++;
			if (apartments[i]?.status === 1) statuses.status_free++;
			if (apartments[i]?.status === 2) statuses.status_interest++;
			if (apartments[i]?.status === 3) statuses.status_sold++;
			if (apartments[i]?.status === 4) statuses.status_not_for_sale++;
			if (apartments[i]?.status === 5) statuses.status_construction++;
		}
	}
	return statuses;
};

const apartmentStatusInPercent = (apartments) => {
	if (isArray(apartments)) {
		const apartments_count = apartments.length;
		const statuses = apartmentStatusInPiece(apartments);
		const statuses_in_percent = {
			// status_inactive: toFixed(100 / (apartments_count / statuses.status_inactive), 2),
			status_free: toFixed(100 / (apartments_count / statuses.status_free), 2) || 0,
			status_interest: toFixed(100 / (apartments_count / statuses.status_interest), 2) || 0,
			status_sold: toFixed(100 / (apartments_count / statuses.status_sold), 2) || 0,
			status_not_for_sale: toFixed(
				100 / (apartments_count / statuses.status_not_for_sale) || 0,
				2
			),
			status_construction: toFixed(
				100 / (apartments_count / statuses.status_construction) || 0,
				2
			),
		};

		return statuses_in_percent;
	}
};

const fileReaderAsText = (upFile) => {
	return new Promise((resolve, reject) => {
		const fileredr = new FileReader();
		fileredr.onload = () => resolve(fileredr.result);
		fileredr.onerror = () => reject(fileredr);
		fileredr.readAsText(upFile);
	});
};

const htmlElementToString = (tag) => {
	const serialize = new XMLSerializer();
	return serialize.serializeToString(tag);
};

const translateConstans = (t, data) => {
	return isArray(data) && data.map((item) => ({ ...item, label: t(item.label) }));
};

const generateVector = async (files) => {
	const element = document.createElement("div");
	const { background, svg } = files;
	if (background && svg) {
		if (typeof background === "object" && typeof svg === "object") {
			const url = URL.createObjectURL(background);
			const svgStr = await fileReaderAsText(svg);
			element.innerHTML = await svgStr;
			const image = document.createElement("image");
			image.setAttribute("href", url);
			const svgEl = element.childNodes[0];
			svgEl.prepend(image);

			return htmlElementToString(svgEl);
		}
		if (typeof background === "object" && typeof svg === "string") {
			const url = URL.createObjectURL(background);
			element.innerHTML = svg;
			const image = element.querySelector("image");
			image.setAttribute("href", url);
			return htmlElementToString(element.childNodes[0]);
		}
		if (typeof background === "string" && typeof svg === "object") {
			const svgStr = await fileReaderAsText(svg);
			element.innerHTML = svgStr;
			const svgEl = element.childNodes[0];

			const image = document.createElement("image");
			image.setAttribute("href", background);
			svgEl.prepend(image);

			return htmlElementToString(svgEl);
		}
	}
};

const onEditCreator = ({ files, setVector, data }) => {
	const { svg, background } = files;
	return async () => {
		if (svg || background) {
			const svgStr = await generateVector({
				background: background || get(data, "background.src"),
				svg: svg || get(data, "vector"),
			});
			setVector(svgStr);
		} else if (get(data, "vector")) {
			setVector(get(data, "vector"));
		} else {
			notifications.error("Damini ol!");
		}
	};
};

export const functions = {
	convertToReadable,
	meterPrice,
	apartmentStatusInPiece,
	apartmentStatusInPercent,
	toFixed,
	translateConstans,
	fileReaderAsText,
	generateVector,
	onEditCreator,
};
