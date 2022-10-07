import React from "react";

import { Button, MyMap, Typography } from "components";

export const MapModal = ({ onClose, onPlaceChange, coordinates = [] }) => {
	return (
		<>
			<div className="modal__heading d-flex align-items-center justify-content-between">
				<Typography Type="h2" className="modal__title" text="Coordinate" />
				<Button className="close" onClick={onClose} append="×" />
			</div>

			<MyMap lat={coordinates[0]} lon={coordinates[1]} onPlaceChange={onPlaceChange} />

			<div className="d-flex justify-content-end mt-3">
				<Button onClick={onClose} innerText="Ready" className="btn btn_green" size="sm" />
			</div>
		</>
	);
};
