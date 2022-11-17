import { useEffect, useState } from "react";
import { constants } from "services";

export const useModalWithHook = () => {
	const [isOpen, setIsOpen] = useState();

	const handleOverlayOpen = () => {
		setIsOpen(true);
		document.body.style.overflow = "hidden";
		document.querySelector(".overlay").classList.add("overlay_open");
	};

	const handleOverlayClose = () => {
		setIsOpen(false);
		document.body.style.overflow = "initial";
		document.querySelector(".overlay").classList.remove("overlay_open");
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
