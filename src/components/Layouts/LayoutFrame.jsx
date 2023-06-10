import FetchApiData from "@/axiosClient";
import {
	setActiveFontName,
	setActiveThemeName,
	setAllFontNames,
	setAllHighlightColors,
	setAllThemes,
	setFontURLs,
	setGenres,
	setHighlightColor,
	setImageURL,
	setLikes,
	setWatchLists,
	set_id,
} from "@/redux/settingSlicer";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SetConfiguration = async (dispatch, webLoading, setWebLoading) => {
	setWebLoading(true);

	// ----- Adding Image URL in Redux
	const imgRes = await FetchApiData("configuration");
	dispatch(setImageURL(imgRes.data.images.secure_base_url + "original"));

	// ----- Adding Genres in Redux
	const endPoints = ["movie", "tv"];
	const promises = [];
	const allGenres = {};

	endPoints.forEach((items) => {
		promises.push(FetchApiData(`genre/${items}/list`));
	});
	const genresRes = await Promise.all(promises);
	genresRes.map((items) => {
		items.data.genres.map((genres) => {
			allGenres[genres.id] = genres.name;
		});
	});
	dispatch(setGenres(allGenres));

	// ----- Adding WebPage Configuration
	const webConfigRes = await axios.get("/api/getconfigsetting");
	const {
		_id,
		allThemes,
		allFontName,
		fontURLs,
		watchLists,
		likes,
		allHighlightColor
	} = webConfigRes.data;
	console.log(webConfigRes.data)

	window.localStorage.setItem("activeThemeName",window.localStorage.getItem("activeThemeName")||"dark");
	window.localStorage.setItem("activeFontName",window.localStorage.getItem("activeFontName")||"'Ubuntu', sans-serif");
	window.localStorage.setItem("activeHighlightColor",window.localStorage.getItem("activeHighlightColor")||"red");

	dispatch(setActiveFontName(window.localStorage.getItem("activeFontName")));
	dispatch(setActiveThemeName(window.localStorage.getItem("activeThemeName")));
	dispatch(setHighlightColor(window.localStorage.getItem("activeHighlightColor")));
	dispatch(setAllThemes(allThemes));
	dispatch(setAllFontNames(allFontName));
	dispatch(setFontURLs(fontURLs));
	dispatch(setWatchLists(watchLists));
	dispatch(setLikes(likes));
	dispatch(setAllHighlightColors([...allHighlightColor]));
	dispatch(set_id(_id))

	setWebLoading(false);
};



const LayoutFrame = ({ children }) => {
	const dispatch = useDispatch();
	const [webLoading, setWebLoading] = useState(true);
	const { activeFontName, activeThemeName, activeHighlightColor, allThemes,fontURLs,allFontNames,watchLists,likes } =
		useSelector((state) => state.setting);

	useEffect(() => {
		SetConfiguration(dispatch, webLoading, setWebLoading);
	}, []);


	return webLoading ? (
		<div className="web-loading-section">
			<div className="loading-section">
				<h1 className="loading-text">
					Movie<span className="highlight">HUB</span>
				</h1>
				<div className="loading">Loading...</div>
			</div>
		</div>
	) : (
		<div
			className="App"
			style={{
				...allThemes[activeThemeName],
				"--highlight": activeHighlightColor,
				"--family":activeFontName
			}}
		>
			<Head>
				{
					fontURLs?.map((items,index)=>{
						return <link href={`${items}`} rel="stylesheet" key={items+"_"+index}/>
					})
				}
			</Head>
			{children}
		</div>
	);
};

export default LayoutFrame;
