import dayjs from "dayjs";
import { isArray } from "lodash";

export const time = {
	toYear: (timestamp) => {
		return dayjs.unix(timestamp).year();
	},
	toTimestamp: (date) => {
		return dayjs(date, "DD-MM-YYYY").unix();
	},
	convertToTimestamp: (dateString) => {
		if (isArray(dateString)) {
			return dayjs(`${dateString[2]}-${dateString[1]}-${dateString[0]}`).unix();
		} else return;
	},
	current: (format = "DD.MM.YYYY") => {
		return dayjs().format(format);
	},
	to: (timestamp, format = "DD.MM.YYYY") => {
		return dayjs.unix(timestamp).format(format);
	},
	toChat: (timestamp) => {
		return dayjs(timestamp, "X").calendar(null, {
			sameDay: "HH:mm",
			lastDay: "[Вчера], HH:mm",
			sameElse: "DD.MM.YYYY",
		});
	},
	getRange: (start, end) => ({
		from: dayjs(start).unix(),
		to: dayjs(end).unix(),
	}),
};
