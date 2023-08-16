"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { getAllOrderForUser } from "@/services/order";
import React, { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const Orders = () => {
  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(GlobalContext);

  async function extractAllOrders() {
    setPageLevelLoader(true);

    const res = await getAllOrderForUser(user?._id);

    if (res.success) {
      setPageLevelLoader(false);
      setAllOrdersForUser(res.data);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setPageLevelLoader(false);
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
  }, [user]);

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

  console.log(allOrdersForUser);

  return (
    <section className="h-screen bg-gray-100 py-12">
        <div className="mx-auto max-w-screen-xl px-4 ">
              <div className="flow-root">
                {allOrdersForUser && allOrdersForUser.length ? (
                  <ul className="flex flex-col gap-4">
                    {allOrdersForUser.map((item) => (
                      <li
                        key={item._id}
                        className="bg-white shadow p-5 flex flex-col space-y-3 py-3 text-left"
                      >
                        <div className="flex flex-wrap">
                          <h1 className="font-bold text-lg mb-3 flex-1">
                            #order : {item._id}
                          </h1>

                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Count paid amount
                            </p>
                            <p className="mr-3 text-lg font-semibold text-gray-900">
                              $ {item.totalPrice}
                            </p>
                          </div>

                        </div>

                        <div className="flex gap-2">
                          {item.orderItems.map((orderitem, index) => (
                            <div className="shrink-0" key={index}>
                              <img
                                alt="order item"
                                className="h-24 w-24 max-w-full rounded-xl object-cover"
                                src={orderitem.product.imageUrl}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <button className=" mt-4 mr-2 button inline-block">
                            {item.isProcessing
                              ? "order is processing"
                              : "Order is delivered"}
                          </button>
                          <button className=" mt-4 mr-2 button inline-block">
                            View Order Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
        </div>
   
      <Notification />
    </section>
  );
};

export default Orders;
