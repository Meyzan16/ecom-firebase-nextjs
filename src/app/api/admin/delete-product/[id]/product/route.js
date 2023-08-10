import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req,{params}) {
  try {
    await connectToDB();

    //middleware
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
          const id = params.id;
          // console.log(id);

          if (!id)  {
            return NextResponse.json({
              success: false,
              message: "Product ID is required",
            });
          }

          const deleteProduct = await Product.findByIdAndDelete(id);

          if (deleteProduct) {
              return NextResponse.json({
                success: true,
                message: "Product deleted successfully",
              });
          } else {
              return NextResponse.json({
                success: false,
                message: "Failed to delete the product ! please try again",
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
