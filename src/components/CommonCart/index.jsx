"use client";

import React from "react";
import ComponentLevelLoader from "../Loader/componentlevel";

const CommonCart = ({
  cartItems = [],
  handleDeleteCartItem,
  componentLevelLoader,
}) => {
  return (
    <section className="bg-gray-100 py-12 ">
        <div className="mx-auto max-w-screen-xl px-4 ">
          <div className="bg-white shadow-lg rounded-xl">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {cartItems && cartItems.length > 0 ? (
                  <ul className="-my-8">
                    {cartItems.map((item) => (
                      <li
                        className="flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        key={item._id}
                      >
                        <div className="shrink-0">
                          <img
                            src={item.productID.imageUrl}
                            alt="product Image"
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-4">
                              <p className="text-base font-semibold text-gray-900">
                                {item.productID.name}
                              </p>
                            </div>
                            <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-1 sm:ml-8 sm:text-right">
                                ${item.productID.price}
                              </p>

                              <button
                                className="font-medium text-red-600 sm:order-2"
                                type="button"
                                onClick={() => handleDeleteCartItem(item._id)}
                              >
                                {componentLevelLoader &&
                                componentLevelLoader.loading &&
                                item._id === componentLevelLoader.id ? (
                                  <ComponentLevelLoader
                                    text={"Removing"}
                                    color={"#000000"}
                                    loading={componentLevelLoader.loading}
                                  />
                                ) : (
                                  "Remove"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="font-bold text-lg">Your cart is empty !</h1>
                )}
              </div>

              <div className="mt-6 border-t border-b  py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg text-black font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-lg text-black font-semibold">$0</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-lg text-black font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>

                <div className="mt-5 text-center">
                  <button
                    disabled={cartItems.length === 0}
                    className=" disabled:opacity-50 w-full inline-block mt-1.5 button"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default CommonCart;
