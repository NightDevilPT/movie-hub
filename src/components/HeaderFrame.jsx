import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { BiSearch } from "react-icons/bi";

const HeaderFrame = () => {
	const [hamburger, setHamburger] = useState(false);
	const router = useRouter();

	return (
		<header className="header-section">
				<h1 className="header-title" onClick={e=>router.push("/")}>
					Movie<span className="highlight">HUB</span>
				</h1>
			<Link href={"/search/movie"}>
				<BiSearch className="search-icon" />
			</Link>
			<nav className={`navbar ${hamburger && "show-navbar"}`}>
				<h1 className="navbar-title">
					Movie<span className="highlight">HUB</span>
				</h1>
				<Link href={`/movie/popular`} onClick={e=>setHamburger(false)}>
					<button>Movie</button>
				</Link>
				<Link href={`/tv/popular`} onClick={e=>setHamburger(false)}>
					<button>Tv Shows</button>
				</Link>
				<Link href={`/peoples`} onClick={e=>setHamburger(false)}>
					<button>Peoples</button>
				</Link>
			</nav>
			<div
				className={`hamburger ${hamburger && "active-hamburger"}`}
				onClick={(e) => setHamburger(!hamburger)}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</header>
	);
};

export default HeaderFrame;
