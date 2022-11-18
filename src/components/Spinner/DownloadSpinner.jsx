import React from "react";

export const DownloadSpinner = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			style={{ margin: "auto", background: "rgba(241, 242, 243, 0)", display: "block" }}
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
		>
			<defs>
				<clipPath id="ldio-5h6pf6zgc5j-cp" x={0} y={0} width={100} height={100}>
					<circle cx={50} cy={50} r={36} />
				</clipPath>
			</defs>
			<circle cx={50} cy={50} r={39} fill="#ffffff" stroke="#5fbeaa" strokeWidth={2} />
			<g clipPath="url(#ldio-5h6pf6zgc5j-cp)">
				<g>
					<g transform="scale(0.5)">
						<g transform="translate(-50,-50)">
							<path
								fill="#abddd3"
								d="M71.989,44.694V8.711c0-0.419-0.34-0.759-0.759-0.759H28.769c-0.419,0-0.759,0.34-0.759,0.759v35.983H6.069 c-0.914,0-1.405,1.075-0.807,1.766l43.931,45.22c0.425,0.491,1.188,0.491,1.613,0l43.931-45.22c0.599-0.691,0.108-1.766-0.807-1.766 H71.989z"
							/>
						</g>
					</g>
					<animateTransform
						attributeName="transform"
						type="translate"
						repeatCount="indefinite"
						dur="0.9900990099009901s"
						keyTimes="0;1"
						values="50 -20;50 120"
					/>
				</g>
			</g>
		</svg>
	);
};
