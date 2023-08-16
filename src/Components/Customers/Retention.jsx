import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import "../../Layouts/Main/sections/selectTime.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import Toolbar from "react-multi-date-picker/plugins/toolbar";

import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
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
import TopFilter from "Common/TopFilter";
import {
  BiCalendarAlt,
  BiCheckDouble,
  BiChevronDown,
  BiCloudDownload,
  BiFilterAlt,
  BiLayer,
  BiLineChart,
} from "react-icons/bi";
import { Listbox, Transition } from "@headlessui/react";
import Select from "react-select";
import Button from "Common/Button";

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
        format="YYYY-MM-DD"
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

function DrawChart({ graph_data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels: graph_data.labels,
    datasets: [
      {
        label: "اولین مقدار داده",
        data: graph_data.retention,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <>
      <div>
        <Chart type="line" data={data} options={options} />
      </div>
    </>
  );
}

function Retention() {
  const location = useLocation();

  const [graph_data, setGraph_data] = useState({
    labels: [],
    retntion: [],
    table: [],
  });
  const [start_time1, setStart_time1] = useState(new DateObject());
  const [end_time1, setEnd_time1] = useState(new DateObject());
  const [period, setPeriod] = useState("30");
  const [seperation, setSeperation] = useState("None");

  const handleDownloadFile = (e, key) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("download_type", key);
    // formData.append("end_date1", end_time1.format());
    let api_address = InitObject.baseurl + "api/rfm_segment_download/";
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

  function get_graph_data(location, setGraph_data) {
    let formData = new FormData();
    formData.append("start_time1", start_time1.format());
    formData.append("end_time1", end_time1.format());
    console.log(start_time1.format());
    console.log(end_time1.format());
    formData.append("period", period);
    formData.append("seperation", seperation);
    console.log("dfsfds");
    let api_address = InitObject.baseurl + "api/retention/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setGraph_data(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    get_graph_data(location, setGraph_data);
  }, []);

  const handleSetStart_time1 = (e) => {
    // e.preventDefault();
    setStart_time1(e);
    localStorage.setItem("start_time1", start_time1);
    console.log(e.format());
  };

  function DrawTable({ graph_data }) {
    console.log(graph_data);
    return (
      <>
          <div className="mx-auto max-w-[18rem] overflow-x-auto p-2 md:max-w-2xl">
          <div className="inline-block w-full py-2">
            <table className="min-w-full table-auto rounded-lg">
              <thead className="border-b border-white bg-blue-200 text-blue-600">
                <tr>
                  {["","مشتریان"].concat(graph_data["labels"]).map(function (data) {
                      return (
                          <th
                          scope="col"
                          className="border-slate-500 border px-6 py-4 text-center text-sm font-medium"
                        >
                          {data}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody className="[&>*:nth-child(even)]:bg-gray-50 [&>*:nth-child(odd)]:bg-gray-200">
              {graph_data["table"].map(function (data , index) {
                return (
                   <tr key={index} className="border-b">
                     {data.map(function (value) {
                     return (
                      <td className="text-slate-700 flex items-center justify-center px-6 py-4 text-center text-sm font-medium">
                     {value}
                   </td>
                     ) 
                     })}       
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
        <div></div>
      </>
    );
  }

  function do_action() {
    get_graph_data(location, setGraph_data);
  }
  const DataGraphSegment = [
    { label: "ماهانه", value: 30 },
    { label: "فصلی", value: 90 },
    { label: "سالیانه", value: 360 },
    { label: "روزانه", value: 1 },
    { label: "هفتگی", value: 7 },
  ];
  const [dataGraphSegment, setdataGraphSegment] = useState(null);
  const SeperationData = [
    { label: "هیچکدام", value: "None" },
    { label: "برند", value: "brand" },
    { label: "کانال جذب", value: "sales_channel" },
    { label: "منطقه جغرافیایی", value: "city" },
    { label: "دسته بندی محصولات", value: "product_name" },
  ];
  const [seperationSelect, setseperationSelect] = useState(null);
  return (
    <>
      <TopFilter>
        <div className="mr-3 flex items-center">
          <div className="ml-2 border-l">
            <div className="flex justify-center">
              <BiCalendarAlt className="text-xl" />
              {Date_Picker(start_time1, handleSetStart_time1)}
              <span>تا</span>
              {Date_Picker(end_time1, setEnd_time1)}
            </div>
          </div>
          <button
            type="button"
            className="btns ml-2 flex items-center justify-center text-lg"
          >
            <BiFilterAlt className="ml-2 text-2xl" /> فیلتر
          </button>
          <div className="ml-2">
            <Select
              defaultValue={seperationSelect}
              onChange={setseperationSelect}
              options={SeperationData}
              placeholder="انتخاب ..."
            />
          </div>
          <Select
            defaultValue={dataGraphSegment}
            onChange={setdataGraphSegment}
            options={DataGraphSegment}
            placeholder="انتخاب..."
          />
          <button
            onClick={do_action}
            className="btns mr-2 flex w-full items-center justify-center md:w-auto"
          >
            <BiCheckDouble className="ml-2 text-2xl" /> <span>اعمال</span>
          </button>
        </div>
      </TopFilter>
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <BiLineChart className="ml-2 text-3xl" /> نرخ بازگشت مشتریان
            </p>
          </legend>
          <div className="my-20">
            <DrawChart graph_data={graph_data} />
          </div>

          <div className="table1">
            <DrawTable graph_data={graph_data} />
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default Retention;