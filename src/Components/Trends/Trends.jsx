import React, { useEffect ,useState} from "react";
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import InitObject from "../../Utils/globalvariables";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import Toolbar from "react-multi-date-picker/plugins/toolbar"
import Select from "react-select";
import { Chart } from 'react-chartjs-2';
import {
    Menu,
    MenuHandler,
    Button,
    MenuList,
    MenuItem,
    Checkbox,
  } from "@material-tailwind/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BiCalendarAlt, BiCheckDouble, BiSelectMultiple, BiTrendingUp } from "react-icons/bi";
import TopFilter from "Common/TopFilter";
import DataGraphSelect from "Common/DataGraphSelect";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function Date_Picker(v, setter) {
    return (
        <>
            <DatePicker
        className="date-picker"
        format="YYYY-MM-DD"
        onChange={setter}
        calendar={persian}
        locale={persian_fa}
        value={v}
        formattingIgnoreList={["Date"]}
        calendarPosition="bottom-center"
        plugins={[<Toolbar position="bottom" />]}
      />
        </>
    )

}


function ShowValues(results, options, selectedOption, selectedOption_value, setSelectedOption,
    setSelectedOptionValue, setSelectedOptionImprove, selectedOption_improve, setSelected_item_graph) {

    const ChangeValue = (e) => {
        setSelectedOptionValue(results.date1[e.value]);
        setSelectedOption(e.label);
        setSelectedOptionImprove(results.percentage[e.value]);

    };
    const select_item = (e) => {
        var value = 0;
        options.map((option) => {
            if (option.label === selectedOption){value = option.value}
        })
        console.log(value);
        setSelected_item_graph(value);
    }

    return (
        <>
            <div className="title">
                <div >
                    <Select onChange={ChangeValue}  options={options} placeholder={selectedOption} className="select-search text-navy-500" theme='neutral50' />
                </div>

                <div className="w-full flex justify-center items-center my-10"> <button type="button" class="btns flex items-center justify-center text-lg" onClick={select_item} ><BiSelectMultiple className="ml-2 text-2xl"/> انتخاب </button>     </div>

            </div>
            <div className="w-full flex justify-between items-center my-3">
                <div className="number">
                    {selectedOption_value}
                </div>
                <div className="bg-gray-100 dark:bg-navy-500 dark:text-white px-3 py-1 rounded-md">
                    {selectedOption_improve}
                </div>
            </div>

        </>
    )
}



function DrawChart({graph_data, selected_item_graph}){
    console.log('selected_item_graph', selected_item_graph);
    var datasets_list = [
        {
          
          label: "فرو‌ش ناخالص",
          data: graph_data.date1.gross_sale,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        }
      ]
    if (selected_item_graph !== 0){
        datasets_list.push(
            {
                label: selected_item_graph,
                data: graph_data.date1[selected_item_graph],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              }
        )
    }

    if (graph_data.date2 !== undefined) {
        datasets_list.push(
            {
                label: 'فروش ناخالض دوم',
                data: graph_data.date2['gross_sale'],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              }
        )

        if (selected_item_graph !== 0){
            datasets_list.push(
                {
                    label: selected_item_graph+' 2',
                    data: graph_data.date2[selected_item_graph],
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                  }
            )
        }

    }

    console.log('datasets_list', datasets_list);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'نمودار روندها',
          },
        },
      };


      const data = {
        labels: graph_data.date1.start_time,
        datasets: datasets_list
      };

  return (
      <>
      <div>
          <Chart type="line" data={data} options={options} />
      </div>
      </>
  );
}



