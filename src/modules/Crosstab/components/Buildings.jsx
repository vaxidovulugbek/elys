/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";

import { useFetchOne } from "hooks";
import { useParams } from "react-router-dom";
import { get } from "lodash";

export const Buildings = ({ setCurrentStep, setActivePathID }) => {
	const { id } = useParams();
	const svgWrap = useRef();
	const complex = useFetchOne({
		url: `complex/${id}`,
		urlSearchParams: {
			include: "files,place,category,district,region,background",
		},
	});
	const stringSvg = get(complex, "data.background");

	useEffect(() => {
		if (svgWrap.current) {
			svgWrap.current.innerHTML = stringSvg;
			const paths = svgWrap.current.querySelectorAll("path");
			paths?.forEach((path) => {
				path?.addEventListener("click", (e) => {
					if (path.getAttribute("data-section-id")) {
						setActivePathID(path.getAttribute("data-section-id"));
						setCurrentStep(2);
					}
				});
			});
		}
	}, [complex, svgWrap, stringSvg]);
	return <div className="buildings" ref={svgWrap}></div>;
};
