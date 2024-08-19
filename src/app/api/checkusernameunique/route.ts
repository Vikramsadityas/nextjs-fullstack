import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema=z.object({
    username:usernameValidation
})
export async function GET(request:Request){
    await dbConnect()
    try {
        const {searchParams}=new URL(request.url)
        const queryParams={
            username:searchParams.get('username')
        }
        //validate with zod
        const result=UsernameQuerySchema.safeParse(queryParams)
        console.log(result);//remove
        if(!result.success)
        {
            const usernameErrors=result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message:usernameErrors?.length>0
                ? usernameErrors.join(','):'Invalid query parameters'
            },{
                status:400
            })
        }

        const {username}=result.data
        const existingUser=await UserModel.findOne({username,isVerified:true})
        if(existingUser){
            return Response.json({
                success:false,
                message:"Username is Already taken",
            },{
                status:400
            })
        }
        return Response.json({
            success:true,
            message:"Username is available",
        },{
            status:200
        })

    } catch (error) {
        console.error("Error in checking username",error)
        return Response.json({
            success:false,
            message:"Error in checking username"
        },{
            status:500
        })
    }
}