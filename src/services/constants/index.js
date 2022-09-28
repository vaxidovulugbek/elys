const statusOptions = [
	{ value: 0, label: "Inactive" },
	{ value: 1, label: "Free" },
	{ value: 2, label: "Interest" },
	{ value: 3, label: "Sold" },
	{ value: 4, label: "Not for sale" },
];

const typeOptions = [
	{ value: 1, label: "Flat" },
	{ value: 2, label: "Commercial" },
];

const constructionOptions = [
	{ value: 1, label: "Monolithic" },
	{ value: 2, label: "Assembly monolithic" },
	{ value: 3, label: "Brick" },
];

const classOptions = [
	{ value: 1, label: "Comfort" },
	{ value: 2, label: "Premium" },
	{ value: 3, label: "Business" },
];

export const constants = {
	KEYCODE_TAB: 9,
	KEYCODE_ESC: 27,
	STATUS_INACTIVE: 0,
	STATUS_FREE: 1,
	STATUS_INTEREST: 2,
	STATUS_SOLD: 3,
	STATUS_NOT_FOR_SALE: 4,
	STATUS_CONSTRUCTION: 5,
	statusOptions,
	typeOptions,
	constructionOptions,
	classOptions,
};
