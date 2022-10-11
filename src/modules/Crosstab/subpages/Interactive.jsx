/* eslint-disable no-useless-computed-key */
import React, { useState } from "react";
import cn from "classnames";
import { find, get } from "lodash";
import { useSelector } from "react-redux";

import { Buildings } from "../components";
import { useParams } from "react-router-dom";
import { useFetchOne } from "hooks";
import { useQueryClient } from "@tanstack/react-query";

const stepUrls = ["complex", "section", "floor"];

const Interactive = ({ setActiveApartment, complexes }) => {
	const { id } = useParams();
	const [currentStep, setCurrentStep] = useState(1);
	const [activePathID, setActivePathID] = useState([id, 0, 0]);
	const lngCode = useSelector((state) => get(state, "system.lngCode"));
	const queryclient = useQueryClient();
	const classNames = (num) => {
		return cn("step", {
			"has-angle": currentStep > num,
			hide: currentStep - 1 < num,
			current: currentStep === num + 1,
		});
	};
	const currentComplex = find(complexes, { id: Number(id) });

	const { data } = useFetchOne({
		url: `${stepUrls[currentStep - 1]}/${activePathID[currentStep - 1]}`,
		urlSearchParams: {
			include: "files,place,category,district,region,background,svg,vector,apartments.plan",
		},
	});
	const sectionData = queryclient.getQueryData([
		"GET",
		`${stepUrls[1]}/${activePathID[1]}`,
		{
			include: "files,place,category,district,region,background,svg,vector,apartments.plan",
		},
	]);

	const floorData = queryclient.getQueryData([
		"GET",
		`${stepUrls[2]}/${activePathID[2]}`,
		{
			include: "files,place,category,district,region,background,svg,vector,apartments.plan",
		},
	]);
	console.log(floorData);
	return (
		<div className="interactive">
			<div className="steps">
				<div className={classNames(0)} onClick={() => setCurrentStep(1)}>
					{get(currentComplex, `name.${lngCode}`)}
				</div>
				<div className={classNames(1)} onClick={() => setCurrentStep(2)}>
					{get(sectionData, `data.name.${lngCode}`)} <span></span>
				</div>
				<div className={classNames(2)} onClick={() => setCurrentStep(3)}>
					{get(floorData, `data.name.${lngCode}`)} <span></span>
				</div>
				{/* <div className="step currentStep"></div> */}
			</div>
			{/* {currentStep === 1 && ( */}
			<Buildings
				{...{
					setCurrentStep,
					setActivePathID,
					activePathID,
					stepUrls,
					setActiveApartment,
					step: currentStep,
					data,
				}}
			/>
			{/* )} */}
			{/* {currentStep === 2 && (
				<Buildings {...{ setCurrentStep, setActivePathID, url: "section/", step: 2 }} />
			)} */}
			{/* {currentStep === 3 && (
				<Flats {...{ setActiveApartment, activePathID, url: "floor/", step: 3 }} />
			)} */}
		</div>
	);
};

export default Interactive;
