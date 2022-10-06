import React, { useState } from "react";
import cn from "classnames";

import { Buildings } from "../components";
import { Flats } from "../components";
import { Sections } from "../components";

const Interactive = ({ setActiveApartment, complex }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [activePathID, setActivePathID] = useState(0);
	const classNames = (num) => {
		return cn("step", {
			"has-angle": currentStep > num,
			hide: currentStep - 1 < num,
			current: currentStep === num + 1,
		});
	};

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
			{currentStep === 1 && <Buildings {...{ setCurrentStep, setActivePathID }} />}
			{currentStep === 2 && <Sections {...{ setCurrentStep, setActivePathID }} />}
			{currentStep === 3 && <Flats {...{ setActiveApartment, activePathID }} />}
		</div>
	);
};

export default Interactive;