function Trends(){
    const location = useLocation();
    const [start_time1, setStart_time1] = useState(new DateObject());
    const [end_time1,  setEnd_time1] = useState(new DateObject());
    const [start_time2, setStart_time2] = useState(new DateObject());
    const [end_time2, setEnd_time2] = useState(new DateObject());
    const [compare_time, setCompare_time] = useState(0);
    const [open , setOpen] = useState(false);
    const [selected_item_graph, setSelected_item_graph] = useState(0);
    const [period,  setPeriod] = useState('30');

    const [graph_data, setGraph_data] = useState({'date1':{'start_time':[], 'gross_sale': []}});

    const [response, setResponse] = useState({
        'date1':{
            "sale_factor_count": 0, 
            "rejected_factor_count": 0,
            "factor_product_average":0,
            "factor_rows_average": 0,
            "factor_amount_average": 0,
            "factor_amount_product_average": 0,
            "customer_income_average": 0,
            "gross_sale": 0,
            "factor_product_count": 0,
            "factor_product_weight": 0,
            "factor_commisions":0,
            "pure_factor_counts": 0,
            "pure_gross_sale": 0,
            "gross_rejected": 0,
            "pure_sale": 0,
            "rejected_product_count": 0,
            "pure_product_count": 0,
            "rejedted_product_weight": 0,
            "pure_product_weight": 0,
            "users_count": 0,
            "new_users_count": 0,
            "old_users_count": 0,
            "percent_users": 0,
            "percent_rejected_count": 0,
            "percent_rejected_amount": 0,
            "sum_discount": 0,
            "gross_new_users": 0
        },
        "percentage": {
            "sale_factor_count": 0, 
            "rejected_factor_count": 0,
            "factor_product_average":0,
            "factor_rows_average": 0,
            "factor_amount_average": 0,
            "factor_amount_product_average": 0,
            "customer_income_average": 0,
            "gross_sale": 0,
            "factor_product_count": 0,
            "factor_product_weight": 0,
            "factor_commisions":0,
            "pure_factor_counts": 0,
            "pure_gross_sale": 0,
            "gross_rejected": 0,
            "pure_sale": 0,
            "rejected_product_count": 0,
            "pure_product_count": 0,
            "rejedted_product_weight": 0,
            "pure_product_weight": 0,
            "users_count": 0,
            "new_users_count": 0,
            "old_users_count": 0,
            "percent_users": 0,
            "percent_rejected_count": 0,
            "percent_rejected_amount": 0,
            "sum_discount": 0,
            "gross_new_users": 0
        }
    });
    
    const options = [
        // {label: 'میانگین تعداد محصول در فاکتور', value: 'factor_product_average'},
        // {label: 'میانگین تعداد سطر در فاکتور', value: 'factor_rows_average'},
        // {label: "تعداد فاکتورهای فروش", value: 'sale_factor_count'},
        // {label: "تعداد فاکتورهای مرجوعی", value: 'rejected_factor_count'},
        // {label: "میانگین مبلغ فاکتورها", value: 'factor_amount_average'},
        // {label: "میانگین مبلغ کالاها", value: 'factor_amount_product_average'},
        {value: "sale_factor_count", label: "تعداد فاکتورهای فروش"}, 
        {value: "rejected_factor_count", label: "تعداد فاکتورهای مرجوعی"},
        {value: "factor_product_average", label: "میانگین تعداد محصول در فاکتور"},
        {value: "factor_rows_average", label: "میانگین تعداد سطر فاکتورها"},
        {value: "factor_amount_average", label: "میانگین مبلغ فاکتورها"},
        {value: "factor_amount_product_average", label: "میانگین مبلغ کالاها"},
        {value: "customer_income_average", label: "میانگین مبلغ درامد خالص از مشتری"},
        {value: "gross_sale", label: "فروش ناخالص"},
        {value: "factor_product_count", label: "تعداد ناخالص محصول فروخته شده"},
        {value: "factor_product_weight", label: "وزن محصولات در فاکتورهای فروش"},
        {value: "factor_commisions", label: "مجموع کارمزد"},
        {value: "pure_factor_counts", label: "تعداد خالص فاکتورها"},
        {value: "pure_gross_sale", label: "مبلغ خالص پرداختی فاکتورها"},
        {value: "gross_rejected", label: "مبلغ فاکتورهای مرجوعی"},
        {value: "pure_sale", label: "فروش خالص"},
        {value: "rejected_product_count", label: "تعداد محصولات مرجوعی"},
        {value: "pure_product_count", label: "تعداد خالص محصولات فروخته شده"},
        {value: "rejedted_product_weight", label: "وزن محصولات مرجوعی"},
        {value: "pure_product_weight", label: "وزن محصولات در تمام فاکتورها"},
        {value: "users_count", label: "تعداد مشتریان"},
        {value: "new_users_count", label: "تعداد مشتریان جدید"},
        {value: "old_users_count", label: "تعداد مشتریان تکراری"},
        {value: "percent_users", label: "درصد مشتریان تکراری"},
        {value: "percent_rejected_count", label: "درصد کالاهای مرجوعی"},
        {value: "percent_rejected_amount", label: "درصد مبلغ مرجوعی"},
        {value: "sum_discount", label: "مبلغ تخفیف فاکتورها"},
        {value: "gross_new_users", label: "مجموع درآمد از مشتریان جدید"},

    
    ];

    const options_keys = {
        "تعداد فاکتورهای فروش":"sale_factor_count",
         "تعداد فاکتورهای مرجوعی":"rejected_factor_count",
         "میانگین تعداد محصول در فاکتور":"factor_product_average",
         "میانگین تعداد سطر فاکتورها":"factor_rows_average",
         "میانگین مبلغ فاکتورها":"factor_amount_average",
         "میانگین مبلغ کالاها":"factor_amount_product_average",
         "میانگین مبلغ درامد خالص از مشتری":"customer_income_average",
         "فروش ناخالص":"gross_sale",
         "تعداد ناخالص محصول فروخته شده":"factor_product_count",
         "وزن محصولات در فاکتورهای فروش":"factor_product_weight",
         "مجموع کارمزد":"factor_commisions",
         "تعداد خالص فاکتورها":"pure_factor_counts",
         "مبلغ خالص پرداختی فاکتورها":"pure_gross_sale",
         "مبلغ فاکتورهای مرجوعی":"gross_rejected",
        "فروش خالص":"pure_sale", 
         "تعداد محصولات مرجوعی":"rejected_product_count",
         "تعداد خالص محصولات فروخته شده":"pure_product_count",
         "وزن محصولات مرجوعی":"rejedted_product_weight",
         "وزن محصولات در تمام فاکتورها":"pure_product_weight",
         "تعداد مشتریان":"users_count",
        "تعداد مشتریان جدید":"new_users_count",
         "تعداد مشتریان تکراری":"old_users_count",
         "درصد مشتریان تکراری":"percent_users",
         "درصد کالاهای مرجوعی":"percent_rejected_count", 
         "درصد مبلغ مرجوعی":"percent_rejected_amount",
         "مبلغ تخفیف فاکتورها":"sum_discount", 
         "مجموع درآمد از مشتریان جدید":"gross_new_users",
    }

    function do_action () {
        get_graph_data();
    }

    const get_graph_data = ( ) => {

        let formData = new FormData();
        formData.append("start_date1", start_time1.format());
        formData.append("end_date1", end_time1.format());
        if (compare_time === 1){
            formData.append("start_date2", start_time2.format());
            formData.append("end_date2", end_time2.format());
        }
        formData.append('period', period);

        let api_address = InitObject.baseurl + 'api/trends/'
        axios.post(api_address, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": " Token " + location.state.userinfo.key
            },
          }).then((response) => {
            setGraph_data(response.data.results);
            // setTable_data(response.data.results[1]);
              console.log(response.data.results);
           })
           .catch((error) => {
            console.log(error);
           
            });
    }

    


    const [selectedOption1, setSelectedOption1] = React.useState('میانگین تعداد سطر فاکتورها');
    const [selectedOption1_value, setSelectedOptionValue1] = React.useState(response.date1.factor_rows_average);
    const [selectedOption1_improve, setSelectedOptionImprove1] = React.useState('0');

    const [selectedOption2, setSelectedOption2] = React.useState('میانگین تعداد محصول در فاکتور');
    const [selectedOption2_value, setSelectedOptionValue2] = React.useState(response.date1.factor_product_average);
    const [selectedOption2_improve, setSelectedOptionImprove2] = React.useState('0');

    const [selectedOption3, setSelectedOption3] = React.useState("تعداد فاکتورهای فروش");
    const [selectedOption3_value, setSelectedOptionValue3] = React.useState(response.date1.sale_factor_count);
    const [selectedOption3_improve, setSelectedOptionImprove3] = React.useState('0');

    const [selectedOption4, setSelectedOption4] = React.useState("تعداد فاکتورهای مرجوعی");
    const [selectedOption4_value, setSelectedOptionValue4] = React.useState(response.date1.rejected_factor_count);
    const [selectedOption4_improve, setSelectedOptionImprove4] = React.useState('0');





    useEffect(() => { 
        setSelectedOptionValue1(response.date1[options_keys[selectedOption1]]);
        setSelectedOptionValue2(response.date1[options_keys[selectedOption2]]);
        setSelectedOptionValue3(response.date1[options_keys[selectedOption3]]);
        setSelectedOptionValue4(response.date1[options_keys[selectedOption4]]);
        if (response.percentage !== undefined){
            setSelectedOptionImprove1(response.percentage[options_keys[selectedOption1]]);
            setSelectedOptionImprove2(response.percentage[options_keys[selectedOption2]]);
            setSelectedOptionImprove3(response.percentage[options_keys[selectedOption3]]);
            setSelectedOptionImprove4(response.percentage[options_keys[selectedOption4]]);
        }
        else{
            setSelectedOptionImprove1(0);
            setSelectedOptionImprove2(0);
            setSelectedOptionImprove3(0);
            setSelectedOptionImprove4(0);
        }

        
    });


    const handleSetStart_time1 = (e) => {
        // e.preventDefault();
        setStart_time1(e);
        localStorage.setItem("start_time1", start_time1);
        console.log(e.format());
        
    }

    const handleCompare_time = (event) => {
        if (compare_time === 1){
            setCompare_time(0);
            const time2_div = document.getElementById("time2");
            time2_div.style.backgroundColor = "gray";
            time2_div.style.pointerEvents= "none";
        }
        else{
            setCompare_time(1);
            const time2_div = document.getElementById("time2");
            time2_div.style.backgroundColor = "white";
            time2_div.style.pointerEvents= "auto";
        }
        console.log(localStorage.getItem("start_time1"));
       
    };

    const handleFactorInfo = (e) => {
        
        e.preventDefault();
        get_graph_data();
        let formData = new FormData();
        formData.append("start_date1", start_time1.format());
        formData.append("end_date1", end_time1.format());
        if (compare_time === 1){
            formData.append("start_date2", start_time2.format());
            formData.append("end_date2", end_time2.format());
        }
        
        let api_address = InitObject.baseurl + 'api/factors_info/'
        axios.post(api_address, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": " Token " + location.state.userinfo.key
            },
          }).then((response) => {
            setResponse(response.data.results);
           })
           .catch((error) => {
            console.log(error);
           
            });
            setOpen(true);
     };
 

    return(
        <>

                {/* <div className="select-time">
                    <div className="filter"> <button type="button" class="btn btn-primary btn-sm button" > فیلتر </button> </div>

                    <div className="time1">
                            {Date_Picker(start_time1, handleSetStart_time1)}
                            <div className="label"> 
                                :زمان شروع
                            </div>
                            {Date_Picker(end_time1, setEnd_time1)}
                            <div className="label"> 
                                :زمان پایان
                            </div>
                    </div>

                    <div className="buttons">
                        <div className="comapre-time">
                            <input type="checkbox" onClick={handleCompare_time}  value={compare_time} />
                            &nbsp;&emsp; 
                            :
                            مقایسه با
                        </div>
                        <div className="submit-times" onClick={handleFactorInfo} >
                            اعمال
                        </div>
                    </div>

                    <div className="time2" id="time2" >
                            {Date_Picker(start_time2, setStart_time2)}
                            <div className="label"> 
                                :زمان شروع
                            </div>
                            {Date_Picker(end_time2, setEnd_time2)}
                            <div className="label"> 
                                :زمان پایان
                            </div>
                    </div>

                
                </div> */}
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
                  onClick={handleCompare_time}  value={compare_time} 
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
          onClick={handleFactorInfo}
            className="btns mr-2 flex w-full items-center justify-center md:w-auto">
            <BiCheckDouble className="ml-2 text-2xl" /> <span>اعمال</span>
          </button>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
               </TopFilter>


               <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <BiTrendingUp className="ml-2 text-3xl" />   روندها
            </p>
          </legend>
          <div className="my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 mb-3">
                    {/* {response} */}
                    <div className="border border-gray-200 dark:bg-navy-700 dark:text-white rounded-md p-3 cursor-pointer">
                        {ShowValues(response, options, selectedOption1, selectedOption1_value, setSelectedOption1,
                            setSelectedOptionValue1, setSelectedOptionImprove1, selectedOption1_improve, setSelected_item_graph)}
                    </div>
                    <div className="border border-gray-200 dark:bg-navy-700 dark:text-white rounded-md p-3 cursor-pointer">
                        {ShowValues(response, options, selectedOption2, selectedOption2_value, setSelectedOption2,
                            setSelectedOptionValue2, setSelectedOptionImprove2, selectedOption2_improve, setSelected_item_graph)}
                    </div>
                    <div className="border border-gray-200 dark:bg-navy-700 dark:text-white rounded-md p-3 cursor-pointer">
                        {ShowValues(response, options, selectedOption3, selectedOption3_value, setSelectedOption3,
                            setSelectedOptionValue3, setSelectedOptionImprove3, selectedOption3_improve, setSelected_item_graph)}
                    </div>
                    <div className="border border-gray-200 dark:bg-navy-700 dark:text-white rounded-md p-3 cursor-pointer">
                        {ShowValues(response, options, selectedOption4,  selectedOption4_value, setSelectedOption4,
                            setSelectedOptionValue4, setSelectedOptionImprove4, selectedOption4_improve, setSelected_item_graph)}
                    </div>

                </div>
          </div>

          <div className="my-5 rounded-lg border border-gray-300 p-4 flex justify-end items-center">
               <DataGraphSelect />
                    <button type="button" class="btns mr-2 flex w-full items-center justify-center md:w-auto" onClick={do_action}>  <BiCheckDouble className="ml-2 text-2xl" /><span>اعمال</span> </button>   
          </div>
                <div className="chart">
                    <DrawChart graph_data={graph_data} selected_item_graph={selected_item_graph}/>
                </div>
        </fieldset>
      </div>
        </>
    );
}


export default Trends;