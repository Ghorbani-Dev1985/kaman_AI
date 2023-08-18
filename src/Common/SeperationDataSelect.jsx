
import { useState } from "react";
import Select from "react-select";
import 'react-select-search/style.css'
const SeperationData = [
    { label: "هیچکدام", value: "None" },
    { label: "برند", value: "brand" },
    { label: "کانال جذب", value: "sales_channel" },
    { label: "منطقه جغرافیایی", value: "city" },
    { label: "دسته بندی محصولات", value: "product_name" },
  ];

const SeperationDataSelect = () => {
    const [seperationSelect, setseperationSelect] = useState(null);
    return ( 
        <Select
        defaultValue={seperationSelect}
        onChange={setseperationSelect}
        options={SeperationData}
        placeholder="انتخاب"
      /> 
     );
}
 
export default SeperationDataSelect;
