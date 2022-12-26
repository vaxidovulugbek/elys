import React from "react";
import { useTranslation } from "react-i18next";
import { time } from "services";

export const ClientViewTable = ({ items = [] }) => {
	const { t } = useTranslation();
	return (
		<>
			{items?.map((client, index) => {
				return (
					<div className="card " key={index}>
						<div className="invoice__modal">
							<div className="invice__modal-content row">
								<div className="invoce__form-wrapper col-4">
									<label>
										<span>ID</span>

										<input
											type="text"
											style={{ width: "100%" }}
											disabled
											value={client.id}
										/>
									</label>
								</div>
								<div className="invoce__form-wrapper col-4">
									<label>
										<span>{t("Name")}</span>
										<input
											type="text"
											style={{ width: "100%" }}
											disabled
											value={`${client.first_name} ${client.last_name} ${client.middle_name}`}
										/>
									</label>
								</div>
								<div className="invoce__form-wrapper col-4">
									<label>
										<span>{t("address")}</span>
										<input
											style={{ width: "100%" }}
											type="text"
											disabled
											value={client.address}
										/>
									</label>
								</div>
								<div className="invoce__form-wrapper col-4">
									<label>
										<span>{t("birthdate")}</span>
										<input
											style={{ width: "100%" }}
											type="text"
											disabled
											value={time.to(client.birthdate)}
										/>
									</label>
								</div>
								<div className="invoce__form-wrapper col-4">
									<label>
										<span>{t("email")}</span>
										<input
											type="text"
											style={{ width: "100%" }}
											disabled
											value={client.mail}
										/>
									</label>
								</div>
								<div className="invoce__form-wrapper col-4">
									<label>
										<span>{t("passport")}</span>
										<input
											type="text"
											style={{ width: "100%" }}
											disabled
											value={client.passport}
										/>
									</label>
								</div>
								<div className="invoce__form-wrapper col-4">
									<label>
										<span>{t("passport_issued_by")}</span>
										<input
											type="text"
											disabled
											style={{ width: "100%" }}
											value={client.passport_issued_by}
										/>
									</label>
								</div>
								<div className="invoce__form-wrapper col-4">
									<label>
										<span>{t("passport_issued_date")}</span>
										<input
											type="text"
											style={{ width: "100%" }}
											disabled
											value={time.to(client.passport_issued_date)}
										/>
									</label>
								</div>
								<div className="invoce__form-wrapper col-4">
									<label>
										<span>{t("phone")}</span>
										<input
											style={{ width: "100%" }}
											type="text"
											disabled
											value={client.phone}
										/>
									</label>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
};
