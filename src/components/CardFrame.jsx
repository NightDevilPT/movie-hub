import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import noPoster from "../images/no-poster.png";

import {AiFillStar} from "react-icons/ai";

const CardFrame = ({ data }) => {
	const { imageURL } = useSelector((state) => state.setting);
	const date = dayjs(data.release_date||data.first_air_date).format("MMM,DD YYYY");
    const vote = data.vote_average.toFixed(1);
	const name = data.title||data.name;

	return (
		<div className="card-section">
			<div className="card-image-section">
				<LazyLoadImage
					src={
						data.poster_path
							? imageURL + data.poster_path
							: noPoster.src
					}
					effect="blur"
					alt="card-poster"
				/>
			</div>
			<div className="card-info-section">
				<h1 className="card-title">{name}</h1>
				<h3 className="card-date">{date}</h3>
                <span className="card-rating" style={{
                    backgroundColor:vote<5?"red":vote<7?"#ff6a00":"green"
                }}>
                    <AiFillStar className="rating-icon" />
                    <h5 className="rating-text">{vote}</h5>
                </span>
			</div>
		</div>
	);
};

export default CardFrame;
