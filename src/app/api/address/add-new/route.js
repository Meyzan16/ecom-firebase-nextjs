import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewAddress = Joi.object({
    fullName : Joi.string().required(),
    address : Joi.string().required(),
    city : Joi.string().required(),
    country : Joi.string().required(),
    postalCode : Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {

    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            const data = await req.json();
            const {fullName,address,city,country,postalCode,userID} = data;
            const {error}  = AddNewAddress.validate({
                fullName,address,city,country,postalCode
            })
            if(error){
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                });
            }

            const addAdress = await Address.create(data);
            if(addAdress){
                return NextResponse.json({
                    success: false,
                    message: "Address added successfully",
                    });
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Failed to add address ! please try again",
                });
            }

        }else{
            return NextResponse.json({
                success: false,
                message: "You are not authenticated",
                });
        }

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again later",
        });
    }
}