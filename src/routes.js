import React from "react";

// Admin Imports


// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdGroups,
  MdOutlineSettings,
  MdLayers,
  MdOutlineTimeline,
  MdPeopleAlt,
  MdOutlineShoppingCart,
} from "react-icons/md";

const routes = [
  {
    name: "نمای کلی",
    layout: "/main",
    path: "main",
    icon: <MdLayers className="h-6 w-6 ml-2" />,
    // component: <Main />,
    subMenu: {
      name: "نمای کلی",
      layout: "/main",
      path: "main",
      icon: <MdLayers className="h-6 w-6 ml-2" />,
      // component: <Main />,
    },
  },
  {
    name: "روندها",
    layout: "/admin",
    path: "default",
    icon: <MdOutlineTimeline className="h-6 w-6 ml-2" />,
    // component: <MainDashboard />,
    subMenu: {
      name: "نمای کلی",
      layout: "/main",
      path: "main",
      icon: <MdLayers className="h-6 w-6 ml-2" />,
      // component: <Main />,
    },
  },
  {
    name: "مشتریان",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdPeopleAlt className="h-6 w-6 ml-2" />,
    // component: < />,
    secondary: true,
    subMenu: {
      name: "نمای کلی",
      layout: "/main",
      path: "main",
      icon: <MdLayers className="h-6 w-6 ml-2" />,
      // component: <Main />,
    },
  },
  {
    name: "محصولات",
    layout: "/admin",
    icon: <MdOutlineShoppingCart className="h-6 w-6 ml-2" />,
    path: "data-tables",
    // component: <DataTables />,
    subMenu: {
      name: "نمای کلی",
      layout: "/main",
      path: "main",
      icon: <MdLayers className="h-6 w-6 ml-2" />,
      // component: <Main />,
    },
  },
  {
    name: "مدیریت کاربران",
    layout: "/admin",
    path: "profile",
    icon: <MdGroups className="h-6 w-6 ml-2" />,
    // component: <Profile />,
    subMenu: {
      name: "نمای کلی",
      layout: "/main",
      path: "main",
      icon: <MdLayers className="h-6 w-6 ml-2" />,
      // component: <Main />,
    },
  },
  {
    name: "تنظیمات",
    layout: "/auth",
    path: "sign-in",
    icon: <MdOutlineSettings className="h-6 w-6 ml-2" />,
    // component: <SignIn />,
    subMenu: {
      name: "نمای کلی",
      layout: "/main",
      path: "main",
      icon: <MdLayers className="h-6 w-6 ml-2" />,
      // component: <Main />,
    },
  },
];
export default routes;
