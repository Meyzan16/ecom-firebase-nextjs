import mongoose from "mongoose";
import User from "./user";

const ProductSchema = new mongoose.Schema(
  {
    owner : {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
    },
    name: String,
    slug: String,
    description: String,
    price: Number,
    category: String,
    sizes: Array,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

const Product = mongoose.models.Products || mongoose.model('Products', ProductSchema);

export default Product;

 
