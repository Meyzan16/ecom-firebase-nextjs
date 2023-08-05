"use client";

import { loginFormControls } from "@/utils";
import InputComponent from "@/components/FormElements/InputComponent";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { login } from "@/services/login";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const initialFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  // console.log(formData);

  function isFormValid() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await login(formData);
    // console.log(res, "login");

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(res?.userDoc?.user);
      Cookies.set("token", res?.userDoc?.token);
      localStorage.setItem("user", JSON.stringify(res?.userDoc?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  // console.log(isAuthUser, user);

  //jika ada user yang login maka jalankan use effect dan link access login di tendang
  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

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
                    value={formData[controlItem.id]}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [controlItem.id]: event.target.value,
                      });
                    }}
                  />
                ) : null
              )}
              <button
                className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-teal-600 px-6 py-4 text-lg mt-4
                    text-white translate-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-full "
                disabled={!isFormValid()}
                onClick={handleLogin}
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={"Logging In"}
                    color={"#ffffff"}
                    loading={componentLevelLoader && componentLevelLoader.loading}
                  />
                ) : (
                  "Login"
                )}
              </button>

              <div className="text-center text-lg font-medium text-gray-600">
                Not have already logged in ?{" "}
                <Link href="/register" className="hover:text-teal-600">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Login;
