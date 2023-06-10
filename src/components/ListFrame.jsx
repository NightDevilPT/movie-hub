import dayjs from "dayjs";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

import noPoster from "../images/no-poster.png";

const ListFrame = ({ data }) => {
    const { imageURL } = useSelector((state) => state.setting);
	const date = dayjs(data.release_date).format("MMM,DD YYYY");
    const vote = data.vote_average.toFixed(1);
	
	return (
		<div className="list-section">
			<div className="list-image-section">
				<LazyLoadImage
					src={
						data.poster_path
							? imageURL + data.poster_path
							: noPoster
					}
					effect="blur"
					alt="card-poster"
				/>
			</div>
		</div>
	);
};

export default ListFrame;
