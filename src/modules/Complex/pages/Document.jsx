import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { notifications } from "services";
import { useDelete, useFetchList, useOverlay } from "hooks";

import Containers from "containers";
import { Button, Modals, PageHeading } from "components";
import { DocumentCard } from "../components/DocumentCard";
import { DocumentForm } from "modules/Complex/components/DocumentForm";

const Document = () => {
	const { complexID } = useParams();
	const documentModal = useOverlay("documentModal");
	const [complexId, setComplexId] = useState();

	const handleDocument = (id) => {
		setComplexId(id);
		documentModal.handleOverlayOpen();
	};

	const documentList = useFetchList({
		url: "/document",
		urlSearchParams: { filter: { complex_id: complexID } },
		queryOptions: { enabled: false },
	});

	const { mutate } = useDelete({
		url: "/document",
		queryOptions: { onSuccess: () => onDeleteSuccess() },
	});

	const onDeleteSuccess = () => {
		notifications.success("Document deleted");
		documentList.refetch();
	};

	const onDeleteDocument = (id) => {
		const receivePermission = () => {
			mutate(id);
		};
		Modals.deletePermission({
			title: "Delete a document?",
			icon: "error",
			text: "All data concerning this document will be deleted.",
			receivePermission,
		});
	};
	return (
		<>
			<PageHeading
				title="My complex document"
				links={[
					{ url: "/", name: "Control Panel" },
					{ url: "/", name: "My Complex" },
					{ url: "", name: "Document" },
				]}
				renderButtons={() => (
					<Button
						onClick={documentModal.handleOverlayOpen}
						innerText="Create"
						className="btn btn_green"
						size="sm"
					/>
				)}
			/>
			<div className="row gap">
				<Containers.List
					url="/document"
					urlSearchParams={{ filter: { complex_id: complexID } }}
				>
					{({ data }) => {
						return (
							<>
								{Array.isArray(data) &&
									data.map((item, index) => (
										<div
											className="col-lg-3 col-xl-2 col-md-4 col-sm-4 col-6 building-card"
											key={index}
										>
											<DocumentCard
												key={index}
												onDelete={onDeleteDocument}
												data={item}
											/>
										</div>
									))}
							</>
						);
					}}
				</Containers.List>
			</div>

			<DocumentForm documentModal={documentModal} complexId={complexId} />
		</>
	);
};

export default Document;
