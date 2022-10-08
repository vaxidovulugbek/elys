import { useEffect } from "react";

let canRunFn = true;

export const useScroll = (element, onGetEnd, offset = 0) => {
	const getEndOfElement = (event) => {
		if (element.scrollHeight >= element.scrollTop + element.clientHeight + offset) {
			canRunFn = true;
		}
		if (element.scrollHeight <= element.scrollTop + element.clientHeight + offset && canRunFn) {
			onGetEnd(event);
			canRunFn = false;
		}
	};

	useEffect(() => {
		element.addEventListener("scroll", getEndOfElement);

		return () => {
			element.removeEventListener("scroll", getEndOfElement);
		};
	}, []);
};
