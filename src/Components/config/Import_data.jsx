import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import { BiCloudUpload, BiError, BiTrash } from "react-icons/bi";
import { BiCloudDownload } from "react-icons/bi";
import Line from "../../Common/Line";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import TopInfoBar from "Common/TopInfoBar";
import LoadingGif from "../../assets/img/loading.gif";
import { HiDownload } from "react-icons/hi";
import ProgressBar from "react-customizable-progressbar";

function ImportData({ precentage, progress }) {
  const location = useLocation();
  const inputDataRef = useRef(null);
  const [selected_file, SetSelected_file] = useState(null);
  const [filesUploaded, setFilesUploaded] = useState(0);
  const [imports_list, SetImport_list] = useState({});
  const [showLoadingImport, setShowLoadingImport] = useState(false);
  const [showLoadingUpdate, setShowLoadingUpdate] = useState(false);
  const [showLoadingDeleteFile, setShowLoadingDeleteFile] = useState(false);
  const handleInputDataClick = () => {
    inputDataRef.current.click();
  };

  useEffect(() => {
    let formData = new FormData();
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
    setShowLoadingDeleteFile(true);
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        setShowLoadingDeleteFile(false);
        window.location.reload();
      })
      .catch((error) => {
        setShowLoadingDeleteFile(false);
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

  const handlesubmitFile = (selected_file) => {
    //  e.preventDefault();
     console.log(selected_file);
    let formData = new FormData();
    formData.append("file", selected_file);
    if (selected_file) {
      let api_address = InitObject.baseurl + "api/import_excel/";
      setShowLoadingImport(true);
      axios
        .post(
          api_address,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: " Token " + location.state.userinfo.key,
            },
            onUploadProgress: progressEvent => {
              const { loaded, total } = progressEvent;
              console.log(loaded , total);
              let percent = Math.floor((loaded * 100) / total);
              console.log(percent);
              if (percent < 100) {
                console.log(percent);
                setFilesUploaded(percent);
              }
            },
          }
        )
        .then((response) => {
          setShowLoadingImport(false);
          setFilesUploaded(100);
          setTimeout(() => {
            setFilesUploaded(0);
          }, 1000);
          console.log(response);
          SetSelected_file(null);
        })
        .catch((error) => {
          setShowLoadingImport(false);
          setFilesUploaded(0);
          console.log(error);
        });
    }
  };

  const handleUpdateFile = (e) => {
    e.preventDefault();
    let formData = new FormData();
    let api_address = InitObject.baseurl + "api/update_customer_rfm_scores/";
    setShowLoadingUpdate(true);
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setShowLoadingUpdate(false);
        console.log(response);
      })
      .catch((error) => {
        setShowLoadingUpdate(false);
        console.log(error);
      });
  };

  const handleSampleFile = (e) => {
    e.preventDefault();
    let formData = new FormData();
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
  const ImportListTableHead = [
    "شناسه",
    "تعداد",
    "تاریخ و زمان",
    "حذف",
    "دانلود",
  ];
  return (
    <>
      <TopInfoBar />
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
              {selected_file && <>{selected_file.name}</>}
            </div>
            <button
              className="transparentBtns sample-file flex w-full items-center justify-center md:mx-2 md:w-auto"
              onClick={handleSampleFile}
            >
              <HiDownload className="ml-2 text-xl" />
              دانلود قالب نمونه
            </button>
            {showLoadingImport ? (
              <ProgressBar
                radius={50}
                progress={filesUploaded}
                strokeWidth={14}
                strokeColor="#ffce54"
                strokeLinecap="butt"
                trackStrokeWidth={7}
                trackStrokeLinecap="butt"
                cut={120}
                rotate={-210}
                className="relative"
              >
                <div className="absolute top-16 right-0 left-0 mx-auto flex items-center justify-center text-xl">
                  <div>{filesUploaded}%</div>
                </div>
              </ProgressBar>
            ) : (
              <button
                className="btns submit-file flex w-full items-center justify-center md:mx-2 md:w-auto"
                onClick={() => handlesubmitFile(selected_file)}
              >
                <BiCloudUpload className="ml-2 text-xl" />
                آپلود فایل داده ها
              </button>
            )}

            {/* {
                showLoadingUpdate ? <img src={LoadingGif} alt="loadingGif" className="w-10 h-10 object-cover " /> :  <button
                className="btns submit-file flex w-full items-center  justify-center md:mx-2 md:w-auto"
                onClick={handleUpdateFile}
              >
               <BiCloudUpload className="ml-2 text-xl" />
                <span> به روز رسانی </span>
              </button>
              } */}
          </div>
          <Line />
          <div className="my-2 flex w-full items-center justify-center">
            {showLoadingDeleteFile && (
              <img
                src={LoadingGif}
                alt="loadingGif"
                className="h-10 w-10 object-cover"
              />
            )}
          </div>
          {Object.keys(imports_list).length > 0 ? (
            <Card className="mx-auto h-full max-w-[16rem] overflow-x-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
              <table className="w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    {ImportListTableHead.map((head) => (
                      <th
                        key={head}
                        className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-center font-bold leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(imports_list).map((importList) => {
                    return (
                      <tr
                        key={importList}
                        className="odd:bg-gray-50 even:bg-gray-100"
                      >
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-center font-normal"
                          >
                            {importList}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-center font-normal"
                          >
                            {imports_list[importList]["count"]}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-center font-normal"
                          >
                            {imports_list[importList]["time"]}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="flex items-center justify-center text-center font-normal"
                          >
                            <BiTrash
                              onClick={(e) =>
                                handleRemoveAllFile(e, importList)
                              }
                              className="cursor-pointer text-xl text-red-500"
                            />
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="flex items-center justify-center text-center font-normal"
                          >
                            <BiCloudDownload
                              onClick={(e) => handleDownloadFile(e, importList)}
                              className="cursor-pointer text-xl text-blue-500"
                            />
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
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
