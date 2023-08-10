import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req,{params}) {

    try {
        await connectToDB();
        const slugProduct = params.slug;

        if(!slugProduct) {
            return NextResponse.json({
                success: false,
                status:400,
                message: "Slug is required",
            });
        }
        const getData = await Product.findOne({slug: params.slug});
        if(getData){
            return NextResponse.json({
                success: true,
                message: "get data product by slug successfully",
                data : getData
            });
        }else{
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No product found",
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