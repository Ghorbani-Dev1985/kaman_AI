import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import { BiCheckDouble, BiCloudDownload, BiSitemap } from "react-icons/bi";
import { Card, Typography } from "@material-tailwind/react";
import Select from "react-select";
import "react-select-search/style.css";

function DrawTable({ graph_data }) {
  console.log(graph_data);
  return (
    <>
      <Card className="my-10 mx-auto h-full max-w-[16rem] overflow-x-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {graph_data["labels"].map(function (data) {
                return (
                  <th className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900">
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
            {graph_data["data"].map(function (data, index) {
              return (
                <tr key={index} className="odd:bg-gray-50 even:bg-gray-100">
                  {data.map(function (value) {
                    return (
                      <td className="p-4">
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

function Clustering() {
  const location = useLocation();
  const [num_cluster, setNum_cluster] = useState(3);
  const [feature1, setFeature1] = useState("product_name_count");
  const [feature2, setFeature2] = useState("perfit_amount");
  const [feature3, setFeature3] = useState("life_time");
  const [feature4, setFeature4] = useState("product_name_count");
  const [feature5, setFeature5] = useState("product_name_count");
  const [feature6, setFeature6] = useState("product_name_count");
  const [feature7, setFeature7] = useState("product_name_count");
  const [feature8, setFeature8] = useState("product_name_count");
  const [clusters, setClusters] = useState({ labels: [], data: [] });
  const [clusterSelect, setClusterSelect] = useState(null);
 const [selectFeatures, setSelectFeatures] = useState(null);

  const get_clustering = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("num_cluster", num_cluster);
    formData.append("feature1", feature1);
    formData.append("feature2", feature2);
    formData.append("feature3", feature3);
    formData.append("feature4", feature4);
    formData.append("feature5", feature5);
    formData.append("feature6", feature6);
    formData.append("feature7", feature7);
    formData.append("feature8", feature8);

    let api_address = InitObject.baseurl + "api/clustering/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setClusters(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownloadFile = (e, graph_data) => {
    var table_data = graph_data["clusters"];
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

  function show_clusters(clusters) {
    if (clusters["cluster_info"] !== undefined) {
      return (
        <Card className="my-10 mx-auto h-full max-w-[16rem] overflow-x-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                <th className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-center font-bold leading-none opacity-70"
                  >
                    خوشه
                  </Typography>
                </th>
                <th className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-center font-bold leading-none opacity-70"
                  >
                    تعداد مشتریان
                  </Typography>
                </th>
                <th className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-center font-bold leading-none opacity-70"
                  >
                    فروش ناخالص
                  </Typography>
                </th>
                <th className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-center font-bold leading-none opacity-70"
                  >
                    تعداد فاکتورهای فروش
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(clusters["cluster_info"]).map(([key, value]) => (
                <tr key={key} className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-center font-normal"
                    >
                      {key}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-center font-normal"
                    >
                      {value["count"]}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-center font-normal"
                    >
                      {value["sale"]}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-center font-normal"
                    >
                      {value["factor_count"]}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      );
    }
  }
  const SelectFeatures = [
    { label: "تنوع محصول ", value: "product_name_count" },
    { label: "تنوع محصول مرجوعی ", value: "product_nameـrejected" },
    { label: " تنوع دسته بندی ", value: "product_category_count" },
    { label: "تعداد مناطق جغرافیایی ", value: "city_count" },
    { label: " در آمد از مشتری ", value: "perfit_amount" },
    { label: " طول عمر ", value: "life_time" },
    { label: "تعداد فاکتورهای فروش ", value: "sale_factor_count" },
    { label: " تعداد فاکتورهای برگشتی ", value: "rejected_factor_count" },
  ];
  const SetNumCluster = [
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 8 },
    { label: "7", value: 7 },
    { label: "8", value: 6 },
  ];
  function select_features(setfeature) {
    return (
      <Select
        onChange={setSelectFeatures}
        options={SelectFeatures}
        placeholder="انتخاب"
        className="md:max-w-xs"
      />
    );
  }

  return (
    <>
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <BiSitemap className="ml-2 text-3xl" /> خوشه بندی خرید مشتریان
            </p>
          </legend>

          <div className="description">
            <div className="my-4">
              در این قسمت شما میتوانید مشتریان خود را بر اساس شاخص های زیر خوشه
              بندی کنید
            </div>
            <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-3">
              <div>
                <Select
                  onChange={setClusterSelect}
                  options={SetNumCluster}
                  placeholder="انتخاب"
                  className="md:max-w-xs"
                />
              </div>
              <div>{select_features(setFeature1)}</div>
              <div> {select_features(setFeature2)}</div>
              <div>{select_features(setFeature3)}</div>
              <div>{select_features(setFeature4)}</div>
              <div> {select_features(setFeature5)}</div>
              <div> {select_features(setFeature6)}</div>
              <div>{select_features(setFeature7)}</div>
              <div>{select_features(setFeature8)}</div>
            </div>
            <div className="my-8 flex w-full items-center justify-center">
              {" "}
              <button
                type="button"
                class="btns flex items-center justify-center"
                onClick={get_clustering}
              >
                {" "}
                <BiCheckDouble className="ml-2 text-2xl" />
                <span>اعمال</span>{" "}
              </button>
            </div>

            <div className="flex w-full items-center justify-center divide-y">
              {show_clusters(clusters)}
            </div>
          </div>

          <section className="my-5 flex items-center justify-end rounded-lg border border-gray-300 p-4">
            <button
              onClick={(e) => handleDownloadFile(e, { clusters })}
              className="btns flex items-center justify-center"
            >
              <BiCloudDownload className="ml-2 text-2xl" />
              <span>دانلود</span>
            </button>
          </section>

          <div className="table1">
            <DrawTable graph_data={clusters} />
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default Clustering;
