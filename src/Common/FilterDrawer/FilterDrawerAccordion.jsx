import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Select from "react-select";
import 'react-select-search/style.css'
function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }
  const EqualNoEqual = [
    { label: "برابر است با", value: "Equal" },
    { label: "برابر نیست با", value: "NoEqual" },
  ];

const FilterDrawerAccordion = ({children, AccordionTitle}) => {
    const [open, setOpen] = useState(0);
    const [have, setHave] = useState(null);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    return ( 
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />} className="p-2">
        <AccordionHeader onClick={() => handleOpen(1)} className="border-none">{AccordionTitle}</AccordionHeader>
        <AccordionBody className="border-b border-b-gray-300">
        <Select
        defaultValue={have}
        onChange={setHave}
        options={EqualNoEqual}
        placeholder="انتخاب کنید"
        className="max-w-xs w-36 mb-3"
      /> 
          {children}
        </AccordionBody>
      </Accordion>
     );
}
 
export default FilterDrawerAccordion;