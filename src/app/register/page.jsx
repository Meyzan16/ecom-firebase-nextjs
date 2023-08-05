"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const { pageLevelLoader, setPageLevelLoader , isAuthUser } = useContext(GlobalContext);
  const router = useRouter();

  // console.log(formData);

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  // console.log(isFormValid());

  async function handleRegister() {
    setPageLevelLoader(true);
    const data = await registerNewUser(formData);
    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsRegistered(true);
      setPageLevelLoader(false);
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
    }
    // console.log(data);
  }

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
              {isRegistered
                ? "Registration Successfully "
                : "Sign up for an account"}
            </p>
            {isRegistered ? (
              <button
                className="inline-flex w-full items-center justify-center bg-teal-600 px-6 py-4 text-lg
                  text-white translate-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-full "
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            ) : (
              <div className="w-full relative space-y-8">
                {registrationFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                      value={formData[controlItem.id]}
                    />
                  ) : controlItem.componentType === "select" ? (
                    <SelectComponent
                      options={controlItem.options}
                      label={controlItem.label}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                      value={formData[controlItem.id]}
                    />
                  ) : null
                )}
                <button
                  className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-teal-600 px-6 py-4 text-lg mt-4
                      text-white translate-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-full "
                  disabled={!isFormValid()}
                  onClick={handleRegister}
                >
                  {pageLevelLoader ? (
                    <ComponentLevelLoader
                      text={"Registering"}
                      color={"#ffffff"}
                      loading={pageLevelLoader}
                    />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Notification />
    </div>
  );
};

export default Register;
