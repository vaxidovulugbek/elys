import React from "react";
import { constants, notifications } from "services";

import { ModalRoot, Fields, Modals } from "components";
import { get } from "lodash";

const translatedOptions = constants.sectionStatusOptions;

export const UserForm = ({ modal, getUser, data }) => {
	const onClose = () => {
		modal.handleOverlayClose();
	};

	const onSuccess = () => {
		getUser.refetch();
		notifications.success(get(data, "id") ? "User is  updated!" : "User is created!");
		modal.handleOverlayClose();
	};
	return (
		<ModalRoot isOpen={modal.isOpen}>
			<Modals.AddObject
				fields={[
					{
						name: "first_name",
						component: Fields.Input,
						placeholder: "Ism",
						label: "Ism",
					},
					{
						name: "last_name",
						component: Fields.Input,
						label: "Familiya",
						placeholder: "Familiya",
					},
					{
						name: "username",
						component: Fields.Input,
						label: "Username",
						placeholder: "Username",
					},
					{
						name: "phone",
						component: Fields.PhoneInput,
						label: "Phone",
						placeholder: "Phone",
					},
					{
						name: "password",
						component: Fields.Input,
						label: "Password",
						placeholder: "Password",
					},
					{
						name: "email",
						component: Fields.Input,
						label: "email",
						placeholder: "email",
					},
					{
						name: "status",
						component: Fields.Select,
						label: "Status",
						placeholder: "status",
						options: translatedOptions,
					},
					{
						name: "role",
						component: Fields.Select,
						label: "role",
						placeholder: "role",
						options: [{ value: 1, label: "admin" }],
					},
				]}
				formFields={[
					{
						name: "first_name",
						validationType: "string",
						value: get(data, "first_name"),
					},
					{
						name: "last_name",
						validationType: "string",
						value: get(data, "last_name"),
					},
					{
						name: "username",
						validationType: "string",
						value: get(data, "username"),
					},
					{
						name: "phone",
						validationType: "number",
						value: get(data, "phone"),
					},
					{
						name: "status",
						value: get(data, "status"),
						validationType: "number",
					},
					{
						name: "role",
						value: get(data, "role"),
						validationType: "number",
					},
					{
						name: "password",
						value: get(data, "password"),
						validationType: "string",
					},
					{
						name: "email",
						value: get(data, "email"),
						validations: [{ type: "required" }, { type: "email" }],
					},
				]}
				url={get(data, "id") ? `/user/${data.id}` : "/user/create"}
				submitText={get(data, "id") ? "Save" : "Add"}
				method={get(data, "id") ? "put" : "post"}
				onClose={onClose}
				onSuccess={onSuccess}
				title={get(data, "id") ? "Update a user" : "Adding a new user"}
			/>
		</ModalRoot>
	);
};
