import { Fields, ModalRoot, Modals } from "components";
import React from "react";
import { constants, notifications } from "services";

export const DocumentForm = ({ complexId, documentModal, documentRefetch }) => {
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
						label: ["Document name EN", <span>*</span>],
						placeholder: "Document",
					},
					{
						name: "name.ru",
						component: Fields.Input,
						label: ["Document name RU", <span>*</span>],
						placeholder: "Документ",
					},
					{
						name: "name.uz",
						component: Fields.Input,
						label: ["Document name UZ", <span>*</span>],
						placeholder: "Hujjat",
					},
					{
						name: "type",
						component: Fields.Select,
						options: constants.typeOptions,
						label: "Type",
					},
					{
						name: "file_id[3]",
						component: Fields.Upload,
						label: "Document UZ",
						placeholder: "Hujjat tanlang",
						btnText: "Upload",
						accept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					},
					{
						name: "file_id[2]",
						component: Fields.Upload,
						label: "Document RU",
						placeholder: "Выберите документ",
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
					},
					{
						name: "type",
						validationType: "number",
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
