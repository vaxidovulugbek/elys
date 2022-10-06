/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

import { useFetchOne } from "hooks";
import { get } from "lodash";

export const Buildings = ({
	setCurrentStep,
	setActivePathID,
	activePathID,
	step,
	setActiveApartment,
	stepUrls = [],
	filter,
}) => {
	const svgWrap = useRef();
	const [appartmentID, setAppartmentID] = useState(0);

	const complex = useFetchOne({
		url: `${stepUrls[step - 1]}/${activePathID[step - 1]}`,
		urlSearchParams: {
			include: "files,place,category,district,region,background,svg,vector,apartments",
			filter,
		},
	});
	const stringSvg = get(complex, "data.vector");

	const appartment = useFetchOne({
		url: appartmentID && `apartment/${appartmentID}`,
		queryOptions: {
			onSuccess: (data) => {
				setActiveApartment(data);
			},
			enabled: false,
		},
	});

	useEffect(() => {
		appartmentID && appartment.refetch();
	}, [appartmentID]);

	useEffect(() => {
		if (svgWrap.current) {
			svgWrap.current.innerHTML = stringSvg;
			const paths = svgWrap.current.querySelectorAll("path");
			paths?.forEach((path) => {
				path?.addEventListener("click", (e) => {
					const pathID = path.getAttribute(`data-${stepUrls[step]}-id`);

					if ((pathID, step < 3)) {
						!activePathID.includes(pathID) &&
							setActivePathID((prev) => [...prev, pathID]);
						setCurrentStep(step + 1);
					} else if (step === 3) {
						const pathID = path.getAttribute("data-apartment-id");
						setAppartmentID(pathID);
						appartmentID && setActiveApartment(appartment.data);
					}
				});
			});
		}
	}, [complex, svgWrap, stringSvg]);
	return <div className="buildings" ref={svgWrap}></div>;
};
