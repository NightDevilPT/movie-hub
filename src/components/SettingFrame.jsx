import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiFillCloseSquare } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

import {
	setActiveFontName,
	setActiveThemeName,
	setAllFontNames,
	setAllHighlightColors,
	setAllThemes,
	setFontURLs,
	setHighlightColor,
} from "@/redux/settingSlicer";

const UpdateConfigFile = async (
	allThemes,
	allFontNames,
	fontURLs,
	watchLists,
	likes,
	allHighlightColors,
	_id
) => {

	const formObj = {
		_id: _id,
		allHighlightColor: [...allHighlightColors],
		allFontName: [...allFontNames],
		allThemes: { ...allThemes },
		fontURLs: [...fontURLs],
		watchLists: [...watchLists],
		likes: [...likes],
	};

	await axios
		.post("/api/updateconfigfile", formObj, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
};

const SettingFrame = ({ setting, setSetting }) => {
	const {
		activeFontName,
		activeThemeName,
		activeHighlightColor,
		allFontNames,
		allThemes,
		fontURLs,
		watchLists,
		likes,
		allHighlightColors,
		_id,
	} = useSelector((state) => state.setting);
	const [themePopup, setThemePopup] = useState(false);
	const [fontPopup, setFontPopup] = useState(false);
	const [highlightPopup, setHighlightPopup] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (
			activeThemeName === "" ||
			activeFontName === "" ||
			activeHighlightColor === "" ||
			allFontNames.length === 0 ||
			allHighlightColors.length === 0 ||
			Object.keys(allThemes).length === 0 ||
			fontURLs.length === 0
		)
			return;
		UpdateConfigFile(
			allThemes,
			allFontNames,
			fontURLs,
			watchLists,
			likes,
			allHighlightColors,
			_id
		);

		window.localStorage.setItem(
			"activeThemeName",
			activeThemeName || window.localStorage.getItem("activeThemeName")
		);
		window.localStorage.setItem(
			"activeFontName",
			activeFontName || window.localStorage.getItem("activeFontName")
		);
		window.localStorage.setItem(
			"activeHighlightColor",
			activeHighlightColor ||
				window.localStorage.getItem("activeHighlightColor")
		);
	}, [
		activeFontName,
		activeThemeName,
		allThemes,
		allFontNames,
		fontURLs,
		watchLists,
		likes,
		activeHighlightColor,
		allHighlightColors,
	]);

	return (
		<div
			className={`show-setting-section ${
				!setting && "hide-setting-section"
			}`}
		>
			<div className="setting-wrapper">
				<AiFillCloseSquare
					className="close-setting-icon"
					onClick={(e) => setSetting(false)}
				/>
				<h1 className="setting-header">Setting</h1>

				<div className="setting-tools-section">
					<div className="setting-tools-wrapper">
						{Object.keys(allThemes).map((items, index) => {
							return (
								<ThemeColorsFrame
									key={items + "_" + index}
									activeThemeName={activeThemeName}
									ThemeName={items}
									allThemes={allThemes}
								/>
							);
						})}
						<div
							className="tools-section"
							onClick={(e) => setThemePopup(true)}
						>
							<FaPlus className="add-icon" />
						</div>
					</div>

					<div className="setting-tools-wrapper">
						{allFontNames?.map((items, index) => {
							return (
								<FontFamilyFrame
									key={items + "_" + index}
									fontName={items}
									activeFontName={activeFontName}
								/>
							);
						})}
						<div
							className="font-tools-section"
							onClick={(e) => setFontPopup(true)}
						>
							<FaPlus className="add-icon" />
						</div>
					</div>

					<div className="setting-tools-wrapper">
						{allHighlightColors?.map((items, index) => {
							return (
								<span
									className={`highlight-color-section ${
										items === activeHighlightColor &&
										"active-tools-section"
									}`}
									style={{ backgroundColor: items }}
									key={items + "_" + index}
									onClick={(e) =>
										dispatch(setHighlightColor(items))
									}
								></span>
							);
						})}
						<div
							className="font-tools-section"
							onClick={(e) => {
								setHighlightPopup(true);
							}}
							style={{ height: "40px" }}
						>
							<FaPlus className="add-icon" />
						</div>
					</div>
				</div>
			</div>
			<ThemePopUpFrame
				setThemePopup={setThemePopup}
				themePopup={themePopup}
				allThemes={allThemes}
			/>
			<FontPopUpFrame
				fontPopup={fontPopup}
				fontURLs={fontURLs}
				allFontNames={allFontNames}
				setFontPopup={setFontPopup}
			/>
			<HighlightPopupFrame
				highlightPopup={highlightPopup}
				setHighlightPopup={setHighlightPopup}
				allHighlightColors={allHighlightColors}
			/>
		</div>
	);
};

