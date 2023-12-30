import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SelectTime } from "./sections/selectTime";
import { BestSel } from "./sections/bestSel";
import { Proceed } from "./sections/proceed";
import { ShowInfo } from "./sections/showInfo.jsx";

const Main = () => {
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



  const [chartresponse, setChartResponse] = useState({});
  const [showLoading, setShowLoading] = useState(false);

  return (
    <>
      <SelectTime
        setResponse={setResponse}
        setchartresponse={setChartResponse} 
        setShowLoading={setShowLoading}
      />
      <ShowInfo results={response} showLoading={showLoading} setShowLoading={setShowLoading}/>
      <BestSel results={response} />
      <Proceed chartresponse={chartresponse} />
    </>
  );
};

export default Main;
