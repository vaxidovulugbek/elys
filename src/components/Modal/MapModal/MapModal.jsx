import React from "react";

import { MyMap } from "components";

export const MapModal = ({ onClose, onPlaceChange, coordinates = [] }) => {
	return (
		<>
			<div className="modal__heading d-flex align-items-center justify-content-between">
				<h2 className="modal__title">Coordinate setting</h2>
				<button className="close" onClick={onClose}>
					×
				</button>
			</div>

			<MyMap lat={coordinates[0]} lon={coordinates[1]} onPlaceChange={onPlaceChange} />
		</>
	);
};
