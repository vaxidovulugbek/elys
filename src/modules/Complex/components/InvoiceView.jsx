import { ModalRoot } from "components";
import { get } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { constants, time } from "services";

import "./../styles/InvoiceView.scss";

export const InvoiceView = ({ modal, data }) => {
	const { t } = useTranslation();
	const lngCode = useSelector((state) => state.system.lngCode);

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
								<span>{t("Complex")}</span>
								<input
									type="text"
									disabled
									value={get(data, `complex.name.${lngCode}`)}
								/>
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>{t("Apartment")}</span>
								<input
									type="text"
									disabled
									value={get(data, `apartment.name.${lngCode}`)}
								/>
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>{t("Client")}</span>
								<input
									type="text"
									disabled
									value={get(data, "client.first_name")}
								/>
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>{t("Contract number")}</span>
								<input
									type="text"
									disabled
									value={get(data, "contract.contract_number")}
								/>
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>{t("Date")}</span>
								<input type="text" disabled value={date} />
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>{t("Status")}</span>
								<input type="text" disabled value={status} />
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>{t("Approved at")}</span>
								<input type="text" disabled value={approved_at} />
							</label>
						</div>
						<div className="invoce__form-wrapper col-6">
							<label>
								<span>{t("Canceled at")}</span>
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
		</ModalRoot>
	);
};
