'use client';

import { loginFormControls } from "@/utils";
import InputComponent from "@/components/FormElements/InputComponent";
import Link from "next/link";

const Login = () => {
  return (
    <div className="bg-white relative">
      <div className="flex flex-col  items-center pr-10 pl-10 my-8">
        <div className="w-full mt-8  relative max-w-2xl">
          <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
            <p className="w-full sm:text-4xl text-xl font-medium text-center font-serif mb-6 ">
              Login
            </p>

            <div className="w-full relative space-y-8">
              {loginFormControls.map((controlItem) =>
                controlItem.componentType === "input" ? (
                  <InputComponent
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    label={controlItem.label}
                  />
                ) : null
              )}
              <button
                className="inline-flex w-full items-center justify-center bg-teal-600 px-6 py-4 text-lg mt-4
                    text-white translate-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-full "
              >
                Login
              </button>

              <div className="text-center text-lg font-medium text-gray-600">
                Not have already logged in ? <Link href="/register" className="hover:text-teal-600">
                  Register
                </Link>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
