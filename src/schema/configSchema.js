import mongoose, { Schema } from "mongoose";

const configSchema = new Schema ({
	allThemes: {
		type:Object,
	},
	allFontName:{
		type:Array,
		default:[]
	},
	allHighlightColor: {
		type: Array,
	},
	fontURLs: {
		type: Array
	},
	watchLists: {
		type: Array,
	},
	likes: {
		type: Array,
	}
});

const configModel =
	mongoose.models.configfiles || mongoose.model("configfiles", configSchema);
export default configModel;
