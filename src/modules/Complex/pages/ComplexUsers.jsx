import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "lodash";

import { notifications } from "services";

import { ListPagination, PageHeading, Button, Modals } from "components";
import { useDelete, useFetchList, useFetchOneWithId } from "hooks";
import { ComplexUsersForm } from "../components/ComplexUsersForm";
import { ComplexUsersTable } from "../components/ComplexUserTable";
import { useModalWithHook } from "hooks/useModalWithHook";

const ComplexUsers = () => {
	const { complexID } = useParams();

	const modal = useModalWithHook();

	const [page, setPage] = useState(1);

	const { data, setId } = useFetchOneWithId({
		url: "/user-complex",
		queryOptions: {
			enabled: false,
		},
		urlSearchParams: { include: "user" },
		refetchStatus: modal.isOpen,
	});

	const deleteTariff = useDelete({
		url: "/user-complex",
	});

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

	const handleEdit = (row) => {
		setId(row.id);
		modal.handleOverlayOpen();
	};

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
			<PageHeading
				title="Users"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "", name: "Users" },
				]}
				renderButtons={() => (
					<Button
						onClick={() => {
							setId(null);
							modal.handleOverlayOpen();
						}}
						innerText="Create"
						className="btn btn_green"
						size="sm"
					/>
				)}
			/>

			<ComplexUsersTable
				items={complexUsers.data}
				onDelete={confirmDelete}
				onEdit={handleEdit}
			/>

			<ComplexUsersForm
				complexID={complexID}
				data={data}
				modal={modal}
				complexUsers={complexUsers}
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
