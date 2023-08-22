import React, { useEffect } from "react";

import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import InitObject from '../../Utils/globalvariables';
import { BiFilterAlt } from "react-icons/bi";
import TopFilter from "Common/TopFilter";
import { HiUserGroup } from "react-icons/hi";
import FilterDrawer from "Common/FilterDrawer/FilterDrawer";


function Groups(){
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



    useEffect ( () => {

        // get_graph_data(location, setGraph_data, setTable_data);

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
              <HiUserGroup className="ml-2 text-3xl" />   گروه مشتریان  
            </p>
          </legend>
    
      </fieldset>
      </div>
        </>
    );
}


export default Groups;
