import { useState, useRef, useEffect } from "react";

export const useOutsideClick = (initialIsVisible, handler) => {
	const [isVisible, setIsVisible] = useState(initialIsVisible);
	const ref = useRef(null);

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsVisible(false);
			handler && handler(event);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	return { ref, isVisible, setIsVisible };
};
