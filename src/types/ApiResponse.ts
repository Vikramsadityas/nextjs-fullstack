import { Message } from "@/model/User.model";

export interface ApiResponse{
    success:boolean,
    message:string,
    isAcceptingmessages?:boolean,
    messages?:Array<Message>
}