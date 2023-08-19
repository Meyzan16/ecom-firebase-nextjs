"use client";

import { GlobalContext } from "@/context";
import { getOrderDetails } from "@/services/order";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

const OrderDetails = () => {
  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    orderDetails,
    setOrderDetails,
  } = useContext(GlobalContext);
  const router = useRouter();

  const params = useParams();

  // console.log(params);

  async function extractOrderDetails() {
    setPageLevelLoader(true);

    const res = await getOrderDetails(params["order-details"]);
    console.log(res);

    if (res.success) {
      setPageLevelLoader(false);
      setOrderDetails(res?.data);
    } else {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    extractOrderDetails();
  }, []);

  if (pageLevelLoader) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  // console.log(orderDetails);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-screen-xl px-4 ">
        <div className="flex justify-start items-start space-y-2 flex-col">
          <h1 className="text-xl lg:text-2xl font-bold leading-relaxed lg:leading-9 text-gray-900">
            Order #{orderDetails._id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {orderDetails &&
              orderDetails.createdAt &&
              orderDetails.createdAt.split("T")[0]}{" "}
            |
            {orderDetails &&
              orderDetails.createdAt &&
              orderDetails.createdAt.split("T")[1].split(".")[0]}
          </p>
        </div>

        <div className="mt-10 flex flex-col justify-center xl:flex-row item-stretch w-full xl:space-x-8 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start bg-gray-50 shadow-xl rounded-xl px-4 py-4 md:p-6 xl:p-8 w-full">
              <p className="font-bold text-lg">Your order summary</p>
              {orderDetails.orderItems && orderDetails.orderItems.length
                ? orderDetails.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                    >
                      <div className="pb-4 md:pb-8 w-full md:w-40">
                        <img
                          src={item.product.imageUrl}
                          alt="image"
                          className="w-full hidden md:block"
                        />
                      </div>
                      <div className="border-b border-gray-300 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex  justify-start item-start space-y-8">
                          <h3 className="text-lg font-semibold leading-6  text-gray-900">
                            {item.product.name}
                          </h3>
                        </div>
                        <div className="w-full flex  justify-between item-start space-x-8">
                          <h3 className="text-lg font-semibold leading-6  text-gray-900">
                            ${item.product.price}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>

            <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-5 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 shadow-xl rounded-xl space-y-6">
                <h3 className="text-lg font-semibold leading-6  text-gray-900">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base leading-5 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-5 text-gray-500">
                      ${orderDetails.totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-base leading-5 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-5 text-gray-500">Free</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-base leading-5 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-5 text-gray-500">
                      ${orderDetails.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-gray-50 shadow-xl rounded-xl w-full xl:w-96 flex items-center md:items-start px-4 py-6  flex-col">
              <h3 className="text-lg font-semibold leading-6  text-gray-900">
                Customer Details
              </h3>
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex gap-4 justify-center flex-col w-full md:justify-start py-8 border-b border-gray-200">
                  <p className="text-base font-semibold text-left text-gray-900">
                    Name : {user?.name}
                  </p>
                  <p className="text-base font-semibold text-left text-gray-900">
                    Email : {user?.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 shadow-xl rounded-xl w-full flex items-center md:items-start px-4 py-6  flex-col">
              <div className="flex justify-center md:justify-start xl:flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <h3 className="text-lg font-semibold leading-6  text-gray-900">
                    Customer Details
                  </h3>
                  <p>Address : {orderDetails?.shippingAddress?.address}</p>
                  <p>City : {orderDetails?.shippingAddress?.city}</p>
                  <p>Country : {orderDetails?.shippingAddress?.country}</p>
                  <p>
                    Postal Code : {orderDetails?.shippingAddress?.postalCode}
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push(`/`)}
                className="w-full mt-4 mr-2 button inline-block"
              >
                Shop again
              </button>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
