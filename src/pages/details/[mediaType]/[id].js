import FetchApiData from "@/axiosClient";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import DetailsFrame from "@/components/DetailsFrame";
import TabsFrame from "@/components/TabsFrame";
import VideoPopup from "@/components/VideoPopup";
import CastCrewCard from "@/components/CastCrewCard";
import VideoCard from "@/components/VideoCard";
import CardFrame from "@/components/CardFrame";
import Link from "next/link";

const index = () => {
	const router = useRouter();
	const [detailsData, setDetailsData] = useState(null);
	const [credit, setCredit] = useState(null);
	const [videos, setVideos] = useState(null);
	const [showVideoPopup, setShowVideoPopup] = useState(false);
	const [videoId, setVideoId] = useState(null);
	const [activeTab, setActiveTab] = useState("overview");
	const [cardData, setCardData] = useState(null);
	const [page, setPage] = useState(1);
	const ref = useRef();

	const GetDetailsData = async () => {
		const { mediaType, id } = router.query;
		// ----- Fetcing Media Data
		const detailsRes = await FetchApiData(`${mediaType}/${id}`);
		setDetailsData(detailsRes.data);
		console.log(detailsRes.data);

		// ----- Fetching Media Credits Data
		const creditRes = await FetchApiData(`${mediaType}/${id}/credits`);
		setCredit({ cast: creditRes.data.cast, crew: creditRes.data.crew });

		const videoRes = await FetchApiData(`${mediaType}/${id}/videos`);
		setVideos(videoRes.data.results);
	};

	const GetCardData = async () => {
		const cardRes = await FetchApiData(
			`${router.query.mediaType}/${router.query.id}/${activeTab}?page=${page}`
		);
		setCardData([...cardRes.data.results]);
	};

	useEffect(() => {
		if (!router.isReady) return;
		GetDetailsData();
	}, [router.query]);

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollTop = 0;
			if (activeTab === "similar" || activeTab === "recommendations") {
				setPage(1);
				GetCardData();
			}
		}
	}, [router.query.id]);

	useEffect(() => {
		if (activeTab === "similar" || activeTab === "recommendations") {
			setPage(1);
			GetCardData();
		}
	}, [activeTab]);

	useEffect(() => {
		if (activeTab === "similar" || activeTab === "recommendations") {
			GetCardData();
		}
		console.log(detailsData);
	}, [page]);

	return (
		<div className="main-section details-frame" ref={ref}>
			{detailsData && videos ? (
				<DetailsFrame
					videos={videos[0]}
					data={detailsData}
					credit={credit}
					videoId={videoId}
					setVideoId={setVideoId}
					setShowVideoPopup={setShowVideoPopup}
				/>
			) : (
				<div className="loading-section">
					<div className="loading">Loading...</div>
				</div>
			)}
			{credit && videos ? (
				<div className="details-tabs-section">
					<TabsFrame
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						tabs={[
							"overview",
							"cast",
							"crew",
							"videos",
							"similar",
							"recommendations",
						]}
					/>
					<div className="details-tabs-data-section">
						{activeTab === "overview" && (
							<div className="tabs-overview-section">
								{detailsData?.imdb_id && (
									<div className="tabs-overview-info">
										<h2 className="tabs-overview-title">
											IMDB ID
										</h2>
										<span className="tabs-overview-text">
											{`${detailsData?.imdb_id}`}
										</span>
									</div>
								)}

								{detailsData?.production_companies.length >=
									1 && (
									<div className="tabs-overview-info">
										<h2 className="tabs-overview-title">
											Producion Companies
										</h2>
										<span className="tabs-overview-text">
											{detailsData?.production_companies.map(
												(items, index) => {
													return detailsData
														.production_companies
														.length -
														1 ===
														index
														? `${items.name}[${items.origin_country}]`
														: `${items.name}[${items.origin_country}], `;
												}
											)}
										</span>
									</div>
								)}

								{detailsData?.production_countries.length >=
									1 && (
									<div className="tabs-overview-info">
										<h2 className="tabs-overview-title">
											Producion Countries
										</h2>
										<span className="tabs-overview-text">
											{detailsData?.production_countries.map(
												(items, index) => {
													return detailsData
														.production_countries
														.length -
														1 ===
														index
														? `${items.name}[${items.iso_3166_1}]`
														: `${items.name}[${items.iso_3166_1}], `;
												}
											)}
										</span>
									</div>
								)}

								{detailsData?.budget && (
									<div className="tabs-overview-info">
										<h2 className="tabs-overview-title">
											Budget
										</h2>

										<span className="tabs-overview-text">
											{`${detailsData?.budget}$`}
										</span>
									</div>
								)}

								{detailsData?.revenue && (
									<div className="tabs-overview-info">
										<h2 className="tabs-overview-title">
											Revenue
										</h2>

										<span className="tabs-overview-text">
											{`${detailsData?.revenue}$`}
										</span>
									</div>
								)}
							</div>
						)}

						{activeTab === "cast" && (
							<>
								{credit?.cast.length >= 1 ? (
									<div className="tabs-castcrew-section">
										{credit?.cast.map((items, index) => {
											return (
												<Link href={`/details/peoples/${items.id}`}
													key={items.id + "_" + index}
												>
													<CastCrewCard
														data={items}
													/>
												</Link>
											);
										})}
									</div>
								) : (
									<div className="not-data">
										Nothing Data to Show You
									</div>
								)}
							</>
						)}

						{activeTab === "crew" && (
							<>
								{credit?.crew.length >= 1 ? (
									<div className="tabs-castcrew-section">
										{credit?.crew.map((items, index) => {
											return (
												<Link href={`/details/peoples/${items.id}`}
													key={items.id + "_" + index}
												>
													<CastCrewCard
														data={items}
													/>
												</Link>
											);
										})}
									</div>
								) : (
									<div className="not-data">
										Nothing Data to Show You
									</div>
								)}
							</>
						)}

						{activeTab === "videos" && (
							<>
								{videos?.length >= 1 ? (
									<div className="tabs-videos-section">
										{videos?.map((items, index) => {
											return (
												<VideoCard
													data={items}
													key={items.id + "_" + index}
													setShowVideoPopup={
														setShowVideoPopup
													}
													setVideoId={setVideoId}
												/>
											);
										})}
									</div>
								) : (
									<div className="not-data">
										Nothing Data to Show You
									</div>
								)}
							</>
						)}

						{activeTab === "similar" && (
							<>
								<div className="tabs-card-section">
									{cardData?.length > 1 ? (
										cardData?.map((items, index) => {
											return (
												<Link
													href={`/details/${router.query.mediaType}/${items.id}`}
													key={items.id + "_" + index}
												>
													<CardFrame data={items} />
												</Link>
											);
										})
									) : (
										<div className="not-data">
											Nothing Data to Show You
										</div>
									)}
								</div>
							</>
						)}

						{activeTab === "recommendations" && (
							<>
								<div className="tabs-card-section">
									{cardData?.length > 1 ? (
										cardData?.map((items, index) => {
											return (
												<Link
													href={`/details/${router.query.mediaType}/${items.id}`}
													key={items.id + "_" + index}
												>
													<CardFrame data={items} />
												</Link>
											);
										})
									) : (
										<div className="not-data">
											Nothing Data to Show You
										</div>
									)}
								</div>
							</>
						)}
					</div>
				</div>
			) : (
				<div className="loading-section">
					<div className="loading">Loading...</div>
				</div>
			)}

			<VideoPopup
				videoId={videoId}
				setVideoId={setVideoId}
				showVideoPopup={showVideoPopup}
				setShowVideoPopup={setShowVideoPopup}
			/>
		</div>
	);
};

export default index;
