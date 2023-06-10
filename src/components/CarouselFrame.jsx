import Link from "next/link";
import React, { useEffect, useState } from "react";

import { RiArrowRightSLine } from "react-icons/ri";
import CardFrame from "./CardFrame";
import FetchApiData from "@/axiosClient";


const CarouselFrame = ({ title, mediaType, name }) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	const GetData = async () => {
		setLoading(true);
		const url = `${mediaType}/${name}`;
		const res = await FetchApiData(url);
		setData([...res.data.results]);
		setLoading(false);
	};

	useEffect(() => {
		GetData();
	}, [mediaType, name]);

	return (
		<div className="carousel-section">
			<div className="carousel-header">
				<h1 className="carousel-title">{title}</h1>
				<Link href={`/${mediaType}/${name}`}>
					<RiArrowRightSLine className="carousel-icon" />
				</Link>
			</div>

			<div className="carousel-wrapper">
				{loading ? (
					<div className="carousel-loading">
						<div className="loading">Loading...</div>
					</div>
				) : (
					data?.map((items, index) => {
						return (
							<div className="carousel-posters" key={items.id + "_" + index}>
								<Link
									href={`details/${mediaType}/${items.id}`}
								>
									<CardFrame data={items} />
								</Link>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default CarouselFrame;
