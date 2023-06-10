const { default: mongoose } = require("mongoose");


const ConnectDB=async()=>{
    try{
        const connect = await mongoose.connect(`${process.env.NEXT_PUBLIC_MONGO_URL}`);
        return {error:false,success:true,message:"Connection Established..."}
    }catch(err){
        return {error:true,success:false,message:err.message}
    }
}

export default ConnectDB;