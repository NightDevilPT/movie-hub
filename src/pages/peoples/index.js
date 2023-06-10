import FetchApiData from "@/axiosClient";
import PaginationFrame from "@/components/PaginationFrame";
import PeoplesCard from "@/components/PeoplesCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const index = () => {
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(null);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	const GetPeoplesData = async () => {
		setLoading(true);
        setData(null);
		const dataRes = await FetchApiData(`person/popular?page=${page}`);
		setTotalPage(dataRes.data.total_pages);
		setData([...dataRes.data.results]);
		setLoading(false);
	};
	useEffect(() => {
		GetPeoplesData();
	}, [page]);
	return (
		<div className="main-section peoples-section">
			<div className="peoples-wrapper">
				{loading ? (
					<div className="loading-section">
						<div className="loading">Loading...</div>
					</div>
				) : (
					data.map((items, index) => {
						return (
							<Link href={`/details/peoples/${items.id}`} key={items.id + "_" + index}>
								<PeoplesCard data={items} />
							</Link>
						);
					})
				)}
			</div>
			{totalPage > 0 && totalPage && data && (
				<PaginationFrame
					totalPages={totalPage}
					setPage={setPage}
					page={page}
				/>
			)}
		</div>
	);
};

export default index;
