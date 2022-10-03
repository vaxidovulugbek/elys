import React, { useState } from "react";
import cn from "classnames";

import { ApartmentCard } from "modules/Crosstab/components/ApartmentCard";
import { ApartmentForm } from "modules/Crosstab/components/ApartmentForm";

import "@fancyapps/ui/dist/fancybox.css";
import "swiper/css";
import "swiper/css/navigation";

export const Apartment = ({ setHasApartment, hasApartment, setCurrentTab }) => {
	const [boxType, setBoxType] = useState("card");

	const apartmentClass = cn("apartment", { "apartment-closed": !hasApartment });
	return (
		<aside className={apartmentClass} id="apartment">
			<ApartmentCard
				{...{ setHasApartment, setCurrentTab, hasApartment, boxType, setBoxType }}
			/>
			<ApartmentForm {...{ boxType, setBoxType, hasApartment }} />
		</aside>
	);
};
