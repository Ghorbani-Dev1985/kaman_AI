// /* eslint-disable */

// import logo from "./../../assets/img/logo/logo-11.png";
// import routes from "routes.js";
// import { useState } from "react";
// import { HiChevronDoubleLeft, HiChevronDoubleRight, HiX } from "react-icons/hi";
// import {
//   MdGroups,
//   MdOutlineSettings,
//   MdLayers,
//   MdOutlineTimeline,
//   MdPeopleAlt,
//   MdOutlineShoppingCart,
// } from "react-icons/md";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { BiCaretDown, BiCaretUp } from "react-icons/bi";

// const Sidebar = ({ open, onClose, showSubMenu, setShowSubMenu }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const importMainHandler = (e) => {
//     e.preventDefault();
//     console.log(location.state.userinfo);
//     navigate("/main", { state: { userinfo: location.state.userinfo } });
//     if (window.innerWidth < 500) onClose();
//   };
//   const trendsHandler = (e) => {
//     e.preventDefault();
//     console.log(location.state.userinfo);
//     navigate("/trends", { state: { userinfo: location.state.userinfo } });
//     if (window.innerWidth < 500) onClose();
//   };
//   const usersHandler = (e) => {
//     e.preventDefault();
//     console.log(location.state.userinfo);
//     navigate("/users", { state: { userinfo: location.state.userinfo } });
//     if (window.innerWidth < 500) onClose();
//   };
//   const CostomersSubMenu = [
//     {
//       id: 1,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/customerSegment", {
//           state: { userinfo: location.state.userinfo },
//         });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/customerSegment",
//       manuTitle: " بخش بندی مشتریان ",
//     },
//     {
//       id: 2,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/transition", {
//           state: { userinfo: location.state.userinfo },
//         });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/transition",
//       manuTitle: "جابجایی مشتریان",
//     },
//     {
//       id: 3,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/retention", {
//           state: { userinfo: location.state.userinfo },
//         });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/retention",
//       manuTitle: " نرخ بازگشت مشتریان ",
//     },
//     {
//       id: 4,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/lifeTime", { state: { userinfo: location.state.userinfo } });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/lifeTime",
//       manuTitle: "ارزش طول عمر مشتریان",
//     },
//     {
//       id: 5,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/shareShopping", {
//           state: { userinfo: location.state.userinfo },
//         });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/shareShopping",
//       manuTitle: "  سهم سبد مشتریان ",
//     },
//     {
//       id: 6,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/Clustering", {
//           state: { userinfo: location.state.userinfo },
//         });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/Clustering",
//       manuTitle: "  خوشه بندی خرید مشتریان",
//     },
//     {
//       id: 7,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/groups", {
//           state: { userinfo: location.state.userinfo },
//         });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/groups",
//       manuTitle: " گروه مشتریان مشتریان",
//     },
//   ];
//   const ProductsSubMenu = [
//     {
//       id: 1,
//       to: "",
//       manuTitle: "تحلیل عملکرد محصولات",
//     },
//     {
//       id: 2,
//       to: "",
//       manuTitle: " تحلیل سبد مشتریان",
//     },
//   ];
//   const PredictionSubMenu = [
//     {
//       id: 1,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/main", {
//           state: { userinfo: location.state.userinfo },
//         });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/main",
//       manuTitle: "پیش بینی ریزش مشتری ",
//     },
//     {
//       id: 2,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/main", {
//           state: { userinfo: location.state.userinfo },
//         });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/main",
//       manuTitle: " تحلیل فاصله بین هر خرید",
//     },
//     {
//       id: 3,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/main", {
//           state: { userinfo: location.state.userinfo },
//         });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/main",
//       manuTitle: " دسته کردن محصولات",
//     },
//   ];
//   const SettingsSubMenu = [
//     {
//       id: 1,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/analyse", { state: { userinfo: location.state.userinfo } });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/analyse",
//       manuTitle: " تحلیل داده",
//     },
//     {
//       id: 2,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/importData", {
//           state: { userinfo: location.state.userinfo },
//         });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/importData",
//       manuTitle: " ورود داده",
//     },
//     {
//       id: 3,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/smsPanel", { state: { userinfo: location.state.userinfo } });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/smsPanel",
//       manuTitle: "سامانه پیامک",
//     },
//     {
//       id: 4,
//       handler: (e) => {
//         e.preventDefault();
//         console.log(location.state.userinfo);
//         navigate("/main", { state: { userinfo: location.state.userinfo } });
//         if (window.innerWidth < 500) onClose();
//       },
//       to: "/#",
//       manuTitle: "وب سرویس",
//     },
//   ];
//   console.log(SettingsSubMenu);
//   return (
//     <div
//       className={`sm:none linear fixed !z-50 col-span-2 flex h-full min-h-max w-85p flex-col justify-between bg-white shadow-2xl shadow-white/5 transition-all duration-700 ease-linear dark:!bg-navy-800 dark:text-white md:static md:!z-50 lg:!z-50 xl:!z-0 ${
//         open ? "-translate-x-0" : "translate-x-96"
//       }  ${
//         showSubMenu.allMenu
//           ? "inline-flex md:w-full"
//           : "col-span-1 w-85p overflow-x-hidden"
//       }
//    `}
//     >
//       <div>
//       <span
//         className="end-4 absolute top-4 block cursor-pointer md:hidden"
//         onClick={onClose}
//       >
//         <HiX />
//       </span>
//       <div className={`mt-[50px] flex items-center`}>
//         <div className="font-poppins ms-1 mt-1 flex h-2.5 items-center justify-center text-[26px] font-bold uppercase text-navy-700 dark:text-white">
//           <img src={logo} alt="کمان" className="w-auto object-fill" />
//         </div>
//       </div>
//       <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
//       {/* Nav item */}
//       <div className="flex h-screen min-h-screen flex-col justify-between">
//         <nav className="w-full" aria-label="Sidebar">
//           <div className="overflow-y-auto overflow-x-hidden px-3 py-4">
//             <ul className="space-y-2">
//               <li className="flex items-center justify-center">
//                 <NavLink
//                   onClick={importMainHandler}
//                   to="/main"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "flex w-full rounded-lg bg-gray-100 p-2 text-base font-bold text-navy-500 dark:text-navy-500 dark:hover:bg-gray-500"
//                       : "flex w-full rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                   }
//                 >
//                   <p className="flex">
//                     <MdLayers className="ml-2 text-lg" />
//                     <span
//                       className={`${
//                         showSubMenu.allMenu ? "inline-flex" : "hidden"
//                       } ml-3 whitespace-nowrap`}
//                       sidebar-toggle-item="true"
//                     >
//                       نمای کلی
//                     </span>
//                   </p>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   onClick={trendsHandler}
//                   to="/trends"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "flex w-full rounded-lg bg-gray-100 p-2 text-base font-bold text-navy-500 dark:text-navy-500 dark:hover:bg-gray-500"
//                       : "flex w-full rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                   }
//                 >
//                   <p className="flex">
//                     <MdOutlineTimeline className="ml-2 text-lg" />
//                     <span
//                       className={`${
//                         showSubMenu.allMenu ? "inline-flex" : "hidden"
//                       } ml-3 whitespace-nowrap`}
//                       sidebar-toggle-item="true"
//                     >
//                       روندها
//                     </span>
//                   </p>
//                 </NavLink>
//               </li>
//               <li>
//                 <button
//                   onClick={() =>
//                     setShowSubMenu({
//                       ...showSubMenu,
//                       dropDownOne: !showSubMenu.dropDownOne,
//                     })
//                   }
//                   type="button"
//                   data-dropdown-toggle="kamanSubmenu"
//                   aria-controls="kamanSubmenu"
//                   aria-expanded="false"
//                   className="group flex w-full items-center justify-between rounded-lg p-2 text-base font-normal text-gray-700 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                 >
//                   <p className="flex items-center justify-center">
//                     <MdPeopleAlt className="ml-2 text-lg" />
//                     <span
//                       className={`${
//                         showSubMenu.allMenu ? "inline-flex" : "hidden"
//                       }`}
//                       sidebar-toggle-item="true"
//                     >
//                       تحلیل رفتار مشتریان
//                     </span>
//                   </p>
//                   <p className={`${showSubMenu.allMenu ? "block" : "hidden"}`}>
//                     {showSubMenu.dropDownOne ? <BiCaretUp /> : <BiCaretDown />}
//                   </p>
//                 </button>
//                 <div
//                   className={`${
//                     showSubMenu.allMenu ? "inline-flex w-full" : "hidden"
//                   }`}
//                 >
//                   <ul
//                     id="kamanSubmenu"
//                     className={`${
//                       showSubMenu.dropDownOne ? "inline-flex" : "hidden"
//                     } my-[0.63rem] w-full flex-col rounded-md bg-gray-100 p-2`}
//                   >
//                     {CostomersSubMenu.map((CostomerSubMenu) => {
//                       return (
//                         <li key={CostomerSubMenu.id}>
//                           <NavLink
//                             onClick={CostomerSubMenu.handler}
//                             to={CostomerSubMenu.to}
//                             className={({ isActive }) =>
//                               isActive
//                                 ? "flex w-full rounded-lg bg-gray-300 p-2 text-base font-bold text-navy-500 dark:bg-navy-200 dark:text-navy-500 dark:hover:bg-gray-500"
//                                 : "flex w-full rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-navy-500 dark:hover:bg-gray-500"
//                             }
//                           >
//                             {CostomerSubMenu.manuTitle}
//                           </NavLink>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               </li>
//               <li>
//                 <button
//                   onClick={() =>
//                     setShowSubMenu({
//                       ...showSubMenu,
//                       dropDownThree: !showSubMenu.dropDownTwo,
//                     })
//                   }
//                   type="button"
//                   data-dropdown-toggle="kamanSubmenu"
//                   aria-controls="kamanSubmenu"
//                   aria-expanded="false"
//                   className="group flex w-full items-center justify-between rounded-lg p-2 text-base font-normal text-gray-700 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                 >
//                   <p className="flex items-center justify-center">
//                     <MdOutlineShoppingCart className="ml-2 text-lg" />
//                     <span
//                       className={`${
//                         showSubMenu.allMenu ? "inline-flex" : "hidden"
//                       } ml-3 whitespace-nowrap`}
//                       sidebar-toggle-item="true"
//                     >
//                       تحلیل فروش محصولات
//                     </span>
//                   </p>
//                   <p className={`${showSubMenu.allMenu ? "block" : "hidden"}`}>
//                     {showSubMenu.dropDownTwo ? <BiCaretUp /> : <BiCaretDown />}
//                   </p>
//                 </button>
//                 <div
//                   className={`${
//                     showSubMenu.allMenu ? "inline-flex w-full" : "hidden"
//                   }`}
//                 >
//                   <ul
//                     id="kamanSubmenu"
//                     className={`${
//                       showSubMenu.dropDownTwo ? "inline-flex" : "hidden"
//                     } my-[0.63rem] w-full flex-col rounded-md bg-gray-100 p-2`}
//                   >
//                     {ProductsSubMenu.map((ProductSubMenu) => {
//                       return (
//                         <li key={ProductSubMenu.id}>
//                           <NavLink
//                             to={ProductSubMenu.to}
//                             className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-navy-500 dark:hover:bg-gray-500"
//                           >
//                             {ProductSubMenu.manuTitle}
//                           </NavLink>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               </li>
//               <li>
//                 <button
//                   onClick={() =>
//                     setShowSubMenu({
//                       ...showSubMenu,
//                       dropDownThree: !showSubMenu.dropDownThree,
//                     })
//                   }
//                   type="button"
//                   data-dropdown-toggle="kamanSubmenu"
//                   aria-controls="kamanSubmenu"
//                   aria-expanded="false"
//                   className="group flex w-full items-center justify-between rounded-lg p-2 text-base font-normal text-gray-700 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                 >
//                   <p className="flex items-center justify-center">
//                     <MdOutlineShoppingCart className="ml-2 text-lg" />
//                     <span
//                       className={`${
//                         showSubMenu.allMenu ? "inline-flex" : "hidden"
//                       } ml-3 whitespace-nowrap`}
//                       sidebar-toggle-item="true"
//                     >
//                       تحلیل‌های پیش‌بینی‌ کننده
//                     </span>
//                   </p>
//                   <p className={`${showSubMenu.allMenu ? "block" : "hidden"}`}>
//                     {showSubMenu.dropDownThree ? (
//                       <BiCaretUp />
//                     ) : (
//                       <BiCaretDown />
//                     )}
//                   </p>
//                 </button>
//                 <div
//                   className={`${
//                     showSubMenu.allMenu ? "inline-flex w-full" : "hidden"
//                   }`}
//                 >
//                   <ul
//                     id="kamanSubmenu"
//                     className={`${
//                       showSubMenu.dropDownThree ? "inline-flex" : "hidden"
//                     } my-[0.63rem] w-full flex-col rounded-md bg-gray-100 p-2`}
//                   >
//                     {PredictionSubMenu.map(({ id, to, manuTitle }) => {
//                       return (
//                         <li key={id}>
//                           <NavLink
//                             to={to}
//                             className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-700 transition duration-75 hover:bg-navy-50 dark:text-navy-500 dark:hover:bg-gray-500"
//                           >
//                             {manuTitle}
//                           </NavLink>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               </li>
//               <li>
//                 <NavLink
//                   onClick={usersHandler}
//                   to="/users"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "flex w-full rounded-lg bg-gray-100 p-2 text-base font-bold text-navy-500 dark:text-navy-500 dark:hover:bg-gray-500"
//                       : "flex w-full rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                   }
//                 >
//                   <p className="flex items-center justify-center">
//                     <MdGroups className="ml-2 text-lg" />
//                     <span
//                       className={`${
//                         showSubMenu.allMenu ? "inline-flex" : "hidden"
//                       } ml-3`}
//                     >
//                       مدیریت کاربران
//                     </span>
//                   </p>
//                 </NavLink>
//               </li>
//               <li>
//                 <button
//                   onClick={() =>
//                     setShowSubMenu({
//                       ...showSubMenu,
//                       dropDownFour: !showSubMenu.dropDownFour,
//                     })
//                   }
//                   type="button"
//                   data-dropdown-toggle="kamanSubmenu"
//                   aria-controls="kamanSubmenu"
//                   aria-expanded="false"
//                   className="group flex w-full items-center justify-between rounded-lg p-2 text-base font-normal text-gray-700 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
//                 >
//                   <p className="flex items-center justify-center">
//                     <MdOutlineSettings className="ml-2 text-lg" />
//                     <span
//                       className={`${
//                         showSubMenu.allMenu ? "inline-flex" : "hidden"
//                       } ml-3 whitespace-nowrap`}
//                       sidebar-toggle-item="true"
//                     >
//                       تنظیمات سامانه
//                     </span>
//                   </p>
//                   <p className={`${showSubMenu.allMenu ? "block" : "hidden"}`}>
//                     {showSubMenu.dropDownFour ? <BiCaretUp /> : <BiCaretDown />}
//                   </p>
//                 </button>
//                 <div
//                   className={`${
//                     showSubMenu.allMenu ? "inline-flex w-full" : "hidden"
//                   }`}
//                 >
//                   <ul
//                     id="kamanSubmenu"
//                     className={`${
//                       showSubMenu.dropDownFour ? "inline-flex" : "hidden"
//                     } my-[0.63rem] w-full flex-col rounded-md bg-gray-100 p-2`}
//                   >
//                     {SettingsSubMenu.map((SettingSubMenu) => {
//                       return (
//                         <li key={SettingSubMenu.id}>
//                           <NavLink
//                             onClick={SettingSubMenu.handler}
//                             to={SettingSubMenu.to}
//                             className={({ isActive }) =>
//                               isActive
//                                 ? "flex w-full rounded-lg bg-gray-300 p-2 text-base font-bold text-navy-500 dark:bg-navy-200 dark:text-navy-500 dark:hover:bg-gray-500"
//                                 : "flex w-full rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100 dark:text-navy-500 dark:hover:bg-gray-500"
//                             }
//                           >
//                             {SettingSubMenu.manuTitle}
//                           </NavLink>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </div>
//       {/* Nav item end */}
//       </div>
//         <section>
//           <div className="text-slate-500 border-t-stone-200 flex w-full items-center justify-center border-t border-solid pt-2 text-navy-500">
//             v0.0.1
//           </div>
//           <div
//             onClick={() =>
//               setShowSubMenu({ ...showSubMenu, allMenu: !showSubMenu.allMenu })
//             }
//             className="my-4 hidden w-full cursor-pointer items-center justify-center text-navy-500 lg:inline-flex"
//           >
//             {showSubMenu.allMenu ? (
//               <>
//                 <HiChevronDoubleRight className="ml-1" />
//                 <span>مخفی کردن منو</span>
//               </>
//             ) : (
//               <HiChevronDoubleLeft className="ml-1" />
//             )}
//           </div>
//         </section>
//     </div>
//   );
// };

// export default Sidebar;
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
 
export default function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-full col-span-2 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                E-Commerce
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Products
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
      <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features
          and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            Upgrade Now
          </Typography>
        </div>
      </Alert>
    </Card>
  );
}