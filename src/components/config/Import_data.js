import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import { BiCloudUpload, BiError, BiTrash } from "react-icons/bi";
import { BiCloudDownload } from "react-icons/bi";
import Line from "../../Common/Line";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/RTL";

function ImportData(props) {
  const location = useLocation();
  const inputDataRef = useRef(null);
  const [selected_file, SetSelected_file] = useState(null);
  const [imports_list, SetImport_list] = useState({});
  const [currentRoute, setCurrentRoute] = useState(" ورود داده ");
  const [chartresponse, setChartResponse] = useState({});
  const { ...rest } = props;
  const [open, setOpen] = useState(true);
  const [showSubMenu, setShowSubMenu] = useState({
    allMenu: true,
    dropDownOne: false,
    dropDownTwo: false,
    dropDownThree: false,
  });
  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 768 ? setOpen(false) : setOpen(true)
    );
  }, []);

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
      <div className="flex h-full w-full">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        showSubMenu={showSubMenu}
        setShowSubMenu={setShowSubMenu}
      />
      {/* Navbar & Main Content */}
      <div className="flex h-full w-full flex-col items-end bg-lightPrimary dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] mt-4 h-full w-78p flex-none transition-all duration-700 ease-linear md:pe-2 ${
            !showSubMenu.allMenu && "w-96p"
          } `}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              
            <div className="bg-white p-4 rounded-md mb-4">
              <fieldset className="border border-solid border-gray-300 rounded-md p-3">
                <legend className="text-sm float-none w-auto px-2">
                 
                  ورود داده
                </legend>
                <p>
                  در این بخش می توانید داده های خود را در قالب یک فایل CSV مطابق
                  فایل نمونه آپلود کنید.
                </p>
                <input
                  style={{ display: "none" }}
                  ref={inputDataRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".csv,.xlsx"
                  className="inputStyles my-5"
                />
                <div className="flex flex-col md:flex-row items-center my-12">
                  <button
                    className="btns choose-file w-full md:mx-2 md:w-auto"
                    onClick={handleInputDataClick}
                  >
                    انتخاب فایل
                  </button>
                  <div className="flex w-full md:flex-1 justify-center items-center h-11 bg-slate-100 rounded-md">
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
                    className="btns submit-file flex justify-center items-center  w-full md:mx-2 md:w-auto"
                    onClick={handleUpdateFile}
                  >
                   
                    <BiCloudUpload className="text-xl ml-2" />
                    <span> به روز رسانی </span>
                  </button>
                </div>
                <Line />
                {
                  Object.keys(imports_list).length > 0 ?       <div className="overflow-x-auto max-w-xs md:max-w-full p-2">
                  <div className="w-full py-2 inline-block">
                    <div className="overflow-hidden rounded-lg">
                      <table className="table-auto min-w-full rounded-md">
                        <thead className="bg-blue-200 text-blue-600 border-b border-white">
                          <tr>
                            <th
                              scope="col"
                              className="text-sm font-medium border border-slate-500 px-2 py-4 text-center"
                            >
                              تاریخ و زمان آپلود
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium border border-slate-500 px-6 py-4 text-center"
                            >
                              نام فایل
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium border border-slate-500 px-6 py-4 text-center"
                            >
                              نوع
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium border border-slate-500 px-6 py-4 text-center"
                            >
                              تعداد رکورد
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium border border-slate-500 px-2 py-4 text-center"
                            >
                              حذف
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium border border-slate-500 px-2 py-4 text-center"
                            >
                              دانلود
                            </th>
                          </tr>
                        </thead>

                        <tbody className="[&>*:nth-child(even)]:bg-slate-50 [&>*:nth-child(odd)]:bg-slate-200">
                          {Object.keys(imports_list).map((key, index) => (
                            <tr key={index} className="bg-gray-100 border-b">
                              <td className="px-6 py-4 text-sm font-medium text-slate-700 text-center">
                                df
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-700 text-center">
                               {key} 
                              </td>
                              <td className="px-6 py-4  text-sm font-medium text-slate-700 text-center">
                                ffd
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-700 text-center">
  
                               {imports_list[key]}{" "}               
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-700 text-center">
                                  <BiTrash onClick={(e) => handleRemoveAllFile(e, key)} className="text-rose-500 text-xl cursor-pointer" />
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-700 text-center"> 
                                  <BiCloudDownload onClick={(e) => handleDownloadFile(e, key)} className="text-blue-500 text-xl cursor-pointer" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>: 
                <div className="flex justify-center items-center bg-rose-100 rounded-md p-3 my-44"><BiError className="text-amber-500 text-4xl ml-2" /> اطلاعاتی برای نمایش وجود ندارد</div>
                }


          


              </fieldset>
            </div>

         
            {/* <div className="remove-all-data">
                <div className="context-text">
                    در صورت نیاز میتوانید همه داده ها را حذف کنید.
                </div>
                <button className="btn  submit"  >   حذف همه داده ها</button>
                </div> */}

              
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>


    </>
  );
}

export default ImportData;
