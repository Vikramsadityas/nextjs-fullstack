import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationemail";
export async function POST(request:Request)
{
    await dbConnect();
    try {
        const {email,username,password}=await request.json()
        console.log(email," email")
        const existingUserverifiedbyUsername=await UserModel.findOne({
            username,
            isVerified:true
        })
        if(existingUserverifiedbyUsername)
        {
            return Response.json({
                success:false,
                message:"Username is already present"
            },
            {
                status:400
            })
        }
        const existingUserbyEmail=await UserModel.findOne({email})
        const verifyCode=Math.floor(100000+Math.random()*900000).toString()
        if(existingUserbyEmail)
        {
            if(existingUserbyEmail.isVerified)
            {
                return Response.json({
                    success:false,
                    message:"User already exist with this email"
                },
                {
                    status:400
                }
            )
            }
            else{
                const hashedPassword=await bcrypt.hash(password,10)
                existingUserbyEmail.password=hashedPassword
                existingUserbyEmail.verifyCode=verifyCode
                existingUserbyEmail.verifyCodeExpiry=new Date(Date.now()+3600000);
                await existingUserbyEmail.save()
            }
        }
        else{
            const hashedPassword=await bcrypt.hash(password,10)
            const expiryDate=new Date()
            expiryDate.setHours(expiryDate.getHours()+1)
            const newUser=new UserModel({
                username,
                email,
                password:hashedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isVerified:false,
                isAcceptingMessage:true,
                messages:[]
            });
            await newUser.save()
        }
        //send verification email
        const emailResponse=sendVerificationEmail(email,username,verifyCode)
        if(!(await emailResponse).success){
            return Response.json(
                {
                    success:false,
                    message:(await emailResponse).message,

                },
                {
                    status:400
                }
            )
        }
        return Response.json({
            success:true,
            message:"Verification email sent successfully"
        },
        {
            status:200
        })
    } catch (error) {
        console.error("Error in registrating User",error)
        return Response.json(
            {
                success:false,
                message:"Error in registrating User"
            },
            {
                status:500
            }
        )
    }
} 