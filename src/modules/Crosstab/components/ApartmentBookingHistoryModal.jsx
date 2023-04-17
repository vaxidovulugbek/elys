import React, { useState } from "react";
import { get } from "lodash";

import { httpCLient, notifications, time } from "services";

import { Button, ModalRoot, Table, Typography } from "components";

export const ApartmentBookingHistoryModal = ({
	bookHistory,
	bookings,
	apartmentId,
	setActiveApartment,
	refetch,
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const cancelBook = () => {
		setIsLoading(true);
		httpCLient
			.post("/apartment-booking/cancel", {
				apartment_id: apartmentId,
			})
			.then(() => {
				bookHistory.handleOverlayClose();
				setActiveApartment(false);
				notifications.success("Успешно");
				refetch();
			})
			.catch(() => {
				notifications.error("Что то пошло не так");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<ModalRoot isOpen={bookHistory.isOpen} className="max-width_700">
			<div className="modal__heading d-flex align-items-center justify-content-between">
				<Typography Type="h2" className="modal__title" text="Book History" />
				<Button className="close" onClick={bookHistory.handleOverlayClose} append="×" />
			</div>

			<Table
				columns={[
					{
						title: "Expires",
						dataKey: "expires_at",
						render: (value) => time.to(value),
					},
					{
						title: "Owner",
						dataKey: "owner",
						render: (value) => {
							console.log({ value });
							return `${get(value, "last_name")} ${get(value, "first_name")}`;
						},
					},
					{
						title: "Comment",
						dataKey: "comment",
						render: (value) => value,
					},
				]}
				items={bookings}
			/>

			<div className="d-flex justify-content-end mt-3">
				<Button
					innerText="Close"
					className="btn btn_outlined mr_10"
					type="reset"
					onClick={() => bookHistory.handleOverlayClose()}
				/>

				<Button
					innerText="Cancel"
					className="btn btn_green"
					isLoading={isLoading}
					onClick={cancelBook}
				/>
			</div>
		</ModalRoot>
	);
};
