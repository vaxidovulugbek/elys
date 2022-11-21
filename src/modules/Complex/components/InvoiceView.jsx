import { ModalRoot } from "components";
import { get } from "lodash";
import React from "react";
import { constants, time } from "services";

import "./../styles/InvoiceView.scss";

export const InvoiceView = ({ modal, data }) => {
	const onClose = () => {
		modal.handleOverlayClose();
	};

	const date = get(data, "date") && time.to(get(data, "date"));
	const status =
		get(data, "status") &&
		constants.payedStatusOptions.find((item) => item.value === get(data, "status")).label;

	const approved_at = get(data, "approved_at") && time.to(get(data, "approved_at"));
	const canceled_at = get(data, "canceled_at") && time.to(get(data, "canceled_at"));

	return (
		<ModalRoot isOpen={modal.isOpen}>
			<>
				<div className="invoice__modal">
					<div className="invice__modal-content row">
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>ID</span>
								<input type="text" disabled value={get(data, "id")} />
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>Complex</span>
								<input type="text" disabled value={get(data, "complex.name.uz")} />
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>Apartment</span>
								<input
									type="text"
									disabled
									value={get(data, "apartment.name.uz")}
								/>
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>Client</span>
								<input
									type="text"
									disabled
									value={get(data, "client.first_name")}
								/>
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>Contract number</span>
								<input
									type="text"
									disabled
									value={get(data, "contract.contract_number")}
								/>
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>Date</span>
								<input type="text" disabled value={`${date}`} />
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>Status</span>
								<input type="text" disabled value={status} />
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>Approved at</span>
								<input type="text" disabled value={approved_at} />
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>Canceled at</span>
								<input type="text" disabled value={canceled_at} />
							</label>
						</div>
					</div>
					<button
						type="reset"
						className="close invoice__close-btn"
						onClick={() => {
							onClose();
						}}
					>
						×
					</button>
				</div>
			</>

			{/* <div className="invoiceTable">
				<div className="modal__heading d-flex align-items-center justify-content-between">
					<h2 className="modal__title">Transaction {get(data, "id")}</h2>
					<button
						type="reset"
						className="close"
						onClick={() => {
							onClose();
						}}
					>
						×
					</button>
				</div>
				<table className="table invoiceTable">
					<tr>
						<th>ID</th>
						<td>{get(data, "id")}</td>
					</tr>
					<tr>
						<th>Complex</th>
						<td>{get(data, "complex.name.uz")}</td>
					</tr>
					<tr>
						<th>Apartment</th>
						<td>{get(data, "apartment.name.uz")}</td>
					</tr>
					<tr>
						<th>Client</th>
						<td>{get(data, "client.first_name")}</td>
					</tr>
					<tr>
						<th>Contract number</th>
						<td>{get(data, "contract.contract_number")}</td>
					</tr>
					<tr>
						<th>Date</th>
						<td>{get(data, "date") && time.to(get(data, "date"))}</td>
					</tr>
					<tr>
						<th>Status</th>
						<td>
							{get(data, "status") &&
								constants.payedStatusOptions.find(
									(item) => item.value === get(data, "status")
								).label}
						</td>
					</tr>
					<tr>
						<th>Approved at</th>
						<td>{get(data, "approved_at") && time.to(get(data, "approved_at"))}</td>
					</tr>
					<tr>
						<th>Canceled at</th>
						<td>{get(data, "canceled_at") && time.to(get(data, "canceled_at"))}</td>
					</tr>
				</table>
			</div> */}
		</ModalRoot>
	);
};
