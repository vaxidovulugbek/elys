import React from "react";
import { functions } from "services";

export const TableClientStatistics = ({ items, columns }) => {
	return (
		<div class="card">
			{items?.map((element) => {
				return (
					<div className="p-3 " style={{ backgroundColor: "white" }} key={element.amount}>
						<div className="d-flex align-items-center p-2">
							<span className="mx-3">Amount:</span>
							<span>{functions.toFixed(Number(element.amount), 2)}</span>
						</div>
						<div className="d-flex align-items-center p-2">
							<span className="mx-3">Apartment count:</span>
							<span>{element.apartment_count}</span>
						</div>
						<div className="d-flex align-items-center p-2">
							<span className="mx-3">Client count:</span>
							<span>{element.client_count}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};
