import mongoose from "mongoose";
import { Schema } from "mongoose";
export interface Message extends Document{
    _id:string;
    content:string;
    createdAt:Date;
} 
const MessageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})
const MessageModel= (mongoose.models.Message as mongoose.Model<Message>) || (mongoose.model<Message>("Message",MessageSchema))
export default MessageModel;