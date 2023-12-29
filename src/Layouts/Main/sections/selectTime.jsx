import React, { useEffect, useRef } from "react";
import "./selectTime.css";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject , {ChangeGregorianDateToPersian} from "../../../Utils/globalvariables";
import { BiCalendarAlt, BiCheckDouble} from "react-icons/bi";
import TopFilter from "Common/TopFilter";
import { Checkbox} from "@material-tailwind/react";
import { useStart_time1 } from "Context/Start_time1Context";
import { useEnd_time1 } from "Context/End_time1Context";
import { useStart_time2 } from "Context/Start_time2Context";
import { useEnd_time2 } from "Context/End_time2Context";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Input from "Common/Input";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
//mui





function Date_Picker(v, setter) {
  return (
    <>
      <DatePicker
        className="date-picker"
        format="YYYY/MM/DD"
        placeholder="yyyy/mm/dd"
        type="tel"
        onChange={setter}
        editable = {true}
        calendar={persian}
        locale={persian_fa}
        value={v}
        formattingIgnoreList={["Date" , 'Time']}
        calendarPosition="bottom-center"
        plugins={[
          <TimePicker hideSeconds />,
          <DatePickerHeader
            position="left"
            size="small"
            style={{ backgroundColor: "#3b82f6" }}
          />,
        ]}
      />
    </>
  );
}

function Date_Picker2(v, setter , disabled) {
  return (
    <>
      <DatePicker
        className="date-picker"
        format="YYYY/MM/DD"
        placeholder="yyyy/mm/dd"
        type="tel"
        disabled={disabled}
        onChange={setter}
        editable = {true}
        calendar={persian}
        locale={persian_fa}
        value={v}
        formattingIgnoreList={["Date" , 'Time']}
        calendarPosition="bottom-center"
        plugins={[
          <TimePicker hideSeconds />,
          <DatePickerHeader
            position="left"
            size="small"
            style={{ backgroundColor: "#3b82f6" }}
          />,
        ]}
      />
    </>
  );
}

function Date_Calendar(v2, setter2) {
  return (
    <Calendar
      value={v2}
      onChange={setter2}
      dateSeparator=" تا "
      eachDaysInRange
      numberOfMonths={1}
      showOtherDays
      calendar={persian}
      locale={persian_fa}
      formattingIgnoreList={["Date", "Time"]}
    />
  );
}

function useOutsideAlerter(ref, setOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOpen]);
}

