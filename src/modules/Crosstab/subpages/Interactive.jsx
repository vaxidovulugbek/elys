import React, { useState } from "react";
import cn from "classnames";

import { Buildings } from "../components";
import { Flats } from "../components";
import { Sections } from "../components";

const Interactive = ({ setHasApartment }) => {
	const [currentStep, setCurrentStep] = useState(1);
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
			{currentStep === 1 && <Buildings {...{ setCurrentStep }} />}
			{currentStep === 2 && <Sections {...{ setCurrentStep }} />}
			{currentStep === 3 && <Flats {...{ setHasApartment }} />}
		</div>
	);
};

export default Interactive;
