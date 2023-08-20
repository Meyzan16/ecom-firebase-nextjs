"use client";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListofproducts() {
    const res = await fetch("/api/product/getall-products", {
      method: "GET",
    });
    const get = await res.json();

    setProducts(get.data);
  }

  useEffect(() => {
    getListofproducts();
  }, []);

  console.log(products);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <section className="">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Best Fashion Collection
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="button"
            >
              Explore Shop Collection
            </button>
          </div>

          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/next-js-ecom-firebase.appspot.com/o/ecommerce%2Fnaruto%201.webp-1692021106321-0av50xylt3?alt=media&token=9aba8a32-cdb0-43e7-856f-beebfcf1a51a"
              alt="Header"
            />
          </div>
        </div>

        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-gray-100 rounded-lg place-content-center sm:p-8">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <div>
                  <h2 className="text-xl font-bold text-gray -900 sm:text-3xl">
                    Summer Sale Collection
                  </h2>
                </div>
                <button className="mt-1.5 button">Shop All</button>
              </div>
            </div>
            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                {products && products.length
                  ? products
                      .filter((item) => item.onSale === "yes")
                      .splice(0, 2)
                      .map((productItem) => (
                        <li
                          onClick={() =>
                            router.push(`/product/${productItem.slug}`)
                          }
                          className="cursor-pointer"
                          key={productItem._id}
                        >
                          <div>
                            <img
                              src={productItem.imageUrl}
                              alt=" product item"
                              className="object-cover w-full rounded-lg aspect-square"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className="font-medium text-gray-900">
                              {productItem.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-800">
                              ${productItem.price}{" "}
                              <span className="text-red-700">{`(-${productItem.priceDrop}%) off`}</span>
                            </p>
                          </div>
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">
              SHOP BY CATEGORY
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li onClick={() => router.push("/product/listing/kids")} className="cursor-pointer">
              <div className="relative block group">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/next-js-ecom-firebase.appspot.com/o/ecommerce%2Fnaruto%201.webp-1692021106321-0av50xylt3?alt=media&token=9aba8a32-cdb0-43e7-856f-beebfcf1a51a"
                  alt=""
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">KIDS</h3>
                  <button className="button mt-1.5">Shop Now</button>
                </div>
              </div>
            </li>

            {products && products.length
              ? products
                  .filter((item) => item.category === "women")
                  .splice(0, 1)
                  .map((productItem) => (
                    <li onClick={() => router.push("/product/listing/women")} className="cursor-pointer">
                      <div className="relative block group">
                        <img
                          src={productItem.imageUrl}
                          className="object-cover w-full aspect-square"
                        />
                        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                          <h3 className="text-xl font-medium text-white uppercase">
                            {productItem.category}
                          </h3>
                          <button
                            onClick={() =>
                              router.push("/product/listing/women")
                            }
                            className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
              : null}

            {products && products.length
              ? products
                  .filter((item) => item.category === "men")
                  .splice(0, 1)
                  .map((productItem) => (
                    <li onClick={() => router.push("/product/listing/men")} className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 cursor-pointer">
                      <div className="relative block group">
                        <img 
                          src={productItem.imageUrl}
                          className="object-cover w-full aspect-square"
                        />
                        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                          <h3 className="text-xl font-medium text-white uppercase">
                            {productItem.category}
                          </h3>
                          <button
                            onClick={() => router.push("/product/listing/men")}
                            className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
              : null}
          </ul>
        </div>
      </section>
    </main>
  );
}
