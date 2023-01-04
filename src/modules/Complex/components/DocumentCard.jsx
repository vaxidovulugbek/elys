import React from "react";

import { get } from "lodash";

export const DocumentCard = ({ data, onDelete }) => {
	return (
		<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
			<div className="object__card">
				<a href={`${get(data, "files.uz")}`} target="_blank" download>
					<div className="object__img p-3">
						<img
							src={require("assets/images/image-document.jpg")}
							alt="section_image"
						/>

						<div className="d-flex align-items-center object__btns">
							<button
								className="object__action bg_red"
								onClick={(e) => onDelete(get(data, "id"))}
							>
								<svg width="24" height="24" viewBox="0 0 24 24">
									<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
								</svg>
							</button>
						</div>
					</div>

					<div className="object__content">
						<h4>id:{get(data, "id")}</h4>
						<h3 className="object__title">name: {get(data, "name.uz")}</h3>
					</div>
				</a>
			</div>
		</div>
	);
};
