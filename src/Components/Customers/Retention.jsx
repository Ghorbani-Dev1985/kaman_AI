import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import { Card, Typography } from "@material-tailwind/react";
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
import DataGraphSelect from "Common/DataGraphSelect";
import SeperationDataSelect from "Common/SeperationDataSelect";
import FilterDrawer from "Common/FilterDrawer/FilterDrawer";
import { useStart_time1 } from "Context/Start_time1Context";
import { useEnd_time1 } from "Context/End_time1Context";

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
  //Context
  const { start_time1, setStart_time1 } = useStart_time1();
  const { end_time1, setEnd_time1 } = useEnd_time1();
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
        <Card className="mx-auto h-full max-w-[16rem] overflow-x-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {["", "مشتریان"]
                  .concat(graph_data["labels"])
                  .map(function (data) {
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
              {graph_data["table"].map(function (data, index) {
                return (
                  <tr key={data} className="odd:bg-gray-50 even:bg-gray-100">
                    {data.map(function (value) {
                      return (
                        <td key={value} className="p-4">
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

  function do_action() {
    get_graph_data(location, setGraph_data);
  }
  return (
    <>
      <TopFilter>
        <div className="mr-3 flex flex-col items-center lg:flex-row">
          <div className="ml-2 md:border-l">
            <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-0">
              <BiCalendarAlt className="text-xl" />
              {Date_Picker(start_time1, handleSetStart_time1)}
              <span>تا</span>
              {Date_Picker(end_time1, setEnd_time1)}
            </div>
          </div>
          <FilterDrawer />
          <div className="ml-2 mb-4 w-28 lg:mb-0">
            <DataGraphSelect className="z-0" />
          </div>
          <SeperationDataSelect className="z-0" />

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
