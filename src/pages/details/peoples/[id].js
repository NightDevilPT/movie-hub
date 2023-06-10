import FetchApiData from "@/axiosClient";
import CardFrame from "@/components/CardFrame";
import PeoplesDetailFrame from "@/components/PeoplesDetailFrame";
import TabsFrame from "@/components/TabsFrame";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
	const router = useRouter();
	const { id } = router.isReady ? router.query : "";
	const [detailsData, setDetailsData] = useState(null);
	const [socialData, setSocialData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("movie_credits");
	const [creditData, setCreditData] = useState(null);

	const GetPeopleDetails = async () => {
		setLoading(true);
		const detailsRes = await FetchApiData(`person/${id}`);
		setDetailsData(detailsRes.data);

		const socialRes = await FetchApiData(`person/${id}/external_ids`);
		setSocialData(socialRes.data);
		console.log(detailsRes.data);
		// birthday,place_of_birth
		setLoading(false);
	};

	useEffect(() => {
		GetPeopleDetails();
	}, [router.query.id]);

	const GetCreditData = async () => {
		setCreditData(null);
		const creditRes = await FetchApiData(`person/${id}/${activeTab}`);
		setCreditData([...creditRes.data.cast, ...creditRes.data.crew]);
	};

	useEffect(() => {
		GetCreditData();
	}, [activeTab]);

	return (
		<div className="main-section">
			{!loading && detailsData && socialData ? (
				<PeoplesDetailFrame data={{ ...detailsData, ...socialData }} />
			) : (
				<div className="loading-section">
					<div className="loading">Loading...</div>
				</div>
			)}
			{!loading && detailsData ? (
				<div className="person-tabs-section">
					<TabsFrame
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						tabs={["movie_credits", "tv_credits"]}
					/>

					<div className="person-tabs-data-section">
						<div className="tabs-card-section">
							{creditData?.length > 1 ? (
								creditData?.map((items, index) => {
									return (
										<Link
											href={`/details/${activeTab==="movie_credits"?"movie":"tv"}/${items.id}`}
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
					</div>
				</div>
			) : (
				<div className="loading-section">
					<div className="loading">Loading...</div>
				</div>
			)}
		</div>
	);
};

export default index;
