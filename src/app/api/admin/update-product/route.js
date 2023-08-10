import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";


const UpdatedNewProductSchema = Joi.object({
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

export async function PUT(req) {
    try {
        await connectToDB();
        const extractData = await req.json();

    //middleware
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {

        const {
            _id,
            imageUrl,
            sizes,
            name,
            price,
            description,
            deliveryInfo,
            onSale,
            category,
            priceDrop,
        } = extractData;

        const { error } = UpdatedNewProductSchema.validate({
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


        const updatedProduct = await Product.findOneAndUpdate({
            _id : _id
        }, {
            name,
            description,
            price,
            category,
            sizes,
            deliveryInfo,
            onSale,
            priceDrop,
            imageUrl,
        }, {new:true})

        if (updatedProduct) {
            return NextResponse.json({
              success: true,
              message: "Product updated successfully",
            });
        } else {
            return NextResponse.json({
              success: false,
              message: "Failed to updated product ! please try again",
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

