import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

import { AiFillStar, AiFillPlayCircle } from "react-icons/ai";

import noPoster from "../images/no-poster.png";

const DetailsFrame = ({ data, credit, videos, setVideoId, setShowVideoPopup }) => {
	const { imageURL } = useSelector((state) => state.setting);
	
	// --- banner Image URL
	const backBanner = data.backdrop_path
		? imageURL + data.backdrop_path
		: null;
	// --- Name of Poster
	const name = data.title || data.name;
	const rating = data.vote_average.toFixed(1);

	const RuntimeCalculate = (runtime) => {
		const hour = Math.floor(data.runtime / 60);
		const minutes = data.runtime % 60;
		return `${hour}h ${minutes}m`;
	};

	const directors = credit?.crew.filter((items) => items.job === "Director");
	const writers = credit?.crew.filter(
		(items) =>
			items.job === "Writer" ||
			items.job === "Screenplay" ||
			items.job === "Story"
	);

	return (
		<div className="details-section">
			{backBanner && (
				<div className="details-banner">
					<LazyLoadImage
						src={imageURL + data.backdrop_path}
						alt="details-background-image"
						effect="blur"
					/>
				</div>
			)}
			<div className="details-wrapper">
				<div className="details-poster-section">
					<LazyLoadImage
						effect="blur"
						src={
							data.poster_path
								? imageURL + data.poster_path
								: noPoster.src
						}
						alt="details-poster-image"
					/>
				</div>

				<div className="details-poster-info-section">
					<h1 className="details-poster-name">{name}</h1>
					<h3 className="details-poster-tagline">{data.tagline}</h3>
					<div className="details-genres-section">
						{data.genres.map((items, index) => {
							return (
								<span
									className="genres"
									key={data.id + "_" + items.id}
								>
									{items.name}
								</span>
							);
						})}
					</div>
					<div className="rating-trailer-section">
						<div
							className="details-rating"
							style={{
								backgroundColor:
									rating < 5
										? "red"
										: rating < 7
										? "#ff6a00"
										: "green",
							}}
						>
							<AiFillStar className="rating-icon" />
							<span className="rating-text">{rating}</span>
						</div>
						<div
							className="trailer-section"
							onClick={(e) => {
								setVideoId(videos?.key);
								setShowVideoPopup(true);
							}}
						>
							<AiFillPlayCircle className="trailer-icon" />
							<span className="trailer-text">Watch trailer</span>
						</div>
					</div>
					<div className="details-overview-section">
						<h2 className="details-overview-title">Overview</h2>
						<p className="details-overview">
							{data.overview
								? data.overview
								: "Not available right now"}
						</p>
					</div>

					<div className="details-subinfo-section">
						<div className="details-subinfo">
							<h4 className="subinfo-title">Status :</h4>
							<span className="subinfo-text">{data.status}</span>
						</div>
						{data.runtime ? (
							<div className="details-subinfo">
								<h4 className="subinfo-title">Runtime :</h4>
								<span className="subinfo-text">
									{RuntimeCalculate(data.runtime)}
								</span>
							</div>
						) : (
							""
						)}
					</div>

					<div className="details-subinfo-section">
						<div className="details-subinfo">
							<h4 className="subinfo-title">
								Spoken Language:
								<span className="subinfo-text">
									{data.spoken_languages.map(
										(items, index) => {
											return data.spoken_languages
												.length -
												1 ===
												index
												? `(${items.iso_639_1})${items.english_name}`
												: `${items.english_name},(${items.iso_639_1}), `;
										}
									)}
								</span>
							</h4>
						</div>
					</div>

					{directors?.length > 0 && (
						<div className="details-subinfo-section">
							<div className="details-subinfo">
								<h4 className="subinfo-title">
									Directors :
									<span className="subinfo-text">
										{directors?.map((items, index) => {
											return directors.length - 1 ===
												index
												? `${items.name}`
												: `${items.name}, `;
										})}
									</span>
								</h4>
							</div>
						</div>
					)}

					{writers?.length > 0 && (
						<div className="details-subinfo-section">
							<div className="details-subinfo">
								<h4 className="subinfo-title">
									Writer :
									<span className="subinfo-text">
										{writers?.map((items, index) => {
											return writers.length - 1 === index
												? `${items.name}`
												: `${items.name}, `;
										})}
									</span>
								</h4>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default DetailsFrame;
