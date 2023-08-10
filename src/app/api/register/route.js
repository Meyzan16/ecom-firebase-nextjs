import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcrypt";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': 'password of at least 6 characters',
  }),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const { name, email, password, role } = await req.json();
  //validate schema
  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    //check jika user udah register atau belum
    const isUserAlready = await User.findOne({ email });
    if (isUserAlready) {
      return NextResponse.json({
        success: false,
        message: "User is already registered. Please try with different email",
      });
    } else {
      const hassPassword = await hash(password, 12);

      const newCreatedUser = await User.create({
        name,
        email,
        password: hassPassword,
        role,
      });

      if (newCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
    success: false,
    message: "Something went wrong ! Please try again later",
    });
  }
}
