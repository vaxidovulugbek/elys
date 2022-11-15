import React from "react";
import { FastField } from "formik";

import { constants, notifications, time } from "services";

import Containers from "containers";
import { Button, ModalRoot, Fields, Typography } from "components";

const translatedOptions = constants.sectionStatusOptions;

export const ComplexUsersAdd = ({ isOpen, onClose, formData, onSuccess, complexID, method }) => {
	return (
		<ModalRoot isOpen={isOpen}>
			<div className="modal__heading d-flex align-items-center justify-content-between">
				<Typography Type="h2" className="modal__title" text="Add User"></Typography>
				<Button type="reset" className="close" append={"×"} onClick={onClose} />
			</div>

			<Containers.Form
				url="/user-complex"
				method={method}
				onSuccess={onSuccess}
				onError={() => {
					notifications.error("Something went wrong");
					onClose();
				}}
				fields={[
					{
						name: "user_id",
						validationType: "object",
						onSubmitValue: (value) => Number(value.value),
					},
					{
						name: "status",
					},
					{
						name: "expires_at",
						onSubmitValue: (value) => time.toTimestamp(value.value),
					},
					{
						name: "complex_id",
						value: complexID,
					},
				]}
				className="row g-3"
			>
				{(formik) => (
					<>
						<div className="col-12">
							<FastField
								url="user"
								name="user_id"
								optionValue="id"
								optionLabel={"username"}
								component={Fields.AsyncSelect}
								label="User"
							/>
						</div>
						<div className="col-12">
							<FastField
								name="expires_at"
								optionLabel="expires_at"
								component={Fields.DatePicker}
								label="Time"
								placeholder="Time"
							/>
						</div>
						<div className="col-12">
							<FastField
								name="status"
								component={Fields.Select}
								label="status"
								options={translatedOptions}
								placeholder="status"
							/>
						</div>

						<div className="modal__btns d-flex align-items-center justify-content-end">
							<Button
								innerText="Close"
								className="btn btn_outlined"
								type="reset"
								onClick={onClose}
							/>

							<Button innerText="Create" className="btn btn_green" type="submit" />
						</div>
					</>
				)}
			</Containers.Form>
		</ModalRoot>
	);
};
