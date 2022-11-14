import React from "react";
import { FastField } from "formik";

import { notifications } from "services";

import Containers from "containers";
import { Button, ModalRoot, Fields, Typography } from "components";
import AsyncSelect from "components/Fields/AsyncSelect/AsyncSelect";
import { get } from "lodash";

export const ComplexUsersAdd = ({ isOpen, onClose, formData, onSuccess, complexID }) => {
	return (
		<ModalRoot isOpen={isOpen}>
			<div className="modal__heading d-flex align-items-center justify-content-between">
				<Typography Type="h2" className="modal__title" text="Add User"></Typography>
				<Button type="reset" className="close" append={"×"} onClick={onClose} />
			</div>

			<Containers.Form
				url="/user-complex"
				method="post"
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
						{console.log(formik.errors)}
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
