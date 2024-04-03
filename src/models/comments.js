import mongoose from "mongoose";

const comments_Schema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    userEmail:{
        type:String
    }
},{timestamps:true});

const Comments=mongoose.model("Comment",comments_Schema);
export default Comment;
