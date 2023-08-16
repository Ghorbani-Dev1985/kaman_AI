import React, { useEffect } from "react";
import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import InitObject from '../../Utils/globalvariables';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { color } from 'chart.js/helpers';
 
  import { Chart } from 'react-chartjs-2';
  import {SankeyController, Flow} from 'chartjs-chart-sankey';
import TopFilter from "Common/TopFilter";
import { BiCloudDownload, BiCustomize, BiFilterAlt } from "react-icons/bi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  SankeyController,
  Flow
);


  function DrawChart({data}){

    const options = {
        parsing: {
          from: 'source',
          to: 'destination',
          flow: 'value'
        }
      }

      
      const config = {
        type: 'sankey',
        data: {
          datasets: [
            {
              data: data,
              colorFrom: '#ef4444',
              colorTo: '#2851A2'
            }
          ]
        },
      };

    return (
        <>
            <Chart type="sankey" data={config.data} options={options} />
        </>
    );
  }

function get_graph_data(location, setGraph_data) {
    let formData = new FormData();
    let api_address = InitObject.baseurl + 'api/rfmtransition/'
    axios.post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": " Token " + location.state.userinfo.key
        },
      }).then((response) => {
        setGraph_data(response.data.results);
          console.log(response.data.results);
       })
       .catch((error) => {
        console.log(error);
       
        });
}


function Transition(){
    const location = useLocation();
    const [graph_data, setGraph_data] = useState([]);
 

    const handleDownloadFile = (e, key) => {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append("download_type", key);
        // formData.append("end_date1", end_time1.format());
        let api_address = InitObject.baseurl + 'api/rfm_segment_download/'
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
      
    useEffect ( () => {

        get_graph_data(location, setGraph_data);

    } , []);

    return(
        <>
      <TopFilter>
        <div className="mr-3 flex items-center gap-4">
          <button
            type="button"
            class="btns flex items-center justify-center text-lg"
          >
            <BiFilterAlt className="ml-2 text-2xl" /> فیلتر{" "}
          </button>
          <button
            type="button"
            onClick={(e) => handleDownloadFile(e, "data")}
            class="btns flex items-center justify-center text-lg"
          >
            <BiCloudDownload className="ml-2 text-2xl" /> دانلود{" "}
          </button>
        </div>
      </TopFilter>
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <BiCustomize className="ml-2 text-3xl" />  جا به جایی مشتریان
            </p>{" "}
          </legend>
                <div className="my-20" >
                    <DrawChart data={graph_data}/>
                </div >
     </fieldset>
     </div>
        </>
    );
}


export default Transition;
