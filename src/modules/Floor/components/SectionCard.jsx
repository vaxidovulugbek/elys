import React from "react";
import { Link } from "react-router-dom";

export const SectionCard = () => {
	return (
		<Link to="/section/layout/update" className="object__card">
			<div className="object__img">
				<img
					src={require("assets/images/section-img2.png")}
					alt="objectimage"
					style={{
						maxWidth: "180px",
						marginRight: "auto",
						marginLeft: "auto",
						paddingTop: "10px",
					}}
				/>
				<div className="object__accommodation">
					<p>462</p>
					<p>premises</p>
				</div>

				<div className="d-flex align-items-center object__btns">
					<button className="object__action bg_green">
						<svg width="24" height="24" viewBox="0 0 24 24">
							<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
						</svg>
					</button>

					<button className="object__action bg_red">
						<svg width="24" height="24" viewBox="0 0 24 24">
							<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
						</svg>
					</button>
				</div>
			</div>

			<div className="object__content">
				<h3 href="#" className="object__title mb-2">
					A
				</h3>

				<div className="d-flex align-items-center justify-content-between">
					<span className="color_transparent">1-к </span>
					<span className="color_transparent">33.1 м2</span>
				</div>
			</div>
		</Link>
	);
};
