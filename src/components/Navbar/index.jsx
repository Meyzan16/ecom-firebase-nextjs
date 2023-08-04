"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const isAdminView = false;

function NavItems({ isModalView = false }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 mt-4 font-medium rounded-lg 
          md:flex-row md:p-0  md:space-x-8 md:mt-0 md:border-0 bg-white ${
            isModalView ? "border-none" : "border border-gray-100"
          }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded-lg md:p-0"
                key={item.id}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded-lg md:p-0"
                key={item.id}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

const Navbar = () => {
  const router = useRouter();

  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const { user, isAuthUser,setIsAuthUser,setUser } = useContext(GlobalContext);

  console.log(user,isAuthUser, 'navbar');

  async function handleLogout (){
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove('token');
    localStorage.clear();
    router.push('/')
  }

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-4 xl:py-4 xl:px-0">
          <div className="flex items-center cursor-pointer">
            <span className="slef-center text-2xl font-semibold ">
              Ecommercery
            </span>
          </div>

          <NavItems />

          <div className="flex gap-2">
            {isAuthUser ? (
              <Fragment>
                <button className="button">Account</button>
                <button className="button">Cart</button>
              </Fragment>
            ) : null}

            {/* perlu di ingat tampilkan product sesuai admin yang create product */}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button className="button">Client View</button>
              ) : (
                <button className="button">Admin View</button>
              )
            ) : null}

            {isAuthUser ? (
              <button onClick={handleLogout} className="button">Logout</button>
            ) : (
              <button className="button" onClick={() => router.push("/login")}>
                Login
              </button>
            )}

            {/* button burger */}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <CommonModal
        showModalTitle={false}
        mainContent={<NavItems isModalView={true} />}
        show={showNavModal}
        setShow={setShowNavModal}
      />
    </>
  );
};

export default Navbar;
