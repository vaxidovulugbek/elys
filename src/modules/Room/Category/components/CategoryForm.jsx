import { Fields, ModalRoot, Modals } from "components";
import { get } from "lodash";
import React from "react";
import { notifications } from "services";

const CategoryForm = ({ categoryModal, data, categoryList }) => {
	const onClose = () => {
		categoryModal.handleOverlayClose();
	};

	const onSuccess = () => {
		categoryList.refetch();
		categoryModal.handleOverlayClose();
		notifications.success(data ? "category is updated" : "category is created");
	};
	return (
		<ModalRoot isOpen={categoryModal.isOpen}>
			<Modals.AddObject
				fields={[
					{
						name: "name.en",
						component: Fields.Input,
						label: ["Category name", <span>*</span>],
						placeholder: "Category",
					},
					{
						name: "name.ru",
						component: Fields.Input,
						label: ["Название категории", <span>*</span>],
						placeholder: "категория",
					},
					{
						name: "name.uz",
						component: Fields.Input,
						label: ["Kategoriya nomi", <span>*</span>],
						placeholder: "Kategoriya",
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
						name: "icon_id",
						validationType: "number",
						value: get(data, "icon_id", 13),
						// validations: [{ type: "required" }],
					},
				]}
				url={get(data, "id") ? `category/${data.id}` : "category"}
				submitText={get(data, "id") ? "Save" : "Add"}
				method={get(data, "id") ? "put" : "post"}
				onClose={onClose}
				onSuccess={onSuccess}
				title={get(data, "id") ? "Update a category" : "Adding a new category"}
			/>
		</ModalRoot>
	);
};

export default CategoryForm;
