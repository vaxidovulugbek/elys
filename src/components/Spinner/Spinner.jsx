import React from "react";

import "./Spinner.scss";

export const Spinner = (props) => {
	return (
		<div className="spinner">
			<div className="spinner__inner">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
