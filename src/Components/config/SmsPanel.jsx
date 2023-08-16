import React, { useState } from "react";
import { useRef } from "react";
import { BiSave } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import Input from "Common/Input";
import { HiChatAlt2 } from "react-icons/hi";
import Button from "Common/Button";

function SMS() {
  const location = useLocation();
  const inputDataRef = useRef(null);
  const [SmsPanelToken , setSmsPanelToken] = useState("");
  return (
    <>
    <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
    <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm"><p className="font-bold text-lg flex items-center"><HiChatAlt2 className="text-3xl ml-2" /> تنظیمات ارسال پیامک</p> </legend>
          <div className="w-full md:mx-auto md:max-w-lg flex justify-center items-center my-12">
              <Input
              id="SmsPanelToken"
              name="SmsPanelToken"
              inputType="text"
              Label="توکن سامانه پیامکی"
              value={SmsPanelToken}
              onChange={(event) => setSmsPanelToken(event.target.value)}
              />
          </div>
      <Button ButtonText="ذخیره تغییرات ">
      <BiSave className="text-2xl" />
      </Button>
      </fieldset>

          </div>
    </>
  );
}

export default SMS;
