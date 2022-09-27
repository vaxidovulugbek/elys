import React from "react";

import sections from "assets/images/sections.jpg";

export const Sections = ({ setCurrentStep }) => {
	return (
		<div className="sections">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				space="preserve"
				width="1900px"
				height="1000px"
				version="1.1"
				viewBox="0 0 1900 1000"
				xlink="http://www.w3.org/1999/xlink"
			>
				<g>
					<rect className="master__rect" width="1900" height="1000"></rect>
					<image href={sections} width="1900" height="1000"></image>
					<polygon
						onClick={() => setCurrentStep(3)}
						className="first_floor"
						data-name=""
						data-b24-id=""
						points="55.53,909.18 1836.17,909.18 1836.17,980.05 55.53,980.05"
					></polygon>
					<polygon
						onClick={() => setCurrentStep(3)}
						className="master__floor"
						data-name="2"
						data-b24-id="138"
						points="55.53,838.28 1836.17,838.28 1836.17,909.15 55.53,909.15"
					></polygon>
					<polygon
						onClick={() => setCurrentStep(3)}
						className="master__floor"
						data-name="3"
						data-b24-id="139"
						points="55.54,767.4 1836.17,767.4 1836.17,838.27 55.54,838.27"
					></polygon>
					<polygon
						onClick={() => setCurrentStep(3)}
						className="master__floor"
						data-name="4"
						data-b24-id="140"
						points="55.55,696.53 1836.17,696.53 1836.17,767.39 55.55,767.39"
					></polygon>
					<polygon
						onClick={() => setCurrentStep(3)}
						className="master__floor"
						data-name="5"
						data-b24-id="141"
						points="55.55,625.69 1836.17,625.69 1836.17,696.55 55.55,696.55"
					></polygon>
					<polygon
						onClick={() => setCurrentStep(3)}
						className="master__floor"
						data-name="6"
						data-b24-id="142"
						points="55.54,554.87 1836.17,554.87 1836.17,625.73 55.54,625.73"
					></polygon>
					<polygon
						onClick={() => setCurrentStep(3)}
						className="master__floor"
						data-name="7"
						data-b24-id="143"
						points="55.54,484.08 1836.17,484.08 1836.17,554.94 55.54,554.94"
					></polygon>
					<polygon
						onClick={() => setCurrentStep(3)}
						className="master__floor"
						data-name="8"
						data-b24-id="144"
						points="55.53,413.2 1836.17,413.2 1836.17,484.07 55.53,484.07"
					></polygon>
					<polygon
						onClick={() => setCurrentStep(3)}
						className="master__floor"
						data-name="9"
						data-b24-id="145"
						points="55.54,342.36 1836.17,342.36 1836.17,413.23 55.54,413.23"
					></polygon>
					<polygon
						onClick={() => setCurrentStep(3)}
						className="master__floor"
						data-name="10"
						data-b24-id="146"
						points="55.54,271.54 1836.17,271.54 1836.17,342.4 55.54,342.4"
					></polygon>
				</g>
			</svg>
		</div>
	);
};
