import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { HiOutlineChartBar } from "react-icons/hi";
import TopFilter from "Common/TopFilter";
import { BiCalendarAlt, BiCheckDouble } from "react-icons/bi";
import FilterDrawer from "Common/FilterDrawer/FilterDrawer";
import { Checkbox } from "@material-tailwind/react";
import DownloadBtn from "Common/DownloadBtn";
import DrawTable from "Common/DrawTable";
import { useStart_time1 } from "Context/Start_time1Context";
import { useEnd_time1 } from "Context/End_time1Context";
import { useStart_time2 } from "Context/Start_time2Context";
import { useEnd_time2 } from "Context/End_time2Context";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Date_Picker(v, setter) {
  return (
    <>
      <DatePicker
        className="date-picker"
        format="YYYY-MM-DDTHH:mm:ss"
        onChange={setter}
        calendar={persian}
        locale={persian_fa}
        value={v}
        formattingIgnoreList={["Date" , "Time"]}
        calendarPosition="bottom-center"
        plugins={[<TimePicker position="bottom" /> , <Toolbar position="bottom" />]}
      />
    </>
  );
}

function DrawChart({ graph_data, indicator }) {
  const dataset_list = [
    {
      label: indicator,
      backgroundColor: "rgba(0, 255, 0, 0.2)",
      borderColor: "rgb(0, 255, 0)",
      borderWidth: 1,
      data: graph_data.date1[indicator],
    },
  ];

  if (graph_data.data2 !== undefined) {
    dataset_list.push({
      label: indicator,
      backgroundColor: "rgba(0, 255, 0, 0.2)",
      borderColor: "rgb(0, 255, 0)",
      borderWidth: 1,
      data: graph_data.date2[indicator],
    });
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "نمودار عملکرد محصولات",
      },
    },
  };

  const data = {
    labels: graph_data.labels,
    datasets: dataset_list,
  };

  return (
    <>
      <div>
        <Chart type="bar" data={data} options={options} />
      </div>
    </>
  );
}

function useOutsideAlerter(ref, setOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOpen]);
}

