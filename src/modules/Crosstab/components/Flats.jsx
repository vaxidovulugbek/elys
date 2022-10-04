import React from "react";

import interaktivePng from "assets/images/interactive.png";

export const Flats = ({ setActiveApartment }) => {
	return (
		<div className="interactive-flats">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				space="preserve"
				width="1000px"
				height="797px"
				version="1.1"
				viewBox="0 0 1002.78 799.25"
				xlink="http://www.w3.org/1999/xlink"
			>
				<g>
					<rect className="master__rect" y="0.36" width="1000" height="797"></rect>
					<image href={interaktivePng} width="1000" height="797"></image>
					<polygon
						onClick={() => setActiveApartment(true)}
						className="master__apartment"
						data-element-id="58"
						points="388.42,360.8 388.42,570.98 383.69,570.98 375.02,570.98 375.02,575.71 346.22,575.71 332.71,589.22 275.91,589.22 262.11,575.41 215.86,575.41 215.86,574.02 104.79,574.02 104.79,521.01 0,521.01 0,68.17 24.97,68.17 24.97,54.6 126.25,54.6 126.25,68.55 126.25,84.59 120.23,84.59 120.23,264.59 383.61,264.59 388.92,264.59"
						data-request-form="385"
						data-id="3-х комнатная квартира 96 м²"
						data-status="free"
						data-status-text="Свободно"
					></polygon>
					<polygon
						onClick={() => setActiveApartment(true)}
						className="master__apartment"
						data-element-id="59"
						points="422.31,319.41 383.44,318.41 383.44,264.59 120.23,264.59 120.23,84.59 126.25,84.59 126.25,68.55 216.27,68.55 216.27,13.38 262.82,13.38 276.2,0 333.95,0 347.13,13.18 392.79,13.18 392.79,18.47 505.23,18.47 553.63,66.87 553.63,68.96 553.63,79.06 542.27,79.06 542.27,191.67 504.23,191.67 504.23,319.57"
						data-request-form="455"
						data-id="2-х комнатная квартира 72 м²"
						data-status="free"
						data-status-text="Свободно"
					></polygon>
					<polygon
						onClick={() => setActiveApartment(true)}
						className="master__apartment"
						data-element-id="60"
						points="551.07,319.49 504.23,319.49 504.23,191.67 542.27,191.67 542.27,79.06 553.63,79.06 553.63,68.96 569.34,68.96 569.34,54.4 639.27,54.4 639.27,68.52 659.11,68.52 659.11,54.48 728.38,54.48 728.38,68.6 752.21,68.6 752.21,260.52 623.48,260.52 623.48,319.32"
						data-request-form="473"
						data-id="1-х комнатная квартира 35 м²"
						data-status="free"
						data-status-text="Свободно"
					></polygon>
					<polygon
						onClick={() => setActiveApartment(true)}
						className="master__apartment"
						data-element-id="61"
						points="618.92,357.11 618.92,391.24 622.49,391.24 622.49,564.48 752.54,564.48 752.54,567.14 985.23,567.14 985.23,550.53 979.75,550.53 979.75,425.09 930.59,375.92 930.59,347.19 942.71,347.19 944.12,347.19 944.12,245.13 930.17,245.13 930.17,69.48 930.17,67.62 751.36,67.62 751.36,260.52 619.31,260.52"
						data-request-form="401"
						data-id="3-х комнатная квартира 97 м²"
						data-status="free"
						data-status-text="Свободно"
					></polygon>
					<polygon
						onClick={() => setActiveApartment(true)}
						className="master__apartment"
						data-element-id="62"
						points="532.94,604.03 532.94,796.06 986.55,796.06 986.55,767.05 1000,767.05 1000,665.82 985.14,665.82 985.14,567.14 752.54,567.14 752.54,564.48 532.74,563.54"
						data-request-form="456"
						data-id="2-х комнатная квартира 72 м²"
						data-status="bought"
						data-status-text="Куплено"
					></polygon>
				</g>
			</svg>
		</div>
	);
};
