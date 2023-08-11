import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req){
   try {
    await connectToDB();

        const extractAllProduct = await Product.find({}).populate("owner")
        // console.log(extractAllProduct);
        
        if (extractAllProduct) {
            return NextResponse.json({
              success: true,
              message: "Product get all successfully",
              data : extractAllProduct,
            });
        } else {
            return NextResponse.json({
              success: false,
              status: 204,
              message: "No products found !",
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