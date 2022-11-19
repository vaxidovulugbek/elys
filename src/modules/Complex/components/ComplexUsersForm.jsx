import React from "react";
import { constants, notifications, time } from "services";

import { ModalRoot, Fields, Modals } from "components";
import { get } from "lodash";

const translatedOptions = constants.sectionStatusOptions;

export const ComplexUsersForm = ({ modal, complexUsers, data, complexID }) => {
	const onClose = () => {
		modal.handleOverlayClose();
	};

	const onSuccess = () => {
		complexUsers.refetch();
		notifications.success(get(data, "id") ? "User is  updated!" : "User is created!");
		modal.handleOverlayClose();
	};
	return (
		<ModalRoot isOpen={modal.isOpen}>
			<Modals.AddObject
				fields={[
					{
						name: "user_id",
						url: "/user",
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
						value: get(data, "status"),
						validationType: "number",
					},
					{
						name: "expires_at",
						value: get(data, "expires_at") * 1000,
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
				title={get(data, "id") ? "Update a user" : "Adding a new user"}
			/>
		</ModalRoot>
	);
};
