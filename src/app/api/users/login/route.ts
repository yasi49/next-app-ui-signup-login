import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import * as jose from "jose";
// import { cookies } from "next/headers";

connect()

// const secret = new TextEncoder().encode(
//     // "PAKISTANzindabad143"
//     process.env.ACCESS_TOKEN_SECRET
// );

export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");
        
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        console.log(tokenData)
        //create token

     
        const token =jwt.sign(tokenData, process.env.NODE_ENV!, { expiresIn: "1d" })

        console.log(token)

        //===================================================================================
//         const secret = new TextEncoder().encode(
//             // "PAKISTANzindabad143"
//             process.env.NODE_ENV
//         );
        
//     const token = await new jose.SignJWT({ username: tokenData })
//     .setProtectedHeader({ alg: 'HS256' })
//     .setJti(nanoid())
//     .setIssuedAt()
//     .setExpirationTime("2h")
//     .sign(new TextEncoder().encode(secret.toString()));

//     cookies().set("token", token, {
//   httpOnly: true,
// });
//   console.log('cookies token',token)

  //=============================================================================================
        // console.log(process.env.)
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

function nanoid(): string {
    throw new Error("Function not implemented.");
}
