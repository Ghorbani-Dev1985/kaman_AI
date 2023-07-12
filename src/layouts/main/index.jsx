import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar/RTL";

import Footer from "components/footer/Footer";
import Sidebar from "components/sidebar/SideBar";
import { SelectTime } from "./sections/selectTime";
import { BestSel } from "./sections/bestSel";
import { Proceed } from "./sections/proceed";
import { ShowInfo } from "./sections/showInfo";

const Main = (props) => {
  const [response, setResponse] = useState({
    date1: {
      sale_factor_count: 0,
      rejected_factor_count: 0,
      factor_product_average: 0,
      factor_rows_average: 0,
      factor_amount_average: 0,
      factor_amount_product_average: 0,
      customer_income_average: 0,
      gross_sale: 0,
      factor_product_count: 0,
      factor_product_weight: 0,
      factor_commisions: 0,
      pure_factor_counts: 0,
      pure_gross_sale: 0,
      gross_rejected: 0,
      pure_sale: 0,
      rejected_product_count: 0,
      pure_product_count: 0,
      rejedted_product_weight: 0,
      pure_product_weight: 0,
      users_count: 0,
      new_users_count: 0,
      old_users_count: 0,
      percent_users: 0,
      percent_rejected_count: 0,
      percent_rejected_amount: 0,
      sum_discount: 0,
      gross_new_users: 0,
    },
    percentage: {
      sale_factor_count: 0,
      rejected_factor_count: 0,
      factor_product_average: 0,
      factor_rows_average: 0,
      factor_amount_average: 0,
      factor_amount_product_average: 0,
      customer_income_average: 0,
      gross_sale: 0,
      factor_product_count: 0,
      factor_product_weight: 0,
      factor_commisions: 0,
      pure_factor_counts: 0,
      pure_gross_sale: 0,
      gross_rejected: 0,
      pure_sale: 0,
      rejected_product_count: 0,
      pure_product_count: 0,
      rejedted_product_weight: 0,
      pure_product_weight: 0,
      users_count: 0,
      new_users_count: 0,
      old_users_count: 0,
      percent_users: 0,
      percent_rejected_count: 0,
      percent_rejected_amount: 0,
      sum_discount: 0,
      gross_new_users: 0,
    },
  });

  const { ...rest } = props;
  const [open, setOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("نمای کلی");
  const [chartresponse, setChartResponse] = useState({});

  const [showSubMenu, setShowSubMenu] = useState({
    allMenu: true,
    dropDownOne: false,
    dropDownTwo: false,
    dropDownThree: false,
  });
  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 768 ? setOpen(false) : setOpen(true)
    );
  }, []);

  return (
    <div className="flex h-full w-full">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        showSubMenu={showSubMenu}
        setShowSubMenu={setShowSubMenu}
      />
      {/* Navbar & Main Content */}
      <div className="flex h-full w-full flex-col items-end bg-lightPrimary dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] mt-4 h-full w-78p flex-none transition-all duration-700 ease-linear md:pe-2 ${
            !showSubMenu.allMenu && "w-96p"
          } `}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <SelectTime
                setResponse={setResponse}
                setchartresponse={setChartResponse}
              />
               <ShowInfo results={response}/>
              <BestSel results={response} />
              <Proceed chartresponse={chartresponse} />
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
