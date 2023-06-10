import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { AiFillPlayCircle } from "react-icons/ai";

const VideoCard = ({ setShowVideoPopup, setVideoId, data }) => {
	return (
		<div
			className="videos-card-section"
			onClick={(e) => {
				setVideoId(data?.key);
				setShowVideoPopup(true);
			}}
		>
			<LazyLoadImage
				effect="blur"
				src={`https://img.youtube.com/vi/${data?.key}/mqdefault.jpg`}
			/>
			<div className="video-opacity-layer"></div>
			<AiFillPlayCircle className="play-video-icon" />
		</div>
	);
};

export default VideoCard;
