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
//mui





function Date_Picker(v, setter) {
  return (
    <>
      <DatePicker
        className="date-picker"
        format="YYYY/MM/DD"
        onChange={setter}
        editable = {true}
        calendar={persian}
        locale={persian_fa}
        value={v}
        formattingIgnoreList={["Date" , "Time"]}
        calendarPosition="bottom-center"
        plugins={[ <TimePicker position="bottom" /> , <Toolbar position="bottom" />]}
      />
    </>
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
 console.log(start_time1)
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
      const time2_div = document.getElementById("time2");
      time2_div.style.backgroundColor = "gray";
      time2_div.style.pointerEvents = "none";
    } else {
      setCompare_time(1);
      const time2_div = document.getElementById("time2");
      time2_div.style.backgroundColor = "white";
      time2_div.style.pointerEvents = "auto";
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
                 {start_time1.format()} تا {end_time1.format()}
               </p>
             </div>
             <p className="text-sm">
               مقایسه با {start_time2.format()} تا {end_time2.format()}
             </p>
           </div>
         </button>
         
          

          <div
            className={`${
              open ? "flex" : "hidden"
            } absolute top-20 z-50 flex-col justify-start rounded-lg border border-navy-500 bg-white bg-cover bg-no-repeat p-5 shadow-xl dark:!bg-navy-700 dark:text-white dark:shadow-none`}
          >
            <div className="flex flex-col md:flex-row items-center justify-center border-r-4 border-navy-500 px-2">
               <span className="w-20"> زمان شروع :</span>
              <p className="py-2 hover:border-navy-500">
                {Date_Picker(start_time1, handleSetStart_time1)}
              </p>
              <span className="w-20">زمان پایان :</span>
              <p className="py-2 hover:border-navy-500">
                {Date_Picker(end_time1, setEnd_time1)}
              </p>
            </div>
         
            <div className="my-7 flex w-full items-center justify-center">
              <Checkbox
                name="handleCompare"
                color="indigo"
                onClick={handleCompare_time}
                value={compare_time}
              />
              <label htmlFor="handleCompare"> مقایسه با ...</label>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center border-r-4 border-amber-500 px-2">
              <span className="w-20"> زمان شروع :</span>
              <p className="py-2 hover:border-navy-500">
                {Date_Picker(start_time2, setStart_time2)}
              </p>
              <span className="w-20">زمان پایان :</span>
              <p className="py-2 hover:border-navy-500">
                {Date_Picker(end_time2, setEnd_time2)}
              </p>
            </div>

            <div className="mt-4 flex w-full items-center justify-end border-t border-gray-300 py-5">
              <button
                onClick={() => setOpen(false)}
                className="transparentBtns"
              >
                انصراف
              </button>
              <button
                onClick={handleGetInfo}
                className="btns mr-2 flex w-full items-center justify-center md:w-auto"
              >
                <BiCheckDouble className="ml-2 text-2xl" /> <span>اعمال</span>
              </button>
            </div>
          </div>
        </div>
      </TopFilter>
    </>
  );
}

export { SelectTime };
