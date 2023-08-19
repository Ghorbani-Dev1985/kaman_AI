import React, { useEffect } from "react";
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
        className="select-time"
        format="YYYY-MM-DD"
        onChange={setter}
        calendar={persian}
        locale={persian_fa}
        animations={[transition({ duration: 800, from: 35 })]}
        value={v}
        formattingIgnoreList={["Date", "Time"]}
        calendarPosition="bottom-center"
        plugins={[<Toolbar position="bottom" />]}
      />
    </>
  );
}


function SelectTime({ setResponse, setchartresponse }) {


  const [start_time1, setStart_time1] = useState(new DateObject());
  const [end_time1, setEnd_time1] = useState(new DateObject());
  const [start_time2, setStart_time2] = useState(new DateObject());
  const [end_time2, setEnd_time2] = useState(new DateObject());
  // const [response, setResponse] = useState([]);

  const [compare_time, setCompare_time] = useState(0);
  const [showDateBox, setShowDateBox] = useState(false);
  const [open , setOpen] = useState(false);
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
    setOpen(true);
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
        <div className="mr-3 flex flex-col items-center lg:flex-row">
          <Menu
            placement="right-start"
            offset={15}
            dismiss={{
              itemPress: false,
            }}
            animate={{
              mount: { y: 50, x: 155 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              <Button className="btns flex items-center justify-center text-base">
                <BiCalendarAlt className="ml-2 text-xl" />
                <span>انتخاب تاریخ</span>
              </Button>
            </MenuHandler>
            <MenuList className={`${open && "hidden"} border-r border-navy-500`}>
              <MenuItem className="outline-none">
                <div className="flex items-center justify-center">
                  <span> زمان شروع :</span>
                 <p className="py-2 hover:border-navy-500"> {Date_Picker(start_time1, handleSetStart_time1)}</p>
                  <span>زمان پایان :</span>
                  <p className="py-2 hover:border-navy-500"> {Date_Picker(end_time1, setEnd_time1)}</p>
                </div>
              </MenuItem>
              <MenuItem className="my-5 flex items-center justify-center outline-none">
                <Checkbox
                  name="handleCompare"
                  color="indigo"
                  onClick={handleCompare_time}
                  value={compare_time}
                />
                <label htmlFor="handleCompare"> مقایسه با</label>
              </MenuItem>
              <MenuItem className="outline-none">
                <div className="flex items-center justify-center">
                  <span> زمان شروع :</span>
                  <p className="py-2 hover:border-navy-500">  {Date_Picker(start_time2, setStart_time2)}</p>
                  <span>زمان پایان :</span>
                  <p className="py-2 hover:border-navy-500"> {Date_Picker(end_time2, setEnd_time2)}</p>
                </div>
              </MenuItem>
              <MenuItem className="my-6 flex justify-center items-center outline-none">
              <button
           onClick={handleGetInfo}
            className="btns mr-2 flex w-full items-center justify-center md:w-auto">
            <BiCheckDouble className="ml-2 text-2xl" /> <span>اعمال</span>
          </button>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </TopFilter>
    </>
  );
}

export { SelectTime };
