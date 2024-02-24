import {Schema,model} from "mongoose";

const postSchema = new Schema({
 userId:{
    
        type:String,
        required:true,
    
 },
 firstname:{
    
        type:String,
        required:true,
    
 },
 lastName:{
    
        type:String,
        required:true,
    
 },
 location:String,
 description:String,
 picturePath:String,
 userPicture:String,
 like:{
    type:Map,
    of:Boolean,
 },
 comments:{
    type: Array,
    default:[]
 }
 
},{timestamps:true}
);


const Post = model("post",postSchema);

export default Post