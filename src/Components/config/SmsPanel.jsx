import React, { useState } from "react";
import { useRef } from "react";
import { BiSave } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import Input from "Common/Input";
import { HiChatAlt2 } from "react-icons/hi";
import Button from "Common/Button";
import TopInfoBar from "Common/TopInfoBar";

function SMS() {
  const [SmsPanelToken, setSmsPanelToken] = useState("");
  return (
    <>
    <TopInfoBar />
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <HiChatAlt2 className="ml-2 text-3xl" /> تنظیمات ارسال پیامک
            </p>{" "}
          </legend>
          <div className="my-12 flex w-full items-center justify-center md:mx-auto md:max-w-lg">
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
