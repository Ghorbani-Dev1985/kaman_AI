import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-select-search/style.css";
import Select from "react-select";
import { BiPlus } from "react-icons/bi";
import TopFilter from "Common/TopFilter";
import { HiUserGroup } from "react-icons/hi";
import FilterDrawer from "Common/FilterDrawer/FilterDrawer";
import { Card, Typography } from "@material-tailwind/react";
import DownloadBtn from "Common/DownloadBtn";
import Input from "Common/Input";

function Date_Picker(v, setter) {
  return (
    <>
      <DatePicker
        className="date-picker"
        format="YYYY/MM/DD"
        onChange={setter}
        calendar={persian}
        locale={persian_fa}
        value={v}
        formattingIgnoreList={["Date"]}
        calendarPosition="bottom-center"
        plugins={[<Toolbar position="bottom" />]}
      />
    </>
  );
}

function DrawTable({ graph_data }) {
  console.log("graph_datagraph_datagraph_data", graph_data);
  return (
    <>
      <Card className="my-10 mx-auto h-full max-w-[16rem] overflow-x-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {graph_data["labels"].map(function (data) {
                return (
                  <th className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-center font-bold leading-none opacity-70"
                    >
                      {data}
                    </Typography>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {graph_data["data"].map(function (data, index) {
              return (
                <tr key={index} className="odd:bg-gray-50 even:bg-gray-100">
                  {data.map(function (value) {
                    return (
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-center font-normal"
                        >
                          {value}
                        </Typography>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}

function Groups() {
  const location = useLocation();
  const [graph_data, setGraph_data] = useState({ labels: [], data: [] });
  const [groupname, setGroupname] = useState("name");
  const [groupdescription, setGroupdescription] = useState("");
  const [start_time1, setStart_time1] = useState(new DateObject());
  const [end_time1, setEnd_time1] = useState(new DateObject());

  const [product_names, setProduct_names] = useState([]);
  const [product_names_equal, setProduct_names_equal] = useState(1);

  const [product_categorys, setProduct_categorys] = useState([]);
  const [product_categorys_equal, setProduct_categorys_equal] = useState(1);

  const [product_brands, setProduct_brands] = useState([]);
  const [product_brands_equal, setProduct_brands_equal] = useState(1);

  const [sales_channels, setSales_channels] = useState([]);
  const [sales_channels_equal, setSales_channels_equal] = useState(1);

  const [citys, setCitys] = useState([]);
  const [citys_equal, setCitys_equal] = useState(1);

  const [customer_genders, setCustomer_genders] = useState([]);
  const [customer_genders_equal, setCustomer_genders_equal] = useState(1);

  const [emails, setEmails] = useState([]);
  const [emails_equal, setEmails_equal] = useState(1);

  const [uniq_values, setUniq_values] = useState({
    product_names: [],
    product_categorys: [],
    product_brands: [],
    sales_channels: [],
    citys: [],
    customer_genders: [],
    emails: [],
  });

  function getting_groups_service() {
    // e.preventDefault();
    let formData = new FormData();
    let api_address = InitObject.baseurl + "api/getting_groups/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setGraph_data(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getting_uniq_values_service() {
    // e.preventDefault();
    let formData = new FormData();
    let api_address = InitObject.baseurl + "api/getting_uniq_values/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setUniq_values(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const add_group_service = (e) => {
    console.log("groupname", groupname);
    e.preventDefault();
    let formData = new FormData();
    formData.append("groupname", groupname);
    formData.append("groupdescription", groupdescription);
    formData.append("start_date1", start_time1.format());
    formData.append("end_date1", end_time1.format());
    formData.append(
      "product_names",
      product_names.map((notf) => notf.value)
    );
    formData.append(
      "product_names_equal",
      product_names_equal.value !== undefined ? product_names_equal.value : 1
    );
    formData.append(
      "product_categorys",
      product_categorys.map((notf) => notf.value)
    );
    formData.append(
      "product_categorys_equal",
      product_categorys_equal.value !== undefined
        ? product_categorys_equal.value
        : 1
    );
    formData.append(
      "product_brands",
      product_brands.map((notf) => notf.value)
    );
    formData.append(
      "product_brands_equal",
      product_brands_equal.value !== undefined ? product_brands_equal.value : 1
    );
    formData.append(
      "sales_channels",
      sales_channels.map((notf) => notf.value)
    );
    formData.append(
      "sales_channels_equal",
      sales_channels_equal.value !== undefined ? sales_channels_equal.value : 1
    );
    formData.append(
      "citys",
      citys.map((notf) => notf.value)
    );
    formData.append(
      "citys_equal",
      citys_equal.value !== undefined ? citys_equal.value : 1
    );
    formData.append(
      "customer_genders",
      customer_genders.map((notf) => notf.value)
    );
    formData.append(
      "customer_genders_equal",
      customer_genders_equal.value !== undefined
        ? customer_genders_equal.value
        : 1
    );

    formData.append(
      "emails",
      emails.map((notf) => notf.value)
    );
    formData.append(
      "emails_equal",
      emails_equal.value !== undefined ? emails_equal.value : 1
    );

    let api_address = InitObject.baseurl + "api/creating_group/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        getting_groups_service();
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect((e) => {
    getting_uniq_values_service();
    getting_groups_service();
  }, []);

  const handleSetStart_time1 = (e) => {
    // e.preventDefault();
    setStart_time1(e);
    localStorage.setItem("start_time1", start_time1);
    console.log(e.format());
  };

  function select_features(setfeature, featureName, feature, setEqual, equal) {
    const options = [
      { value: 1, label: " برابر است" },
      { value: 0, label: "برابر نیست" },
    ];
    return (
      <>
        <Select
          isMulti
          defaultValue={featureName}
          onChange={setfeature}
          options={uniq_values[feature]}
          autosize={true}
          placeholder="انتخاب"
          className="select-search mb-6 w-full"
        />

        <Select
          defaultValue={equal}
          onChange={setEqual}
          options={options}
          placeholder="انتخاب"
          className="select-search w-full"
        />
      </>
    );
  }

  const handleDownloadFile = (e, graph_data) => {
    var table_data = graph_data["graph_data"];
    e.preventDefault();
    let formData = new FormData();
    formData.append("data", JSON.stringify(table_data));
    // formData.append("end_date1", end_time1.format());
    let api_address = InitObject.baseurl + "api/download_dict/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        if (response.data.results.link !== "") {
          var link = InitObject.baseurl + response.data.results.link;
          console.log(link);
          let a = document.createElement("a");
          a.href = link;
          a.download = link;
          a.click();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <TopFilter>
        <FilterDrawer />
      </TopFilter>
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <HiUserGroup className="ml-2 text-3xl" /> گروه مشتریان
            </p>
          </legend>
          <div className="mb-3 flex w-full flex-col items-center justify-center gap-x-10 gap-y-3 lg:flex-row">
            <Input
              id="groupname"
              inputType="text"
              name="groupname"
              Label="نام گروه"
              onChange={(e) => setGroupname(e.target.value)}
            />
            <Input
              id="groupdescription"
              inputType="text"
              name="groupdescription"
              Label="توضیحات گروه"
              onChange={(e) => setGroupdescription(e.target.value)}
            />
            {Date_Picker(start_time1, handleSetStart_time1)}
            <span>تا</span>
            {Date_Picker(end_time1, setEnd_time1)}
          </div>
          <div className="grid gap-x-10 gap-y-3 md:grid-cols-1 lg:grid-cols-4">
            <SelectFeaturesBox title="محصولات نام">
              {select_features(
                setProduct_names,
                product_names,
                "product_names",
                setProduct_names_equal,
                product_names_equal
              )}
            </SelectFeaturesBox>
            <SelectFeaturesBox title=" دسته بندی محصولات">
              {select_features(
                setProduct_categorys,
                product_categorys,
                "product_categorys",
                setProduct_categorys_equal,
                product_categorys_equal
              )}
            </SelectFeaturesBox>
            <SelectFeaturesBox title="برند">
              {select_features(
                setProduct_brands,
                product_brands,
                "product_brands",
                setProduct_brands_equal,
                product_brands_equal
              )}
            </SelectFeaturesBox>
            <SelectFeaturesBox title=" کانال  فروش ">
              {select_features(
                setSales_channels,
                sales_channels,
                "sales_channels",
                setSales_channels_equal,
                sales_channels_equal
              )}
            </SelectFeaturesBox>
            <SelectFeaturesBox title="منطقه">
              {select_features(
                setCitys,
                citys,
                "citys",
                setCitys_equal,
                citys_equal
              )}
            </SelectFeaturesBox>
            <SelectFeaturesBox title="جنسیت">
              {select_features(
                setCustomer_genders,
                customer_genders,
                "customer_genders",
                setCustomer_genders_equal,
                customer_genders_equal
              )}
            </SelectFeaturesBox>
            <SelectFeaturesBox title="ایمیل">
              {select_features(
                setEmails,
                emails,
                "emails",
                setEmails_equal,
                emails_equal
              )}
            </SelectFeaturesBox>

            <div className="flex items-center justify-center">
              <button
                type="button"
                class="btns flex items-center justify-center"
                onClick={add_group_service}
              >
                <BiPlus className="ml-2 text-2xl" /> ساخت گروه مشتری{" "}
              </button>
            </div>
          </div>

          <br />

          <DownloadBtn onClick={(e) => handleDownloadFile(e, { graph_data })} />
          <DrawTable graph_data={graph_data} />
        </fieldset>
      </div>
    </>
  );
}

export default Groups;

const SelectFeaturesBox = ({ children, title }) => {
  return (
    <div className="flex w-full flex-col items-start rounded-lg border border-navy-100">
      <p className="w-full rounded-tr-lg rounded-tl-lg border border-navy-100 bg-navy-500 p-3 text-center font-extrabold text-white">
        {" "}
        {title}{" "}
      </p>
      <div className="w-full p-4">{children}</div>
    </div>
  );
};

export { SelectFeaturesBox };
