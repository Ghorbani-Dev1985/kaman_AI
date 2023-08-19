
import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { BiFilterAlt, BiMinusCircle } from "react-icons/bi";

 import Analyse from "../Components/config/Analyse";
const FilterDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
 
  return (
    <>
      <Button onClick={openDrawer} className="btns ml-2 flex items-center justify-center text-lg"><BiFilterAlt className="ml-2 text-2xl" />فیلتر</Button>
      <Drawer size={600} open={open} onClose={closeDrawer} className="top-28 overflow-y-auto !max-h-max bg-gray-100 rounded-tr-lg rounded-br-lg shadow-lg p-2">
        <div className="mb-2 flex items-center justify-between p-4">
        
          {/* <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton> */}
        </div>
       <Analyse>
         <Button className="transparentBtns flex justify-center items-center" onClick={closeDrawer}>
            <BiMinusCircle className="text-2xl ml-2"/>
            انصراف
         </Button>
        </Analyse>
       <div className="h-40"></div>
      </Drawer>
    </>
  );
}

export default FilterDrawer;