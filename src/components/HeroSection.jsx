import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

const HeroSection = ({ bannerImg }) => {
	const { imageURL } = useSelector((state) => state.setting);
	return (
		<div className="hero-section">
			<LazyLoadImage effect="blur" src={imageURL + bannerImg} alt="Hero Banner Image" />
            <div className="opacity-layer"></div>
            <div className="opacity-up-layer"></div>
            <div className="herobanner-intro-section">
                <h1 className="herobanner-header">Welcome</h1>
                <h3 className="herobanner-subheader">Millions of movies, TV shows and people to discover. <span className="highlight">Explore now.</span></h3>
            </div>
		</div>
	);
};

export default HeroSection;
