import { overlay } from "../actions";

const initialState = {
	isOverlayOpen: false,
};

export const overlayReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case overlay.OPEN:
			return { ...state, [payload]: true };
		case overlay.CLOSE:
			return { ...state, [payload]: false };

		default:
			return { ...state };
	}
};
