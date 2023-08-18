import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Card, Typography } from "@material-tailwind/react";
import { HiShoppingCart } from "react-icons/hi";
import TopFilter from "Common/TopFilter";
import { BiCalendarAlt, BiCheckDouble, BiFilterAlt } from "react-icons/bi";
import DataGraphSelect from "Common/DataGraphSelect";
import DownloadBtn from "Common/DownloadBtn";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
        formattingIgnoreList={["Date", "Time"]}
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
        label: "دسته‌ بندی داده اول",
        data: graph_data.percent_new_customers,
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

function DrawChart1({ graph_data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };

  const data = {
    labels: graph_data.labels,
    datasets: [
      {
        label: "",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        borderColor: "rgb(0, 255, 0)",
        borderWidth: 1,
        data: graph_data.new_customers,
      },
      {
        label: "",
        backgroundColor: "rgb(53, 162, 235)",
        borderWidth: 1,
        data: graph_data.old_customers,
      },
    ],
  };

  return (
    <>
      <div>
        <Chart type="bar" data={data} options={options} />
      </div>
    </>
  );
}

function DrawTable({ graph_data }) {
  console.log("graph_data");
  console.log(graph_data);

  return (
    <>
      <Card className="mx-auto h-full max-w-[16rem] overflow-x-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {graph_data["labels"].map((data) => {
                return (
                  <th
                    key={data}
                    className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-center font-bold leading-none opacity-70"
                    >
                      {data}
                    </Typography>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {graph_data["data"].map((data) => {
              return (
                <tr key={data} className="odd:bg-gray-50 even:bg-gray-100">
                  {data.map((value , index) => {
                    return (
                      <td key={index} className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-center font-normal"
                        >
                          {value}
                        </Typography>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}

function ShareShoping() {
  const location = useLocation();

  const [graph_data, setGraph_data] = useState({});
  const [table_data, setTable_data] = useState({ labels: [], data: [[]] });
  const [start_time1, setStart_time1] = useState(new DateObject());
  const [end_time1, setEnd_time1] = useState(new DateObject());
  const [period, setPeriod] = useState("30");

  function get_graph_data(location, setGraph_data, setTable_data) {
    let formData = new FormData();
    formData.append("start_time1", start_time1.format());
    formData.append("end_time1", end_time1.format());
    // console.log(start_time1.format());
    // console.log(end_time1.format());
    formData.append("period", period);
    let api_address = InitObject.baseurl + "api/share_shoping/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setGraph_data(response.data.results[0]);
        setTable_data(response.data.results[1]);

        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleDownloadFile = (e, table_data) => {
    e.preventDefault();
    console.log(table_data["table_data"]);
    let formData = new FormData();
    formData.append("data", JSON.stringify(table_data["table_data"]));
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

  function do_action() {
    get_graph_data(location, setGraph_data, setTable_data);
  }

  const handleSetStart_time1 = (e) => {
    // e.preventDefault();
    setStart_time1(e);
    localStorage.setItem("start_time1", start_time1);
    console.log(e.format());
  };

  useEffect(() => {
    get_graph_data(location, setGraph_data, setTable_data);
  }, []);

  return (
    <>
        <TopFilter>
        <div className="mr-3 flex flex-col lg:flex-row items-center">
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
          <div className="ml-2 mb-4 lg:mb-0 flex">
           <DataGraphSelect />
          <button
            onClick={do_action}
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
              <HiShoppingCart className="ml-2 text-3xl" /> سهم سبد مشتریان  
            </p>
          </legend>
          <div className="my-16">
            <DrawChart graph_data={graph_data} />
          </div>

          <div className="my-16">
            <DrawChart1 graph_data={graph_data} />
          </div>
            <DownloadBtn />

          <div className="table1">
            <DrawTable graph_data={table_data} />
          </div>
        </fieldset>
        </div>
    </>
  );
}

export default ShareShoping;
