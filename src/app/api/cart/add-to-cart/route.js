import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { productID, userID } = data;

      const { error } = AddToCart.validate({ userID, productID });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const isCurrentCartItemAlreadyExists = await Cart.findOne({productID: productID,userID: userID});

      if (isCurrentCartItemAlreadyExists) {
        return NextResponse.json({
          success: false,
          message: "Product is already in the cart",
        });
      }else{
        const saveProductCart = await Cart.create(data);
        if (saveProductCart) {
          return NextResponse.json({
            success: true,
            message: "Product is added successfully to cart",
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "Failed to add product cart ! please try again",
          });
        }

      }

    } else {
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
