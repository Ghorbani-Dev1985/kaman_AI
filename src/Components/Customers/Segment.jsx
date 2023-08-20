import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import { IoDownloadOutline } from "react-icons/io5";
import { FaSms } from "react-icons/fa";
import FilterDrawer from "../../Common/FilterDrawer"
// import Dropdown from 'react-bootstrap/Dropdown';

// import DropdownButton from 'react-bootstrap/DropdownButton';
// import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { color } from "chart.js/helpers";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import { Chart } from "react-chartjs-2";
import {
  BiCloudDownload,
  BiDownload,
  BiFilterAlt,
  BiLayer,
  BiMessageRoundedDetail,
  BiMessageRoundedDots,
} from "react-icons/bi";
import TopFilter from "Common/TopFilter";
import { HiOutlineUsers, HiUserGroup } from "react-icons/hi";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import DownloadBtn from "Common/DownloadBtn";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TreemapController,
  TreemapElement
);

var dynamicColors = function () {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

function DrawChart({ data }) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "نمودار مشتریان",
      },
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          title(items) {
            return items[0].raw._data.label;
          },
          label(item) {
            const {
              _data: {
                user_count,
                user_percentage,
                factor_count,
                factor_percentage,
                income,
                income_percentage,
              },
            } = item.raw;
            return [
              `مشتریان: ${user_count} (${user_percentage}) `,
              `فاکتورها: ${factor_count} (${factor_percentage}) `,
              `درآمد: ${income} (${income_percentage}) `,
            ];
          },
        },
      },
    },
  };

  const config = {
    type: "treemap",
    data: {
      datasets: [
        {
          tree: data,
          key: "user_count",
          labels: {
            display: true,
            formatter: (context) => context.raw._data.label,
          },
          backgroundColor(context) {
            if (context.type !== "data") return "transparent";
            const { user_count } = context.raw._data;
            return user_count === 0 ? dynamicColors() : dynamicColors();
          },
        },
      ],
    },
  };

  return (
    <>
      <Chart type="treemap" data={config.data} options={options} />
    </>
  );
}

