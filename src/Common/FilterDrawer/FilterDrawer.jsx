import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { BiArrowBack, BiFilterAlt, BiMinusCircle } from "react-icons/bi";
import Select from "react-select";
import 'react-select-search/style.css'
import Analyse from "../../Components/config/Analyse";
import Line from "Common/Line";
import FilterDrawerAccordion from "./FilterDrawerAccordion";
const FilterDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [customerGroup, setCustomerGroup] = useState(null);
  const [productSelect, setproductSelect] = useState(null);
  const [brandSelect, setbrandSelect] = useState(null);
  const [getChanelSelect, setGetChanelSelect] = useState(null);
  const [geographicalAreasSelect, setGeographicalAreasSelect] = useState(null);
  const [agesSelect, setagesSelect] = useState(null);
  const [shopChannelSelect, setShopChannelSelect] = useState(null);
  const [emailSelect, setًٍEmailSelect] = useState(null);
  const FilterSelects = [
    {
      id: 1,
      AccordionTitle: "دسته بندی‌ها",
      defaultValue: "customerGroup",
      onChange: "setCustomerGroup",
      options: "",
    },
    {
      id: 2,
      AccordionTitle: "محصولات",
      defaultValue: "productSelect",
      onChange: "setproductSelect",
      options: "",
    },
    {
      id: 3,
      AccordionTitle: "برند‌ها",
      defaultValue: "brandSelect",
      onChange: "setbrandSelect",
      options: "",
    },
    {
      id: 4,
      AccordionTitle: "کانال جذب",
      defaultValue: "getChanelSelect",
      onChange: "setGetChanelSelect",
      options: "",
    },
    {
      id: 5,
      AccordionTitle: "مناطق جغرافیایی",
      defaultValue: "geographicalAreasSelect",
      onChange: "setGeographicalAreasSelect",
      options: "",
    },
    {
      id: 6,
      AccordionTitle: " رده سنی",
      defaultValue: "agesSelect",
      onChange: "setagesSelect",
      options: "",
    },
    {
      id: 7,
      AccordionTitle: "  کانال خرید",
      defaultValue: "shopChannelSelect",
      onChange: "setShopChannelSelect",
      options: "",
    },
    {
      id: 8,
      AccordionTitle: "   ایمیل",
      defaultValue: "emailSelect",
      onChange: "setًٍEmailSelect",
      options: "",
    },
  ]
  return (
    <>
      <Button
        onClick={openDrawer}
        className="btns ml-2 flex items-center justify-center text-lg"
      >
        <BiFilterAlt className="ml-2 text-2xl" />
        فیلتر
      </Button>
    
      <Drawer
        open={open}
        size={350}
        overlay= {true}
        overlayProps= {true}
        onClose={closeDrawer}
        className="top-0 z-50 !max-h-max overflow-y-auto rounded-tr-lg rounded-br-lg shadow-lg"
      > 
   
         <div className="mb-2 flex justify-between border-b border-b-gray-300 p-2">
          
          <section className="flex flex-col ">
          <Typography variant="h4" className="font-bold mb-3">
           فیلتر
          </Typography>
          <Typography variant="h6" className="mb-3">
      
           فیلتر‌های مورد نظر خود را انتخاب نمایید.
          </Typography>
          </section>

           <BiArrowBack className="text-2xl" onClick={closeDrawer}/> 
    
        </div>
        <FilterDrawerAccordion AccordionTitle="گروه مشتری">
        <Select
        defaultValue={customerGroup}
        onChange={setCustomerGroup}
        // options={}
        placeholder="جستجو کنید"
        isMulti
      />  
        <p className="my-3">تعداد مشتریان انتخاب شده : <span>0</span></p>
        </FilterDrawerAccordion>
        {
          FilterSelects.map(({id, AccordionTitle , defaultValue , onChange , options}) => {
            return(
        <FilterDrawerAccordion AccordionTitle={AccordionTitle}>
        <Select
        defaultValue={defaultValue}
        onChange={onChange}
        // options={options}
        placeholder="جستجو کنید"
        isMulti
      />  
        </FilterDrawerAccordion>
            )
          })
        }
        <Line />
        <div className="flex justify-end items-center gap-2 p-2">
          <button onClose={closeDrawer} className="transparentBtns !px-8 !py-3">انصراف</button>
          <button type="submit" className="btns !py-3">اعمال</button>
        </div>
        <div className="h-40"></div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;

