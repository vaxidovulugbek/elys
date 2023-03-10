import React from "react";
import { get } from "lodash";

import { constants, notifications } from "services";

import { ModalRoot, Fields, Modals } from "components";

export const UserForm = ({ modal, getUser, data }) => {
	const onClose = () => {
		modal.handleOverlayClose();
	};

	const onSuccess = () => {
		getUser.refetch();
		notifications.success(get(data, "id") ? "User is  updated!" : "User is created!");
		modal.handleOverlayClose();
	};

	const onError = () => {
		notifications.error(get(data, "id") ? "User is  updated!" : "User is created!");
		modal.handleOverlayClose();
	};
	return (
		<ModalRoot isOpen={modal.isOpen}>
			<Modals.AddObject
				fields={
					get(data, "id")
						? [
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
									name: "password_confirm",
									component: Fields.Input,
									label: "Password confirm",
									placeholder: "Passwordni qayta kiriting",
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
									options: constants.userStatuses,
								},
								{
									name: "role",
									component: Fields.Select,
									label: "role",
									placeholder: "role",
									options: [
										{ value: 1, label: "editor" },
										{ value: 2, label: "operator" },
										{ value: 10, label: "admin" },
										{ value: 9, label: "user" },
									],
								},
						  ]
						: [
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
									options: constants.userStatuses,
								},
								{
									name: "role",
									component: Fields.Select,
									label: "role",
									placeholder: "role",
									options: [
										{ value: 1, label: "editor" },
										{ value: 2, label: "operator" },
										{ value: 10, label: "admin" },
										{ value: 9, label: "user" },
									],
								},
						  ]
				}
				formFields={
					get(data, "id")
						? [
								{
									name: "first_name",
									validationType: "string",
									value: get(data, "first_name"),
									validations: [{ type: "required" }],
								},
								{
									name: "last_name",
									validationType: "string",
									value: get(data, "last_name"),
									validations: [{ type: "required" }],
								},
								{
									name: "username",
									validationType: "string",
									value: get(data, "username"),
									validations: [{ type: "required" }],
								},
								{
									name: "phone",
									validationType: "number",
									value: get(data, "phone"),
									validations: [{ type: "required" }],
								},
								{
									name: "status",
									value: get(data, "status"),
									validationType: "number",
									validations: [{ type: "required" }],
								},
								{
									name: "role",
									value: get(data, "role"),
									validationType: "number",
									validations: [{ type: "required" }],
								},
								{
									name: "password",
									value: get(data, "password"),
									validationType: "string",
								},
								{
									name: "password_confirm",
									value: get(data, "password_confirm"),
									validationType: "string",
								},
								{
									name: "email",
									value: get(data, "email"),
									validations: [{ type: "required" }, { type: "email" }],
								},
						  ]
						: [
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
						  ]
				}
				url={get(data, "id") ? `/user/${data.id}` : "/user/create"}
				submitText={get(data, "id") ? "Save" : "Add"}
				method={get(data, "id") ? "put" : "post"}
				onClose={onClose}
				onSuccess={onSuccess}
				onError={onError}
				title={get(data, "id") ? "Update a user" : "Adding a new user"}
			/>
		</ModalRoot>
	);
};
