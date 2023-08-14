import React from "react";
import Dropdown from "Components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
  BiEditAlt,
  BiEnvelope,
  BiExit,
  BiMenuAltRight,
  BiUser,
  BiUserCheck,
} from "react-icons/bi";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";

const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    let formData = new FormData();
    let api_address = InitObject.baseurl + "api/user_logout/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/", { state: { userinfo: response.data } });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-3xl dark:bg-[#0b14374d]">
      <div className="ms-[6px]">
        <div className="flex h-6 w-[224px] items-center pt-1">
          <a
            className="flex items-center text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            <BiMenuAltRight className="text-xl" />
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <h1 className="flex w-full items-center justify-center p-2 text-xs font-bold text-navy-500 md:text-base">
            سامانه تحلیل مشتریان کمان
          </h1>
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white md:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>

        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="text-xl text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="text-xl text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <BiUser className="cursor-pointer rounded-full bg-gray-100 p-1 text-4xl text-navy-500" />
          }
          children={
            <div className="z-50 flex w-64 flex-col justify-start rounded-lg bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <BiUserCheck className="text-2xl text-navy-500 dark:text-white" />
                  <p className="text-base font-bold text-navy-500 dark:text-white">
                    {location.state.userinfo.results.username}
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                <Link
                  to=""
                  className="mt-3 mb-2 flex items-center text-sm text-navy-500 dark:text-white hover:dark:text-white"
                >
                  <BiEnvelope className="text-xl text-navy-500 dark:text-white" />
                  <span className="mr-1 flex-1 text-center font-normal text-navy-500 dark:text-white">
                    {location.state.userinfo.results.email}
                  </span>
                </Link>
                <Link
                  to=""
                  className="mt-3 mb-2 flex items-center text-sm text-navy-500 dark:text-white hover:dark:text-white"
                >
                  <BiEditAlt className="text-xl text-navy-500 dark:text-white" />
                  <span className="mr-1 flex-1 text-center font-normal text-navy-500 dark:text-white">
                    {" "}
                    ویرایش پروفایل کاربری
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-3 flex items-center text-sm font-medium text-red-500 hover:text-red-500 dark:text-red-300"
                >
                  <BiExit className="ml-2 text-xl text-red-500 dark:text-red-300" />
                  <span>خروج</span>
                </button>
              </div>
            </div>
          }
          classNames={"py-2 top-10 left-0 -start-[180px] w-max"}
          animation="origin-[75%_0%] md:origin-top-end transition-all duration-300 ease-in-out"
        />
      </div>
    </nav>
  );
};

export default Navbar;
