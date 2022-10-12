import { Button } from "components";
import React from "react";

export const TranslationAdd = ({ onClick }) => {
	return (
		<div className="card-box d-flex justify-content-between">
			<h4>Value translations</h4>
			<Button
				type="button"
				className="btn btn_green"
				onClick={onClick}
				innerText="+ Add"
				style={{ height: "36px" }}
			/>
		</div>
	);
};
