import React, { useEffect, useRef } from "react";
import "./selectTime.css";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import { useState } from "react";
// import { Calendar } from "react-multi-date-picker"
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
// import gregorian from "react-date-object/calendars/gregorian"
// import gregorian_en from "react-date-object/locales/gregorian_en"
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";

import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../../Utils/globalvariables";
import {
  BiCalendar,
  BiCalendarAlt,
  BiCheckDouble,
  BiChevronDown,
} from "react-icons/bi";
import { BiHelpCircle } from "react-icons/bi";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import TopFilter from "Common/TopFilter";
import DataGraphSelect from "Common/DataGraphSelect";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Input,
  Typography,
  Checkbox,
} from "@material-tailwind/react";



function Date_Picker(v, setter) {
  return (
    <>
       <DatePicker
        className="date-picker"
        format="YYYY/MM/DD"
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


  const [start_time1, setStart_time1] = useState(new DateObject());
  const [end_time1, setEnd_time1] = useState(new DateObject());
  const [start_time2, setStart_time2] = useState(new DateObject());
  const [end_time2, setEnd_time2] = useState(new DateObject());
  // const [response, setResponse] = useState([]);

  const [compare_time, setCompare_time] = useState(0);
  const [open , setOpen] = useState(false);
  const DateRef = useRef(null);
  useOutsideAlerter(DateRef , setOpen);
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("start_time1") !== null) {
      console.log(localStorage.getItem("start_time1"));
      setStart_time1(new DateObject(localStorage.getItem("start_time1")));
    }
  }, []);

  const handleSetStart_time1 = (e) => {
    // e.preventDefault();
    setStart_time1(e);
    localStorage.setItem("start_time1", start_time1);
    console.log(e.format());
  };
  const handleFactorInfo = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("start_date1", start_time1.format());
    formData.append("end_date1", end_time2.format());
    if (compare_time === 1) {
      formData.append("start_date2", start_time2.format());
      formData.append("end_date2", end_time2.format());
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
    formData.append("start_date1", start_time1.format());
    formData.append("end_date1", end_time1.format());
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
      <div ref={DateRef} className="relative mr-2 border-l border-gray-100 pl-2 h-full">

<button  onClick={() => setOpen(!open)} className="text-navy-500 hover:bg-brand-50/20 transition-all ease-in-out duration-300 h-full flex justify-center items-center text-base ">
<div className="flex flex-col gap-4">
  <div className="flex items-center">
<BiCalendarAlt className="ml-1 text-xl" />
<p>{start_time1.format()} تا {end_time1.format()} </p>
  </div>
<p className="text-sm">مقایسه با {start_time2.format()} تا {end_time2.format()} </p>
</div>
</button>


<div className={`${open ? "flex" : "hidden"} z-50 absolute top-20 p-5 flex-col justify-start rounded-lg bg-white border border-navy-500 bg-cover bg-no-repeat shadow-xl dark:!bg-navy-700 dark:text-white dark:shadow-none`}>


 
    <div className="flex items-center justify-center border-r-4 px-2 border-navy-500">
      <span className="w-20"> زمان شروع :</span>
      <p className="py-2 hover:border-navy-500">                
        {Date_Picker(start_time1, handleSetStart_time1)}
      </p>
      <span className="w-20">زمان پایان :</span>
      <p className="py-2 hover:border-navy-500">          
        {Date_Picker(end_time1, setEnd_time1)}
      </p>
    </div>
 
 <div className="w-full flex justify-center items-center my-7">
    <Checkbox
      name="handleCompare"
      color="indigo"
      onClick={handleCompare_time}
      value={compare_time}
    />
    <label htmlFor="handleCompare"> مقایسه با ...</label>
 </div>
 
 
    <div className="flex items-center justify-center border-r-4 px-2 border-amber-500">
      <span className="w-20"> زمان شروع :</span>
      <p className="py-2 hover:border-navy-500">
        {Date_Picker(start_time2, setStart_time2)}
      </p>
      <span className="w-20">زمان پایان :</span>
      <p className="py-2 hover:border-navy-500">
        {Date_Picker(end_time2, setEnd_time2)}
      </p>
    </div>
  
    <div className="w-full flex justify-end items-center mt-4 py-5 border-t border-gray-300">
    <button onClick={() => (setOpen(false))} className="transparentBtns">
      انصراف
    </button>
    <button onClick={handleGetInfo} className="btns mr-2 flex w-full items-center justify-center md:w-auto">
      
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
