/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { get, isArray } from "lodash";
import cn from "classnames";

const Chess = ({ setActiveApartment, data, filterFunc, setCount }) => {
	const [floorsCount, setFloorsCount] = useState(0);
	const lngCode = useSelector((state) => get(state, "system.lngCode"));

	useEffect(() => {
		setCount();
	}, []);

	return (
		<div className="chess-box">
			<div className="chess-table">
				<div className="floors">
					{Array(floorsCount)
						.fill(1)
						.map((item, index) => (
							<span key={index}>
								<p>{floorsCount - index}</p>
								<span className="bg"></span>
							</span>
						))}
				</div>

				<div className="tables">
					{isArray(data) &&
						data.map((section, index) => {
							let floors = isArray(section)
								? section
								: Object.values(get(section, "floors", []));

							floorsCount < floors.length && setFloorsCount(floors.length);

							if (floorsCount > floors.length) {
								floors = [
									...Array(floorsCount - floors.length).fill({
										apartments: [{}],
									}),
									...floors,
								];
							}

							return (
								<div className="table" key={index}>
									<div className="titles top">
										<h5>{get(section, `name.${lngCode}`)}</h5>
									</div>
									<table>
										<tbody>
											{floors.map((floor, rowIndex) => (
												<tr key={rowIndex}>
													{get(floor, "apartments", []).map(
														(apartment, colIndex) => {
															if (colIndex === 0) {
																return (
																	<td
																		key={colIndex}
																		className={cn({
																			inActive:
																				!filterFunc(
																					apartment
																				),
																		})}
																		style={{
																			visibility: apartment
																				? "visible"
																				: "hidden",
																		}}
																	>
																		<span
																			className={`status-${get(
																				apartment,
																				"status"
																			)}`}
																			onClick={() =>
																				setActiveApartment(
																					apartment
																				)
																			}
																		>
																			{get(
																				apartment,
																				"plan.room.name.en"
																			)}
																			{Boolean(
																				get(
																					apartment,
																					"discount"
																				)
																			) ? (
																				<div>
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						viewBox="0 0 512 512"
																					>
																						<path d="M256 101L294.8 38.97C309.9 14.73 336.5 0 365.1 0H368C412.2 0 448 35.82 448 80C448 98.01 442 114.6 432 128H464C490.5 128 512 149.5 512 176V240C512 260.9 498.6 278.7 480 285.3V448C480 483.3 451.3 512 416 512H96C60.65 512 32 483.3 32 448V285.3C13.36 278.7 0 260.9 0 240V176C0 149.5 21.49 128 48 128H79.99C69.95 114.6 64 98.01 64 80C64 35.82 99.82 0 144 0H146.9C175.5 0 202.1 14.73 217.2 38.97L256 101zM365.1 32C347.5 32 331.2 41.04 321.9 55.93L276.9 128H368C394.5 128 416 106.5 416 80C416 53.49 394.5 32 368 32H365.1zM235.1 128L190.1 55.93C180.8 41.04 164.5 32 146.9 32H144C117.5 32 96 53.49 96 80C96 106.5 117.5 128 144 128H235.1zM48 160C39.16 160 32 167.2 32 176V240C32 248.8 39.16 256 48 256H240V160H48zM272 256H464C472.8 256 480 248.8 480 240V176C480 167.2 472.8 160 464 160H272V256zM240 288H64V448C64 465.7 78.33 480 96 480H240V288zM272 480H416C433.7 480 448 465.7 448 448V288H272V480z" />
																					</svg>
																				</div>
																			) : (
																				""
																			)}
																		</span>
																	</td>
																);
															}
															return (
																<td
																	key={colIndex}
																	className={cn({
																		inActive:
																			!filterFunc(apartment),
																	})}
																>
																	<span
																		onClick={() =>
																			setActiveApartment(
																				apartment
																			)
																		}
																		className={`status-${get(
																			apartment,
																			"status"
																		)}`}
																	>
																		{get(
																			apartment,
																			"plan.room.name.en"
																		)}
																		{Boolean(
																			get(
																				apartment,
																				"discount"
																			)
																		) ? (
																			<div>
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					viewBox="0 0 512 512"
																				>
																					<path d="M256 101L294.8 38.97C309.9 14.73 336.5 0 365.1 0H368C412.2 0 448 35.82 448 80C448 98.01 442 114.6 432 128H464C490.5 128 512 149.5 512 176V240C512 260.9 498.6 278.7 480 285.3V448C480 483.3 451.3 512 416 512H96C60.65 512 32 483.3 32 448V285.3C13.36 278.7 0 260.9 0 240V176C0 149.5 21.49 128 48 128H79.99C69.95 114.6 64 98.01 64 80C64 35.82 99.82 0 144 0H146.9C175.5 0 202.1 14.73 217.2 38.97L256 101zM365.1 32C347.5 32 331.2 41.04 321.9 55.93L276.9 128H368C394.5 128 416 106.5 416 80C416 53.49 394.5 32 368 32H365.1zM235.1 128L190.1 55.93C180.8 41.04 164.5 32 146.9 32H144C117.5 32 96 53.49 96 80C96 106.5 117.5 128 144 128H235.1zM48 160C39.16 160 32 167.2 32 176V240C32 248.8 39.16 256 48 256H240V160H48zM272 256H464C472.8 256 480 248.8 480 240V176C480 167.2 472.8 160 464 160H272V256zM240 288H64V448C64 465.7 78.33 480 96 480H240V288zM272 480H416C433.7 480 448 465.7 448 448V288H272V480z" />
																				</svg>
																			</div>
																		) : (
																			""
																		)}
																	</span>
																</td>
															);
														}
													)}
												</tr>
											))}
										</tbody>
									</table>
									<div className="titles bottom">
										<h5>{get(section, `name.${lngCode}`)}</h5>
									</div>
								</div>
							);
						})}
				</div>
				<div className="floors">
					{Array(floorsCount)
						.fill(1)
						.map((item, index) => (
							<span key={index}>
								<p>{floorsCount - index}</p>
								<span className="bg"></span>
							</span>
						))}
				</div>
			</div>
		</div>
	);
};

Chess.defaultProps = {
	data: [],
	setFloorsCount: () => {},
	floorsCount: 0,
};

export default Chess;
