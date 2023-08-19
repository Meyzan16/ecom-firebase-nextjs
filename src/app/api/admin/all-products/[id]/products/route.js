import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req, {params}){
   try {
    await connectToDB();
    const user = "admin";

    if(user === "admin"){
        const extractAllProduct = await Product.find({owner:params.id})
        
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
        
    }else{
        return NextResponse.json({
            success: false,
            message: "You are not authorized !",
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