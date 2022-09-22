import React from "react";
import {
	YMaps,
	Map,
	Placemark,
	ZoomControl,
	FullscreenControl,
	GeolocationControl,
	SearchControl,
	TypeSelector,
} from "react-yandex-maps";
import PropTypes from "prop-types";

import "components/MyMap/MyMap.scss";

export const MyMap = ({ lat = "", lon = "", onPlaceChange }) => {
	if (lat === "" && lon === "") {
		lat = 41.311081;
		lon = 69.240562;
	}

	return (
		<YMaps>
			<div className="mymap">
				<Map
					defaultState={{
						center: [lat, lon],
						zoom: 13,
						controls: [],
					}}
					width="100%"
					height="500px"
				>
					<FullscreenControl />
					<ZoomControl options={{ float: "right" }} />
					<GeolocationControl options={{ float: "left" }} />
					<SearchControl options={{ float: "right" }} />
					<TypeSelector options={{ float: "right" }} />
					<Placemark
						options={{ useMapMarginInDragging: true, draggable: true }}
						geometry={[Number(lat), Number(lon)]}
						modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
						properties={{ hintContent: "GeoPosition" }}
						onDragEnd={(e) => {
							const coordinates = e.get("target").geometry.getCoordinates();
							onPlaceChange(coordinates);
						}}
					/>
				</Map>
			</div>
		</YMaps>
	);
};

MyMap.propTypes = {
	lat: PropTypes.string,
	lon: PropTypes.string,
	onPlaceChange: PropTypes.func,
};
