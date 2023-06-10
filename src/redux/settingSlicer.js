import { createSlice } from "@reduxjs/toolkit";

const settingSlicer = createSlice({
	name: "setting",
	initialState: {
		_id:"",
		activeFontName:"",
		activeThemeName: "",
		activeHighlightColor: "",
		allHighlightColors:[],
		allFontNames: {},
		allThemes: {},
		fontURLs: [],
		watchLists: [],
		likes: [],
		imageURL: "",
		genres: {},
	},
	reducers: {
		set_id:(state,action)=>{
			state._id=action.payload;
		},
		setActiveFontName: (state, action) => {
			state.activeFontName = action.payload;
		},
		setActiveThemeName: (state, action) => {
			state.activeThemeName = action.payload;
		},
		setAllHighlightColors:(state, action) => {
			state.allHighlightColors = action.payload;
		},
		setHighlightColor: (state, action) => {
			state.activeHighlightColor = action.payload;
		},
		setAllFontNames: (state, action) => {
			state.allFontNames = action.payload;
		},
		setAllThemes: (state, action) => {
			state.allThemes = action.payload;
		},
		setFontURLs: (state, action) => {
			state.fontURLs = action.payload;
		},
		setWatchLists: (state, action) => {
			state.watchLists = action.payload;
		},
		setLikes: (state, action) => {
			state.likes = action.payload;
		},
		setImageURL: (state, action) => {
			state.imageURL = action.payload;
		},
		setGenres: (state, action) => {
			state.genres = action.payload;
		},
	},
});

export const {
	setActiveFontName,
	setActiveThemeName,
	setAllFontNames,
	setAllThemes,
	setFontURLs,
	setHighlightColor,
	setLikes,
	setWatchLists,
	setImageURL,
	setGenres,
	setAllHighlightColors,
	set_id
} = settingSlicer.actions;
export default settingSlicer.reducer;