export default SettingFrame;

export const FontFamilyFrame = ({ fontName, activeFontName }) => {
	const dispatch = useDispatch();
	return (
		<div
			className={`${
				fontName === activeFontName && "active-tools-section"
			} font-tools-section`}
			onClick={(e) => {
				dispatch(setActiveFontName(fontName));
			}}
		>
			<h3 className="font-title" style={{ fontFamily: fontName }}>
				AaBbCc
			</h3>
			<span className="font-subtitle" style={{ fontFamily: fontName }}>
				{fontName}
			</span>
		</div>
	);
};

export const ThemeColorsFrame = ({ activeThemeName, ThemeName, allThemes }) => {
	const dispatch = useDispatch();

	return (
		<div
			className={`tools-section ${
				ThemeName === activeThemeName && "active-tools-section"
			}`}
			onClick={(e) => {
				dispatch(setActiveThemeName(ThemeName));
			}}
		>
			<h3 className="theme-title">{ThemeName}</h3>
			<div className="theme-colors-section">
				<span
					className="theme-colors"
					style={{
						backgroundColor:
							allThemes[ThemeName]["--nightdevilpt-primary-back"],
					}}
				></span>
				<span
					className="theme-colors"
					style={{
						backgroundColor:
							allThemes[ThemeName][
								"--nightdevilpt-primary-color"
							],
					}}
				></span>
				<span
					className="theme-colors"
					style={{
						backgroundColor:
							allThemes[ThemeName][
								"--nightdevilpt-secondary-back"
							],
					}}
				></span>
				<span
					className="theme-colors"
					style={{
						backgroundColor:
							allThemes[ThemeName][
								"--nightdevilpt-secondary-color"
							],
					}}
				></span>
			</div>
		</div>
	);
};

export const ThemePopUpFrame = ({ themePopup, setThemePopup, allThemes }) => {
	const dispatch = useDispatch();
	const [themeData, setThemeData] = useState({
		primaryBg: "#ffffff",
		secondaryBg: "#ffffff",
		primaryFg: "#000000",
		secondaryFg: "#000000",
		themeName: "",
	});

	const AddTheme = () => {
		if (themeData.themeName === "") {
			console.log(Object.keys(allThemes).indexOf(themeData.themeName));
			alert("Please Enter Theme Name...");
			return;
		}

		const available = Object.keys(allThemes).filter(
			(items) => items === themeData.themeName
		);
		if (available.length > 0) {
			alert("This Theme is already Available...");
			return;
		}

		const themeObj = {
			...allThemes,
		};
		themeObj[themeData.themeName] = {
			"--nightdevilpt-primary-back": themeData.primaryBg,
			"--nightdevilpt-primary-color": themeData.primaryFg,
			"--nightdevilpt-secondary-back": themeData.secondaryBg,
			"--nightdevilpt-secondary-color": themeData.secondaryFg,
		};

		dispatch(setAllThemes(themeObj));
		dispatch(setActiveThemeName(themeData.themeName));
		setThemePopup(false);
		alert("Theme Added");
	};

	return (
		<div className={`popup-section ${!themePopup && "hide-popup-section"}`}>
			<h2 className="popup-header">
				Add Theme
				<AiFillCloseSquare
					className="close-popup-icon"
					onClick={(e) => setThemePopup(false)}
				/>
			</h2>
			<div className="theme-preview">
				<span
					className="theme-preview-color"
					style={{ backgroundColor: themeData["primaryBg"] }}
				></span>
				<span
					className="theme-preview-color"
					style={{ backgroundColor: themeData["primaryFg"] }}
				></span>
				<span
					className="theme-preview-color"
					style={{ backgroundColor: themeData["secondaryBg"] }}
				></span>
				<span
					className="theme-preview-color"
					style={{ backgroundColor: themeData["secondaryFg"] }}
				></span>
			</div>

			<div className="inputs-section">
				<label>Theme Name</label>
				<input
					type="text"
					value={themeData["themeName"]}
					onChange={(e) => {
						setThemeData((pre) => ({
							...pre,
							themeName: e.target.value,
						}));
					}}
				/>
			</div>

			<div className="inputs-section">
				<label>Primary Back</label>
				<input
					type="color"
					value={themeData["primaryBg"]}
					onChange={(e) => {
						setThemeData((pre) => ({
							...pre,
							primaryBg: e.target.value,
						}));
					}}
					className="inputs"
				/>
			</div>
			<div className="inputs-section">
				<label>Primary Color</label>
				<input
					type="color"
					value={themeData["primaryFg"]}
					onChange={(e) => {
						setThemeData((pre) => ({
							...pre,
							primaryFg: e.target.value,
						}));
					}}
					className="inputs"
				/>
			</div>
			<div className="inputs-section">
				<label>Secondary Back</label>
				<input
					type="color"
					value={themeData["secondaryBg"]}
					onChange={(e) => {
						setThemeData((pre) => ({
							...pre,
							secondaryBg: e.target.value,
						}));
					}}
					className="inputs"
				/>
			</div>
			<div className="inputs-section">
				<label>Secondary Color</label>
				<input
					type="color"
					value={themeData["secondaryFg"]}
					onChange={(e) => {
						setThemeData((pre) => ({
							...pre,
							secondaryFg: e.target.value,
						}));
					}}
					className="inputs"
				/>
			</div>

			<button className="add-button" onClick={(e) => AddTheme()}>
				Add Theme
			</button>
		</div>
	);
};

