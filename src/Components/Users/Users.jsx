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
import { Card, Typography } from "@material-tailwind/react";

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
  const AgentTableHead = ["عنوان", "توضیحات", "تاریخ ایجاد", "حذف"];
  const UsersListTableHead = [
    "نام کاربری",
    "نام نماینده",
    "تاریخ آخرین مشاهده",
    "حذف",
  ];
  return (
    <>
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="w-full rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            مدیریت کاربران{" "}
          </legend>
          <p className="my-8 flex items-center text-lg font-bold">
            <HiUserGroup className="ml-2 text-2xl" /> لیست نمایندگان
          </p>
          {agents_list.length > 0 ? (
            <Card className="mx-auto h-full max-w-[16rem] overflow-x-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
              <table className="w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    {AgentTableHead.map((head) => (
                      <th className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-center font-bold leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {agents_list.map((agent_list) => {
                    return (
                      <tr
                        key={agent_list}
                        className="odd:bg-gray-50 even:bg-gray-100"
                      >
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-center font-normal"
                          >
                            {agent_list["title"]}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-center font-normal"
                          >
                            {agent_list["description"]}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-center font-normal"
                          >
                            {agent_list["created_at"]}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="flex items-center justify-center text-center font-normal"
                          >
                            <BiTrash
                              onClick={(e) =>
                                habdleDelAgent(e, agent_list["title"])
                              }
                              className="cursor-pointer text-xl text-red-500"
                            />
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          ) : (
            <div className="bg-rose-100 my-12 flex items-center justify-center rounded-md border border-gray-200 p-12">
              <BiError className="ml-2 text-4xl text-amber-500" /> اطلاعاتی برای
              نمایش وجود ندارد
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
          <div className={`${add_agent_visibility ? "my-8 block" : "hidden"}`}>
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
          <p className="my-8 flex items-center text-lg font-bold">
            <HiUsers className="ml-2 text-2xl" /> لیست کاربران
          </p>
          {users_list.length > 0 ? (
            <Card className="mx-auto h-full max-w-[16rem] overflow-x-auto md:max-w-lg lg:max-w-2xl xl:max-w-4xl 2xl:max-w-full">
              <table className="w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    {UsersListTableHead.map((head) => (
                      <th className="border-b border-navy-500 bg-navy-100 p-4 text-base text-navy-900">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-center font-bold leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users_list.map((user_list) => {
                    return (
                      <tr
                        key={users_list}
                        className="odd:bg-gray-50 even:bg-gray-100"
                      >
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-center font-normal"
                          >
                            {user_list["username"]}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-center font-normal"
                          >
                            {user_list["agent"]}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-center font-normal"
                          >
                            {user_list["last_seen"]}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="flex items-center justify-center text-center font-normal"
                          >
                            <BiTrash
                              onClick={(e) =>
                                habdleDelUser(e, user_list["username"])
                              }
                              className="cursor-pointer text-xl text-red-500"
                            />
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          ) : (
            <div className="bg-rose-100 my-12 flex items-center justify-center rounded-md border border-gray-200 p-12">
              <BiError className="ml-2 text-4xl text-amber-500" /> اطلاعاتی برای
              نمایش وجود ندارد
            </div>
          )}
          <div className="my-4 flex w-full items-center justify-center">
            <button
              onClick={handleAdd_user_visibility}
              className="transparentBtns flex w-full items-center justify-center md:w-auto"
            >
              <span className="mr-2">ایجاد کاربر</span>
            </button>
          </div>
          <div className={`${add_user_visibility ? "my-8 block" : "hidden"}`}>
            <form>
              <div className="mb-4 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
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
              <div className="mb-4 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
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
              <div className="mb-4 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
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
              <div className="mb-4 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
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
