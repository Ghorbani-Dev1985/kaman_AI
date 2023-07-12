import Sidebar from "components/sidebar";
import React from "react";
import { useState } from "react";

const main = () => {
    const [open, setOpen] = useState(true);
    return ( 
        <Sidebar open={open} onClose={() => setOpen(false)}/>
     );
}
 
export default main;