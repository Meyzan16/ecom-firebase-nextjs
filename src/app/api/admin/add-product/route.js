import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Product from "@/models/product";
import slugify from "slugify";
import AuthUser from "@/middleware/AuthUser";

const AddNewProductSchema = Joi.object({
  imageUrl: Joi.string().required().messages({
    'string.required': 'image is not required',
  }),
  sizes: Joi.array().required(),
  name: Joi.string().required().messages({
    'string.required': 'name is not required',
  }),
  price: Joi.number().required(),
  description: Joi.string().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  category: Joi.string().required(),
  priceDrop: Joi.number().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    //middleware
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {

      const {
        userId,
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = await req.json();

      const { error } = AddNewProductSchema.validate({
        imageUrl,
        sizes,
        name,
        price,
        description,
        deliveryInfo,
        onSale,
        category,
        priceDrop,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newCreatedProduct = new Product({
        owner: userId,
        name,
        slug:slugify(name),
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      });
      
      await newCreatedProduct.save();

      if (newCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product created successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to create product ! please try again",
        });
      }

    } else {
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
