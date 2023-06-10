import FetchApiData from "@/axiosClient";
import CardFrame from "@/components/CardFrame";
import PaginationFrame from "@/components/PaginationFrame";
import TabsFrame from "@/components/TabsFrame";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const index = () => {
	const [activeTab, setActiveTab] = useState("movie");
	const [query, setQuery] = useState("movie");
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [totalPages, setTotalPages] = useState(null);
	const router = useRouter();

	const GetData = async () => {
		setLoading(true);
		setData(null);
		setTotalPages(null);
		const dataRes = await FetchApiData(`search/${activeTab}`, {
			query,
			page,
		});
		setData([...dataRes.data.results]);
		setLoading(false);
    console.log(dataRes.data.total_pages)
    setLoading(false);
		setTotalPages(dataRes.data.total_pages);
	};

	useEffect(() => {
		GetData();
	}, [page]);

	useEffect(() => {
		setPage(1);
		GetData();
	}, [router.query.mediaType]);

	useEffect(() => {
		if (router.isReady) {
			router.push(`/search/${activeTab}`);
		}
	}, [activeTab]);

	return (
		<div className="main-section">
			<div className="search-tab-section">
				<div className="search-input-section">
					<input
						className="search-input"
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setPage(1);
								GetData();
							}
						}}
					/>
					<button
						className="search-btn"
						onClick={(e) => {
							setPage(1);
							GetData();
						}}
					>
						Search
					</button>
				</div>
			</div>
			<div className="search-data-section">
				<TabsFrame
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					tabs={["movie", "tv"]}
				/>
				<div className="search-card-wrapper">
					{!loading && data ? (
						data?.length > 0 ? (
							data?.map((items, index) => {
								return (
									<Link
										href={`/details/${activeTab}/${items.id}`}
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
						)
					) : (
						<div className="loading-section">
							<div className="loading">Loading...</div>
						</div>
					)}
				</div>

				{totalPages && (
          <PaginationFrame totalPages={totalPages} setPage={setPage} page={page} />
				)}
			</div>
		</div>
	);
};

export default index;
