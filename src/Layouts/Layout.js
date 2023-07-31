import React, { useEffect, useState } from "react";
import Sidebar from "Components/Sidebar/SideBar";
import Navbar from "Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";


const Layout = ( props) => {
    const { ...rest } = props;
    const [open, setOpen] = useState(true);
    const [currentRoute, setCurrentRoute] = useState("کمان");
    const [chartresponse, setChartResponse] = useState({});
    
    const [showSubMenu, setShowSubMenu] = useState({
      allMenu: true,
      dropDownOne: false,
      dropDownTwo: false,
      dropDownThree: false,
    });
    useEffect(() => {
      window.addEventListener("resize", () =>
        window.innerWidth < 768 ? setOpen(true) : setOpen(false)
      );
    }, []);
    return ( 
        <div className="flex h-auto w-full">
        <Sidebar
          open={open}
          onClose={() => setOpen(false)}
          showSubMenu={showSubMenu}
          setShowSubMenu={setShowSubMenu}
        />
        {/* Navbar & Main Content */}
        <div className="flex h-auto w-full flex-col items-end dark:bg-navy-700">
          {/* Main Content */}
          <main
            className={`mx-[12px] mt-4 h-full w-93p md:w-78p flex-none transition-all duration-700 ease-linear md:pe-2 ${
              !showSubMenu.allMenu && "w-96p"
            } `}
          >
            {/* Routes */}
            <div className="h-full">
              <Navbar
                onOpenSidenav={() => setOpen(true)}
                brandText={currentRoute}
                {...rest}
                setChartResponse = {setChartResponse}
              />
              <div className="pt-5s mx-auto h-auto min-h-screen p-2 md:pr-2">
               <Outlet />
              </div>   
                <Footer />
            </div>
          </main>
        </div>
      </div>
     );
}
 
export default Layout;