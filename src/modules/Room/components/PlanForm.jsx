import { Fields, ModalRoot, Modals } from "components";
import { get } from "lodash";
import { notifications } from "services";

export const PlanForm = ({ planRoom, data, roomID, planList }) => {
	const onClose = () => {
		planRoom.handleOverlayClose();
	};

	const onSuccess = () => {
		planList.refetch();
		planRoom.handleOverlayClose();
		notifications.success(data ? "plan is updated" : "plan is created");
	};
	return (
		<ModalRoot isOpen={planRoom.isOpen}>
			<Modals.AddObject
				fields={[
					{
						name: "name.en",
						component: Fields.Input,
						label: ["Plan name", <span>*</span>],
						placeholder: "Plan",
					},
					{
						name: "name.ru",
						component: Fields.Input,
						label: ["Название плана", <span>*</span>],
						placeholder: "План",
					},
					{
						name: "name.uz",
						component: Fields.Input,
						label: ["Plan nomi", <span>*</span>],
						placeholder: "Plan",
					},
					{
						name: "area",
						component: Fields.Input,
						label: "Plan area",
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
						name: "area",
						validationType: "number",
						value: get(data, "area"),
						// validations: [{ type: "required" }],
					},
					{
						name: "room_id",
						validationType: "number",
						value: Number(roomID),
					},
				]}
				url={get(data, "id") ? `plan/${data.id}` : "plan"}
				submitText={get(data, "id") ? "Save" : "Add"}
				method={get(data, "id") ? "put" : "post"}
				onClose={onClose}
				onSuccess={onSuccess}
				title={get(data, "id") ? "Update a room" : "Adding a new room"}
			/>
		</ModalRoot>
	);
};
