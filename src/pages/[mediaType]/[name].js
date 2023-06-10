import FetchApiData from "@/axiosClient";
import CardFrame from "@/components/CardFrame";
import PaginationFrame from "@/components/PaginationFrame";
import TabsFrame from "@/components/TabsFrame";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const index = () => {
	const router = useRouter();
	const mediaType = router.isReady ? router.query.mediaType : "";
	const [activeTab, setActiveTab] = useState(
		router.isReady ? router.query.name : ""
	);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const ref = useRef();

	const GetData = async () => {
		if (!activeTab || !mediaType) return;
		setLoading(true);
		setData(null);
		const dataRes = await FetchApiData(
			`${mediaType}/${activeTab}?page=${page}`
		);
		setTotalPages(
			dataRes.data.total_pages > 500 ? 500 : dataRes.data.total_pages
		);
		setData([...dataRes.data.results]);
		setLoading(false);
	};

	useEffect(() => {
		setPage(1);
		GetData();
		if (ref.current) {
			ref.current.scrollTop = 0;
		}
	}, [router.query.name, router.query.mediaType]);

	useEffect(() => {
		router.push(`/${mediaType}/${activeTab}`);
	}, [activeTab]);

	useEffect(() => {
		GetData();
		if (ref.current) {
			ref.current.scrollTop = 0;
		}
	}, [page]);

	return (
		<div className="main-section movie-section" ref={ref}>
			<TabsFrame
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				tabs={["popular", "top_rated"]}
				mediaType={mediaType}
			/>
			{!loading&&data ? (
				<>
					<div className="card-wrapper">
						{data?.map((items, index) => {
							return (
								<Link
									href={`/details/${mediaType}/${items.id}`}
									key={items.id + "_" + index}
								>
									<CardFrame data={items} />
								</Link>
							);
						})}
					</div>
					<PaginationFrame
						page={page}
						setPage={setPage}
						totalPages={totalPages}
					/>
				</>
			) : (
				<div className="loading-section">
					<div className="loading">Loading...</div>
				</div>
			)}
		</div>
	);
};

export default index;
