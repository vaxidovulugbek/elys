import React from "react";
import { useNavigate } from "react-router-dom";

import { get } from "lodash";
import { useSelector } from "react-redux";

export const CategoryCard = ({ item, onClick, onDelete = () => {}, link }) => {
	const lngCode = useSelector((state) => state.system.lngCode);
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(link)}
			className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card"
		>
			<div className="object__card">
				<div className="object__img p-3">
					<img
						src={
							get(item, "file.thumbnails.thumb") ||
							require("assets/images/section-img.png")
						}
						alt="section_image"
					/>

					<div className="d-flex align-items-center object__btns">
						<button
							className="object__action bg_green"
							onClick={(e) => {
								onClick && e.stopPropagation();
								onClick && onClick(get(item, "id"));
							}}
						>
							<svg width="24" height="24" viewBox="0 0 24 24">
								<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
							</svg>
						</button>

						<button
							className="object__action bg_red"
							onClick={(e) => {
								e.stopPropagation();
								onDelete(get(item, "id"));
							}}
						>
							<svg width="24" height="24" viewBox="0 0 24 24">
								<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
							</svg>
						</button>
					</div>
				</div>

				<div className="object__content">
					<h3 href="#" className="object__title">
						{get(item, `name.${lngCode}`)}
					</h3>
				</div>
			</div>
		</div>
	);
};