function SelectTime({ setResponse, setchartresponse }) {
  //Context
  const {start_time1 , setStart_time1} = useStart_time1();
  const {end_time1 , setEnd_time1} = useEnd_time1();
  const {start_time2 , setStart_time2} = useStart_time2();
  const {end_time2 , setEnd_time2} = useEnd_time2();
  const [compare_time, setCompare_time] = useState(0);
  const [open, setOpen] = useState(false);
  const DateRef = useRef(null);
  useOutsideAlerter(DateRef, setOpen);
  const location = useLocation();
  
  const handleSetStart_time1 = (e) => {
    // e.preventDefault();
    setStart_time1(e);
    localStorage.setItem("start_time1", start_time1);
  };
  useEffect(() => {
   setStart_time1(new DateObject(start_time1));
  }, []);
  const handleFactorInfo = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("start_date1", start_time1.format("YYYY-MM-DDTHH:mm:ss"));
    formData.append("end_date1", end_time2.format("YYYY-MM-DDTHH:mm:ss"));
    if (compare_time === 1) {
      formData.append("start_date2", start_time2.format("YYYY-MM-DDTHH:mm:ss"));
      formData.append("end_date2", end_time2.format("YYYY-MM-DDTHH:mm:ss"));
    }

    let api_address = InitObject.baseurl + "api/factors_info/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setResponse(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProductInfo = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("start_date1", start_time1.format("YYYY-MM-DDTHH:mm:ss"));
    formData.append("end_date1", end_time1.format("YYYY-MM-DDTHH:mm:ss"));
    formData.append("export", 0);
    let api_address = InitObject.baseurl + "api/products_info/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setchartresponse(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetInfo = (e) => {
    e.preventDefault();
    handleFactorInfo(e);
    handleProductInfo(e);
    setOpen(false);
  };

  const handleCompare_time = (event) => {
    if (compare_time === 1) {
      setCompare_time(0);
    } else {
      setCompare_time(1);
    }
  };

  return (
    <>
      <TopFilter>
        <div
          ref={DateRef}
          className="relative mr-2 h-full border-l border-gray-100 pl-2"
        >
       
         <button
           onClick={() => setOpen(!open)}
           className="flex h-full items-center justify-center text-base text-navy-500 transition-all duration-300 ease-in-out hover:bg-brand-50/20 "
         >
           <div className="flex flex-col gap-4">
             <div className="flex items-center">
               <BiCalendarAlt className="ml-1 text-xl" />
               <p>
           
                 {start_time1 && start_time1.format()} 
                 تا 
                 {end_time1 && end_time1.format()}
               </p>
             </div>
             <p className="text-sm">
               مقایسه با {start_time2 && start_time2.format()}
                تا 
                {end_time2 && end_time2.format()}
             </p>
           </div>
         </button>
         
          

          <div
            className={`${
              open ? "flex" : "hidden"
            } absolute inset-y-0 inset-x-auto m-0 top-4 translate-x-[7px] translate-y-[78px] z-40`}
          >
          <div className="min-w-[187px]">
            <div className="bg-white text-slate-600 rounded-md shadow-2xl overflow-hidden">
              <div className="flex">
                <div className="w-80">
                  <div className="border-r-4 border-l-[1px] border-l-slate-300 border-r-blue-600 border-solid py-4 px-3">
                    <div className="flex flex-wrap -mt-4 w-[calc(100%+ 16px)] -mr-4">
                      <div className="pr-4 pt-2 m-0 basis-full grow-0 max-w-full">
                        <p className="m-0 text-base font-normal leading-7">
                          انتخاب بازه زمانی
                        </p>
                      </div>

                      <div className="w-full flex justify-between items-center mt-12 px-3">
                        {Date_Picker(start_time1, handleSetStart_time1)}
                        <span >تا</span>
                        {Date_Picker(end_time1, setEnd_time1)}
                      </div>
                    </div>
                  </div>
                  <p className="bg-slate-300 w-full h-px m-0"></p>
                  <div className="m-0 border-r-4 border-l-[1px] border-l-slate-300 border-t border-t-slate-300 border-r-amber-500 border-solid py-4 px-3">
                    <div className="flex flex-wrap -mt-4 w-[calc(100%+ 16px)] -mr-4">
                      <div className="pr-4 pt-2 m-0 basis-full grow-0 max-w-full">
                        <input
                          type="checkbox"
                          className="my-5"
                          id="compareWidth"
                          onClick={handleCompare_time}
                          value={compare_time}
                        />
                        <label htmlFor="compareWidth" className="mr-2">
                          مقایسه با ...
                        </label>
                      </div>
                      <div className={`${compare_time ? "opacity-100" : "opacity-50 select-none"} w-full flex justify-between items-center mt-6 px-3`}>
                          {
                            compare_time ?
                             Date_Picker2(start_time2, setStart_time2)
                            :
                            Date_Picker2(start_time2, setStart_time2 , true)
                          }
                            
                          <span>تا</span>
                          {
                            compare_time ?
                            Date_Picker2(end_time2, setEnd_time2)
                            :
                            Date_Picker2(end_time2, setEnd_time2 , true)
                          }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden min-w-[320px] px-1 py-2 flex flex-col bg-white">
                  <div className="flex gap-5">
                   
                   {Date_Calendar(start_time1, handleSetStart_time1)}
                   {Date_Calendar(end_time1, setEnd_time1)}
                  </div>
                </div>
              </div>
              <div className="flex flex-row-reverse p-4 border-t border-slate-300 border-solid">
              <div className="mt-4 flex w-full items-center justify-end">
              <button
                onClick={() => setOpen(false)}
                className="transparentBtns"
              >
                انصراف
              </button>
              <button
                onClick={handleGetInfo}
                className="btns mr-1 flex w-full items-center justify-center md:w-auto"
              >
                <BiCheckDouble className="ml-2 text-2xl" /> <span>اعمال</span>
              </button>
            </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </TopFilter>
    </>
  );
}

export { SelectTime };
