"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import { registrationFormControls } from "@/utils";

const isRegistered = false;

const Register = () => {
  return (
    <div className="bg-white relative">
      <div className="flex flex-col  items-center pr-10 pl-10 my-8">
        
          <div className="w-full mt-8  relative max-w-2xl">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full sm:text-4xl text-xl font-medium text-center font-serif mb-6 ">
                {isRegistered
                  ? "Registration Successfully "
                  : "Sign up for an account"}
              </p>
              {isRegistered ? (
                <button
                  className="inline-flex w-full items-center justify-center bg-teal-600 px-6 py-4 text-lg
                  text-white translate-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-full "
                >
                  Login
                </button>
              ) : (
                <div className="w-full relative space-y-8">
                  {registrationFormControls.map((controlItem) => 
                    controlItem.componentType === 'input' ? (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        options={controlItem.options}
                        label={controlItem.label}
                      />
                    ) : null

                  )}
                    <button
                      className="inline-flex w-full items-center justify-center bg-teal-600 px-6 py-4 text-lg mt-4
                      text-white translate-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-full "
                    >
                    Register
                  </button>

                </div>
              )
              }
            </div>
          </div>
      </div>
    </div>
  );
};

export default Register;
