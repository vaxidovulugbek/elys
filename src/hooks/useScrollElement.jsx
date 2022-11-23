import { useEffect } from "react";

export const useScrollElement = (hasNextPage = false, onGetEnd = () => {}) => {
	useEffect(() => {
		let fetching = false;
		const onScroll = (event) => {
			const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

			if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
				fetching = true;
				if (hasNextPage) {
					onGetEnd();
				}
				fetching = false;
			}
		};

		document.addEventListener("scroll", onScroll);

		return () => document.removeEventListener("scroll", onScroll);
	}, [hasNextPage, onGetEnd]);
};
