import { Fields, ModalRoot, Modals } from "components";
import { get } from "lodash";
import { notifications } from "services";

export const RoomForm = ({ data, roomModal, roomList }) => {
	const onClose = () => {
		roomModal.handleOverlayClose();
	};

	const onSuccess = () => {
		roomList.refetch();
		roomModal.handleOverlayClose();
		notifications.success(data ? "room is updated" : "room is created");
	};
	return (
		<ModalRoot isOpen={roomModal.isOpen}>
			<Modals.AddObject
				fields={[
					{
						name: "name.en",
						component: Fields.Input,
						label: ["Room name", <span>*</span>],
						placeholder: "Room",
					},
					{
						name: "name.ru",
						component: Fields.Input,
						label: ["Название комнаты", <span>*</span>],
						placeholder: "Комната",
					},
					{
						name: "name.uz",
						component: Fields.Input,
						label: ["Xona nomi", <span>*</span>],
						placeholder: "Xona",
					},
					{
						name: "count",
						component: Fields.Input,
						label: "Room count",
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
						name: "count",
						validationType: "number",
						value: get(data, "count"),
						// validations: [{ type: "required" }],
					},
				]}
				url={get(data, "id") ? `room/${data.id}` : "room"}
				submitText={get(data, "id") ? "Save" : "Add"}
				method={get(data, "id") ? "put" : "post"}
				onClose={onClose}
				onSuccess={onSuccess}
				title={get(data, "id") ? "Update a room" : "Adding a new room"}
			/>
		</ModalRoot>
	);
};
