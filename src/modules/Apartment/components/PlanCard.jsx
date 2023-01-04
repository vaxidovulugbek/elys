import { Link } from "react-router-dom";
import { get } from "lodash";
import { Button } from "components";
import { useSelector } from "react-redux";

export const PlanCard = ({ item, onClick = () => {}, onDelete = () => {}, link }) => {
	const lngCode = useSelector((state) => state.system.lngCode);
	return (
		<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 building-card">
			<div className="object__card">
				<div className="object__img p-3">
					<img
						src={
							get(item, "files.thumbnails.thumb") ||
							require("assets/images/section-img.png")
						}
						alt="section_image"
					/>

					<div className="d-flex align-items-center object__btns">
						<Button
							className="object__action bg_green"
							onClick={(event) => onClick(get(item, "id"))}
							append={
								<svg width="24" height="24" viewBox="0 0 24 24">
									<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
								</svg>
							}
						/>

						<Button
							className="object__action bg_red"
							onClick={(event) => onDelete(get(item, "id"))}
							append={
								<svg width="24" height="24" viewBox="0 0 24 24">
									<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
								</svg>
							}
						/>
					</div>
				</div>

				<div className="object__content">
					<Link to={link} className="object__title">
						{get(item, `name.${lngCode}`)}
					</Link>
					{get(item, "count") && <span>count: {get(item, "count")}</span>}
					{get(item, "area") && <span>area: {get(item, "area")}</span>}
				</div>
			</div>
		</div>
	);
};
