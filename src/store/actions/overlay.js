const OPEN = "OVERLAY_OPEN";
const CLOSE = "OVERLAY_CLOSE";

const open = (payload) => ({
	type: OPEN,
	payload,
});

const close = (payload) => ({
	type: CLOSE,
	payload,
});

export const overlay = {
	OPEN,
	CLOSE,
	open,
	close,
};
