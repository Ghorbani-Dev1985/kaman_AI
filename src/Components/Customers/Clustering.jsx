import React from "react";
import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import InitObject from "../../Utils/globalvariables";
import { BiSitemap } from "react-icons/bi";




function DrawTable({graph_data}){
    console.log(graph_data);
    return (
        <>
        <div>
            <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            {graph_data['labels'].map(function(data) {
                                return (<th >{data}</th>)
                            })}
                            </tr>
                        </thead>
                        <tbody>
                            {graph_data['data'].map(function(data) {
                                    return (<tr >
                                        {data.map(function(value) {
                                            return (<td >{value}</td>)
                                        })}
                                        
                                    
                                    </tr>)
                                })}                         
                        </tbody>

            </table>
        </div>
        </>
    );
  }


function Clustering(){
    const location = useLocation();
    const [num_cluster, setNum_cluster] = useState(3);
    const [feature1, setFeature1] = useState('product_name_count');
    const [feature2, setFeature2] = useState('perfit_amount');
    const [feature3, setFeature3] = useState('life_time');
    const [feature4, setFeature4] = useState('product_name_count');
    const [feature5, setFeature5] = useState('product_name_count');
    const [feature6, setFeature6] = useState('product_name_count');
    const [feature7, setFeature7] = useState('product_name_count');
    const [feature8, setFeature8] = useState('product_name_count');
    const [clusters, setClusters] = useState({'labels':[], 'data':[]})
 

    const get_clustering = (e) => {
        
        e.preventDefault();
        let formData = new FormData();
        formData.append("num_cluster", num_cluster);
        formData.append("feature1", feature1);
        formData.append("feature2", feature2);
        formData.append("feature3", feature3);
        formData.append("feature4", feature4);
        formData.append("feature5", feature5);
        formData.append("feature6", feature6);
        formData.append("feature7", feature7);
        formData.append("feature8", feature8);
        


        
        
        let api_address = InitObject.baseurl + 'api/clustering/'
        axios.post(api_address, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": " Token " + location.state.userinfo.key
            },
          }).then((response) => {
            setClusters(response.data.results);
           })
           .catch((error) => {
            console.log(error);
           
            });
     };
 
     const handleDownloadFile = (e, graph_data) => {
        var table_data = graph_data['clusters'];
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

    function show_clusters(clusters) {        
        if (clusters['cluster_info'] !== undefined){
            return (
                <div>       
                        {
                            Object.entries(clusters['cluster_info'])
                            .map( ([key, value]) => <>
                                    خوشه {key}
                                    تعداد مشتریان:
                                    {value['count']}
                                    فروش ناخالص:
                                    {value['sale']}
                                    تعداد فاکتورهای فروش:
                                    {value['factor_count']}
                                    <br/>
                            </> )
                        }  
                        

                </div>
              )
        }


      }

    
    function select_features(setfeature) {
        return(
            <select className="period" onChange={e => setfeature(e.target.value)}>
            <option value="product_name_count"> تنوع محصول </option>
            <option value="product_nameـrejected"> تنوع محصول مرجوعی </option>
            <option value="product_category_count"> تنوع  دسته بندی </option>
            <option value="city_count"> تعدا مناطق جغرافیایی</option>
            <option value="perfit_amount">   در آمد از مشتری</option>
            <option value="life_time">طول عمر</option>
            <option value="sale_factor_count">تعداد فاکتورهای فروش  </option>
            <option value="rejected_factor_count">تعداد فاکتورهای برگشتی  </option>
        </select>
        )

    }


    return(
        <>
        <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <BiSitemap className="ml-2 text-3xl" /> خوشه بندی خرید مشتریان
            </p>
          </legend>


                <div className="description">
                    <div className="text">
                        در این قسمت شما میتوانید مشتریان خود را بر اساس شاخص های زیر خوشه بندی کنید
                    </div>
                    <select className="period" onChange={e => setNum_cluster(e.target.value)}>
                        <option value="2">  2 </option>
                        <option value="3">  3 </option>
                        <option value="4">  4 </option>
                        <option value="5">  5 </option>
                        <option value="8">  6 </option>
                        <option value="7">  7 </option>
                        <option value="6">  8 </option>

                    </select>
                        {select_features(setFeature1)}
                        {select_features(setFeature2)}
                        {select_features(setFeature3)}
                        {select_features(setFeature4)}
                        {select_features(setFeature5)}
                        {select_features(setFeature6)}
                        {select_features(setFeature7)}
                        {select_features(setFeature8)}

                <div>

                    <div className="text">
                        {show_clusters(clusters)}
                    </div>

                </div>
                    <button type="button" class="btn btn-primary btn-sm button" onClick={get_clustering}> اعمال </button> 

                </div>

                <div className="table-description">
                    
                    <button type="button" onClick={(e) => handleDownloadFile(e, {clusters})} class="btn btn-primary btn-sm button"  > دانلود </button> 
                </div>

                <div className="table1">
                    <DrawTable graph_data={clusters} />
                </div>

        </fieldset>
        </div>
        </>
    );
}


export default Clustering;