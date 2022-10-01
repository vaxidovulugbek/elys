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
	STATUS_SOLD_TEXT: "Продано",
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
};

constants.statusOptions = [
	{ value: constants.STATUS_INACTIVE, label: "Inactive" },
	{ value: constants.STATUS_FREE, label: constants.STATUS_FREE_TEXT },
	{ value: constants.STATUS_INTEREST, label: constants.STATUS_INTEREST_TEXT },
	{ value: constants.STATUS_SOLD, label: constants.STATUS_SOLD_TEXT },
	{ value: constants.STATUS_NOT_FOR_SALE, label: constants.STATUS_NOT_FOR_SALE_TEXT },
];

constants.typeOptions = [
	{ value: constants.TYPE_FLAT, label: "Flat" },
	{ value: constants.TYPE_COMMERCIAL, label: "Commercial" },
];

constants.constructionOptions = [
	{ value: constants.CONSTRUCTION_TYPE_MONOLITHIC, label: "Monolithic" },
	{ value: constants.CONSTRUCTION_TYPE_ASSEMBLY_MONOLITH, label: "Assembly monolithic" },
	{ value: constants.CONSTRUCTION_TYPE_BRICK, label: "Brick" },
];

constants.classOptions = [
	{ value: constants.CLASS_COMFORT, label: "Comfort" },
	{ value: constants.CLASS_PREMIUM, label: "Premium" },
	{ value: constants.CLASS_BUSINESS, label: "Business" },
];
