import * as React from "react";
import "./selectTime.css";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import { useState } from "react";
// import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
// import gregorian from "react-date-object/calendars/gregorian"
// import gregorian_en from "react-date-object/locales/gregorian_en"
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";


import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../../Utils/globalvariables";
import { BiCalendar, BiChevronDown } from "react-icons/bi";
import { BiHelpCircle } from "react-icons/bi";


import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const dateSegmentDropDown = [
  { name: "بازه زمانی دلخواه" },
  { name: "دیروز" },
  { name: "هفته گذشته" },
  { name: "ماه گذشته" },
  { name: "۷ روز گذشته" },
  { name: "۳۰ روز گذشته" },
  { name: "۳۶۵ روز گذشته" },
];

const dateSecondSegmentDropDown = [
  { name: "بازه زمانی دلخواه" },
  { name: "بازه زمانی قبل" },
  { name: "سال قبل" },
];

function Date_Picker(v, setter) {
  return (
    <>
      <DatePicker
        className="select-time"
        format="YYYY-MM-DD,HH:mm:ss"
        onChange={setter}
        calendar={persian}
        locale={persian_en}
        animations={[transition({ duration: 800, from: 35 })]}
        value={v}
        formattingIgnoreList={["Date", "Time"]}
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

function Disabled_Date_Picker(v, setter) {
  return (
    <>
      <DatePicker
        className="select-time"
        format="YYYY/MM/DD"
        multiple
        separator="تا"
        dateSeparator=" تا "
        onChange={setter}
        calendar={persian}
        locale={persian_en}
        disabled
        value={v}
        formattingIgnoreList={["Date", "Time"]}
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


function SelectTime({ setResponse, setchartresponse }) {
  const [values, setValues] = useState([
    [new DateObject().set({ day: 1 }), new DateObject().set({ day: 7 })],
    [new DateObject().set({ day: 20 }), new DateObject().set({ day: 27 })],
  ]);
  function CustomCalendar() {
    return (
      <Calendar
      className="custom-calendar"
        value={values}
        onChange={setValues}
        dateSeparator=" "
        multiple
        range
        rangeHover
        numberOfMonths={2}   
        calendar={persian}
        locale={persian_fa}
       
      />
    );
  }

  const [start_time1, setStart_time1] = useState(new DateObject());
  const [end_time1, setEnd_time1] = useState(new DateObject());
  const [start_time2, setStart_time2] = useState(new DateObject());
  const [end_time2, setEnd_time2] = useState(new DateObject());
  const [compare_time, setCompare_time] = useState(0);
  // const [response, setResponse] = useState([]);

  const [showDateBox, setShowDateBox] = useState(false);
  const [selected, setSelected] = useState(dateSegmentDropDown[0]);
  const location = useLocation();

  const handleFactorInfo = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("start_date1", start_time1.format());
    formData.append("end_date1", end_time1.format());
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
    setShowDateBox(false);
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
      <div className="relative flex w-full flex-col items-center justify-center rounded-md bg-white px-2 md:flex-row md:justify-between">
        <div className="inline-flex h-full">
          <button
            onClick={() => setShowDateBox(!showDateBox)}
            className="relative m-0 inline-flex h-full min-w-[65px] cursor-pointer my-4 select-none appearance-none items-center justify-center rounded-md border-0 px-2 align-middle text-sm leading-6 outline-0 transition duration-700 ease-in-out hover:bg-navy-100 focus:bg-navy-100"
          >
            <span className="inline-flex flex-col text-right">
              <span className="inline-flex tracking-normal mb-2">
                <BiCalendar className="text-navy-500" />
                <span className="inline-block text-xs font-normal">
                  <span className="inline-block text-xs font-normal">
                    {Disabled_Date_Picker(values[0], setValues[0])}
                  </span>
                  {/* <span className="inline-block text-xs font-normal">
                    {Disabled_Date_Picker(values[1], setValues[1])}
                  </span> */}
                </span>
              </span>
              <span className="inline-block text-xs">
                <span className="m-0 text-xs font-normal uppercase leading-4 tracking-normal">
                  مقایسه با
                </span>
                <span className="inline-block text-xs font-normal">
                  <span className="inline-block text-xs font-normal">
                  {Disabled_Date_Picker(values[1], setValues[1])}
                  </span>
                  {/* <span className="mx-2">تا</span>
                  <span className="inline-block text-xs font-normal">
                    {Disabled_Date_Picker(valuesSecond[1], setValuesSecond[1])}
                  </span> */}
                </span>
              </span>
            </span>
            <span className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-none"></span>
          </button>
          <hr className="border-slate-300 m-0 h-auto flex-shrink-0 self-stretch border-t-0 border-l-[1px] border-solid px-1" />
        </div>

        <div
          className={`${
            showDateBox ? "flex" : "hidden"
          } absolute inset-y-0 inset-x-auto z-40 m-0 translate-x-[7px] translate-y-[90px]`}
        >
          <div className="min-w-[187px]">
            <div className="text-slate-600 overflow-hidden rounded-md bg-white shadow-xl">
              <div className="flex">
                <div className="w-80">
                  <div className="border-l-slate-300 border-r-4 border-l-[1px] border-solid border-r-navy-500 py-4 px-3">
                    <div className="w-[calc(100%+ 16px)] -mt-4 -mr-4 flex flex-wrap">
                      <div className="m-0 max-w-full grow-0 basis-full pr-4 pt-2">
                        <p className="m-0 text-base font-normal leading-7">
                          انتخاب بازه زمانی
                        </p>
                      </div>
                      <div className="m-0 max-w-full grow-0 basis-full pr-4 pt-4">
                        <div className="fixed top-16 z-50 w-72">
                          <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1">
                              <Listbox.Button className="border-slate-300 relative w-full cursor-default rounded-lg border border-solid bg-white py-2 pl-3 pr-10 text-right focus:outline-none focus-visible:border-navy-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <div className="flex w-full items-center justify-between p-2">
                                  <span className="absolute right-0 block truncate px-1">
                                    {selected.name}
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2">
                                    <BiChevronDown
                                      className="hover:text-violet-100 mr-1 h-5 w-5 text-navy-500 md:mr-2"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="ring-black absolute mt-1 h-auto w-full rounded-md bg-white py-1 pl-0 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
                                  {dateSegmentDropDown.map(
                                    (person, personIdx) => (
                                      <Listbox.Option
                                        key={personIdx}
                                        className={({ active }) =>
                                          `relative cursor-pointer select-none rounded-md py-2 pr-4 ${
                                            active
                                              ? "bg-navy-100 text-navy-500"
                                              : "text-navy-500"
                                          }`
                                        }
                                        value={person}
                                      >
                                        {({ selected }) => (
                                          <>
                                            <span
                                              className={`block truncate ${
                                                selected
                                                  ? "font-medium"
                                                  : "font-normal"
                                              }`}
                                            >
                                              {person.name}
                                            </span>
                                            {selected ? (
                                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    )
                                  )}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                      </div>

                      <div className="mt-16 flex w-full items-center justify-center px-3">
                        <div className="border-slate-300 rounded-md border border-solid p-2 hover:border-navy-500 focus:border-navy-500">
                          {Disabled_Date_Picker(values[0], setValues[0])}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="bg-slate-300 m-0 h-px w-full"></p>
                  <div className="border-l-slate-300 m-0 border-r-4 border-l-[1px] border-solid border-navy-200 py-4 px-3">
                    <div className="w-[calc(100%+ 16px)] -mt-4 -mr-4 flex flex-wrap">
                      <div className="m-0 max-w-full grow-0 basis-full pr-4 pt-2">
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
                      <div className="m-0 max-w-full grow-0 basis-full pr-4 pt-2">
                        <Listbox value={selected} onChange={setSelected}>
                          <div className="relative mt-1">
                            <Listbox.Button className="border-slate-300 relative w-full cursor-default rounded-lg border border-solid bg-white py-2 pl-3 pr-10 text-right focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <div className="flex w-full items-center justify-between p-2">
                                <span className="absolute right-0 block truncate px-1">
                                  {selected.name}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2">
                                  <BiChevronDown
                                    className="hover:text-violet-100 mr-1 h-5 w-5 text-navy-500 md:mr-2"
                                    aria-hidden="true"
                                  />
                                </span>
                              </div>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="ring-black absolute mt-1 h-auto w-full rounded-md bg-white py-1 pl-0 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
                                {dateSecondSegmentDropDown.map(
                                  (person, personIdx) => (
                                    <Listbox.Option
                                      key={personIdx}
                                      className={({ active }) =>
                                        `relative cursor-pointer select-none rounded-md py-2 pr-4 ${
                                          active
                                            ? "bg-navy-100 text-navy-900"
                                            : "text-gray-900"
                                        }`
                                      }
                                      value={person}
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              selected
                                                ? "font-medium"
                                                : "font-normal"
                                            }`}
                                          >
                                            {person.name}
                                          </span>
                                          {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  )
                                )}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                      <div className="mt-4 flex w-full items-center justify-center px-3">
                        <div className="border-slate-300 rounded-md border border-solid p-2 hover:border-navy-500 focus:border-navy-500">
                          {Disabled_Date_Picker(values[1], setValues[1])}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex min-w-[320px] flex-col overflow-hidden bg-white px-4 py-2">
                  <div className="flex">
                    {CustomCalendar(values, setValues)}
                  </div>
                </div>
              </div>
              <div className="border-slate-300 flex flex-row-reverse border-t border-solid p-4">
                <button
                  type="button"
                  className="border-transparent inline-flex justify-center rounded-md border bg-navy-100 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
                  onClick={handleGetInfo}
                >
                  اعمال
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-navy-500">راهنمایی</p>
          <BiHelpCircle className="text-lg text-navy-500" />
        </div>
      </div>
    </>
  );
}

export { SelectTime };
