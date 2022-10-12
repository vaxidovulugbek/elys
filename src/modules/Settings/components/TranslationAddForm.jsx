import React from "react";

import { Fields, ModalRoot, Modals } from "components";
import { notifications } from "services";

export const TranslationAddForm = ({ translationModal, translations }) => {
	const onSuccess = () => {
		notifications.success("translation is created");
		translationModal.handleOverlayClose();
		translations.refetch();
	};

	const onClose = () => {
		translationModal.handleOverlayClose();
	};

	return (
		<ModalRoot isOpen={translationModal.isOpen}>
			<Modals.AddObject
				fields={[
					{
						name: "message",
						component: Fields.Input,
						label: ["Message name", <span>*</span>],
						placeholder: "Message",
					},
				]}
				formFields={[
					{
						name: "message",
						validationType: "string",
						validations: [{ type: "required" }],
					},
				]}
				url={"/translation/create"}
				method={"post"}
				submitText={"Add"}
				title={"Adding a new translation"}
				onSuccess={onSuccess}
				onClose={onClose}
			/>
		</ModalRoot>
	);
};
