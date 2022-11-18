import React from "react";
import { constants, notifications, time } from "services";

import { ModalRoot, Fields, Modals } from "components";
import { get } from "lodash";

const translatedOptions = constants.sectionStatusOptions;

export const ComplexUsersAdd = ({ modal, onClose, data, onSuccess, complexID }) => {
	return (
		<ModalRoot isOpen={modal.isOpen}>
			<Modals.AddObject
				fields={[
					{
						name: "user_id",
						component: Fields.AsyncSelect,
						label: "User",
						optionValue: "id",
						optionLabel: "username",
					},
					{
						name: "expires_at",
						component: Fields.DatePicker,
						label: "Expires date",
						placeholder: "Select date",
					},
					{
						name: "status",
						component: Fields.Select,
						label: "Status",
						placeholder: "status",
						options: translatedOptions,
					},
				]}
				formFields={[
					{
						name: "user_id",
						validationType: "object",
						value: {
							label: get(data, "user.username"),
							value: get(data, "plan.id"),
						},
						onSubmitValue: (option) => get(option, "value"),
					},
					{
						name: "status",
						validationType: "number",
					},
					{
						name: "expires_at",
						onSubmitValue: (value) => time.toTimestamp(value.value),
					},
					{
						name: "complex_id",
						validationType: "number",
						value: Number(complexID),
					},
				]}
				url={get(data, "id") ? `/user-complex/${data.id}` : "/user-complex"}
				submitText={get(data, "id") ? "Save" : "Add"}
				method={get(data, "id") ? "put" : "post"}
				onClose={onClose}
				onSuccess={onSuccess}
				title={get(data, "id") ? "Update a category" : "Adding a new category"}
			/>
		</ModalRoot>
		// <ModalRoot isOpen={isOpen}>
		// 	<div className="modal__heading d-flex align-items-center justify-content-between">
		// 		<Typography Type="h2" className="modal__title" text="Add User"></Typography>
		// 		<Button type="reset" className="close" append={"×"} onClick={onClose} />
		// 	</div>

		// 	<Containers.Form
		// 		url="/user-complex"
		// 		method={method}
		// 		onSuccess={onSuccess}
		// 		onError={() => {
		// 			notifications.error("Something went wrong");
		// 			onClose();
		// 		}}
		// 		fields={[
		// 			{
		// 				name: "user_id",
		// 				validationType: "object",
		// 				onSubmitValue: (value) => Number(value.value),
		// 			},
		// 			{
		// 				name: "status",
		// 			},
		// 			{
		// 				name: "expires_at",
		// 				onSubmitValue: (value) => time.toTimestamp(value.value),
		// 			},
		// 			{
		// 				name: "complex_id",
		// 				value: complexID,
		// 			},
		// 		]}
		// 		className="row g-3"
		// 	>
		// 		{(formik) => (
		// 			<>
		// 				<div className="col-12">
		// 					<FastField
		// 						url="user"
		// 						name="user_id"
		// 						optionValue="id"
		// 						optionLabel={"username"}
		// 						component={Fields.AsyncSelect}
		// 						label="User"
		// 					/>
		// 				</div>
		// 				<div className="col-12">
		// 					<FastField
		// 						name="expires_at"
		// 						optionLabel="expires_at"
		// 						component={Fields.DatePicker}
		// 						label="Time"
		// 						placeholder="Time"
		// 					/>
		// 				</div>
		// 				<div className="col-12">
		// 					<FastField
		// 						name="status"
		// 						component={Fields.Select}
		// 						label="status"
		// 						options={translatedOptions}
		// 						placeholder="status"
		// 					/>
		// 				</div>

		// 				<div className="modal__btns d-flex align-items-center justify-content-end">
		// 					<Button
		// 						innerText="Close"
		// 						className="btn btn_outlined"
		// 						type="reset"
		// 						onClick={onClose}
		// 					/>

		// 					<Button innerText="Create" className="btn btn_green" type="submit" />
		// 				</div>
		// 			</>
		// 		)}
		// 	</Containers.Form>
		// </ModalRoot>
	);
};
