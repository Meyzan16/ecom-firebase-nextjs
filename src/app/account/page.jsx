"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import { GlobalContext } from "@/context";
import { addNewAddressFormControls } from "@/utils";
import { useContext, useState } from "react";

const page = () => {
  const { user, getaddress, setAddress, addressFormData, setAddressFormData } =
    useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);

  return (
    <section>
      <div className=" bg-gray-100 py-12">
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

              <button className="mt-5 button inline-block">
                View your orders
              </button>

              <div className="mt-8">
                <h1 className="font-bold text-lg">Your Address : </h1>
                <div className="mt-4">
                  {getaddress.length ? (
                    getaddress.map((item) => (
                      <div className="border p-6" key={item._id}>
                        <p>Name : {item.fullName} </p>
                        <p>Address : {item.address} </p>
                        <p>City : {item.city}</p>
                        <p>Country : {item.country}</p>
                        <p>Postal Code : {item.postalCode}</p>

                        <button className="mt-5 button inline-block">
                          Update
                        </button>
                        <button className="mt-5 button inline-block">
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">
                      No address found ! please add a new address below{" "}
                    </p>
                  )}
                </div>
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

                  <button className="mt-5 button w-full inline-block">
                    Save
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
