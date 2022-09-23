import React from "react";

import cn from "classnames";

import { Button } from "components";

export const SearchForm = ({ className, onClick }) => {
	return (
		<div className={cn("row search-form", className)}>
			<div className="col-6">
				<label className="form-control cursor_text">
					<input className="form-control__input" type="search" placeholder="Search..." />
					<Button
						type="button"
						className="search-form__btn"
						onClick={onClick}
						append={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="#4c5667"
							>
								<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
							</svg>
						}
					/>
				</label>
			</div>
			<div className="auto-width">
				<Button
					type="button"
					className="btn btn_green"
					onClick={onClick}
					innerText="+ Add"
					style={{ height: "36px" }}
				/>
			</div>
		</div>
	);
};
