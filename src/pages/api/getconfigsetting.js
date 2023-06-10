import ConnectDB from "@/ConnectDB";
import configModel from "@/schema/configSchema";

const handler=async(req, res)=>{
    if(req.method!=="GET"){
        res.status(400).json({error:true,success:false,message:"Wrong protocol used..."});
        return;
    }

    const connect = await ConnectDB();
    
    if(!connect.success){
        res.status(500).json({error:true,success:false,message:connect.message});
        return;
    }
    
    const file = await configModel.find({});
    res.status(200).json(file[0]);
}


export default handler;