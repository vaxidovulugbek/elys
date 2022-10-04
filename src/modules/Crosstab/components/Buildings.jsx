/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";

import buildings from "assets/images/buildings.jpg";
import { useFetchOne } from "hooks";
import { useParams } from "react-router-dom";
import { get } from "lodash";

export const Buildings = ({ setCurrentStep }) => {
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
		if (svgWrap) {
			svgWrap.current.innerHTML = stringSvg;
			console.log(svgWrap.current);
		}
	}, [complex, svgWrap, stringSvg]);
	return <div className="buildings" ref={svgWrap}></div>;
};
