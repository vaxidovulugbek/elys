import React, { useState } from "react";
import cn from "classnames";

import AppartmentCard from "../components/AppartmentCard";
import AppartmentForm from "../components/Appartmentform";

import "@fancyapps/ui/dist/fancybox.css";
import "swiper/css";
import "swiper/css/navigation";

const Apartment = ({ setHasApartment, hasApartment, setCurrentTab }) => {
	const [box, setBox] = useState("card");
	const [type, setType] = useState({ card: true, form: false });

	const apartmentClass = cn("apartment", { "apartment-closed": !hasApartment });

	return (
		<aside className={apartmentClass} id="apartment">
			<AppartmentCard
				{...{ setHasApartment, setCurrentTab, hasApartment, setBox, box, type, setType }}
			/>
			<AppartmentForm
				{...{ setHasApartment, setCurrentTab, hasApartment, setBox, box, setType }}
			/>
		</aside>
	);
};

export default Apartment;
