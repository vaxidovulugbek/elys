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

	// appartment status
	STATUS_INACTIVE: 0,
	STATUS_FREE: 1,
	STATUS_INTEREST: 2,
	STATUS_SOLD: 3,
	STATUS_NOT_FOR_SALE: 4,
	STATUS_CONSTRUCTION: 5,

	STATUS_FREE_TEXT: "Свободно",
	STATUS_INTEREST_TEXT: "Интерес",
	STATUS_SOLD_TEXT: "Проданные",
	STATUS_NOT_FOR_SALE_TEXT: "Не в продаже",
	STATUS_CONSTRUCTION_TEXT: "Резерв",

	TYPE_FLAT: 1,
	TYPE_COMMERCIAL: 2,

	CONSTRUCTION_TYPE_MONOLITHIC: 1,
	CONSTRUCTION_TYPE_ASSEMBLY_MONOLITH: 2,
	CONSTRUCTION_TYPE_BRICK: 3,

	CLASS_COMFORT: 1,
	CLASS_PREMIUM: 2,
	CLASS_BUSINESS: 3,
	statusOptions,
	typeOptions,
	constructionOptions,
	classOptions,
};
