import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import { BiCloudUpload, BiError, BiTrash } from "react-icons/bi";
import { BiCloudDownload } from "react-icons/bi";
import Line from "../../Common/Line";

function ImportData(props) {
  const location = useLocation();
  const inputDataRef = useRef(null);
  const [selected_file, SetSelected_file] = useState(null);
  const [imports_list, SetImport_list] = useState({});

  const handleInputDataClick = () => {
    inputDataRef.current.click();
  };

  useEffect(() => {
    let formData = new FormData();
    // formData.append("start_date1", start_time1.format());
    // formData.append("end_date1", end_time1.format());
    let api_address = InitObject.baseurl + "api/list_imports/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        SetImport_list(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRemoveAllFile = (e, key) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("excel_id", key);
    // formData.append("end_date1", end_time1.format());
    let api_address = InitObject.baseurl + "api/remove_excel/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownloadFile = (e, key) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("excel_id", key);
    // formData.append("end_date1", end_time1.format());
    let api_address = InitObject.baseurl + "api/download_excel/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        if (response.data.results.csv_path !== "") {
          var link = InitObject.baseurl + response.data.results.csv_path;
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

  // udate_tables(){
  //   let formData = new FormData();
  //   // formData.append("start_date1", start_time1.format());
  //   // formData.append("end_date1", end_time1.format());
  //   let api_address = InitObject.baseurl + 'api/sample_file/'
  //   await axios.post(api_address, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         "Authorization": " Token " + location.state.userinfo.key
  //       },
  //     }).then((response) => {
  //       var link = InitObject.baseurl + response.data.results.link;
  //       console.log(link);
  //       let a = document.createElement('a');
  //       a.href = link;
  //       a.download = link;
  //       a.click();
  //      })
  //      .catch((error) => {
  //       console.log(error);

  //       });

  //     retun
  // }

  const handlesubmitFile = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (selected_file) {
      formData.append("file", selected_file);
      // formData.append("end_date1", end_time1.format());
      let api_address = InitObject.baseurl + "api/import_excel/";
      console.log(api_address);
      axios
        .post(api_address, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: " Token " + location.state.userinfo.key,
          },
        })
        .then((response) => {
          console.log(response);
          SetSelected_file(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUpdateFile = (e) => {
    e.preventDefault();
    let formData = new FormData();

    // formData.append("end_date1", end_time1.format());
    let api_address = InitObject.baseurl + "api/update_customer_rfm_scores/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSampleFile = (e) => {
    e.preventDefault();
    let formData = new FormData();
    // formData.append("start_date1", start_time1.format());
    // formData.append("end_date1", end_time1.format());
    let api_address = InitObject.baseurl + "api/sample_file/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        var link = InitObject.baseurl + response.data.results.link;
        console.log(link);
        let a = document.createElement("a");
        a.href = link;
        a.download = link;
        a.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    SetSelected_file(fileObj);
    // console.log('fileObj is', fileObj);

    // // 👇️ reset file input
    event.target.value = null;

    // // 👇️ is now empty
    // console.log(event.target.files);

    // // 👇️ can still access file object here
    // console.log(fileObj);
    // console.log(fileObj.name);
  };
  console.log(Object.keys(imports_list));
  return (
    <>
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">ورود داده</legend>
          <p>
            در این بخش می توانید داده های خود را در قالب یک فایل CSV مطابق فایل
            نمونه آپلود کنید.
          </p>
          <input
            style={{ display: "none" }}
            ref={inputDataRef}
            type="file"
            onChange={handleFileChange}
            accept=".csv,.xlsx"
            className="inputStyles my-5"
          />
          <div className="my-12 flex flex-col items-center md:flex-row">
            <button
              className="btns choose-file w-full md:mx-2 md:w-auto"
              onClick={handleInputDataClick}
            >
              انتخاب فایل
            </button>
            <div className="bg-slate-100 flex h-11 w-full items-center justify-center rounded-md md:flex-1">
              {selected_file ? <>{selected_file.name}</> : <></>}
            </div>
            <button
              className="secondBtns submit-file w-full md:mx-2 md:w-auto"
              onClick={handlesubmitFile}
            >
              ورود داده
            </button>
            <button
              className="transparentBtns sample-file w-full md:mx-2 md:w-auto"
              onClick={handleSampleFile}
            >
              فایل نمونه
            </button>
            <button
              className="btns submit-file flex w-full items-center  justify-center md:mx-2 md:w-auto"
              onClick={handleUpdateFile}
            >
              <BiCloudUpload className="ml-2 text-xl" />
              <span> به روز رسانی </span>
            </button>
          </div>
          <Line />
          {Object.keys(imports_list).length > 0 ? (
            <div className="max-w-xs overflow-x-auto p-2 md:max-w-full">
              <div className="inline-block w-full py-2">
                <div className="overflow-hidden rounded-lg">
                  <table className="min-w-full table-auto rounded-lg md:overflow-hidden">
                    <thead className="border-b border-white bg-blue-200 text-blue-600">
                      <tr>
                        <th
                          scope="col"
                          className="border-slate-500 border px-2 py-4 text-center text-sm font-medium"
                        >
                          تاریخ و زمان آپلود
                        </th>
                        <th
                          scope="col"
                          className="border-slate-500 border px-6 py-4 text-center text-sm font-medium"
                        >
                          نام فایل
                        </th>
                        <th
                          scope="col"
                          className="border-slate-500 border px-6 py-4 text-center text-sm font-medium"
                        >
                          نوع
                        </th>
                        <th
                          scope="col"
                          className="border-slate-500 border px-6 py-4 text-center text-sm font-medium"
                        >
                          تعداد رکورد
                        </th>
                        <th
                          scope="col"
                          className="border-slate-500 border px-2 py-4 text-center text-sm font-medium"
                        >
                          حذف
                        </th>
                        <th
                          scope="col"
                          className="border-slate-500 border px-2 py-4 text-center text-sm font-medium"
                        >
                          دانلود
                        </th>
                      </tr>
                    </thead>

                    {/* <tbody className="[&>*:nth-child(even)]:bg-gray-50 [&>*:nth-child(odd)]:bg-gray-200">
                      {Object.keys(imports_list).map((key, index) => (
                        <tr key={index} className="border-b">
                          <td className="text-slate-700 px-6 py-4 text-center text-sm font-medium">
                            df
                          </td>
                          <td className="text-slate-700 px-6 py-4 text-center text-sm font-medium">
                            {key}
                          </td>
                          <td className="text-slate-700 px-6  py-4 text-center text-sm font-medium">
                            ffd
                          </td>
                          <td className="text-slate-700 px-6 py-4 text-center text-sm font-medium">
                            {imports_list[key]}{" "}
                          </td>
                          <td className="text-slate-700 px-6 py-4 text-center text-sm font-medium">
                            <BiTrash
                              onClick={(e) => handleRemoveAllFile(e, key)}
                              className="text-rose-500 cursor-pointer text-xl"
                            />
                          </td>
                          <td className="text-slate-700 px-6 py-4 text-center text-sm font-medium">
                            <BiCloudDownload
                              onClick={(e) => handleDownloadFile(e, key)}
                              className="cursor-pointer text-xl text-blue-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody> */}
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-rose-100 my-44 flex items-center justify-center rounded-md p-3">
              <BiError className="ml-2 text-4xl text-amber-500" /> اطلاعاتی برای
              نمایش وجود ندارد
            </div>
          )}
        </fieldset>
      </div>

      {/* <div className="remove-all-data">
                <div className="context-text">
                    در صورت نیاز میتوانید همه داده ها را حذف کنید.
                </div>
                <button className="btn  submit"  >   حذف همه داده ها</button>
                </div> */}
    </>
  );
}

export default ImportData;
