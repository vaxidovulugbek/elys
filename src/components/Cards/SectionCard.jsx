import React from "react";
import { Link } from "react-router-dom";

import { get } from "lodash";
import { RoundCircle } from "./RoundCircle";
import { Button } from "components";
import { useSelector } from "react-redux";
import { ReactComponent as PriceIcon } from "assets/images/price-icon.svg";

export const SectionCard = ({ data, onClick = () => {}, onDelete, complexID }) => {
	const lngCode = useSelector((state) => state.system.lngCode);
	return (
		<div className="object__card">
			<div className="object__img">
				<img src={require("assets/images/object-image.jpg")} alt="objectimage" />

				<RoundCircle title={get(data, "id")} subtitle="premises" />

				<div className="d-flex align-items-center object__btns">
					<Button
						className="object__action bg_green"
						onClick={onClick}
						append={
							<svg width="24" height="24" viewBox="0 0 24 24">
								<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
							</svg>
						}
					/>

					<Button
						className="object__action bg_red"
						onClick={() => onDelete(get(data, "id"))}
						append={
							<svg width="24" height="24" viewBox="0 0 24 24">
								<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
							</svg>
						}
					/>
					<Link
						to={`/complex/${complexID}/section/${get(data, "id")}/price-list`}
						className="object__action bg_purple"
					>
						<PriceIcon fill="#fff" />
					</Link>
				</div>
			</div>

			<div className="object__content">
				<Link
					to={`/complex/${complexID}/section/${get(data, "id")}/floor`}
					className="object__title"
				>
					{get(data, `name.${lngCode}`)}
				</Link>
			</div>
		</div>
	);
};
