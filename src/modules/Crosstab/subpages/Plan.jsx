import React, { useState } from "react";
import { get } from "lodash";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Containers from "containers";
import { isArray } from "lodash";
import { functions } from "services";

const Plan = ({ setActiveApartment, filterFunc }) => {
	const lngCode = useSelector((state) => state.system.lngCode);

	const [cardIndex, setCardIndex] = useState(-1);
	const { id } = useParams();
	return (
		<div className="flats" id="flats">
			<Containers.List
				url="plan"
				urlSearchParams={{
					include:
						"apartments, apartments.complex, apartments.floor,apartments.plan.room, apartments.plan, apartments.plan.files, apartments.files ,room, files",
					filter: { complex_id: id },
				}}
			>
				{({ data }) => {
					const plans = isArray(data)
						? data.map((plan) => {
								const apartments = get(plan, "apartments", []);
								let filteredApartments = [];
								if (isArray(apartments))
									filteredApartments = apartments.filter((apartment) =>
										filterFunc(apartment)
									);
								return {
									...plan,
									apartments: filteredApartments,
								};
						  })
						: [];
					return (
						<>
							{plans.map((item, planIndex) =>
								get(item, "apartments", []).length ? (
									<span key={planIndex}>
										<div
											className="card"
											onClick={() =>
												setActiveApartment(
													filterFunc(
														get(data, `[${planIndex}].apartments[0]`)
													) && get(data, `[${planIndex}].apartments[0]`)
												)
											}
										>
											<div className="top">
												<h2>{get(item, `name.${lngCode}`)}</h2>
											</div>
											<div className="center">
												<img
													src={get(item, "files[0].thumbnails.small")}
													alt="room plan"
												/>
												<div className="coast-wrap">
													<div className="coast">
														от{" "}
														<span className="plan-min-price-value">
															{get(item, "cheapest")}
														</span>
														UZS
													</div>
												</div>
											</div>
											<div className="bottom">
												<div className="surface">
													<span className="name">Общ. площадь</span>
													<span className="val">
														{get(item, "area")} м<sup>2</sup>
													</span>
												</div>
												<div className="room-count">
													<span className="name">Комнат</span>
													<div className="val">
														{get(item, "room.count")}
													</div>
												</div>
											</div>
											<div
												className="floors"
												onClick={() => {
													cardIndex === planIndex
														? setCardIndex(-1)
														: setCardIndex(planIndex);
												}}
											>
												<button>
													Найдено <strong>7</strong> помещений
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 384 512"
													>
														<path d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z" />
													</svg>
												</button>
												<div
													className="flats-modal"
													style={{
														display:
															cardIndex === planIndex
																? "block"
																: "none",
													}}
												>
													{isArray(get(item, "apartments")) &&
														get(item, "apartments").map(
															(apartment, index) => (
																<div
																	className="flat"
																	key={index}
																	onClick={(e) => {
																		e.stopPropagation();
																		setActiveApartment(
																			apartment
																		);
																	}}
																>
																	<div className="position">
																		<div className="number">
																			<span
																				className={`status-${get(
																					apartment,
																					"status"
																				)}`}
																			></span>
																			<span>
																				№
																				{get(
																					apartment,
																					"sort"
																				)}
																			</span>
																		</div>
																		<p className="floor">
																			Этаж -
																			{get(
																				apartment,
																				"floor.sort"
																			)}
																		</p>
																	</div>
																	<div className="price">
																		<p className="total">
																			{functions.convertToReadable(
																				get(
																					apartment,
																					"price"
																				)
																			)}
																			UZS
																		</p>
																		<p className="by-metr">
																			{functions.meterPrice(
																				apartment
																			)}
																			UZS/м
																		</p>
																	</div>
																</div>
															)
														)}
												</div>
											</div>
										</div>
									</span>
								) : null
							)}
						</>
					);
				}}
			</Containers.List>
		</div>
	);
};

export default Plan;
