import React, { useEffect } from "react";
import { useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import InitObject from '../../Utils/globalvariables';
import { BiFilterAlt, BiShoppingBag } from "react-icons/bi";



import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import { Chart } from 'react-chartjs-2';
  import { Line } from "react-chartjs-2";
import { Card, Typography } from "@material-tailwind/react";

import TopFilter from "Common/TopFilter";
import FilterDrawer from "Common/FilterDrawer/FilterDrawer";
import DownloadBtn from "Common/DownloadBtn";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );




  var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

function DrawChart1({graph_data}){
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          }
        },
      };

      const data = {
        labels: graph_data.labels,
        datasets: [
          {
            label: 'خرید اول',
            borderWidth: 1,
            backgroundColor: dynamicColors(),
            data: graph_data.purches1,

          },
          {
            label: 'خرید دوم',
            borderWidth: 1,
            backgroundColor: dynamicColors(),
            data: graph_data.purches2,
          },
          {
            label: 'خرید سوم',
            borderWidth: 1,
            backgroundColor: dynamicColors(),
            data: graph_data.purches3,
          },
          {
            label: 'خرید چهارم',
            borderWidth: 1,
            backgroundColor: dynamicColors(),
            data: graph_data.purches4,
          },
        ]
      }

  return (
      <>
      <div>
          <Chart type="bar" data={data} options={options} />
      </div>
      </>
  );
}






function DrawTable({graph_data}){
    console.log("graph_data");
    console.log(graph_data);

    return (
        <>
        <Card className="mx-auto h-full max-w-[16rem] overflow-x-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
            {graph_data['labels'].map((data)  => {
                return (
                  <th
                    key={data}
                    className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900"
                  >
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
          {graph_data['data'].map((data) => {
              return (
                <tr key={data} className="odd:bg-gray-50 even:bg-gray-100">
                  {data.map((value , index) => {
                    return (
                      <td key={index} className="p-4">
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



function PurchaseInterval(){
    const location = useLocation();

    const [graph_data, setGraph_data] = useState({});
    const [table_data, setTable_data] = useState({'labels': [], data:[[]]});

    function get_graph_data(location, setGraph_data, setTable_data) {
        let formData = new FormData();        
        let api_address = InitObject.baseurl + 'api/interval/'
        axios.post(api_address, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": " Token " + location.state.userinfo.key
            },
          }).then((response) => {
            setGraph_data(response.data.results[0]);
            setTable_data(response.data.results[1])

              console.log(response.data.results);
           })
           .catch((error) => {
            console.log(error);
           
            });
    }


    const handleDownloadFile = (e, table_data) => {
        e.preventDefault();
        console.log(table_data['table_data']);
        let formData = new FormData();
        formData.append("data", JSON.stringify(table_data['table_data']));
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

    


    function do_action () {
        get_graph_data(location, setGraph_data);
    }


    useEffect ( () => {

        get_graph_data(location, setGraph_data, setTable_data);

    } , []);
 
    return(
        <>
        <TopFilter>
         <FilterDrawer />
        </TopFilter>
           <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <BiShoppingBag className="ml-2 text-3xl" /> تحلیل فاصله بین خرید  
            </p>
          </legend>
    
                <div className="my-16">
                    <DrawTable graph_data={table_data} />
                </div>

                 <div className="my-16" >
                    <DrawChart1 graph_data={graph_data}/>
                </div >
                <DownloadBtn onClick={(e) => handleDownloadFile(e, {table_data})}/> 

      </fieldset>
      </div>
    
        </>
    );
}


export default PurchaseInterval;
