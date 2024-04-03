import mongoose from "mongoose";

const comments_Schema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    commentable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    }
},{timestamps:true});

const Comments=mongoose.model("Comment",comments_Schema);
export default Comment;
