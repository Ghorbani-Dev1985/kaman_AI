import React, { Children, useEffect, useState } from "react";
import Sidebar from "Components/Sidebar/SideBar";
import Navbar from "Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { BiHelpCircle } from "react-icons/bi";

const Layout = (props) => {
  const { ...rest } = props;
  const [openMenu, setOpenMenu] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("کمان");
  const [chartresponse, setChartResponse] = useState({});

  const [showSubMenu, setShowSubMenu] = useState({
    allMenu: true,
  });
  useEffect(() => {
    if (window.innerWidth < 500) setOpenMenu(false);
  }, []);
  return (
    <div className="grid w-full grid-cols-12 gap-3 dark:gap-0 dark:bg-navy-800">
      <Sidebar
        openMenu={openMenu}
        onClose={() => setOpenMenu(false)}
        showSubMenu={showSubMenu}
        setShowSubMenu={setShowSubMenu}
      />
      {/* Navbar & Main Content */}
      <div
        className={`col-span-12 w-full dark:bg-navy-700 ${
          !showSubMenu.allMenu ? "md:col-span-11" : "md:col-span-9 lg:col-span-10"
        }`}
      >
        {/* Main Content */}
        <main
          className={`mt-4 w-full flex-none transition-all duration-700 ease-linear md:pe-2 `}
        >
          {/* Routes */}
          <Navbar
            onOpenSidenav={() => setOpenMenu(true)}
            brandText={currentRoute}
            {...rest}
            setChartResponse={setChartResponse}
          />
          <div className="pt-5s mx-auto h-auto min-h-screen p-2 md:pr-2">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;

