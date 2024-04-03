import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    onModel:{
        type:String,
        required:true,
        enum:['tweet','comment']
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    user:{  /*this is the liker that is user who is liking a particular thing */
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps:true});

const Like = mongoose.model('Like',likeSchema);

export default Like