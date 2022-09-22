import dayjs from "dayjs";

export const time = {
	toYear: (timestamp) => {
		return dayjs.unix(timestamp).year();
	},
	toTimestamp: (date) => {
		return dayjs(date).unix();
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
