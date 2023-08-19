"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import {
  AddNewAddress,
  deleteAddress,
  getallAddress,
  updateAddress,
} from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const page = () => {
  const {
    user,
    getaddress,
    setAddress,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentEditAddressId, setcurrentEditAddressId] = useState(null);
  const router = useRouter();

  async function extractAllAddress() {
    setPageLevelLoader(true);
    const res = await getallAddress(user?._id);
    if (res.success) {
      setPageLevelLoader(false);
      setAddress(res.data);
    }
  }

  async function handleAddOrUpdate() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditAddressId !== null
        ? await updateAddress({ ...addressFormData, _id: currentEditAddressId })
        : await AddNewAddress({ ...addressFormData, userID: user?._id });

    // console.log(res);
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        address: "",
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
      });
      extractAllAddress();
      setcurrentEditAddressId(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true);
    setAddressFormData({
      address: getCurrentAddress.address,
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
    });
    setcurrentEditAddressId(getCurrentAddress._id);
  }

  async function handleDelete(getCurrentAddressId) {
    setComponentLevelLoader({ loading: true, id: getCurrentAddressId });
    const res = await deleteAddress(getCurrentAddressId);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      extractAllAddress();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllAddress();
  }, [user]);

  return (
    <section className="py-12">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="bg-white shadow-lg rounded-xl">
            <div className="p-6 sm:p-12">
              <div className="flex flex-col space-y-4 md:space-y-0  md:space-x-6  md:flex-row">
                {/* we have render random image */}
              </div>

              <div className="flex flex-col flex-1">
                <h4 className="text-lg font-semibold text-center md:text-left">
                  {user?.name}
                </h4>
                <p>email : {user?.email}</p>
                <p>role : {user?.role}</p>
              </div>

              <button onClick={() => router.push('/orders')} className="mt-5 button inline-block">
                View your orders
              </button>

              <div className="mt-8">
                <h1 className="font-bold text-lg">Your Address : </h1>
                {pageLevelLoader ? (
                  <PulseLoader
                    color={"#000000"}
                    loading={pageLevelLoader}
                    size={15}
                    data-testid="loader"
                  />
                ) : (
                  <div className="mt-4 flex flex-col gap-4">
                    {getaddress && getaddress.length ? (
                      getaddress.map((item) => (
                        <div className="border p-6" key={item._id}>
                          <p>Name : {item.fullName} </p>
                          <p>Address : {item.address} </p>
                          <p>City : {item.city}</p>
                          <p>Country : {item.country}</p>
                          <p>Postal Code : {item.postalCode}</p>

                          <button
                            onClick={() => handleUpdateAddress(item)}
                            className="mt-5 mr-2 button inline-block"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="mt-5 button inline-block"
                          >
                            {componentLevelLoader &&
                            componentLevelLoader.loading &&
                            item._id === componentLevelLoader.id ? (
                              <ComponentLevelLoader
                                text={"Deleting"}
                                color={"#ffffff"}
                                loading={
                                  componentLevelLoader &&
                                  componentLevelLoader.loading
                                }
                              />
                            ) : (
                              "Delete"
                            )}
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">
                        No address found ! please add a new address below{" "}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="mt-5 button inline-block"
                >
                  {showAddressForm ? "Hide address form" : " Add new address"}
                </button>
              </div>

              {showAddressForm ? (
                <div className="flex flex-col items-center justify-start mt-10">
                  <div className="w-full space-y-8 ">
                    {addNewAddressFormControls.map((controlItem) => (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        value={addressFormData[controlItem.id]}
                        onChange={(event) =>
                          setAddressFormData({
                            ...addressFormData,
                            [controlItem.id]: event.target.value,
                          })
                        }
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleAddOrUpdate}
                    className="mt-5 button inline-block "
                  >
                    {componentLevelLoader.loading ? (
                      <ComponentLevelLoader
                        text={"Saving"}
                        color={"#ffffff"}
                        loading={
                          componentLevelLoader && componentLevelLoader.loading
                        }
                      />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      <Notification />
    </section>
  );
};

export default page;
