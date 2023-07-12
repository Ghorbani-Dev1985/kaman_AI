/* eslint-disable */

import Links from "./components/Links";
import logo from "./../../assets/img/logo/logo-11.png";
import routes from "routes.js";
import { useState } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiX } from "react-icons/hi";
import {
  MdGroups,
  MdOutlineSettings,
  MdLayers,
  MdOutlineTimeline,
  MdPeopleAlt,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

const Sidebar = ({ open, onClose , showSubMenu , setShowSubMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const importMainHandler = (e) => {
    e.preventDefault();
    console.log(location.state.userinfo);
    navigate("/main", { state: { userinfo: location.state.userinfo } });
  };

  const importDataHandler = (e) => {
    e.preventDefault();
    console.log(location.state.userinfo);
    navigate("/importData", { state: { userinfo: location.state.userinfo } });
  };

  const analyseDataHandler = (e) => {
    e.preventDefault();
    console.log(location.state.userinfo);
    navigate("/analyse", { state: { userinfo: location.state.userinfo } });
  };

  return (
    <div
      className={`sm:none linear absolute !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all duration-700 ease-linear dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "-translate-x-0" : "translate-x-96"
      }  ${showSubMenu.allMenu ? "md:w-20p inline-flex" : "w-3p overflow-x-hidden"}
   `}
    >
      <span
        className="absolute top-4 block cursor-pointer end-4 md:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>
      <div className={`mt-[50px] flex items-center`}>
        <div className="font-poppins mt-1 flex h-2.5 items-center justify-center text-[26px] font-bold uppercase text-navy-700 ms-1 dark:text-white">
          <img src={logo} alt="کمان" className="w-auto object-fill" />
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}
      <div className="flex h-screen flex-col justify-evenly">
        <nav className="w-full" aria-label="Sidebar">
          <div className="overflow-y-auto overflow-x-hidden px-3 py-4">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/main"
                  // activeClassName="text-navy-500 bg-gray-100"
                  className="flex items-center justify-between rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <p className="flex items-center justify-center">
                    <MdLayers className="ml-2 text-lg" />
                    <span
                      className={`${
                        showSubMenu.allMenu ? "inline-flex" : "hidden"
                      } ml-3`}
                    >
                      نمای کلی
                    </span>
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to=""
                  // activeClassName="text-navy-500 bg-gray-100"
                  className="flex items-center justify-between rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <p className="flex items-center justify-center">
                    <MdOutlineTimeline className="ml-2 text-lg" />
                    <span
                      className={`${
                        showSubMenu.allMenu ? "inline-flex" : "hidden"
                      } ml-3`}
                    >
                      روندها
                    </span>
                  </p>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() =>
                    setShowSubMenu({
                      ...showSubMenu,
                      dropDownOne: !showSubMenu.dropDownOne,
                    })
                  }
                  type="button"
                  data-dropdown-toggle="kamanSubmenu"
                  aria-controls="kamanSubmenu"
                  aria-expanded="false"
                  className="group flex w-full items-center justify-between rounded-lg p-2 text-base font-normal text-gray-700 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <p className="flex items-center justify-center">
                    <MdPeopleAlt className="ml-2 text-lg" />
                    <span
                      className={`${
                        showSubMenu.allMenu ? "inline-flex" : "hidden"
                      } ml-3 whitespace-nowrap`}
                      sidebar-toggle-item="true"
                    >
                      مشتریان
                    </span>
                  </p>
                  <p>
                    {showSubMenu.dropDownOne ? <BiCaretUp /> : <BiCaretDown />}
                  </p>
                </button>
                <ul
                  id="kamanSubmenu"
                  className={`${
                    showSubMenu.dropDownOne ? "inline-flex" : "hidden"
                  } my-[0.63rem] w-full flex-col rounded-md bg-gray-100 p-2`}
                >
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      بخش بندی مشتریان{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      {" "}
                      جابجایی مشتریان{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      نرخ بازگشت مشتریان{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      طول عمر مشتریان{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      سهم سبد مشتریان{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      فاصله خرید مشتریان{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      گروه مشتریان{" "}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  onClick={() =>
                    setShowSubMenu({
                      ...showSubMenu,
                      dropDownTwo: !showSubMenu.dropDownTwo,
                    })
                  }
                  type="button"
                  data-dropdown-toggle="kamanSubmenu"
                  aria-controls="kamanSubmenu"
                  aria-expanded="false"
                  className="group flex w-full items-center justify-between rounded-lg p-2 text-base font-normal text-gray-700 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <p className="flex items-center justify-center">
                    <MdOutlineShoppingCart className="ml-2 text-lg" />
                    <span
                      className={`${
                        showSubMenu.allMenu ? "inline-flex" : "hidden"
                      } ml-3 whitespace-nowrap`}
                      sidebar-toggle-item="true"
                    >
                      محصولات
                    </span>
                  </p>
                  <p>
                    {showSubMenu.dropDownTwo ? <BiCaretUp /> : <BiCaretDown />}
                  </p>
                </button>
                <ul
                  id="kamanSubmenu"
                  className={`${
                    showSubMenu.dropDownTwo ? "inline-flex" : "hidden"
                  } my-[0.63rem] w-full flex-col rounded-md bg-gray-100 p-2`}
                >
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      {" "}
                      عملکرد محصولات{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      {" "}
                      تحلیل سبد مشتریان{" "}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink
                  to="/main"
                  // activeClassName="text-navy-500 bg-gray-100"
                  className="flex items-center justify-between rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <p className="flex items-center justify-center">
                    <MdGroups className="ml-2 text-lg" />
                    <span
                      className={`${
                        showSubMenu.allMenu ? "inline-flex" : "hidden"
                      } ml-3`}
                    >
                      مدیریت کاربران
                    </span>
                  </p>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() =>
                    setShowSubMenu({
                      ...showSubMenu,
                      dropDownThree: !showSubMenu.dropDownThree,
                    })
                  }
                  type="button"
                  data-dropdown-toggle="kamanSubmenu"
                  aria-controls="kamanSubmenu"
                  aria-expanded="false"
                  className="group flex w-full items-center justify-between rounded-lg p-2 text-base font-normal text-gray-700 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <p className="flex items-center justify-center">
                    <MdOutlineSettings className="ml-2 text-lg" />
                    <span
                      className={`${
                        showSubMenu.allMenu ? "inline-flex" : "hidden"
                      } ml-3 whitespace-nowrap`}
                      sidebar-toggle-item="true"
                    >
                      تنظیمات
                    </span>
                  </p>
                  <p>
                    {showSubMenu.dropDownThree ? (
                      <BiCaretUp />
                    ) : (
                      <BiCaretDown />
                    )}
                  </p>
                </button>
                <ul
                  id="kamanSubmenu"
                  className={`${
                    showSubMenu.dropDownThree ? "inline-flex" : "hidden"
                  } my-[0.63rem] w-full flex-col rounded-md bg-gray-100 p-2`}
                >
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      {" "}
                      تحلیل داده{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      {" "}
                      ورود داده{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to=""
                      // activeClassName="text-navy-500 bg-gray-100"
                      className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                    >
                      سامانه پیامک{" "}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <div className="text-slate-500 border-t-stone-200 flex w-full items-center justify-center border-t border-solid pt-2 text-navy-500">
          v0.0.1
        </div>
        <div
          onClick={() =>
            setShowSubMenu({ ...showSubMenu, allMenu: !showSubMenu.allMenu })
          }
          className="my-4 hidden w-full cursor-pointer items-center justify-center text-navy-500 lg:inline-flex"
        >
          {showSubMenu.allMenu ? (
            <>
              <HiChevronDoubleRight className="ml-1" />
              <span>مخفی کردن منو</span>
            </>
          ) : (
            <HiChevronDoubleLeft className="ml-1" />
          )}
        </div>
      </div>
      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