export const FontPopUpFrame = ({
	fontPopup,
	setFontPopup,
	allFontNames,
	fontURLs,
}) => {
	const [fontData, setFontData] = useState({
		fontName: "",
		fontURL: "",
	});
	const dispatch = useDispatch();

	const AddFont = () => {
		const { fontName, fontURL } = fontData;
		if (fontName === "") {
			alert("Font Name filed is Empty...");
			return;
		}

		if (fontURL === "") {
			alert("Font URL filed is Empty...");
			return;
		}

		const available = allFontNames.filter((items) => items === fontName);
		if (available.length > 0) {
			alert("This font is already available...");
			return;
		}

		const fonturls = [...fontURLs, fontURL];
		const fontnames = [...allFontNames, fontName];

		dispatch(setAllFontNames(fontnames));
		dispatch(setFontURLs(fonturls));
		alert("New Font Added...");
		setFontPopup(false);
	};

	return (
		<div className={`popup-section ${!fontPopup && "hide-popup-section"}`}>
			<h2 className="popup-header">
				Add Theme
				<AiFillCloseSquare
					className="close-popup-icon"
					onClick={(e) => setFontPopup(false)}
				/>
			</h2>

			<div className="inputs-section">
				<label>Font Name</label>
				<input
					type="text"
					value={fontData["fontName"]}
					onChange={(e) => {
						setFontData((pre) => ({
							...pre,
							fontName: e.target.value,
						}));
					}}
				/>
			</div>

			<div className="inputs-section">
				<label>Font URL</label>
				<input
					type="text"
					value={fontData["fontURL"]}
					onChange={(e) => {
						setFontData((pre) => ({
							...pre,
							fontURL: e.target.value,
						}));
					}}
				/>
			</div>

			<button className="add-button" onClick={(e) => AddFont()}>
				Add Font
			</button>
		</div>
	);
};

export const HighlightPopupFrame = ({
	setHighlightPopup,
	highlightPopup,
	allHighlightColors,
}) => {
	const [highlight, setHighlight] = useState("#ff0000");
	const dispatch = useDispatch();

	const AddHighlight = () => {
		const isAvailable = allHighlightColors.filter(
			(items) => items === highlight
		);
		if (isAvailable.length > 0) {
			alert("This Highlight color is already available");
			return;
		}

		dispatch(setAllHighlightColors([...allHighlightColors, highlight]));
		dispatch(setHighlightColor(highlight));
		setHighlightPopup(false);
		alert("Highlight Color added...");
	};

	return (
		<div
			className={`popup-section ${
				!highlightPopup && "hide-popup-section"
			}`}
		>
			<h2 className="popup-header">
				Add Highlight Color
				<AiFillCloseSquare
					className="close-popup-icon"
					onClick={(e) => setHighlightPopup(false)}
				/>
			</h2>
			<div className="inputs-section">
				<label>Highlight Color</label>
				<input
					type="color"
					value={highlight}
					onChange={(e) => {
						setHighlight(e.target.value);
					}}
				/>
			</div>
			<button className="add-button" onClick={(e) => AddHighlight()}>
				Add Font
			</button>
		</div>
	);
};
