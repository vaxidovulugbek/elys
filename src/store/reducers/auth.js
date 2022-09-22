import { auth } from "../actions";

export const authReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case auth.SUCCESS:
			return payload;

		case auth.FAILURE:
			return payload;

		default:
			return { ...state };
	}
};
