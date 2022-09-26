import React, { useState } from "react";
import cn from "classnames";

import ApartmentCard from "modules/Crosstab/components/ApartmentCard";
import ApartmentForm from "modules/Crosstab/components/Apartmentform";

import "@fancyapps/ui/dist/fancybox.css";
import "swiper/css";
import "swiper/css/navigation";

const Apartment = ({ setHasApartment, hasApartment, setCurrentTab }) => {
	const [box, setBox] = useState("card");
	const [type, setType] = useState({ card: true, form: false });

	const apartmentClass = cn("apartment", { "apartment-closed": !hasApartment });

	return (
		<aside className={apartmentClass} id="apartment">
			<ApartmentCard
				{...{ setHasApartment, setCurrentTab, hasApartment, setBox, box, type, setType }}
			/>
			<ApartmentForm
				{...{ setHasApartment, setCurrentTab, hasApartment, setBox, box, setType }}
			/>
		</aside>
	);
};

export default Apartment;
