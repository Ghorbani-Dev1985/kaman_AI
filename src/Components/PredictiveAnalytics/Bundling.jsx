import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import { Card, Typography } from "@material-tailwind/react";
import DrawTable from "Common/DrawTable";
import { BiCheckDouble, BiSelection } from "react-icons/bi";
import "react-select-search/style.css";
import Select from "react-select";
import DownloadBtn from "Common/DownloadBtn";
import { IoBulbOutline } from "react-icons/io5";

function Bundling() {
  const location = useLocation();
  const [bundle_count, setBundle_count] = useState(2);
  const [bundles, setBundles] = useState({ labels: [], data: [] });
  const [bundlingSelect, setBundlingSelect] = useState(null);
  const bundlingSelectItems = [
    { label: " 2 ", value: "2" },
    { label: " 3", value: "3" },
    { label: "4", value: "4" },
  ];
  const get_bundling = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("bundle_count", bundle_count);

    let api_address = InitObject.baseurl + "api/bundling/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setBundles(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownloadFile = (e, graph_data) => {
    var table_data = graph_data["bundles"];
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
      <section className="mb-4 flex w-full items-center justify-end rounded-lg bg-white lg:h-24">
        <div className="flex flex-col items-center md:flex-row">
          <IoBulbOutline className="text-lg text-navy-500" />
          <p className="ml-2 text-navy-500">راهنما</p>
        </div>
      </section>
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <BiSelection className="ml-2 text-3xl" /> دسته کردن محصولات
            </p>
          </legend>

          <p className="my-5">
            {" "}
            برای افزایش سبد خرید مشتریان چه کالاهایی را باندل کنیم؟
          </p>

          <div className="my-10 flex items-center gap-5">
            <Select
              onChange={setBundlingSelect}
              options={bundlingSelectItems}
              placeholder=" تعداد محصول در باندل"
              className="w-full md:w-56"
            />
            <button
              className="btns flex items-center justify-center"
              onClick={get_bundling}
            >
              <BiCheckDouble className="ml-2 text-2xl" />
              <span>اعمال</span>
            </button>
          </div>

          <p className="my-5">
            {" "}
            تمام باندلهای مطلوب به ترتیب اولویت به همراه شاخص های ارزیابی هر
            باندل در جدول زیر لیست شده است
          </p>

          <DownloadBtn onClick={(e) => handleDownloadFile(e, { bundles })} />

          <div className="table1">
            <DrawTable graph_data={bundles} />
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default Bundling;
