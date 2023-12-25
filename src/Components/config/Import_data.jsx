import React, { useEffect } from "react";
import { useRef, useState } from "react";
import {ChangeGregorianDateToPersian} from "../../Utils/globalvariables";
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
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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

  const handleImportList = (e) => {
    e.preventDefault();
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
    let api_address = InitObject.baseurl + 'api/remove_excel/'
    Swal.fire({
      title: "برای حذف فایل مطمعن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "انصراف"
    }).then((result) => {
      if (result.isConfirmed) {
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
        Swal.fire({
          title: "فایل مورد نظر با موفقیت حذف گردید.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

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

  const handlesubmitFile = (e) => {
    e.preventDefault();
    let formData = new FormData()
        formData.append("file", selected_file);
        // formData.append("end_date1", end_time1.format());
        let api_address = InitObject.baseurl + 'api/import_excel/'
        console.log(api_address);
        setShowLoadingImport(true);
        axios.post(api_address, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": " Token " + location.state.userinfo.key
            },
          }).then((response) => {
            setShowLoadingImport(false);
                console.log(response);
                SetSelected_file(null);
                 handleImportList(e);
                handleUpdateFile(e);
           })
           .catch((error) => {
            setShowLoadingImport(false);
            console.log(error);
           
            });

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
               {
                showLoadingImport ? <img src={LoadingGif} alt="loading" className="w-10 h-10"/> : <button
                className="btns submit-file flex w-full items-center justify-center md:mx-2 md:w-auto"
                onClick={handlesubmitFile}
              >
                <BiCloudUpload className="ml-2 text-xl" />
                آپلود فایل داده ها
              </button>
               }
             
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
                    let year = imports_list[importList]["time"].slice(0 , 4) 
                    let month = imports_list[importList]["time"].slice(5 , 7) 
                    let day = imports_list[importList]["time"].slice(8 , 10) 
                     console.log(day)
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
                            {imports_list[importList]["time"].slice(11 , 19)}<span className="mx-1">-</span>
                         { ChangeGregorianDateToPersian(+year, +month , +day)}                         
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
