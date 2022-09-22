import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { overlay } from "store/actions";
import { constants } from "services";

export const useOverlay = (overlayType) => {
	const dispatch = useDispatch();
	const isOpen = useSelector((state) => state.overlay[overlayType]);

	const handleOverlayOpen = () => {
		dispatch(overlay.open(overlayType));
		document.body.style.overflow = "hidden";
	};

	const handleOverlayClose = () => {
		dispatch(overlay.close(overlayType));
		document.body.style.overflow = "initial";
	};

	const handlePressEsc = (event) => {
		if (event.keyCode === constants.KEYCODE_ESC) handleOverlayClose();
	};

	useEffect(() => {
		document.addEventListener("keydown", handlePressEsc);

		return () => {
			document.removeEventListener("keydown", handlePressEsc);
		};
	}, []);

	return {
		isOpen,
		handleOverlayOpen,
		handleOverlayClose,
	};
};

/*
	overlayType = modal | filter | ....
*/
