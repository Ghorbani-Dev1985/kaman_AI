import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import Select from "react-select";
import { Chart } from "react-chartjs-2";
import { Checkbox } from "@material-tailwind/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  BiCalendarAlt,
  BiCheckDouble,
  BiSelectMultiple,
  BiTrendingUp,
} from "react-icons/bi";
import TopFilter from "Common/TopFilter";
import DataGraphSelect from "Common/DataGraphSelect";
import { useStart_time1 } from "Context/Start_time1Context";
import { useEnd_time1 } from "Context/End_time1Context";
import { useStart_time2 } from "Context/Start_time2Context";
import { useEnd_time2 } from "Context/End_time2Context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Date_Picker(v, setter) {
  return (
    <>
      <DatePicker
        className="date-picker"
        format="YYYY/MM/DD"
        onChange={setter}
        calendar={persian}
        locale={persian_fa}
        value={v}
        formattingIgnoreList={["Date"]}
        calendarPosition="bottom-center"
        plugins={[<Toolbar position="bottom" />]}
      />
    </>
  );
}

function ShowValues(
  results,
  options,
  selectedOption,
  selectedOption_value,
  setSelectedOption,
  setSelectedOptionValue,
  setSelectedOptionImprove,
  selectedOption_improve,
  setSelected_item_graph
) {
  const ChangeValue = (e) => {
    setSelectedOptionValue(results.date1[e.value]);
    setSelectedOption(e.label);
    setSelectedOptionImprove(results.percentage[e.value]);
  };
  const select_item = (e) => {
    var value = 0;
    options.map((option) => {
      if (option.label === selectedOption) {
        value = option.value;
      }
    });
    console.log(value);
    setSelected_item_graph(value);
  };

  return (
    <>
      <div className="title">
        <div>
          <Select
            onChange={ChangeValue}
            options={options}
            placeholder={selectedOption}
            className="select-search text-navy-500"
            theme="neutral50"
          />
        </div>

        <div className="my-10 flex w-full items-center justify-center">
          <button
            type="button"
            className="btns flex items-center justify-center text-lg"
            onClick={select_item}
          >
            <BiSelectMultiple className="ml-2 text-2xl" /> انتخاب
          </button>
        </div>
      </div>
      <div className="my-3 flex w-full items-center justify-between">
        <div className="number">{selectedOption_value}</div>
        <div className="rounded-md bg-gray-100 px-3 py-1 dark:bg-navy-500 dark:text-white">
          {selectedOption_improve}
        </div>
      </div>
    </>
  );
}

