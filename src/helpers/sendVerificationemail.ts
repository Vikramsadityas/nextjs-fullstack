// import {resend} from "@/lib/resend"
import { ApiResponse } from "@/types/ApiResponse"
import nodemailer from "nodemailer" 
export async function sendVerificationEmail(
    email:string,
    username:string,
    verifycode:string
):Promise<ApiResponse>{
    try {
            var transport = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            port: 465,
            auth: {
              user: "vikrams131204@gmail.com",
              pass: "ndqfdadbaiabgtnk"
            }
          });
          transport.verify(function (error) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });
          const mailOptions={
            from: 'Mystry Message <vikrams131204@gmail.com>',
            to: email,
            subject: "Mystry Message || Verification Code",
            html: ` 
            <section>
                <h2>Hello ${username},</h2>
                <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
                <p>${verifycode}</p>
                <p>If you did not request this code, please ignore this email.</p>
            </section>`, 
            //give a page to verify user this can be affected by browser learn more about how browser open the links in email before sending 
          }
        const mailResponse = await transport.sendMail(mailOptions);
        if(!mailResponse)
        {
            console.log("Cannot send email in resend.ts")
        }
        else{
            console.log("Email sent successfully")
        }
        return {
            success:true,
            message:"Verification email send successfully"
        }
    } catch (error) {
        console.error("Error in Sending verification email",error);
        return {
            success:false,
            message:"Cannot send verification email"
        }
        
    }
}
