import React, { useEffect, useState } from "react";

const TabsFrame = ({ activeTab, setActiveTab, tabs, mediaType }) => {
	const [name, setName] = useState(activeTab);
	useEffect(() => {
		if (activeTab === "top_rated" || activeTab === "popular") {
			const extra = mediaType === "tv" ? "Tv Shows" : mediaType;
			setName(
				`${
					activeTab === "top_rated" ? "Top Rated" : activeTab
				} ${extra}`
			);
		}
	}, [activeTab]);
	return (
		<div className="tabs-section">
			{tabs.map((items, index) => {
				return (
					<span
						onClick={(e) => setActiveTab(items)}
						className={`tabs ${
							items === activeTab && "active-tabs"
						}`}
						key={items + "_" + index}
					>
						{`${items === "top_rated" ? "Top Rated":items==="movie_credits"?"Movies Credits":items==='tv_credits'?"Tv Credits":items==="tv"?"Tv Shows" : items} ${
							mediaType === "tv" && mediaType
								? "Tv Shows"
								: mediaType === "movie" && mediaType
								? mediaType
								: ""
						}`}
					</span>
				);
			})}
			<div
				className="indicator"
				style={{
					left: `${tabs.indexOf(activeTab) * 190 + 50}px`,
				}}
			></div>
		</div>
	);
};

export default TabsFrame;
