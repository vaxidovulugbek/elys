import { useState, useRef, useEffect } from "react";

export const useOutsideClick = ({ initialIsVisible, onOpen, onClose = () => {} } = {}) => {
	const [isVisible, setIsVisible] = useState(initialIsVisible);
	const ref = useRef(null);

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsVisible(false);
			onClose(event);
		}
	};

	const handleMenuOpen = (event) => {
		setIsVisible((prev) => !prev);
		onOpen && onOpen(event);
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { ref, isVisible, handleMenuOpen };
};
