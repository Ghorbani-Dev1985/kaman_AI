
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
      <Drawer size={600} open={open} onClose={closeDrawer} className="top-28 overflow-y-auto z-50 !max-h-max bg-gray-100 rounded-tr-lg rounded-br-lg shadow-lg p-2">
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