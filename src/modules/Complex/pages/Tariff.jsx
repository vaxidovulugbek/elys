import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "lodash";

import { ListPagination, PageHeading, Button, Modals } from "components";
import { TariffTable } from "../components/TariffTable";
import { useDelete, useFetchList, useOverlay } from "hooks";
import { TariffAdd } from "../components/TariffAdd";

const Tariff = () => {
	const { complexID } = useParams();
	const modal = useOverlay("tariff-modal");

	const deleteTariff = useDelete({
		url: "/tariff",
	});

	const [page, setPage] = useState(1);
	const tariffs = useFetchList({
		url: "/tariff",
		urlSearchParams: {
			page,
			filter: {
				complex_id: complexID,
			},
		},
	});

	const confirmDelete = (event, item) => {
		Modals.deletePermission({
			title: "Delete a project?",
			icon: "error",
			text: "All data concerning this project will be deleted.",
			receivePermission: () =>
				deleteTariff.mutateAsync(get(item, "id")).then((res) => tariffs.refetch()),
		});
	};

	return (
		<>
			<TariffAdd
				isOpen={modal.isOpen}
				complexID={complexID}
				onClose={modal.handleOverlayClose}
				onSuccess={() => {
					tariffs.refetch();
					modal.handleOverlayClose();
				}}
			/>

			<PageHeading
				title="Tariffs"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "", name: "Tariff" },
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

			<TariffTable items={tariffs.data} onDelete={confirmDelete} />

			<ListPagination
				pageCount={get(tariffs, "meta.pageCount")}
				onPageChange={(page) => {
					setPage(page + 1);
				}}
			/>
		</>
	);
};

export default Tariff;
