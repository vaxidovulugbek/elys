import { Fields, ModalRoot, Modals } from "components";
import React from "react";
import { useTranslation } from "react-i18next";
import { constants, functions, notifications } from "services";

export const DocumentForm = ({ complexId, documentModal, documentRefetch }) => {
	const { t } = useTranslation();
	const translatedTypeOptions = functions.translateConstans(t, constants.typeOptions);
	const onClose = () => {
		documentModal.handleOverlayClose();
	};

	const onSuccess = () => {
		documentModal.handleOverlayClose();
		notifications.success("document is created");
		documentRefetch && documentRefetch();
	};
	return (
		<ModalRoot isOpen={documentModal.isOpen} className={"doc_modal"}>
			<Modals.AddObject
				fields={[
					{
						name: "name.en",
						component: Fields.Input,
						label: ["Name of the document", " (EN)", <span>*</span>],
						placeholder: "Document",
					},
					{
						name: "name.ru",
						component: Fields.Input,
						label: ["Name of the document", " (RU)", <span>*</span>],

						placeholder: "Document",
					},
					{
						name: "name.uz",
						component: Fields.Input,
						label: ["Name of the document", " (UZ)", <span>*</span>],

						placeholder: "Document",
					},
					{
						name: "type",
						component: Fields.Select,
						options: translatedTypeOptions,
						defaultValue: translatedTypeOptions[0],
						label: "Type",
					},
					{
						name: "file_id.3",
						component: Fields.Upload,
						label: ["Document", " (UZ)"],
						placeholder: "Select document",
						btnText: "Upload",
						accept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					},
					{
						name: "file_id.2",
						component: Fields.Upload,
						label: ["Document", " (RU)"],
						placeholder: "Select document",
						btnText: "Upload",
						accept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					},
				]}
				formFields={[
					{
						name: "name",
						validationType: "object",
						validations: [{ type: "lng" }],
					},
					{
						name: "file_id",
						validationType: "array",
						validations: [{ type: "required" }],
					},
					{
						name: "type",
						validationType: "number",
						validations: [{ type: "required" }],
					},
					{
						name: "complex_id",
						value: Number(complexId),
					},
				]}
				url={"document"}
				method={"post"}
				submitText={"Add"}
				title={"Adding a new document"}
				onSuccess={onSuccess}
				onClose={onClose}
			/>
		</ModalRoot>
	);
};
