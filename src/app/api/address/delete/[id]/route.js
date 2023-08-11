import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req,{params}) {
  try {
        await connectToDB();

        const id = params.id;
        // console.log(id);

        if (!id)  {
            return NextResponse.json({
              success: false,
              message: "Address ID is required",
            });
        }

        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const deleteProduct = await Address.findByIdAndDelete(id);
            if (deleteProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Address deleted successfully",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to delete the Address ! please try again",
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
