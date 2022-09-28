import React, { useState } from "react";
import { get } from "lodash";
import { useParams } from "react-router-dom";

import room from "assets/images/room.png";
import Containers from "containers";

const Plan = ({ setHasApartment }) => {
	const [cardIndex, setCardIndex] = useState(-1);
	const { id } = useParams();
	return (
		<div className="flats" id="flats">
			<Containers.List
				url="plan"
				urlSearchParams={{ include: "cheapest, room", filter: { complex_id: id } }}
			>
				{({ data }) => {
					return (
						<>
							{Array.isArray(data) &&
								data.map((item, index) => (
									<div
										className="card"
										onClick={() => setHasApartment(true)}
										key={index}
									>
										<div className="top">
											<h2>{get(item, "name.ru")}</h2>
											{/* <p>Дом 1, Секция 1</p> */}
										</div>
										<div className="center">
											<img src={room} alt="room plan" />
											<div className="coast-wrap">
												<div className="coast">
													от{" "}
													<span className="plan-min-price-value">
														{get(item, "cheapest")}
													</span>{" "}
													$
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
												<div className="val">{get(item, "room.count")}</div>
											</div>
										</div>
										<div
											className="floors"
											onClick={() => {
												cardIndex === index
													? setCardIndex(-1)
													: setCardIndex(index);
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
													display: cardIndex === index ? "block" : "none",
												}}
											>
												{Array(10)
													.fill(1)
													.map((item, index) => (
														<div className="flat" key={index}>
															<div className="position">
																<div className="number">
																	<span className="status-1"></span>
																	<span>№5</span>
																</div>
																<p className="floor">Этаж -1</p>
															</div>
															<div className="price">
																<p className="total">3 420 $</p>
																<p className="by-metr">427.5 $/м</p>
															</div>
														</div>
													))}
											</div>
										</div>
									</div>
								))}
						</>
					);
				}}
			</Containers.List>
		</div>
	);
};

export default Plan;