function ProductPerformanceAnalysis() {
  const location = useLocation();
  //Context
  const { start_time1, setStart_time1 } = useStart_time1();
  const { end_time1, setEnd_time1 } = useEnd_time1();
  const { start_time2, setStart_time2 } = useStart_time2();
  const { end_time2, setEnd_time2 } = useEnd_time2();
  const [compare_time, setCompare_time] = useState(0);
  const [seperator, setSeparator] = useState("product_category");
  const [open, setOpen] = useState(false);
  const DateRef = useRef(null);
  useOutsideAlerter(DateRef, setOpen);
  const [seperator1, setSeparator1] = useState("segment");
  const [indicator, setIndicator] = useState("factor_product_average");
  const [seperatorKeysSelect, setSeperatorKeysSelect] = useState(null);
  const [optionsKeysSelect, setOptionsKeysSelect] = useState(null);

  const seperatorKeys = [
    { label: "دسته بندی محصول", value: "product_category" },
    { label: "برند", value: "product_brand" },
    { label: "ایمیل", value: "email" },
    { label: "شهر ", value: "city" },
    { label: "کانال خرید", value: "sales_channel" },
  ];

  const [graph_data, setGraph_data] = useState({
    date1: { indicator: [] },
    labels: [],
    tabel_data: { labels: [], data: [] },
  });
  const [graph_data1, setGraph_data1] = useState({
    date1: { indicator: [] },
    labels: [],
  });

  const options = [
    // {label: 'میانگین تعداد محصول در فاکتور', value: 'factor_product_average'},
    // {label: 'میانگین تعداد سطر در فاکتور', value: 'factor_rows_average'},
    // {label: "تعداد فاکتورهای فروش", value: 'sale_factor_count'},
    // {label: "تعداد فاکتورهای مرجوعی", value: 'rejected_factor_count'},
    // {label: "میانگین مبلغ فاکتورها", value: 'factor_amount_average'},
    // {label: "میانگین مبلغ کالاها", value: 'factor_amount_product_average'},
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
  const optionsKeys = [
    { label: "تعداد فاکتورهای فروش", value: "sale_factor_count" },
    { label: "تعداد فاکتورهای مرجوعی", value: "rejected_factor_count" },
    { label: "میانگین تعداد محصول در فاکتور", value: "factor_product_average" },
    { label: "میانگین تعداد سطر فاکتورها ", value: "factor_rows_average" },
    { label: "میانگین مبلغ فاکتورها", value: "factor_amount_average" },
    { label: "میانگین مبلغ کالاها", value: "factor_amount_product_average" },
    {
      label: "میانگین مبلغ درامد خالص از مشتری",
      value: "customer_income_average",
    },
    { label: "فروش ناخالص ", value: "gross_sale" },
    { label: "تعداد ناخالص محصول فروخته شده ", value: "factor_product_count" },
    { label: "وزن محصولات در فاکتورهای فروش", value: "factor_product_weight" },
    { label: "مجموع کارمزد", value: "factor_commisions" },
    { label: "تعداد خالص فاکتورها ", value: "pure_factor_counts" },
    { label: "مبلغ خالص پرداختی فاکتورها", value: "pure_gross_sale" },
    { label: " مبلغ فاکتورهای مرجوعی", value: "gross_rejected" },
    { label: " فروش خالص", value: "pure_sale" },
    { label: "تعداد محصولات مرجوعی ", value: "rejected_product_count" },
    { label: "تعداد خالص محصولات فروخته شده ", value: "pure_product_count" },
    { label: "وزن محصولات مرجوعی ", value: "rejedted_product_weight" },
    { label: "وزن محصولات در تمام فاکتورها", value: "pure_product_weight" },
    { label: "تعداد مشتریان", value: "users_count" },
    { label: "تعداد مشتریان جدید ", value: "new_users_count" },
    { label: "تعداد مشتریان تکراری ", value: "old_users_count" },
    { label: "درصد مشتریان تکراری ", value: "percent_users" },
    { label: "درصد کالاهای مرجوعی ", value: "percent_rejected_count" },
    { label: "درصد مبلغ مرجوعی", value: "percent_rejected_amount" },
    { label: "مبلغ تخفیف فاکتورها", value: "sum_discount" },
    { label: "مجموع درآمد از مشتریان جدید ", value: "gross_new_users" },
  ];

  const handleSetStart_time1 = (e) => {
    // e.preventDefault();
    setStart_time1(e);
    localStorage.setItem("start_time1", start_time1);
    console.log(e.format());
  };

  const handleCompare_time = (event) => {
    if (compare_time === 1) {
      setCompare_time(0);
      const time2_div = document.getElementById("time2");
      time2_div.style.backgroundColor = "gray";
      time2_div.style.pointerEvents = "none";
    } else {
      setCompare_time(1);
      const time2_div = document.getElementById("time2");
      time2_div.style.backgroundColor = "white";
      time2_div.style.pointerEvents = "auto";
    }
    console.log(localStorage.getItem("start_time1"));
  };

  const handleFactorInfo1 = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("start_date1", start_time1.format());
    formData.append("end_date1", end_time1.format());
    if (compare_time === 1) {
      formData.append("start_date2", start_time2.format());
      formData.append("end_date2", end_time2.format());
    }
    formData.append("seperator", seperator1);
    formData.append("indicator", indicator);

    let api_address = InitObject.baseurl + "api/factor_analyse/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setGraph_data1(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFactorInfo = (e) => {
    e.preventDefault();
    handleFactorInfo1(e);
    let formData = new FormData();
    formData.append("start_date1", start_time1.format());
    formData.append("end_date1", end_time1.format());
    if (compare_time === 1) {
      formData.append("start_date2", start_time2.format());
      formData.append("end_date2", end_time2.format());
    }
    formData.append("seperator", seperator);
    formData.append("indicator", indicator);

    let api_address = InitObject.baseurl + "api/factor_analyse/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setGraph_data(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  const handleDownloadFile = (e, graph_data) => {
    var table_data = graph_data["graph_data"].tabel_data;
    e.preventDefault();
    let formData = new FormData();
    formData.append("data", JSON.stringify(table_data));
    // formData.append("end_date1", end_time1.format());
    let api_address = InitObject.baseurl + "api/download_dict/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        if (response.data.results.link !== "") {
          var link = InitObject.baseurl + response.data.results.link;
          console.log(link);
          let a = document.createElement("a");
          a.href = link;
          a.download = link;
          a.click();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <TopFilter>
        <div className="flex h-full flex-col items-center justify-center md:flex-row">
          <div
            ref={DateRef}
            className="relative mr-2 h-full border-gray-100 pl-2 md:border-l"
          >
            <button
              onClick={() => setOpen(!open)}
              className="flex h-full items-center justify-center text-base text-navy-500 transition-all duration-300 ease-in-out hover:bg-brand-50/20 "
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <BiCalendarAlt className="ml-1 text-xl" />
                  <p>
                    {start_time1.format("YYYY/MM/DD")} تا {end_time1.format("YYYY/MM/DD")}
                  </p>
                </div>
                <p className="text-sm">
                  مقایسه با {start_time2.format("YYYY/MM/DD")} تا {end_time2.format("YYYY/MM/DD")}
                </p>
              </div>
            </button>

            <div
              className={`${
                open ? "flex" : "hidden"
              } absolute top-20 z-50 flex-col justify-start rounded-lg border border-navy-500 bg-white bg-cover bg-no-repeat p-5 shadow-xl dark:!bg-navy-700 dark:text-white dark:shadow-none`}
            >
              <div className="flex flex-col items-center justify-center border-r-4 border-navy-500 px-2 md:flex-row">
                <span className="w-20"> زمان شروع :</span>
                <p className="py-2 hover:border-navy-500">
                  {Date_Picker(start_time1, handleSetStart_time1)}
                </p>
                <span className="w-20">زمان پایان :</span>
                <p className="py-2 hover:border-navy-500">
                  {Date_Picker(end_time1, setEnd_time1)}
                </p>
              </div>
              <div className="my-7 flex w-full items-center justify-center">
                <Checkbox
                  name="handleCompare"
                  color="indigo"
                  onClick={handleCompare_time}
                  value={compare_time}
                />
                <label htmlFor="handleCompare"> مقایسه با ...</label>
              </div>

              <div className="flex flex-col items-center justify-center border-r-4 border-amber-500 px-2 md:flex-row">
                <span className="w-20"> زمان شروع :</span>
                <p className="py-2 hover:border-navy-500">
                  {Date_Picker(start_time2, setStart_time2)}
                </p>
                <span className="w-20">زمان پایان :</span>
                <p className="py-2 hover:border-navy-500">
                  {Date_Picker(end_time2, setEnd_time2)}
                </p>
              </div>

              <div className="mt-4 flex w-full items-center justify-end border-t border-gray-300 py-5">
                <button
                  onClick={() => setOpen(false)}
                  className="transparentBtns"
                >
                  انصراف
                </button>
                <button
                  onClick={handleFactorInfo}
                  className="btns mr-2 flex w-full items-center justify-center md:w-auto"
                >
                  <BiCheckDouble className="ml-2 text-2xl" /> <span>اعمال</span>
                </button>
              </div>
            </div>
          </div>
          {/* End Date */}
          <div className="mr-2 flex flex-col items-center justify-start md:flex-row">
            <FilterDrawer />
            <div className="ml-2 mb-4 lg:mb-0">
              <Select
                onChange={setSeperatorKeysSelect}
                options={seperatorKeys}
                placeholder="انتخاب"
                className="w-40"
              />
            </div>
            <Select
              onChange={setOptionsKeysSelect}
              options={optionsKeys}
              placeholder="انتخاب"
              className="w-48"
            />

            <button
              onClick={handleFactorInfo}
              className="btns mr-2 flex w-full items-center justify-center md:w-auto"
            >
              <BiCheckDouble className="ml-2 text-2xl" /> <span>اعمال</span>
            </button>
          </div>
        </div>
      </TopFilter>
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <HiOutlineChartBar className="ml-2 text-3xl" /> تحلیل عملکرد
              محصولات
            </p>
          </legend>

          <div className="chart">
            <DrawChart graph_data={graph_data} indicator={indicator} />
          </div>

          <div className="chart">
            <DrawChart graph_data={graph_data1} indicator={indicator} />
          </div>
          <DownloadBtn onClick={(e) => handleDownloadFile(e, { graph_data })} />

          <div className="table1">
            <DrawTable graph_data={graph_data.tabel_data} />
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default ProductPerformanceAnalysis;
