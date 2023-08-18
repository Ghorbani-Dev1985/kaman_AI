
import { useState } from "react";
import Select from "react-select";
import 'react-select-search/style.css'
const DataGraphSegment = [
    { label: "ماهانه", value: 30 },
    { label: "فصلی", value: 90 },
    { label: "سالیانه", value: 360 },
    { label: "روزانه", value: 1 },
    { label: "هفتگی", value: 7 },
  ];

const DataGraphSelect = () => {
    const [dataGraphSegment, setdataGraphSegment] = useState(null);
    return ( 
        <Select
        defaultValue={dataGraphSegment}
        onChange={setdataGraphSegment}
        options={DataGraphSegment}
        placeholder="انتخاب"
      />
     );
}
 
export default DataGraphSelect;