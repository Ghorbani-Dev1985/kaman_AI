import { useState } from "react";
import logo from "./../../assets/img/logo/logo-11.png";
import routes from "routes.js";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiX } from "react-icons/hi";
import {
  MdGroups,
  MdOutlineSettings,
  MdLayers,
  MdOutlineTimeline,
  MdPeopleAlt,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";



 
const Sidebar = ({ openMenu,  onClose, showSubMenu, setShowSubMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const importMainHandler = (e) => {
    e.preventDefault();
    console.log(location.state.userinfo);
    navigate("/main", { state: { userinfo: location.state.userinfo } });
    if (window.innerWidth < 500) onClose();
  };
  const trendsHandler = (e) => {
    e.preventDefault();
    console.log(location.state.userinfo);
    navigate("/trends", { state: { userinfo: location.state.userinfo } });
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
      manuTitle: "ارزش طول عمر مشتریان",
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
        navigate("/Clustering", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/Clustering",
      manuTitle: "  خوشه بندی خرید مشتریان",
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
      manuTitle: " گروه مشتریان ",
    },
  ];
  const ProductsSubMenu = [
    {
      id: 1,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/productPerformanceAnalysis", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/productPerformanceAnalysis",
      manuTitle: "تحلیل عملکرد محصولات",
    },
    {
      id: 2,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/shoppingCartAnalysis", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/shoppingCartAnalysis",
      manuTitle: " تحلیل سبد مشتریان",
    },
  ];
  const PredictionSubMenu = [
    {
      id: 1,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/main", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/main",
      manuTitle: "پیش بینی ریزش مشتری ",
    },
    {
      id: 2,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/main", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/main",
      manuTitle: " تحلیل فاصله بین هر خرید",
    },
    {
      id: 3,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/main", {
          state: { userinfo: location.state.userinfo },
        });
        if (window.innerWidth < 500) onClose();
      },
      to: "/main",
      manuTitle: " دسته کردن محصولات",
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
    {
      id: 4,
      handler: (e) => {
        e.preventDefault();
        console.log(location.state.userinfo);
        navigate("/main", { state: { userinfo: location.state.userinfo } });
        if (window.innerWidth < 500) onClose();
      },
      to: "/#",
      manuTitle: "وب سرویس",
    },
  ];
  return (
    <Card className={`fixed z-50 col-span-2 flex h-full min-h-max w-85p flex-col justify-between bg-white shadow-2xl shadow-white/5 transition-all duration-700 ease-linear dark:!bg-navy-800 dark:text-white md:static xl:z-0 ${
      openMenu ? "-translate-x-0" : "translate-x-96"
    }  ${
      showSubMenu.allMenu
        ? "inline-flex md:w-full"
        : "col-span-1 w-14 overflow-x-hidden"
    }`}>
      <div className="mb-2 flex items-center gap-4 p-4">
      <div className={`mt-[50px] flex items-center`}>
        <div className="font-poppins ms-1 mt-1 flex h-2.5 items-center justify-center text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          <img src={logo} alt="کمان" className="w-auto object-cover" />
        </div>
        <p
        className="w-full flex justify-end cursor-pointer md:hidden"
        onClick={onClose}
      >
        <HiX />
      </p>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      </div>
 
          {/* Main */}
           <ListItem>
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
        </ListItem>
        {/* Trends */}
        <ListItem>
        <NavLink
                  onClick={trendsHandler}
                  to="/trends"
                  className={({ isActive }) =>
                    isActive
                      ? "flex w-full rounded-lg bg-gray-100 p-2 text-base font-bold text-navy-500 dark:text-navy-500 dark:hover:bg-gray-500"
                      : "flex w-full rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }
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
        </ListItem>
        <List>
        <Accordion
          open={open === 1}
          icon={
            <p className={`${showSubMenu.allMenu ? "inline-flex" : "hidden"}`}>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            /></p>
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
              <MdPeopleAlt className="ml-2 text-lg" />
              </ListItemPrefix>
             <Typography className={`ml-auto text-right  ${showSubMenu.allMenu ? "inline-flex" : "hidden"}`}>
             تحلیل رفتار مشتریان
             </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 rounded-md bg-gray-100 p-2">
            <List className="p-0">
            {CostomersSubMenu.map((CostomerSubMenu) => {
                      return (
                        <ListItem key={CostomerSubMenu.id}>
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
                        </ListItem>
                      );
                    })}
            </List>
          </AccordionBody>
        </Accordion>
        </List>
        {/* Sale */}
        <List>    
        <Accordion
          open={open === 2}
          icon={
            <p className={`${showSubMenu.allMenu ? "inline-flex" : "hidden"}`}>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
              />
            </p>
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
              <MdOutlineShoppingCart className="ml-2 text-lg" />
              </ListItemPrefix>
              <Typography className={`ml-auto text-right ${showSubMenu.allMenu ? "inline-flex" : "hidden"}`}>
              تحلیل فروش محصولات
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 rounded-md bg-gray-100 p-2">
            <List className="p-0">
            {ProductsSubMenu.map((ProductSubMenu) => {
                      return (
                        <ListItem key={ProductSubMenu.id}>
                          <NavLink
                           onClick={ProductSubMenu.handler}
                            to={ProductSubMenu.to}
                            className={({ isActive }) =>
                            isActive
                              ? "flex w-full rounded-lg bg-gray-300 p-2 text-base font-bold text-navy-500 dark:bg-navy-200 dark:text-navy-500 dark:hover:bg-gray-500"
                              : "flex w-full rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-navy-500 dark:hover:bg-gray-500"
                          }
                          >
                            {ProductSubMenu.manuTitle}
                          </NavLink>
                        </ListItem>
                      );
                    })}
            </List>
          </AccordionBody>
        </Accordion>
        </List>
             {/* Prediction */}
             <List>
             <Accordion
          open={open === 3}
          icon={
            <p className={`${showSubMenu.allMenu ? "inline-flex" : "hidden"}`}>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
              />
            </p>
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
              <ListItemPrefix>
              <MdOutlineShoppingCart className="ml-2 text-lg" />
              </ListItemPrefix>
              <Typography className={`ml-auto ${showSubMenu.allMenu ? "inline-flex" : "hidden"}`}>
              تحلیل‌های پیش‌بینی‌ کننده
                </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 rounded-md bg-gray-100 p-2">
            <List className="p-0">
            {PredictionSubMenu.map(({ id, to, manuTitle }) => {
                      return (
                        <ListItem key={id}>
                          <NavLink
                            to={to}
                            className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-navy-500 dark:hover:bg-gray-500"
                          >
                            {manuTitle}
                          </NavLink>
                        </ListItem>
                      );
                    })}
            </List>
          </AccordionBody>
        </Accordion>
        </List>
       {/* Users */}
       <ListItem>
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
        </ListItem>
          {/* Settings */}
          <List>
             <Accordion
          open={open === 4}
          icon={
            <p className={`${showSubMenu.allMenu ? "inline-flex" : "hidden"}`}>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
              />
            </p>
          }
        >
          <ListItem className="p-0" selected={open === 4}>
            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
              <ListItemPrefix>
              <MdOutlineShoppingCart className="ml-2 text-lg" />
              </ListItemPrefix>
              <Typography className={`ml-auto ${showSubMenu.allMenu ? "inline-flex" : "hidden"}`}>
              تنظیمات سامانه
                </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 rounded-md bg-gray-100 p-2">
            <List className="p-0">
            {SettingsSubMenu.map((SettingSubMenu) => {
                      return (
                        <ListItem key={SettingSubMenu.id}>
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
                        </ListItem>
                      );
                    })}
            </List>
          </AccordionBody>
        </Accordion>
        </List>
        
      <section className="w-full mt-auto">
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
    </Card>
  );
}

export default Sidebar;