function get_graph_data(location, setGraph_data, setSummery_data) {
  let formData = new FormData();
  let api_address = InitObject.baseurl + "api/rfm_segment/";
  axios
    .post(api_address, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: " Token " + location.state.userinfo.key,
      },
    })
    .then((response) => {
      setGraph_data(response.data.results[0]);
      setSummery_data(response.data.results[1]);
      console.log(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
}

function Segment() {
  const location = useLocation();

  const [graph_data, setGraph_data] = useState([]);
  const [summery_data, setSummery_data] = useState([]);

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

  function DrawTable({ graph_data, summery_data, summeryData }) {
    const DownloadDropdownItems = [
      {
        id: 1,
        title: "ساخت گروه مشتریان",
        icon: <HiUserGroup className="ml-2" />,
      },
      {
        id: 2,
        title: " ارسال پیامک به مشتریان",
        icon: <BiMessageRoundedDots className="ml-2" />,
      },
      {
        id: 3,
        title: "  لیست مشتریان",
        icon: (
          <HiOutlineUsers
            className="ml-2"
            onClick={(e) => handleDownloadFile(e, summeryData.label)}
          />
        ),
      },
      {
        id: 4,
        title: "  گروه پیامک",
        icon: <BiMessageRoundedDetail className="ml-2" />,
      },
    ];
    return (
      <>
        <div className="mx-auto max-w-[18rem] overflow-x-auto p-2 md:max-w-full">
          <div className="inline-block w-full py-2">
            <table className="min-w-full table-auto rounded-lg md:overflow-hidden">
              <thead className="border-b border-white bg-blue-200 text-blue-600">
                <tr>
                  <th
                    scope="col"
                    className="border-slate-500 border px-6 py-4 text-center text-sm font-medium"
                  >
                    بخش
                  </th>
                  <th
                    scope="col"
                    className="border-slate-500 border px-6 py-4 text-center text-sm font-medium"
                  >
                    کل مشتریان
                  </th>
                  <th
                    scope="col"
                    className="border-slate-500 border px-2 py-4 text-center text-sm font-medium"
                  >
                    شاخص تازگی خرید
                  </th>
                  <th
                    scope="col"
                    className="border-slate-500 border px-2 py-4 text-center text-sm font-medium"
                  >
                    شاخص تعداد خرید
                  </th>
                  <th
                    scope="col"
                    className="border-slate-500 border px-2 py-4 text-center text-sm font-medium"
                  >
                    شاخص مبلغ خرید
                  </th>
                  <th
                    scope="col"
                    className="border-slate-500 border px-2 py-4 text-center text-sm font-medium"
                  >
                    دانلود
                  </th>
                </tr>
              </thead>
              <tbody className="[&>*:nth-child(even)]:bg-gray-50 [&>*:nth-child(odd)]:bg-gray-200">
                {summery_data.concat(graph_data).map((summeryData, index) => (
                  <tr key={index} className="border-b">
                    <td className="dark:text-navy-500 flex items-center justify-center px-6 py-4 text-center text-sm font-medium">
                      {summeryData.label}
                    </td>
                    <td className="dark:text-navy-500 px-6  py-4 text-center text-sm font-medium">
                      {summeryData.user_count}
                    </td>
                    <td className="dark:text-navy-500 px-6  py-4 text-center text-sm font-medium">
                      {summeryData.user_count}
                    </td>
                    <td className="dark:text-navy-500 px-6 py-4 text-center text-sm font-medium">
                      {summeryData.factor_count}
                    </td>
                    <td className="dark:text-navy-500 px-6 py-4 text-center text-sm font-medium">
                      {summeryData.income}
                    </td>
                    <td className="dark:text-navy-500 px-6 py-4 text-center text-sm font-medium">
                      <Menu
                        animate={{
                          mount: { y: 0 , x: 80},
                          unmount: { y: 25 , x: 80 },
                        }}
                      >
                        <MenuHandler>
                          <Button className="transparentBtns"> <IoDownloadOutline className="text-xl dark:text-navy-500" /></Button>
                        </MenuHandler>
                        <MenuList>
                          {DownloadDropdownItems.map((DownloadDropdownItem) => {
                            return (
                              <MenuItem
                                key={DownloadDropdownItem.id}
                                className="flex items-center justify-center p-2 text-navy-500 hover:outline-none hover:bg-gray-200"
                               
                              >
                                {DownloadDropdownItem.icon}
                                {DownloadDropdownItem.title}
                              </MenuItem>
                            );
                          })}
                        </MenuList>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div></div>
      </>
    );
  }

  useEffect(() => {
    get_graph_data(location, setGraph_data, setSummery_data);
  }, []);

  return (
    <>
      <TopFilter>
        <div className="mr-3 flex items-center gap-4">
          <FilterDrawer />
          <button
            type="button"
            onClick={(e) => handleDownloadFile(e, "data")}
            class="btns flex items-center justify-center text-lg"
          >
            <BiCloudDownload className="ml-2 text-2xl" /> دانلود
          </button>
        </div>
      </TopFilter>
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <BiLayer className="ml-2 text-3xl" /> بخش بندی مشتریان
            </p>
          </legend>
          <div className="my-8 flex w-full items-center justify-between">
            <div className="text">
              دسته‌بندی مشتریان من، بر اساس شاخص‌های عملکرد «تازگی خرید»، «تعداد
              خرید» و «مبلغ خرید» چگونه است؟
            </div>
            <BiDownload
              className="cursor-pointer text-xl"
              onClick={(e) => handleDownloadFile(e, "graph")}
            />
          </div>
          <div className="my-6 rounded-lg border border-gray-300 p-3">
            <DrawChart data={graph_data} />
          </div>

          <DownloadBtn />
          <DrawTable graph_data={graph_data} summery_data={summery_data} />
        </fieldset>
      </div>
    </>
  );
}

export default Segment;
