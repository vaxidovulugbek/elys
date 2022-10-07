import { Fields, ModalRoot, Modals } from "components";
import React from "react";
import { notifications } from "services";

export const DocumentForm = ({ complexId, documentModal }) => {
	const onClose = () => {
		documentModal.handleOverlayClose();
	};

	const onSuccess = () => {
		documentModal.handleOverlayClose();
		notifications.success("document is created");
	};
	return (
		<ModalRoot isOpen={documentModal.isOpen}>
			<Modals.AddObject
				fields={[
					{
						name: "name.en",
						component: Fields.Input,
						label: ["Document name", <span>*</span>],
						placeholder: "Document",
					},
					{
						name: "name.ru",
						component: Fields.Input,
						label: ["Название документа", <span>*</span>],
						placeholder: "Документ",
					},
					{
						name: "name.uz",
						component: Fields.Input,
						label: ["Hujjat nomi", <span>*</span>],
						placeholder: "Hujjat",
					},
					{
						name: "file_id[0]",
						component: Fields.Upload,
						label: "Hujjat yuklash",
						placeholder: "Hujjat tanlang",
						btnText: "Upload",
						accept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					},
					{
						name: "file_id[1]",
						component: Fields.Upload,
						label: "Загрузить документ",
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
						value: 1,
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
