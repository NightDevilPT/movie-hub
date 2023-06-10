import React, { useEffect } from "react";

const PaginationFrame = ({ page, setPage, totalPages }) => {
	useEffect(() => {
		console.log(page, totalPages);
	}, [page, totalPages]);

	return (
		<div className="pagination-section">
			<div className="pagination-wrapper">
				{
					totalPages<=6?<>
						{new Array(totalPages).fill("1").map((items,index)=>{
							return <button key={index} className={`pagination-btn ${page===index+1&&'active-pagination-btn'}`} onClick={e=>setPage(index+1)}>{index+1}</button>
						})}
					</>:<>
					{page <= 3? (
					<>
						<button className={`pagination-btn ${page===1&&'active-pagination-btn'}`} onClick={e=>setPage(1)}>1</button>
						<button className={`pagination-btn ${page===2&&'active-pagination-btn'}`} onClick={e=>setPage(2)}>2</button>
						<button className={`pagination-btn ${page===3&&'active-pagination-btn'}`} onClick={e=>setPage(3)}>3</button>
						<button className={`pagination-btn ${page===4&&'active-pagination-btn'}`} onClick={e=>setPage(4)}>4</button>
						
						<button className="pagination-btn">...</button>
						<button className={`pagination-btn ${page===totalPages&&'active-pagination-btn'}`} onClick={e=>setPage(totalPages)}>{totalPages}</button>
					</>
				) : page >= 4 && page <= totalPages-3 && totalPages>6 ? (
					<>
						<button className={`pagination-btn ${page===1&&'active-pagination-btn'}`} onClick={e=>setPage(1)}>1</button>
						<button className="pagination-btn">...</button>

						<button className={`pagination-btn`} onClick={e=>setPage(page-1)}>{page-1}</button>
						<button className={`pagination-btn active-pagination-btn`} onClick={e=>setPage(page)}>{page}</button>
						<button className={`pagination-btn`} onClick={e=>setPage(page+1)}>{page+1}</button>

						<button className="pagination-btn">...</button>
						<button className="pagination-btn" onClick={e=>setPage(totalPages)}>{totalPages}</button>
					</>
				) : (
					<>
						<button className="pagination-btn" onClick={e=>setPage(1)}>1</button>
						<button className="pagination-btn">...</button>

						<button className={`pagination-btn ${page===totalPages-3&&'active-pagination-btn'}`} onClick={e=>setPage(totalPages-3)}>{totalPages-3}</button>
						<button className={`pagination-btn ${page===totalPages-2&&'active-pagination-btn'}`} onClick={e=>setPage(totalPages-2)}>{totalPages-2}</button>
						<button className={`pagination-btn ${page===totalPages-1&&'active-pagination-btn'}`} onClick={e=>setPage(totalPages-1)}>{totalPages-1}</button>
						<button className={`pagination-btn ${page===totalPages&&'active-pagination-btn'}`} onClick={e=>setPage(totalPages)}>{totalPages}</button>
					</>
				)}
					</>
				}
				{/* {page <= 3? (
					<>
						<button className={`pagination-btn ${page===1&&'active-pagination-btn'}`} onClick={e=>setPage(1)}>1</button>
						<button className={`pagination-btn ${page===2&&'active-pagination-btn'}`} onClick={e=>setPage(2)}>2</button>
						<button className={`pagination-btn ${page===3&&'active-pagination-btn'}`} onClick={e=>setPage(3)}>3</button>
						<button className={`pagination-btn ${page===4&&'active-pagination-btn'}`} onClick={e=>setPage(4)}>4</button>
						
						<button className="pagination-btn">...</button>
						<button className={`pagination-btn ${page===totalPages&&'active-pagination-btn'}`} onClick={e=>setPage(totalPages)}>{totalPages}</button>
					</>
				) : page >= 4 && page <= totalPages-3 && totalPages>6 ? (
					<>
						<button className={`pagination-btn ${page===1&&'active-pagination-btn'}`} onClick={e=>setPage(1)}>1</button>
						<button className="pagination-btn">...</button>

						<button className={`pagination-btn`} onClick={e=>setPage(page-1)}>{page-1}</button>
						<button className={`pagination-btn active-pagination-btn`} onClick={e=>setPage(page)}>{page}</button>
						<button className={`pagination-btn`} onClick={e=>setPage(page+1)}>{page+1}</button>

						<button className="pagination-btn">...</button>
						<button className="pagination-btn" onClick={e=>setPage(totalPages)}>{totalPages}</button>
					</>
				) : (
					<>
						<button className="pagination-btn" onClick={e=>setPage(1)}>1</button>
						<button className="pagination-btn">...</button>

						<button className={`pagination-btn ${page===totalPages-3&&'active-pagination-btn'}`} onClick={e=>setPage(totalPages-3)}>{totalPages-3}</button>
						<button className={`pagination-btn ${page===totalPages-2&&'active-pagination-btn'}`} onClick={e=>setPage(totalPages-2)}>{totalPages-2}</button>
						<button className={`pagination-btn ${page===totalPages-1&&'active-pagination-btn'}`} onClick={e=>setPage(totalPages-1)}>{totalPages-1}</button>
						<button className={`pagination-btn ${page===totalPages&&'active-pagination-btn'}`} onClick={e=>setPage(totalPages)}>{totalPages}</button>
					</>
				)} */}
			</div>
		</div>
	);
};

export default PaginationFrame;