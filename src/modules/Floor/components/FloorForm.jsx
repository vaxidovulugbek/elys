import React from "react";
import { get } from "lodash";

import { notifications } from "services";

import { Fields, ModalRoot, Modals } from "components";

export const FloorForm = ({ sectionID, floorQuery, planModal, data }) => {
	const onSuccess = () => {
		floorQuery.refetch();
		planModal.handleOverlayClose();
		notifications.success(data ? "floor is updated" : "floor is created");
	};

	const onClose = () => {
		planModal.handleOverlayClose();
	};
	return (
		<ModalRoot isOpen={planModal.isOpen} style={{ maxWidth: "500px" }}>
			<Modals.AddObject
				onClose={onClose}
				title={"Adding plan of floor"}
				onSuccess={onSuccess}
				fields={[
					{
						name: "name.en",
						component: Fields.Input,
						label: ["Floor name", <span>*</span>],
						placeholder: "1 floor",
					},
					{
						name: "name.ru",
						component: Fields.Input,
						label: ["Название этажа", <span>*</span>],
						placeholder: "1 этаж",
					},
					{
						name: "name.uz",
						component: Fields.Input,
						label: ["Qavat nomi", <span>*</span>],
						placeholder: "1 qavat",
					},
					{
						name: "file_id",
						component: Fields.Upload,
						placeholder: "Select Image",
						btnText: "Upload",
						className: "mt-4",
					},
				]}
				formFields={[
					{
						name: "name",
						validationType: "object",
						validations: [{ type: "lng" }],
						value: {
							en: get(data, "name.en", ""),
							uz: get(data, "name.uz", ""),
							ru: get(data, "name.ru", ""),
						},
					},
					{
						name: "file_id",
						validationType: "number",
						value: get(data, "file_id"),
						// validations: [{ type: "required" }],
					},
					{
						name: "section_id",
						validationType: "number",
						value: Number(sectionID),
						validations: [{ type: "required" }],
					},
				]}
				url={get(data, "id") ? `floor/${data.id}` : "floor"}
				submitText={get(data, "id") ? "Save" : "Add"}
				method={get(data, "id") ? "put" : "post"}
			/>
		</ModalRoot>
	);
};
