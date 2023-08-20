"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import {
  getAllOrderForAdmin,
  updateStatusOfOrderAdmin,
} from "@/services/order";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

const AdminView = () => {
  const {
    allOrdersForAdmin,
    setAllOrdersForAdmin,
    user,
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllOrdersForAdmin() {
    setPageLevelLoader(true);
    const res = await getAllOrderForAdmin();

    console.log(res);

    if (res.success) {
      setPageLevelLoader(false);
      setAllOrdersForAdmin(
        res.data && res.data.length
          ? res.data.filter((item) => item?.user?._id !== user?._id)
          : []
      );
    } else {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrdersForAdmin();
  }, [user]);

  async function handleUpdateStatus(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });
    const res = await updateStatusOfOrderAdmin({
      ...getItem,
      isProcessing: false,
    });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      extractAllOrdersForAdmin();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

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

  return (
    <section className=" py-12">
      <div className="mx-auto max-w-screen-xl px-4 ">
        <div className="flow-root">
          {allOrdersForAdmin && allOrdersForAdmin.length ? (
            <ul className="flex flex-col gap-4">
              {allOrdersForAdmin.map((item) => (
                <li
                  key={item?._id}
                  className="bg-white shadow-xl p-5 flex flex-col space-y-3 py-3 text-left rounded-xl"
                >
                  <div className="flex flex-wrap">
                    <h1 className="font-bold text-lg mb-3 flex-1">
                      #order : {item?._id}
                    </h1>

                    <div className="flex gap-2 flex-col">
                      <div className="flex  items-center">
                        <p className="mr-3 text-sm font-medium text-gray-900">
                          User name :
                        </p>
                        <p className="mr-3 text-sm font-semibold text-gray-900">
                          ${item?.user?.name}
                        </p>
                      </div>

                      <div className="flex  items-center">
                        <p className="mr-3 text-sm font-medium text-gray-900">
                          User Email :
                        </p>
                        <p className="mr-3 text-sm font-semibold text-gray-900">
                          ${item?.user?.email}
                        </p>
                      </div>
                      <div className="flex  items-center">
                        <p className="mr-3 text-sm font-medium text-gray-900">
                          Total Paid Amount :
                        </p>
                        <p className="mr-3 text-sm font-semibold text-gray-900">
                          ${item?.totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {item?.orderItems.map((orderitem, index) => (
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
                    <button
                      className={`mt-4 mr-2 ${
                        item?.isProcessing ? "bg-black" : "bg-teal-500"
                      }   px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-xl  inline-block`}
                    >
                      {item?.isProcessing
                        ? "order is processing"
                        : "Order is delivered"}
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(item)}
                      disabled = {!item.isProcessing}
                      className="disabled:opacity-50 mt-4 mr-2 button inline-block"
                    >
                      {componentLevelLoader.loading &&
                      item._id === componentLevelLoader.id ? (
                        <ComponentLevelLoader
                          text={"Updating order status"}
                          color={"#ffffff"}
                          loading={componentLevelLoader.loading}
                        />
                      ) : (
                        "Update Order Status"
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AdminView;
