import React, { useState } from "react";
import { get } from "lodash";

import { notifications } from "services";

import { ListPagination, PageHeading, Button, Modals } from "components";
import { useDelete, useFetchList, useFetchOneWithId } from "hooks";
import { useModalWithHook } from "hooks/useModalWithHook";
import { UserTable } from "../components/UserTable";
import { UserForm } from "../components/UserForm";

const User = () => {
	const modal = useModalWithHook();

	const [page, setPage] = useState(1);

	const { data, setId } = useFetchOneWithId({
		url: "/user",
		queryOptions: {
			enabled: false,
		},
		urlSearchParams: {},
		refetchStatus: modal.isOpen,
	});

	const deleteUser = useDelete({
		url: "/user",
	});

	const getUser = useFetchList({
		url: "/user",
		urlSearchParams: {
			page,
		},
	});

	const onEdit = (row) => {
		setId(row.id);
		modal.handleOverlayOpen();
	};

	const confirmDelete = (event, item) => {
		Modals.deletePermission({
			title: "Delete a user?",
			icon: "error",
			text: "All data concerning this user will be deleted.",
			receivePermission: () =>
				deleteUser.mutateAsync(get(item, "id")).then((res) => {
					getUser.refetch();
					notifications.success("Deleted");
				}),
		});
	};

	return (
		<>
			<PageHeading
				title="Пользователи"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "", name: "Пользователи" },
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

			<UserTable items={getUser.data} onDelete={confirmDelete} onEdit={onEdit} />

			<UserForm data={data} modal={modal} getUser={getUser} />

			<ListPagination
				pageCount={get(getUser, "meta.pageCount")}
				onPageChange={(page) => {
					setPage(page + 1);
				}}
			/>
		</>
	);
};

export default User;
