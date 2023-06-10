import ConnectDB from "@/ConnectDB";
import configModel from "@/schema/configSchema";

const handler=async(req, res)=>{
    if(req.method!=="POST"){
        res.status(400).json({error:true,success:false,message:"Wrong protocol used..."});
        return;
    }

    const connect = await ConnectDB();
    
    if(!connect.success){
        res.status(400).json({error:true,success:false,message:"Database Connection Error..."});
        return;
    }

    const {
		allFontName,
		allThemes,
		fontURLs,
		watchLists,
		likes,
		allHighlightColor,
		_id
    } = req.body;

    const update = await configModel.findByIdAndUpdate(_id,{
        allThemes:allThemes,
        fontURLs:fontURLs,
        allHighlightColor:allHighlightColor,
        watchLists:watchLists,
        likes:likes,
        allFontName:allFontName
    });
    res.status(200).json(update);
}


export default handler;