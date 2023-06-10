import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

import noAvtar from "../images/avatar.png";

const CastCrewCard = ({ data }) => {
	const { imageURL } = useSelector((state) => state.setting);

	return (
		<div className="cast-crew-section">
			<LazyLoadImage
				effect="blur"
				src={
					data?.profile_path
						? imageURL + data.profile_path
						: noAvtar.src
				}
			/>
			<h2 className="castcrew-original-name">{data?.original_name}(Original Name)</h2>
			{data?.character && (
				<span className="castcrew-character">{data?.character}(Character Name)</span>
			)}
			{data?.known_for_department ? (
				<span className="castcrew-job">
					{data?.known_for_department}
				</span>
			) : (
				<span className="castcrew-job">{data?.character}</span>
			)}
		</div>
	);
};

export default CastCrewCard;
