const LNG = "CHANGE_LNG";
const THEME = "CHANGE_THEME";

const changeLanguage = (payload) => ({
	type: LNG,
	payload,
});

const changeTheme = (payload) => ({
	type: THEME,
	payload,
});

export const system = {
	LNG,
	THEME,
	changeLanguage,
	changeTheme,
};
