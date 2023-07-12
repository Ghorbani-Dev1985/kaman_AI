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

function CustomCalendar(v, setter) {
  return (
    <Calendar
      value={v}
      onChange={setter}
      multipleRange
      multiple
      dateSeparator=" تا "
      range
      rangeHover
      eachDaysInRange
      numberOfMonths={2}
      showOtherDays
     
      calendar={persian}
      locale={persian_fa}
      formattingIgnoreList={["Date", "Time"]}
    />
  );
}

function SelectTime({ setResponse, setchartresponse }) {
  const [values, setValues] = useState([
    [new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
    [new DateObject().set({ day: 6 }), new DateObject().set({ day: 12 })],
    [new DateObject().set({ day: 23 }), new DateObject().set({ day: 27 })],
  ]);
  const [valuesSecond, setValuesSecond] = useState([
    [new DateObject().set({ day: 1 }), new DateObject().set({ day: 3 })],
    [new DateObject().set({ day: 6 }), new DateObject().set({ day: 12 })],
    [new DateObject().set({ day: 23 }), new DateObject().set({ day: 27 })],
  ]);
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
      <div className="w-full relative bg-white flex flex-col md:flex-row justify-center md:justify-between items-center rounded-md px-2 py-0">
        <div className="inline-flex h-full">
          <button
            onClick={() => setShowDateBox(!showDateBox)}
            className="inline-flex items-center justify-center relative outline-0 border-0 m-0 cursor-pointer select-none align-middle appearance-none text-sm leading-6 min-w-[65px] px-2 transition ease-in-out rounded-md hover:bg-blue-100 focus:bg-blue-100 duration-700 h-full"
          >
            <span className="inline-flex flex-col text-right">
              <span className="inline-flex tracking-normal">
                <BiCalendar className="text-blue-800" />
                <span className="inline-block text-xs font-normal">
                  <span className="inline-block text-xs font-normal">
                    {Disabled_Date_Picker(values[0], setValues[0])}
                  </span>
                  <span className="mx-2">تا</span>
                  <span className="inline-block text-xs font-normal">
                    {Disabled_Date_Picker(values[1], setValues[1])}
                  </span>
                </span>
              </span>
              <span className="inline-block text-xs">
                <span className="m-0 text-xs font-normal leading-4 uppercase tracking-normal">
                  مقایسه با
                </span>
                <span className="inline-block text-xs font-normal">
                <span className="inline-block text-xs font-normal">
                    {Disabled_Date_Picker(values[2], setValues[2])}
                  </span>
                  <span className="mx-2">تا</span>
                  <span className="inline-block text-xs font-normal">
                    {Disabled_Date_Picker(valuesSecond[1], setValuesSecond[1])}
                  </span>
                </span>
              </span>
            </span>
            <span className="overflow-hidden pointer-events-none absolute z-0 inset-0 rounded-none"></span>
          </button>
          <hr className="m-0 px-1 flex-shrink-0 border-t-0 border-l-[1px] border-slate-300 border-solid h-auto self-stretch" />
        </div>

        <div
          className={`${
            showDateBox ? "flex" : "hidden"
          } absolute inset-y-0 inset-x-auto m-0 translate-x-[7px] translate-y-[78px] z-40`}
        >
          <div className="min-w-[187px]">
            <div className="bg-white text-slate-600 rounded-md shadow-xl">
              <div className="flex">
                <div className="w-80">
                  <div className="border-r-4 border-l-[1px] border-l-slate-300 border-r-blue-600 border-solid py-4 px-3">
                    <div className="flex flex-wrap -mt-4 w-[calc(100%+ 16px)] -mr-4">
                      <div className="pr-4 pt-2 m-0 basis-full grow-0 max-w-full">
                        <p className="m-0 text-base font-normal leading-7">
                          انتخاب بازه زمانی
                        </p>
                      </div>
                      <div className="pr-4 pt-4 m-0 basis-full grow-0 max-w-full">
                        <div className="fixed top-16 w-72 z-50">
                          <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1">
                              <Listbox.Button className="relative w-full cursor-default rounded-lg border border-slate-300 border-solid bg-white py-2 pl-3 pr-10 text-right focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <div className="w-full flex justify-between items-center p-2">
                                  <span className="block truncate absolute right-0 px-1">
                                    {selected.name}
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2">
                                    <BiChevronDown
                                      className="h-5 w-5 text-blue-800 hover:text-violet-100 mr-1 md:mr-2"
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
                                <Listbox.Options className="absolute mt-1 pl-0 h-auto w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {dateSegmentDropDown.map(
                                    (person, personIdx) => (
                                      <Listbox.Option
                                        key={personIdx}
                                        className={({ active }) =>
                                          `relative cursor-pointer select-none py-2 pr-4 rounded-md ${
                                            active
                                              ? "bg-blue-100 text-blue-900"
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
                      </div>

                      <div className="w-full flex justify-between items-center mt-16 px-3">
                        <div className="border border-slate-300 p-2 rounded-md border-solid hover:border-blue-800 focus:border-blue-800">
                          {Disabled_Date_Picker(values[0], setValues[0])}
                        </div>
                        <div className="mx-7">تا</div>
                        <div className="border border-slate-300 p-2 rounded-md border-solid hover:border-blue-800 focus:border-blue-800">
                          {Disabled_Date_Picker(values[1], setValues[1])}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="bg-slate-300 w-full h-px m-0"></p>
                  <div className="m-0 border-r-4 border-l-[1px] border-l-slate-300 border-blue-400 border-solid py-4 px-3">
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
                      <div className="pr-4 pt-2 m-0 basis-full grow-0 max-w-full">
                        <Listbox value={selected} onChange={setSelected}>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg border border-slate-300 border-solid bg-white py-2 pl-3 pr-10 text-right focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <div className="w-full flex justify-between items-center p-2">
                                <span className="block truncate absolute right-0 px-1">
                                  {selected.name}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2">
                                  <BiChevronDown
                                    className="h-5 w-5 text-blue-800 hover:text-violet-100 mr-1 md:mr-2"
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
                              <Listbox.Options className="absolute mt-1 pl-0 h-auto w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {dateSecondSegmentDropDown.map(
                                  (person, personIdx) => (
                                    <Listbox.Option
                                      key={personIdx}
                                      className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pr-4 rounded-md ${
                                          active
                                            ? "bg-blue-100 text-blue-900"
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
                      <div className="inline-flex">
                        <div className="pr-4 pt-4 m-0 basis-full grow-0 max-w-full">
                          <div className="inline-flex flex-col absolute min-w-0 p-0 mt-4 mr-0 mb-2 ml-0 border-0 align-top w-full ">
                            <div className="text-base font-normal leading-6 text-slate-400 cursor-text inline-flex justify-center items-center w-full relative rounded-md pl-4"></div>
                          </div>
                        </div>
                        <div className="pr-4 pt-4 m-0 basis-[8.33333%] grow-0 max-w-[8.33333%]">
                          <span className="inline-block pt-5">تا</span>
                        </div>
                        <div className="pr-4 pt-4 m-0 basis-full grow-0 max-w-full">
                          <div className="inline-flex flex-col absolute min-w-0 p-0 mt-4 mr-0 mb-2 ml-0 border-0 align-top w-full ">
                            <div className="text-base font-normal leading-6 text-slate-400 cursor-text inline-flex justify-center items-center w-full relative rounded-md pl-4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden min-w-[320px] px-4 py-2 flex flex-col bg-white">
                  <div className="flex">
                    {CustomCalendar(values, setValues)}
                   
                  </div>
                </div>
              </div>
              <div className="flex flex-row-reverse p-4 border-t border-slate-300 border-solid">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={handleGetInfo}
                >
                  اعمال
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-blue-800">راهنمایی</p>
          <BiHelpCircle className="text-blue-500 text-lg" />
        </div>
      </div>
    </>
  );
}

export { SelectTime };
