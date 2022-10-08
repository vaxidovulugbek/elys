import React, { useState } from "react";
import cn from "classnames";

import { Buildings } from "../components";
import { useParams } from "react-router-dom";

const stepUrls = ["complex", "section", "floor"];

const Interactive = ({ setActiveApartment, complex }) => {
	const { id } = useParams();
	const [currentStep, setCurrentStep] = useState(1);
	const [activePathID, setActivePathID] = useState([id]);
	const classNames = (num) => {
		return cn("step", {
			"has-angle": currentStep > num,
			hide: currentStep - 1 < num,
			current: currentStep === num + 1,
		});
	};

	console.log(complex.data, "complex");

	return (
		<div className="interactive">
			<div className="steps">
				<div className={classNames(0)} onClick={() => setCurrentStep(1)}>
					Charx Novza
				</div>
				<div className={classNames(1)} onClick={() => setCurrentStep(2)}>
					Дом 1 <span></span>
				</div>
				<div className={classNames(2)} onClick={() => setCurrentStep(3)}>
					Этаж 1 <span></span>
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