function DrawChart({ graph_data, selected_item_graph }) {
  console.log("selected_item_graph", selected_item_graph);
  var datasets_list = [
    {
      label: "فرو‌ش ناخالص",
      data: graph_data.date1.gross_sale,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
  ];
  if (selected_item_graph !== 0) {
    datasets_list.push({
      label: selected_item_graph,
      data: graph_data.date1[selected_item_graph],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    });
  }

  if (graph_data.date2 !== undefined) {
    datasets_list.push({
      label: "فروش ناخالض دوم",
      data: graph_data.date2["gross_sale"],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    });

    if (selected_item_graph !== 0) {
      datasets_list.push({
        label: selected_item_graph + " 2",
        data: graph_data.date2[selected_item_graph],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      });
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "نمودار روندها",
      },
    },
  };

  const data = {
    labels: graph_data.date1.start_time,
    datasets: datasets_list,
  };

  return (
    <>
      <div>
        <Chart type="line" data={data} options={options} />
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
function Trends() {
  const location = useLocation();
  //Context
  const { start_time1, setStart_time1 } = useStart_time1();
  const { end_time1, setEnd_time1 } = useEnd_time1();
  const { start_time2, setStart_time2 } = useStart_time2();
  const { end_time2, setEnd_time2 } = useEnd_time2();
  const [compare_time, setCompare_time] = useState(0);
  const [open, setOpen] = useState(false);
  const DateRef = useRef(null);
  useOutsideAlerter(DateRef, setOpen);
  const [selected_item_graph, setSelected_item_graph] = useState(0);
  const [period, setPeriod] = useState("30");

  const [graph_data, setGraph_data] = useState({
    date1: { start_time: [], gross_sale: [] },
  });

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

  function do_action() {
    get_graph_data();
  }

  const get_graph_data = () => {
    let formData = new FormData();
    formData.append("start_date1", start_time1.format());
    formData.append("end_date1", end_time1.format());
    if (compare_time === 1) {
      formData.append("start_date2", start_time2.format());
      formData.append("end_date2", end_time2.format());
    }
    formData.append("period", period);

    let api_address = InitObject.baseurl + "api/trends/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setGraph_data(response.data.results);
        // setTable_data(response.data.results[1]);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [selectedOption1, setSelectedOption1] = React.useState(
    "میانگین تعداد سطر فاکتورها"
  );
  const [selectedOption1_value, setSelectedOptionValue1] = React.useState(
    response.date1.factor_rows_average
  );
  const [selectedOption1_improve, setSelectedOptionImprove1] =
    React.useState("0");

  const [selectedOption2, setSelectedOption2] = React.useState(
    "میانگین تعداد محصول در فاکتور"
  );
  const [selectedOption2_value, setSelectedOptionValue2] = React.useState(
    response.date1.factor_product_average
  );
  const [selectedOption2_improve, setSelectedOptionImprove2] =
    React.useState("0");

  const [selectedOption3, setSelectedOption3] = React.useState(
    "تعداد فاکتورهای فروش"
  );
  const [selectedOption3_value, setSelectedOptionValue3] = React.useState(
    response.date1.sale_factor_count
  );
  const [selectedOption3_improve, setSelectedOptionImprove3] =
    React.useState("0");

  const [selectedOption4, setSelectedOption4] = React.useState(
    "تعداد فاکتورهای مرجوعی"
  );
  const [selectedOption4_value, setSelectedOptionValue4] = React.useState(
    response.date1.rejected_factor_count
  );
  const [selectedOption4_improve, setSelectedOptionImprove4] =
    React.useState("0");

  useEffect(() => {
    setSelectedOptionValue1(response.date1[options_keys[selectedOption1]]);
    setSelectedOptionValue2(response.date1[options_keys[selectedOption2]]);
    setSelectedOptionValue3(response.date1[options_keys[selectedOption3]]);
    setSelectedOptionValue4(response.date1[options_keys[selectedOption4]]);
    if (response.percentage !== undefined) {
      setSelectedOptionImprove1(
        response.percentage[options_keys[selectedOption1]]
      );
      setSelectedOptionImprove2(
        response.percentage[options_keys[selectedOption2]]
      );
      setSelectedOptionImprove3(
        response.percentage[options_keys[selectedOption3]]
      );
      setSelectedOptionImprove4(
        response.percentage[options_keys[selectedOption4]]
      );
    } else {
      setSelectedOptionImprove1(0);
      setSelectedOptionImprove2(0);
      setSelectedOptionImprove3(0);
      setSelectedOptionImprove4(0);
    }
  });

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

  const handleFactorInfo = (e) => {
    e.preventDefault();
    get_graph_data();
    let formData = new FormData();
    formData.append("start_date1", start_time1.format());
    formData.append("end_date1", end_time1.format());
    if (compare_time === 1) {
      formData.append("start_date2", start_time2.format());
      formData.append("end_date2", end_time2.format());
    }

    let api_address = InitObject.baseurl + "api/factors_info/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setResponse(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  return (
    <>
      <TopFilter>
        <div
          ref={DateRef}
          className="relative mr-2 h-full border-l border-gray-100 pl-2"
        >
          <button
            onClick={() => setOpen(!open)}
            className="flex h-full items-center justify-center text-base text-navy-500 transition-all duration-300 ease-in-out hover:bg-brand-50/20 "
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <BiCalendarAlt className="ml-1 text-xl" />
                <p>
                  {start_time1.format()} تا {end_time1.format()}
                </p>
              </div>
              <p className="text-sm">
                مقایسه با {start_time2.format()} تا {end_time2.format()}
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
      </TopFilter>

      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <BiTrendingUp className="ml-2 text-3xl" /> روندها
            </p>
          </legend>
          <div className="my-20">
            <div className="mb-3 grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* {response} */}
              <div className="cursor-pointer rounded-md border border-gray-200 p-3 dark:bg-navy-700 dark:text-white">
                {ShowValues(
                  response,
                  options,
                  selectedOption1,
                  selectedOption1_value,
                  setSelectedOption1,
                  setSelectedOptionValue1,
                  setSelectedOptionImprove1,
                  selectedOption1_improve,
                  setSelected_item_graph
                )}
              </div>
              <div className="cursor-pointer rounded-md border border-gray-200 p-3 dark:bg-navy-700 dark:text-white">
                {ShowValues(
                  response,
                  options,
                  selectedOption2,
                  selectedOption2_value,
                  setSelectedOption2,
                  setSelectedOptionValue2,
                  setSelectedOptionImprove2,
                  selectedOption2_improve,
                  setSelected_item_graph
                )}
              </div>
              <div className="cursor-pointer rounded-md border border-gray-200 p-3 dark:bg-navy-700 dark:text-white">
                {ShowValues(
                  response,
                  options,
                  selectedOption3,
                  selectedOption3_value,
                  setSelectedOption3,
                  setSelectedOptionValue3,
                  setSelectedOptionImprove3,
                  selectedOption3_improve,
                  setSelected_item_graph
                )}
              </div>
              <div className="cursor-pointer rounded-md border border-gray-200 p-3 dark:bg-navy-700 dark:text-white">
                {ShowValues(
                  response,
                  options,
                  selectedOption4,
                  selectedOption4_value,
                  setSelectedOption4,
                  setSelectedOptionValue4,
                  setSelectedOptionImprove4,
                  selectedOption4_improve,
                  setSelected_item_graph
                )}
              </div>
            </div>
          </div>

          <div className="my-5 flex flex-col items-center justify-end rounded-lg border border-gray-300 p-4 md:flex-row">
            <DataGraphSelect />
            <button
              type="button"
              className="btns mr-2 flex w-full items-center justify-center md:w-auto"
              onClick={do_action}
            >
              <BiCheckDouble className="ml-2 text-2xl" />
              <span>اعمال</span>
            </button>
          </div>
          <div className="overflow-scroll">
            <DrawChart
              graph_data={graph_data}
              selected_item_graph={selected_item_graph}
            />
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default Trends;
