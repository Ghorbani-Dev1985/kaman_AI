import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import { BiError, BiTrash } from "react-icons/bi";
import { HiUserAdd, HiUserGroup, HiUsers } from "react-icons/hi";
import { AiOutlineUserAdd } from "react-icons/ai";
import Input from "Common/Input";
import Textarea from "Common/textArea";
import Line from "Common/Line";

function get_list_of_users(location, setUsers_list) {
  let formData = new FormData();
  let api_address = InitObject.baseurl + "api/list_user/";
  axios
    .post(api_address, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: " Token " + location.state.userinfo.key,
      },
    })
    .then((response) => {
      setUsers_list(response.data.results);
      console.log(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
}

function get_list_of_agents(location, setAgents_lists) {
  let formData = new FormData();
  let api_address = InitObject.baseurl + "api/agent_list/";
  axios
    .post(api_address, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: " Token " + location.state.userinfo.key,
      },
    })
    .then((response) => {
      setAgents_lists(response.data.results);
      console.log(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
}

function Users() {
  const location = useLocation();
  const [users_list, setUsers_list] = useState([]);
  const [agents_list, setAgents_lists] = useState([]);
  const [add_agent_visibility, setAdd_agent_visibility] = useState(false);
  const [add_user_visibility, setAdd_user_visibility] = useState(false);

  const [add_agent_title, setAdd_agent_title] = useState("");
  const [add_agent_description, setAdd_agent_description] = useState("");

  const [add_user_username, setAdd_user_username] = useState("");
  const [add_user_first_name, setAdd_user_first_name] = useState("");
  const [add_user_last_name, setAdd_user_last_name] = useState("");

  const [add_user_email, setAdd_user_email] = useState("");
  const [add_user_phone, setAdd_user_phone] = useState("");
  const [add_user_password1, setAdd_user_password1] = useState("");
  const [add_user_password2, setAdd_user_password2] = useState("");
  const [add_user_agent, setAdd_user_agent] = useState("");
  const [add_user_sendsms_permission, setAdd_user_sendsms_permission] =
    useState(false);
  const [add_user_adduser_permission, setAdd_user_adduser_permission] =
    useState(false);

  useEffect(() => {
    get_list_of_users(location, setUsers_list);
    get_list_of_agents(location, setAgents_lists);
    // console.log(location.state.userinfo);
  }, []);

  const handleAdd_agent_visibility = () => {
    setAdd_agent_visibility((current) => !current);
  };

  const handleAdd_user_visibility = () => {
    setAdd_user_visibility((current) => !current);
  };

  const habdleAddAgent = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("title", add_agent_title);
    formData.append("description", add_agent_description);

    let api_address = InitObject.baseurl + "api/agent_add/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const habdleDelAgent = (e, title) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("title", title);

    let api_address = InitObject.baseurl + "api/agent_del/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const habdleDelUser = (e, username) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("username", username);

    let api_address = InitObject.baseurl + "api/del_user/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const habdleAddUser = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("username", add_user_username);
    formData.append("email", add_user_email);
    formData.append("phone", add_user_phone);
    formData.append("password1", add_user_password1);
    formData.append("password2", add_user_password2);
    formData.append("sendsms_permission", add_user_sendsms_permission);
    formData.append("adduser_permission", add_user_adduser_permission);
    formData.append("agent_title", add_user_agent);
    formData.append("first_name", add_user_first_name);
    formData.append("last_name", add_user_last_name);

    let api_address = InitObject.baseurl + "api/add_user/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="w-full rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            مدیریت کاربران{" "}
          </legend>
            <p className="flex items-center text-lg font-bold my-8">
              <HiUserGroup className="ml-2 text-2xl" /> لیست نمایندگان
            </p>
            {agents_list.length > 0 ? (
              <div className="max-w-[18rem] mx-auto overflow-x-auto p-2 md:max-w-full">
                <div className="inline-block w-full py-2">
                    <table className="min-w-full table-auto rounded-lg md:overflow-hidden">
                      <thead className="border-b border-white bg-blue-200 text-blue-600">
                        <tr>
                          <th
                            scope="col"
                            className="border-slate-500 border px-2 py-4 text-center text-sm font-medium"
                          >
                            عنوان
                          </th>
                          <th
                            scope="col"
                            className="border-slate-500 border px-6 py-4 text-center text-sm font-medium"
                          >
                            توضیحات
                          </th>
                          <th
                            scope="col"
                            className="border-slate-500 border px-6 py-4 text-center text-sm font-medium"
                          >
                            تاریخ ایجاد
                          </th>
                          <th
                            scope="col"
                            className="border-slate-500 border px-2 py-4 text-center text-sm font-medium"
                          >
                            حذف
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&>*:nth-child(even)]:bg-gray-50 [&>*:nth-child(odd)]:bg-gray-200">
                        {agents_list.map((agent_list, index) => (
                          <tr key={index} className="border-b">
                            <td className="text-slate-700 px-6 py-4 text-center text-sm font-medium">
                              {agent_list["title"]}
                            </td>
                            <td className="text-slate-700 px-6 py-4 text-center text-sm font-medium">
                              {agent_list["description"]}
                            </td>
                            <td className="text-slate-700 px-6  py-4 text-center text-sm font-medium">
                              {agent_list["created_at"]}
                            </td>
                            <td className="text-slate-700 flex items-center justify-center px-6 py-4 text-center text-sm font-medium">
                              <BiTrash
                                onClick={(e) =>
                                  habdleDelAgent(e, agent_list["title"])
                                }
                                className="cursor-pointer text-xl text-red-500"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
              </div>
            ) : (
              <div className="bg-rose-100 my-12 flex items-center justify-center rounded-md border border-gray-200 p-12">
                <BiError className="ml-2 text-4xl text-amber-500" /> اطلاعاتی
                برای نمایش وجود ندارد
              </div>
            )}

            <div className="flex w-full items-center justify-center">
              <button
                onClick={handleAdd_agent_visibility}
                className="transparentBtns flex w-full items-center justify-center md:w-auto"
              >
                <span className="mr-2">ایجاد نمایندگی</span>
              </button>
            </div>
            <div
              className={`${add_agent_visibility ? "my-8 block" : "hidden"}`}
            >
              <form>
                <div className="my-6 w-full md:max-w-lg">
                  <Input
                    id="add_agent_title"
                    name="add_agent_title"
                    inputType="text"
                    Label="عنوان نمایندگی *"
                    value={add_agent_title}
                    onChange={(e) => setAdd_agent_title(e.target.value)}
                  />
                </div>
                <Textarea
                  id="add_agent_description"
                  name="add_agent_description"
                  Label="توضیحات نمایندگی *"
                  value={add_agent_description}
                  onChange={(e) => setAdd_agent_description(e.target.value)}
                />
                <div className="my-6 flex w-full items-center justify-center md:justify-end">
                  <button
                    onClick={habdleAddAgent}
                    className="btns flex w-full items-center justify-center md:w-auto"
                  >
                    <HiUserAdd className="text-2xl" />
                    <span className="mr-2"> افزودن نمایندگی جدید </span>
                  </button>
                </div>
              </form>
            </div>
          <Line />
          <p className="flex items-center text-lg font-bold my-8">
            <HiUsers className="ml-2 text-2xl" /> لیست کاربران
          </p>
          {users_list.length > 0 ? (
            <div className="overflow-x-auto p-2 max-w-[18rem] mx-auto md:max-w-full">
              <div className="inline-block w-full py-2">
                  <table className="min-w-full table-auto rounded-lg md:overflow-hidden">
                    <thead className="border-b border-white bg-blue-200 text-blue-600">
                      <tr>
                        <th
                          scope="col"
                          className="border-slate-500 border px-2 py-4 text-center text-sm font-medium"
                        >
                          نام کاربری
                        </th>
                        <th
                          scope="col"
                          className="border-slate-500 border px-6 py-4 text-center text-sm font-medium"
                        >
                          نام نماینده
                        </th>
                        <th
                          scope="col"
                          className="border-slate-500 border px-6 py-4 text-center text-sm font-medium"
                        >
                          تاریخ آخرین مشاهده
                        </th>
                        <th
                          scope="col"
                          className="border-slate-500 border px-2 py-4 text-center text-sm font-medium"
                        >
                          حذف
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&>*:nth-child(even)]:bg-gray-50 [&>*:nth-child(odd)]:bg-gray-200">
                      {users_list.map((user_list, index) => (
                        <tr key={index} className="border-b">
                          <td className="text-slate-700 px-6 py-4 text-center text-sm font-medium">
                            {user_list["username"]}
                          </td>
                          <td className="text-slate-700 px-6 py-4 text-center text-sm font-medium">
                            {user_list["agent"]}
                          </td>
                          <td className="text-slate-700 px-6  py-4 text-center text-sm font-medium">
                            {user_list["last_seen"]}
                          </td>
                          <td className="text-slate-700 flex items-center justify-center px-6 py-4 text-center text-sm font-medium">
                            <BiTrash
                              onClick={(e) =>
                                habdleDelUser(e, user_list["username"])
                              }
                              className="cursor-pointer text-xl text-red-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </div>
            </div>
          ) : (
            <div className="bg-rose-100 my-12 flex items-center justify-center rounded-md border border-gray-200 p-12">
              <BiError className="ml-2 text-4xl text-amber-500" /> اطلاعاتی برای
              نمایش وجود ندارد
            </div>
          )}
          <div className="flex w-full items-center justify-center my-4">
            <button
              onClick={handleAdd_user_visibility}
              className="transparentBtns flex w-full items-center justify-center md:w-auto"
            >
              <span className="mr-2">ایجاد کاربر</span>
            </button>
          </div>
          <div
            className={`${add_user_visibility ? "block my-8" : "hidden"}`} >
            <form>
              <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex flex-1">
                  <Input
                    id="add_user_first_name"
                    name="add_user_first_name"
                    inputType="text"
                    Label=" نام *"
                    value={add_user_first_name}
                    onChange={(e) => setAdd_user_first_name(e.target.value)}
                  />
                </div>
                <div className="flex flex-1">
                <Input
                    id="add_user_last_name"
                    name="add_user_last_name"
                    inputType="text"
                    Label=" نام خانوادگی *"
                    value={add_user_last_name}
                    onChange={(e) => setAdd_user_last_name(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex flex-1">
                  <Input
                    id="add_user_username"
                    name="add_user_username"
                    inputType="text"
                    Label=" نام کاربری *"
                    value={add_user_username}
                onChange={(e) => setAdd_user_username(e.target.value)}
                  />
                </div>
                <div className="flex flex-1">
                      <Input
                    id="add_user_phone"
                    name="add_user_phone"
                    inputType="number"
                    Label=" تلفن *"
                    value={add_user_phone}
                    onChange={(e) => setAdd_user_phone(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex flex-1">
                <Input
                    id="add_user_password1"
                    name="add_user_password1"
                    inputType="password"
                    Label=" کلمه عبور *"
                    value={add_user_password1}
                onChange={(e) => setAdd_user_password1(e.target.value)}
                  />
                </div>

                <div className="flex flex-1">
              <Input
                    id="add_user_password2"
                    name="add_user_password2"
                    inputType="password"
                    Label=" تکرار کلمه عبور *"
                    value={add_user_password2}
                    onChange={(e) => setAdd_user_password2(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex flex-1">
                    <Input
                    id="add_user_email"
                    name="add_user_email"
                    inputType="email"
                    Label=" ایمیل *"
                    value={add_user_email}
                onChange={(e) => setAdd_user_email(e.target.value)}
                  />
                </div>
                <div className="flex flex-1">
                {location.state.userinfo.results.agent === null && (
                <>
                  <label for="lname"> نماینده </label>
                  <br />
                  <select
                    name="add_user_agent"
                    id="add_user_agent"
                    onChange={(e) => setAdd_user_agent(e.target.value)}
                  >
                    <option value="select">انتخاب</option>
                    {agents_list.map((item) => (
                      <option value={item["title"]}>{item["title"]}</option>
                    ))}
                  </select>
                  <br />
                </>
              )}
              <div id="checkboxes">
                <label>
                  <input
                    type="checkbox"
                    checked={add_user_sendsms_permission}
                    onChange={(e) =>
                      setAdd_user_sendsms_permission(
                        !add_user_sendsms_permission
                      )
                    }
                  />
                 <span className="mr-2"> دسترسی به سامانه پیامک</span>
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={add_user_adduser_permission}
                    onChange={(e) =>
                      setAdd_user_adduser_permission(
                        !add_user_adduser_permission
                      )
                    }
                  />
                <span className="mr-2"> افزودن دسترسی کاربر </span>  
                </label>
              </div>
                </div>
              </div>
              <div className="my-6 flex w-full items-center justify-center md:justify-end">
                  <button
                    onClick={habdleAddUser}
                    className="btns flex w-full items-center justify-center md:w-auto"
                  >
                    <AiOutlineUserAdd className="text-2xl" />
                    <span className="mr-2"> افزودن کاربر جدید </span>
                  </button>
                </div>
            </form>
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default Users;
