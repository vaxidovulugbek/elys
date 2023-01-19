import React from "react";
import { get } from "lodash";
import { FastField } from "formik";

import { notifications, time } from "services";

import Containers from "containers";
import { Button, Fields, ModalRoot, Typography } from "components";

export const ApartmentBookModal = ({ book, activeApartment, setActiveApartment, refetch }) => {
	return (
		<ModalRoot isOpen={book.isOpen}>
			<div className="modal__heading d-flex align-items-center justify-content-between">
				<Typography Type="h2" className="modal__title" text="Book" />
				<Button className="close" onClick={book.handleOverlayClose} append="×" />
			</div>

			<Containers.Form
				url="/apartment-booking"
				method="post"
				fields={[
					{
						name: "apartment_id",
						value: get(activeApartment, "id"),
					},
					{
						name: "expires_at",
						validationType: "array",
						onSubmitValue: (value) => time.convertToTimestamp(value),
					},
					{
						name: "comment",
					},
				]}
				onSuccess={() => {
					book.handleOverlayClose();
					notifications.success("Успешно");
					setActiveApartment(false);
					refetch();
				}}
				onError={() => {
					notifications.error("Что то пошло не так");
				}}
				className="row g-4"
			>
				{({ resetForm, isSubmitting }) => (
					<>
						<div className="col-12">
							<FastField
								name="expires_at"
								component={Fields.DateInput}
								label="Expires"
							/>
						</div>

						<div className="col-12">
							<FastField
								name="comment"
								component={Fields.Input}
								label="Comment"
								isComment={true}
							/>
						</div>

						<div className="col-12">
							<div className="d-flex justify-content-end mt-3">
								<Button
									onClick={() => {
										book.handleOverlayClose();
										resetForm();
									}}
									innerText="Close"
									className="btn btn_outlined mr_10"
									type="reset"
								/>
								<Button
									innerText="Submit"
									className="btn btn_green"
									type="submit"
									isLoading={isSubmitting}
									isDisabled={isSubmitting}
								/>
							</div>
						</div>
					</>
				)}
			</Containers.Form>
		</ModalRoot>
	);
};
