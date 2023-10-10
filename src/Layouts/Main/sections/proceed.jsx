import React, { useState } from "react";
import { CgExport } from "react-icons/cg";
import Select from "react-select";
import InitObject from "../../../Utils/globalvariables";
import fileDownload from "js-file-download";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DrawChart({ chartresponse, selected1, selected2, select_values }) {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "نمودار عملکرد مشتریان",
      },
    },
  };

  const labels = chartresponse[selected1].labels;

  const data = {
    labels,
    datasets: [
      {
        label: select_values[0],
        data: chartresponse[selected1].data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        maxBarThickness: 15,
      },
      {
        label: select_values[1],
        data: chartresponse[selected2].data.map((item) => -item),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        maxBarThickness: 15,
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} width={"100%"} />
    </>
  );
}

function Proceed({ chartresponse }) {
  const options = [
    { value: "sale_factor_count", label: "تعداد فاکتورهای فروش" },
    { value: "rejected_factor_count", label: "تعداد فاکتورهای مرجوعی" },
    { value: "factor_product_average", label: "میانگین تعداد محصول در فاکتور" },
    { value: "factor_rows_average", label: "میانگین تعداد سطر فاکتورها" },
    { value: "factor_amount_average", label: "میانگین مبلغ فاکتورها" },
    { value: "factor_amount_product_average", label: "میانگین مبلغ کالاها" },
    {
      value: "customer_income_average",
      label: "میانگین مبلغ درامد خالص از مشتری",
    },
    { value: "gross_sale", label: "فروش ناخالص" },
    { value: "factor_product_count", label: "تعداد ناخالص محصول فروخته شده" },
    { value: "factor_product_weight", label: "وزن محصولات در فاکتورهای فروش" },
    { value: "factor_commisions", label: "مجموع کارمزد" },
    { value: "pure_factor_counts", label: "تعداد خالص فاکتورها" },
    { value: "pure_gross_sale", label: "مبلغ خالص پرداختی فاکتورها" },
    { value: "gross_rejected", label: "مبلغ فاکتورهای مرجوعی" },
    { value: "pure_sale", label: "فروش خالص" },
    { value: "rejected_product_count", label: "تعداد محصولات مرجوعی" },
    { value: "pure_product_count", label: "تعداد خالص محصولات فروخته شده" },
    { value: "rejedted_product_weight", label: "وزن محصولات مرجوعی" },
    { value: "pure_product_weight", label: "وزن محصولات در تمام فاکتورها" },
    { value: "users_count", label: "تعداد مشتریان" },
    { value: "new_users_count", label: "تعداد مشتریان جدید" },
    { value: "old_users_count", label: "تعداد مشتریان تکراری" },
    { value: "percent_users", label: "درصد مشتریان تکراری" },
    { value: "percent_rejected_count", label: "درصد کالاهای مرجوعی" },
    { value: "percent_rejected_amount", label: "درصد مبلغ مرجوعی" },
    { value: "sum_discount", label: "مبلغ تخفیف فاکتورها" },
    { value: "gross_new_users", label: "مجموع درآمد از مشتریان جدید" },
  ];
  const options_keys = {
    "تعداد فاکتورهای فروش": "sale_factor_count",
    "تعداد فاکتورهای مرجوعی": "rejected_factor_count",
    "میانگین تعداد محصول در فاکتور": "factor_product_average",
    "میانگین تعداد سطر فاکتورها": "factor_rows_average",
    "میانگین مبلغ فاکتورها": "factor_amount_average",
    "میانگین مبلغ کالاها": "factor_amount_product_average",
    "میانگین مبلغ درامد خالص از مشتری": "customer_income_average",
    "فروش ناخالص": "gross_sale",
    "تعداد ناخالص محصول فروخته شده": "factor_product_count",
    "وزن محصولات در فاکتورهای فروش": "factor_product_weight",
    "مجموع کارمزد": "factor_commisions",
    "تعداد خالص فاکتورها": "pure_factor_counts",
    "مبلغ خالص پرداختی فاکتورها": "pure_gross_sale",
    "مبلغ فاکتورهای مرجوعی": "gross_rejected",
    "فروش خالص": "pure_sale",
    "تعداد محصولات مرجوعی": "rejected_product_count",
    "تعداد خالص محصولات فروخته شده": "pure_product_count",
    "وزن محصولات مرجوعی": "rejedted_product_weight",
    "وزن محصولات در تمام فاکتورها": "pure_product_weight",
    "تعداد مشتریان": "users_count",
    "تعداد مشتریان جدید": "new_users_count",
    "تعداد مشتریان تکراری": "old_users_count",
    "درصد مشتریان تکراری": "percent_users",
    "درصد کالاهای مرجوعی": "percent_rejected_count",
    "درصد مبلغ مرجوعی": "percent_rejected_amount",
    "مبلغ تخفیف فاکتورها": "sum_discount",
    "مجموع درآمد از مشتریان جدید": "gross_new_users",
  };

  const [selectedOption1, setSelectedOption1] = useState("فروش ناخالص");
  const [selectedOption1_value, setSelectedOptionValue1] = useState(
    options_keys[selectedOption1]
  );

  const [selectedOption2, setSelectedOption2] = useState("فروش خالص");
  const [selectedOption2_value, setSelectedOptionValue2] = useState(
    options_keys[selectedOption2]
  );

  const ChangeValue1 = (e) => {
    setSelectedOption1(e.label);
    setSelectedOptionValue1(options_keys[e.label]);
  };
  const ChangeValue2 = (e) => {
    setSelectedOption2(e.label);
    setSelectedOptionValue2(options_keys[e.label]);
  };

  const exportProductInfo = (e) => {
    e.preventDefault();
    if (chartresponse.csv_path !== "") {
      var link = InitObject.baseurl + chartresponse.csv_path;
      console.log(link);
      let a = document.createElement("a");
      a.href = link;
      a.download = link;
      a.click();
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-center p-3">
        <div className="flex w-full flex-col rounded-md bg-white dark:bg-navy-700 dark:text-white">
          <div className="mb-4 flex items-center justify-between bg-blue-100 p-3 dark:bg-navy-600 dark:text-white">
            <div className="text">عملکرد مشتریان</div>
            <div onClick={exportProductInfo} className="export">
              <CgExport size={"1.5vw"} className="text-blue-500" />
            </div>
          </div>
          <div className="chart p-2 ">
            <div className="mb-4 flex w-full items-center gap-3 md:w-2/5">
              <div className="flex w-full flex-1">
                <Select
                  onChange={ChangeValue1}
                  options={options}
                  placeholder={selectedOption1}
                  className="w-full text-navy-500"
                  theme="neutral50"
                />
              </div>
              <div className="flex w-full flex-1">
                <Select
                  onChange={ChangeValue2}
                  options={options}
                  placeholder={selectedOption2}
                  className="w-full text-navy-500"
                  theme="neutral50"
                />
              </div>
            </div>
            <div className="h-auto w-full overflow-x-scroll">
              {chartresponse[selectedOption1_value] !== undefined && (
                <DrawChart
                  chartresponse={chartresponse}
                  selected1={selectedOption1_value}
                  selected2={selectedOption2_value}
                  select_values={[selectedOption1, selectedOption2]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Proceed };
