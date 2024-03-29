/* eslint-disable no-useless-computed-key */
import React, { useState } from "react";
import cn from "classnames";
import { find, get } from "lodash";
import { useSelector } from "react-redux";

import { Buildings } from "../components";
import { useParams } from "react-router-dom";
import { useFetchList, useFetchOne } from "hooks";
import { useQueryClient } from "@tanstack/react-query";

const stepUrls = ["complex", "section", "floor"];

const include =
	"files,place,category,district,region,background,svg,vector,apartments.plan.files,apartments.plan.fields.plan_field,apartments.plan.room,apartments.section,apartments.floor,apartments.complex,apartments.pdf,apartments.bookings.owner";

const Interactive = ({ setActiveApartment, complexes, setCount }) => {
	const { id } = useParams();
	const [currentStep, setCurrentStep] = useState(1);
	const [activePathID, setActivePathID] = useState([id, 0, 0]);
	const lngCode = useSelector((state) => get(state, "system.lngCode"));
	const queryclient = useQueryClient();

	const { data } = useFetchOne({
		url: `${stepUrls[currentStep - 1]}/${activePathID[currentStep - 1]}`,
		urlSearchParams: {
			include,
		},
	});

	const pathData = useFetchList({
		url: stepUrls[currentStep],
		urlSearchParams: {
			filter: { [`${stepUrls[currentStep - 1]}_id`]: activePathID[currentStep - 1] },
		},
		queryOptions: {
			enabled: !(activePathID.length === currentStep),
		},
	});

	// steps classes
	const classNames = (num) => {
		return cn("step", {
			"has-angle": currentStep > num,
			hide: currentStep - 1 < num,
			current: currentStep === num + 1,
		});
	};

	// current complex for display name
	const currentComplex = find(complexes, { id: Number(id) });

	// query key generator
	const keyCreator = (step) => {
		return [
			"GET",
			`${stepUrls[step - 1]}/${activePathID[step - 1]}`,
			{
				include,
			},
		];
	};

	// data for step's names
	const sectionData = queryclient.getQueryData(keyCreator(2));
	const floorData = queryclient.getQueryData(keyCreator(3));

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
			</div>
			<Buildings
				{...{
					setCurrentStep,
					setActivePathID,
					activePathID,
					stepUrls,
					setActiveApartment,
					step: currentStep,
					data,
					setCount,
					pathData: pathData.data,
					key: currentStep,
				}}
			/>
		</div>
	);
};

export default Interactive;
