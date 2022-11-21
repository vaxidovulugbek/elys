import React from "react";
import { Link } from "react-router-dom";

const StepThree = () => {
	return (
		<div className="mt-5">
			<h4>Thank you for registration!</h4>
			<p>
				Thank you, you have successfully registered. Please wait a little while for them to
				confirm you.
			</p>
			<a href={"/login"}>Go to login</a>
		</div>
	);
};

export default StepThree;
