/* eslint-disable */

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

const Sidebar = ({ open, onClose, showSubMenu, setShowSubMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const importMainHandler = (e) => {
    e.preventDefault();
    console.log(location.state.userinfo);
    navigate("/main", { state: { userinfo: location.state.userinfo } });
    if (window.innerWidth < 500) onClose();
  };
  const usersHandler = (e) => {
    e.preventDefault();
    console.log(location.state.userinfo);
    navigate("/users", { state: { userinfo: location.state.userinfo } });
    if (window.innerWidth < 500) onClose();
  };
  const CostomersSubMenu = [
    {
      id: 1,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/customerSegment", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/customerSegment",
      manuTitle: " بخش بندی مشتریان ",
    },
    {
      id: 2,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/transition", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/transition",
      manuTitle: "جابجایی مشتریان",
    },
    {
      id: 3,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/retention", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/retention",
      manuTitle: " نرخ بازگشت مشتریان ",
    },
    {
      id: 4,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/lifeTime", { state: { userinfo: location.state.userinfo } });
        if (window.innerWidth < 500) onClose();
      },
      to: "/lifeTime",
      manuTitle: "طول عمر مشتریان",
    },
    {
      id: 5,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/shareShopping", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/shareShopping",
      manuTitle: "  سهم سبد مشتریان ",
    },
    {
      id: 6,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/purchaseInterval", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/purchaseInterval",
      manuTitle: "  فاصله خرید مشتریان",
    },
    {
      id: 7,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/groups", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/groups",
      manuTitle: " گروه مشتریان",
    },
  ];
  const ProductsSubMenu = [
    {
      id: 1,
      to: "",
      manuTitle: " عملکرد محصولات",
    },
    {
      id: 2,
      to: "",
      manuTitle: " تحلیل سبد مشتریان",
    },
  ];
  const SettingsSubMenu = [
    {
      id: 1,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/analyse", { state: { userinfo: location.state.userinfo } });
        if (window.innerWidth < 500) onClose();
      },
      to: "/analyse",
      manuTitle: " تحلیل داده",
    },
    {
      id: 2,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/importData", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/importData",
      manuTitle: " ورود داده",
    },
    {
      id: 3,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/smsPanel", { state: { userinfo: location.state.userinfo } });
        if (window.innerWidth < 500) onClose();
      },
      to: "/smsPanel",
      manuTitle: "سامانه پیامک",
    },
  ];
  console.log(SettingsSubMenu);
  return (
    <div
      className={`sm:none linear fixed !z-50 col-span-3 flex h-full min-h-full w-85p flex-col bg-white shadow-2xl shadow-white/5 transition-all duration-700 ease-linear dark:!bg-navy-800 dark:text-white md:static md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "-translate-x-0" : "translate-x-96"
      }  ${
        showSubMenu.allMenu
          ? "inline-flex md:w-full"
          : "col-span-1 w-80p overflow-x-hidden"
      }
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
      <div className="flex h-screen min-h-screen flex-col justify-between">
        <nav className="w-full" aria-label="Sidebar">
          <div className="overflow-y-auto overflow-x-hidden px-3 py-4">
            <ul className="space-y-2">
              <li className="flex items-center justify-center">
                <NavLink
                  onClick={importMainHandler}
                  to="/main"
                  className={({ isActive }) =>
                    isActive
                      ? "flex w-full rounded-lg bg-gray-100 p-2 text-base font-bold text-navy-500 dark:text-navy-500 dark:hover:bg-gray-500"
                      : "flex w-full rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }
                >
                  <p className="flex">
                    <MdLayers className="ml-2 text-lg" />
                    <span
                      className={`${
                        showSubMenu.allMenu ? "inline-flex" : "hidden"
                      } ml-3 whitespace-nowrap`}
                      sidebar-toggle-item="true"
                    >
                      نمای کلی
                    </span>
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-white dark:hover:bg-gray-700"
                >
                  <p className="flex">
                    <MdOutlineTimeline className="ml-2 text-lg" />
                    <span
                      className={`${
                        showSubMenu.allMenu ? "inline-flex" : "hidden"
                      } ml-3 whitespace-nowrap`}
                      sidebar-toggle-item="true"
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
                  <p className={`${showSubMenu.allMenu ? "block" : "hidden"}`}>
                    {showSubMenu.dropDownOne ? <BiCaretUp /> : <BiCaretDown />}
                  </p>
                </button>
                <ul
                  id="kamanSubmenu"
                  className={`${
                    showSubMenu.dropDownOne ? "inline-flex" : "hidden"
                  } my-[0.63rem] w-full flex-col rounded-md bg-gray-100 p-2`}
                >
                  {CostomersSubMenu.map((CostomerSubMenu) => {
                    return (
                      <li key={CostomerSubMenu.id}>
                        <NavLink
                          onClick={CostomerSubMenu.handler}
                          to={CostomerSubMenu.to}
                          className={({ isActive }) =>
                            isActive
                              ? "flex w-full rounded-lg bg-gray-300 p-2 text-base font-bold text-navy-500 dark:bg-navy-200 dark:text-navy-500 dark:hover:bg-gray-500"
                              : "flex w-full rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-navy-500 dark:hover:bg-gray-500"
                          }
                        >
                          {CostomerSubMenu.manuTitle}
                        </NavLink>
                      </li>
                    );
                  })}
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
                  <p className={`${showSubMenu.allMenu ? "block" : "hidden"}`}>
                    {showSubMenu.dropDownTwo ? <BiCaretUp /> : <BiCaretDown />}
                  </p>
                </button>
                <ul
                  id="kamanSubmenu"
                  className={`${
                    showSubMenu.dropDownTwo ? "inline-flex" : "hidden"
                  } my-[0.63rem] w-full flex-col rounded-md bg-gray-100 p-2`}
                >
                  {ProductsSubMenu.map((ProductSubMenu) => {
                    return (
                      <li key={ProductSubMenu.id}>
                        <NavLink
                          to={ProductSubMenu.to}
                          className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-navy-500 dark:hover:bg-gray-500"
                        >
                          {ProductSubMenu.manuTitle}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <NavLink
                  onClick={usersHandler}
                  to="/users"
                  className={({ isActive }) =>
                    isActive
                      ? "flex w-full rounded-lg bg-gray-100 p-2 text-base font-bold text-navy-500 dark:text-navy-500 dark:hover:bg-gray-500"
                      : "flex w-full rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }
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
                  <p className={`${showSubMenu.allMenu ? "block" : "hidden"}`}>
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
                  {SettingsSubMenu.map((SettingSubMenu) => {
                    return (
                      <li key={SettingSubMenu.id}>
                        <NavLink
                          onClick={SettingSubMenu.handler}
                          to={SettingSubMenu.to}
                          className={({ isActive }) =>
                            isActive
                              ? "flex w-full rounded-lg bg-gray-300 p-2 text-base font-bold text-navy-500 dark:bg-navy-200 dark:text-navy-500 dark:hover:bg-gray-500"
                              : "flex w-full rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-navy-500 dark:hover:bg-gray-500"
                          }
                        >
                          {SettingSubMenu.manuTitle}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <section>
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
        </section>
      </div>
      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
