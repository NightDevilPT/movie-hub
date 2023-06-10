import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

import noAvtar from "../images/avatar.png";

const PeoplesCard = ({ data }) => {
	const { imageURL } = useSelector((state) => state.setting);
	return (
		<div className="peoples-card-section">
			<LazyLoadImage
				src={
					data?.profile_path
						? imageURL + data?.profile_path
						: noAvtar.src
				}
				effect="blur"
			/>
			<h1 className="people-name">{data?.name}</h1>
			<h3 className="people-job">{data?.known_for_department}</h3>
		</div>
	);
};

export default PeoplesCard;
