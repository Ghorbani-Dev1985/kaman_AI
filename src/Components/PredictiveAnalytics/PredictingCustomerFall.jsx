import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import "react-select-search/style.css";
import Select from "react-select";
import TopFilter from "Common/TopFilter";
import {  BiCheckDouble, BiUserMinus } from "react-icons/bi";
import { Card, Typography } from "@material-tailwind/react";
import Button from "../../Common/Button";
import DownloadBtn from "Common/DownloadBtn";


function DrawTable({graph_data}){
    console.log(graph_data);
    return (
        <>
        <Card className="my-10 mx-auto h-full max-w-[16rem] overflow-x-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {graph_data["labels"].map(function (data) {
                return (
                  <th className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-center font-bold leading-none opacity-70"
                    >
                      {data}
                    </Typography>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {graph_data["data"].map(function (data, index) {
              return (
                <tr key={index} className="odd:bg-gray-50 even:bg-gray-100">
                  {data.map(function (value) {
                    return (
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-center font-normal"
                        >
                          {value}
                        </Typography>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
        </>
    );
  }
  const forcastTypeSelect = [
    { label: " خیلی سخت گیرانه ", value: "1.25" },
    { label: "سخت گیرانه", value: "1.5" },
    { label: "متوسط", value: "2" },
    { label: "آسان ", value: "3" },
    { label: "خیلی آسان", value: "4" },
  ];

  

function PredictingCustomerFall() {
    const location = useLocation();
    const [forcast_type, setforcast_type] = useState(2);
    const [forcast, setForcast] = useState({'labels':[], 'data':[]})
    const [forcastType , setForcastType] = useState(null);

    const get_forcasting = (e) => {
        
        e.preventDefault();
        let formData = new FormData();
        formData.append("forcast_type", forcast_type);


        
        
        let api_address = InitObject.baseurl + 'api/forecasting/'
        axios.post(api_address, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": " Token " + location.state.userinfo.key
            },
          }).then((response) => {
            setForcast(response.data.results);
           })
           .catch((error) => {
            console.log(error);
           
            });
     };
 
     const handleDownloadFile = (e, graph_data) => {
        var table_data = graph_data['forcast'];
        e.preventDefault();
        let formData = new FormData();
        formData.append("data", JSON.stringify(table_data));
        // formData.append("end_date1", end_time1.format());
        let api_address = InitObject.baseurl + 'api/download_dict/'
        axios.post(api_address, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": " Token " + location.state.userinfo.key
            },
          }).then((response) => {
              console.log(response.data.results);
              if (response.data.results.link !== ''){
                var link = InitObject.baseurl + response.data.results.link;
                console.log(link);
                let a = document.createElement('a');
                a.href = link;
                a.download = link;
                a.click();
              }
           })
           .catch((error) => {
            console.log(error);
           
            });
      }

    function fall_names(forcast) {        
        if (forcast['product_fall_names'] !== undefined){
            return (
                <div>       
                     بیشترین محصولات برای 
                     {JSON.stringify(forcast['product_fall_names'])}
                     است     
                </div>
              )
        }


      }

      function fall_customers(forcast) {        
        if (forcast['fall_customers'] !== undefined){
            return (
                <div>       
                    <p>مشتریان با احتمال ریزش در اینده </p>
                    {forcast['fall_customers']['count']} نفر
                       با میتنگین مبلغ فاکتور
                       {forcast['fall_customers']['factor_purches']}
                       و میانگین 
                       {forcast['fall_customers']['factor_count']}
                       خرید در هر فاکتور                 
                </div>
              )
        }


      }

      function safe_customers(forcast) {        
        if (forcast['safe_customers'] !== undefined){
            return (
                <div>       
                    <p>مشتریان فعال   در روزهای اینده </p>
                    {forcast['safe_customers']['count']} نفر
                       با میتنگین مبلغ فاکتور
                       {forcast['safe_customers']['factor_purches']}
                       و میانگین 
                       {forcast['safe_customers']['factor_count']}
                       خرید در هر فاکتور                 
                </div>
              )
        }


      }
  return (
    <>
      <TopFilter>
      
      </TopFilter>
      <div className="select-time"></div>

      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <BiUserMinus className="ml-2 text-3xl" />   پیش بینی ریزش مشتری           
            </p>
          </legend>
          <p> کدام یک از مشتریان من در رزوهای آینده ریزش خواهند کرد؟    </p>
          <p className="my-4"> تحلیلی پیش بینی ریزش نیازمند مدل سازی اولیه است.</p>

          {fall_names(forcast)}

          {fall_customers(forcast)}    

          {safe_customers(forcast)}   
          <div className="flex items-center gap-5 my-12">        
          <Select
                onChange={setForcastType}
                options={forcastTypeSelect}
                placeholder="انتخاب"
                className="w-full md:w-44"
              />
         <button className="btns flex justify-center items-center" onClick={get_forcasting} >
         <BiCheckDouble className="ml-2 text-2xl" />
         <span>اعمال</span>
            </button> 
            </div>   
          <DownloadBtn onClick={(e) => handleDownloadFile(e, {forcast})} /> 
          
          <DrawTable graph_data={forcast} />
        
        </fieldset>
      </div>
    </>
  );
}

export default PredictingCustomerFall;
