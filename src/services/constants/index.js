export const constants = {
	KEYCODE_TAB: 9,
	KEYCODE_ESC: 27,

	// apartment status
	STATUS_INACTIVE: 0,
	STATUS_FREE: 1,
	STATUS_INTEREST: 2,
	STATUS_SOLD: 3,
	STATUS_NOT_FOR_SALE: 4,
	STATUS_CONSTRUCTION: 5,
	STATUS_CONTRACT_INACTIVE: 1,
	STATUS_CONTRACT_PENDING: 2,
	STATUS_CONTRACT_ACTIVE: 3,
	STATUS_CONTRACT_DELETED: 0,

	STATUS_INACTIVE_TEXT: "Inactive",
	STATUS_FREE_TEXT: "Available",
	STATUS_INTEREST_TEXT: "Booked",
	STATUS_SOLD_TEXT: "Sold",
	STATUS_NOT_FOR_SALE_TEXT: "Not for sale",
	STATUS_CONSTRUCTION_TEXT: "Under construction",

	TYPE_FLAT: 1,
	TYPE_COMMERCIAL: 2,
	TYPE_MONTHLY_PAY: 1,
	TYPE_FULL_PAY: 2,

	CONSTRUCTION_TYPE_MONOLITHIC: 1,
	CONSTRUCTION_TYPE_ASSEMBLY_MONOLITH: 2,
	CONSTRUCTION_TYPE_BRICK: 3,

	CLASS_COMFORT: 1,
	CLASS_PREMIUM: 2,
	CLASS_BUSINESS: 3,

	UZBEK: 3,
	RUSSIAN: 2,

	USER_STATUS_ACTIVE: 10,
	USER_STATUS_INACTIVE: 9,
	USER_STATUS_DELETED: 0,

	ROLE_ADMIN: 10,
	ROLE_REALTOR: 2,
	ROLE_ACCOUNTANT: 3,
	ROLE_MANAGER: 4,
	ROLE_USER: 9,
};

constants.roles = [
	{ label: "manager", value: constants.ROLE_MANAGER },
	{ label: "realtor", value: constants.ROLE_REALTOR },
	{ label: "admin", value: constants.ROLE_ADMIN },
	{ label: "accountant", value: constants.ROLE_ACCOUNTANT },
	{ label: "visitor", value: constants.ROLE_USER },
];

constants.userStatuses = [
	{
		label: "Активный",
		value: constants.USER_STATUS_ACTIVE,
	},
	{
		label: "Не активный",
		value: constants.USER_STATUS_INACTIVE,
	},
	{
		label: "Удалён",
		value: constants.USER_STATUS_DELETED,
	},
];

constants.statusOptions = [
	{ value: constants.STATUS_INACTIVE, label: constants.STATUS_INACTIVE_TEXT },
	{ value: constants.STATUS_FREE, label: constants.STATUS_FREE_TEXT },
	{ value: constants.STATUS_INTEREST, label: constants.STATUS_INTEREST_TEXT },
	{ value: constants.STATUS_SOLD, label: constants.STATUS_SOLD_TEXT },
	{ value: constants.STATUS_NOT_FOR_SALE, label: constants.STATUS_NOT_FOR_SALE_TEXT },
	{ value: constants.STATUS_CONSTRUCTION, label: constants.STATUS_CONSTRUCTION_TEXT },
];

constants.contractStatus = [
	{
		label: "Не активный",
		value: constants.STATUS_CONTRACT_INACTIVE,
	},
	{
		label: "В ожидании",
		value: constants.STATUS_CONTRACT_PENDING,
	},
	{
		label: "Активный",
		value: constants.STATUS_CONTRACT_ACTIVE,
	},
];

constants.sectionStatusOptions = [
	{ value: constants.STATUS_CONTRACT_ACTIVE, label: "Active" },
	{ value: constants.STATUS_CONTRACT_INACTIVE, label: constants.STATUS_INACTIVE_TEXT },
	{ value: constants.STATUS_CONTRACT_DELETED, label: "Deleted" },
];
constants.priceListOptions = [
	{ value: 1, label: "Active" },
	{ value: 2, label: constants.STATUS_INACTIVE_TEXT },
	{ value: 3, label: "Deleted" },
];

constants.typeOptions = [
	{ value: constants.TYPE_FLAT, label: "Flat" },
	{ value: constants.TYPE_COMMERCIAL, label: "Commercial" },
];

constants.contractTypes = [
	{ value: constants.TYPE_MONTHLY_PAY, label: "Monthly pay" },
	{ value: constants.TYPE_FULL_PAY, label: "Full pay" },
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

constants.payedStatusOptions = [
	{
		value: 0,
		label: "Canceled",
	},
	{
		value: 1,
		label: "Pending",
	},
	{
		value: 2,
		label: "Payed",
	},
];

constants.paymentTypeOptions = [
	{
		value: 1,
		label: "Cash",
	},
	{
		value: 2,
		label: "Card",
	},
	{
		value: 3,
		label: "Transfer",
	},
];

const {
	STATUS_CONSTRUCTION,
	STATUS_CONSTRUCTION_TEXT,
	STATUS_FREE,
	STATUS_FREE_TEXT,
	STATUS_INTEREST,
	STATUS_INTEREST_TEXT,
	STATUS_NOT_FOR_SALE,
	STATUS_NOT_FOR_SALE_TEXT,
	STATUS_SOLD,
	STATUS_SOLD_TEXT,
} = constants;

constants.statuses = {
	[`${STATUS_FREE}`]: STATUS_FREE_TEXT,
	[`${STATUS_CONSTRUCTION}`]: STATUS_CONSTRUCTION_TEXT,
	[`${STATUS_INTEREST}`]: STATUS_INTEREST_TEXT,
	[`${STATUS_NOT_FOR_SALE}`]: STATUS_NOT_FOR_SALE_TEXT,
	[`${STATUS_SOLD}`]: STATUS_SOLD_TEXT,
};
