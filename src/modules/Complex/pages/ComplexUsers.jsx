import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "lodash";

import { notifications } from "services";

import { ListPagination, PageHeading, Button, Modals } from "components";
import { useDelete, useFetchList, useOverlay } from "hooks";
import { ComplexUsersAdd } from "../components/ComplexUserAdd";
import { ComplexUsersTable } from "../components/ComplexUserTable";
// import { useFetchOneWithId } from "./../../../hooks/useFetchOneWithId";

const ComplexUsers = () => {
	const { complexID } = useParams();
	const modal = useOverlay("complex-user-modal");

	const deleteTariff = useDelete({
		url: "/user-complex",
	});

	const [page, setPage] = useState(1);
	const complexUsers = useFetchList({
		url: "/user-complex",
		urlSearchParams: {
			page,
			filter: {
				complex_id: complexID,
			},
			include: "user",
		},
	});

	const confirmDelete = (event, item) => {
		Modals.deletePermission({
			title: "Delete a project?",
			icon: "error",
			text: "All data concerning this project will be deleted.",
			receivePermission: () =>
				deleteTariff.mutateAsync(get(item, "id")).then((res) => {
					complexUsers.refetch();
					notifications.success("Deleted");
				}),
		});
	};

	return (
		<>
			<ComplexUsersAdd
				isOpen={modal.isOpen}
				complexID={complexID}
				onClose={modal.handleOverlayClose}
				onSuccess={() => {
					complexUsers.refetch();
					modal.handleOverlayClose();
					notifications.success("User is created");
				}}
				method={"post"}
			/>

			<PageHeading
				title="Users"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "", name: "Users" },
				]}
				renderButtons={() => (
					<Button
						onClick={modal.handleOverlayOpen}
						innerText="Create"
						className="btn btn_green"
						size="sm"
					/>
				)}
			/>

			<ComplexUsersTable
				items={complexUsers.data}
				onDelete={confirmDelete}
				// onEdit={handleEdit}
			/>

			<ListPagination
				pageCount={get(complexUsers, "meta.pageCount")}
				onPageChange={(page) => {
					setPage(page + 1);
				}}
			/>
		</>
	);
};

export default ComplexUsers;
