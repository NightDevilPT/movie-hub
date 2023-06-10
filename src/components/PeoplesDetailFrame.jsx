import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

import { BiLinkAlt } from "react-icons/bi";
import { FaFacebookSquare, FaTwitter, FaYoutube } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import dayjs from "dayjs";

import noAvtar from "../images/avatar.png";

const PeoplesDetailFrame = ({ data }) => {
	const [readMore, setReadMore] = useState(false);
	const { imageURL } = useSelector((state) => state.setting);

	return (
		<div className="people-details-section">
			<div className="person-poster-section">
				<LazyLoadImage
					src={
						data?.profile_path
							? imageURL + data?.profile_path
							: noAvtar.src
					}
					effect="blur"
				/>
			</div>

			<div className="person-info-section">
				<h1 className="person-name">
					{data?.name}{" "}
					{data?.homepage && (
						<a href={data.homepage}>
							<BiLinkAlt className="homepage-link-icon" />
						</a>
					)}
				</h1>

				<div className="social-section">
					{data.facebook_id && (
						<a
							href={`https://www.facebook.com/${data.facebook_id}`}
						>
							<FaFacebookSquare className="social-icon" />
						</a>
					)}

					{data.instagram_id && (
						<a
							href={`https://www.instagram.com/${data.instagram_id}`}
						>
							<BsInstagram className="social-icon" />
						</a>
					)}

					{data.twitter_id && (
						<a href={`https://www.twitter.com/${data.twitter_id}`}>
							<FaTwitter className="social-icon" />
						</a>
					)}

					{data.youtube_id && (
						<a href={`https://www.youtube.com/${data.youtube_id}`}>
							<FaYoutube className="social-icon" />
						</a>
					)}
				</div>

				<h3 className="person-data">
					Birth Date/Place :{" "}
					<span>
						{data?.birthday?dayjs(data.birthday).format("MMM-DD-YYYY"):"Null"},{" "}
						{data?.place_of_birth?data?.place_of_birth:"Null"}
					</span>
				</h3>
				
				<h3 className="person-data">
					Known for Department :{" "}
					<span>
						{data?.known_for_department?data?.known_for_department:"Null"}
					</span>
				</h3>

				<div
					className="biography-section"
					style={{
						height: readMore ? "auto" : "300px",
						overflow: "hidden",
					}}
				>
					<h2 className="biography-header">Biography</h2>
					{data?.biography ? (
						<>
							<span className="biography-text">
								{data.biography}
							</span>
							<button
								className="readmore-btn"
								onClick={(e) => setReadMore(!readMore)}
							>
								{readMore ? "Read Less" : "Read More"}
							</button>
						</>
					) : (
						<div className="not-data">Nothing Data to Show You</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PeoplesDetailFrame;
