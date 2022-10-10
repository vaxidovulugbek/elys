import { Fields, ModalRoot, Modals } from "components";
import { get } from "lodash";
import { notifications } from "services";

export const PlanFieldForm = ({ data, planFieldModal, planFieldList }) => {
	const onClose = () => {
		planFieldModal.handleOverlayClose();
	};

	const onSuccess = () => {
		planFieldList.refetch();
		planFieldModal.handleOverlayClose();
		notifications.success(data ? "plan field is updated" : "plan field is created");
	};
	return (
		<ModalRoot isOpen={planFieldModal.isOpen}>
			<Modals.AddObject
				fields={[
					{
						name: "name.en",
						component: Fields.Input,
						label: ["Field name EN", <span>*</span>],
						placeholder: "Name",
					},
					{
						name: "name.ru",
						component: Fields.Input,
						label: ["Field name RU", <span>*</span>],
						placeholder: "Название",
					},
					{
						name: "name.uz",
						component: Fields.Input,
						label: ["Field name UZ", <span>*</span>],
						placeholder: "Nomi",
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
				]}
				url={get(data, "id") ? `plan-field/${data.id}` : "plan-field"}
				submitText={get(data, "id") ? "Save" : "Add"}
				method={get(data, "id") ? "put" : "post"}
				onClose={onClose}
				onSuccess={onSuccess}
				title={get(data, "id") ? "Update a plan field" : "Adding a new plan field"}
			/>
		</ModalRoot>
	);
};
