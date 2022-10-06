import React from "react";
import PropTypes from "prop-types";

import { Button, Typography } from "components";

import "./Confirm.scss";
import { ReactComponent as CloseIcon } from "assets/images/close-icon.svg";
import { ReactComponent as TrashIcon } from "assets/images/delete-icon.svg";

export const Confirm = ({
	title = "Delete blog post",
	subtitle = "Are you sure you want to delete this post? This action cannot be undone",
	cancelText = "Cancel",
	deleteText = "Delete",
	onClose,
	onDelete,
}) => {
	const handleDelete = (event) => {
		onDelete();
		onClose();
	};

	return (
		<>
			<div className=" d-flex justify-content-between">
				<div className="modal-confirm__trash">
					<TrashIcon />
				</div>

				<Button
					className="overlay__close-btn"
					onClick={onClose}
					append={<CloseIcon fill="var(--main-black)" />}
				/>
			</div>

			<div className="modal-confirm__content">
				<Typography Type="h3" className="modal-confirm__title" text={title} />
				<Typography Type="p" className="modal-confirm__subtitle" text={subtitle} />
			</div>

			<div className="row">
				<div className="col-6">
					<Button
						className="modal-confirm__cancel modal-confirm__btn"
						onClick={onClose}
						text={cancelText}
					/>
				</div>

				<div className="col-6">
					<Button
						className="modal-confirm__delete modal-confirm__btn"
						onClick={handleDelete}
						text={deleteText}
					/>
				</div>
			</div>
		</>
	);
};

Confirm.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	cancelText: PropTypes.string,
	deleteText: PropTypes.string,
	onClose: PropTypes.func,
	onDelete: PropTypes.func,
};
