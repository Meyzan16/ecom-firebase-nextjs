"use client";

import { useRouter } from "next/navigation";

const ProductTile = ({ item }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/product/${item?.slug}`)}>
      <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52">
        <img
          src={item?.imageUrl}
          alt="Product image"
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
        />
      </div>
      {item?.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className=" rounded-full p-1 px-3 text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wide sm:py-1 sm:px-4">
            Sale
          </p>
        </div>
      ) : null}
      <div className="my-2 mx-4   items-center justify-between ">

        <h3 className="text-gray-600 text-sm\">{item?.name}</h3>

        <div className="text-sm  text-gray-500 truncate mb-1">
              {item?.description}
        </div>

        <div className="mb-2 flex gap-1 md:gap-2  items-center">
          <p
            className={`text-[10px] sm:text-sm  lg:text-md font-semibold ${
              item?.onSale === "yes" ? "line-through" : ""
            }`}
          >{`$ ${item?.price}`}</p>

          
          {item?.onSale === "yes" ? (
              <p className="text-[10px] sm:text-sm  lg:text-md font-semibold text-red-700">{`$ ${(
                item?.price -
                item?.price * (item?.priceDrop / 100)
              ).toFixed(2)}`}</p>
            ) : null}

          {item?.onSale === "yes" ? (
            <p className="text-[10px] sm:text-sm  lg:text-md font-semibold">{`-(${item?.priceDrop}%) off `}</p>
          ) : null}
          
        </div>

          

      </div>
    </div>
  );
};

export default ProductTile;
