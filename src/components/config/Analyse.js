import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import { BiChevronsLeft, BiSave } from "react-icons/bi";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar/SideBar";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/RTL";

function AnalyseData(props) {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState("تحلیل داده ");
  const [chartresponse, setChartResponse] = useState({});
  const { ...rest } = props;
  const [open, setOpen] = useState(true);
  const [showSubMenu, setShowSubMenu] = useState({
    allMenu: true,
    dropDownOne: false,
    dropDownTwo: false,
    dropDownThree: false,
  });
  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 768 ? setOpen(false) : setOpen(true)
    );
  }, []);

  // const inputDataRef = useRef(null);
  const [segments, setSegments] = useState(11);
  const [outlayer, setOutlayer] = useState(0);
  const [recency1, setRecency1] = useState(20);
  const [recency2, setRecency2] = useState(40);
  const [recency3, setRecency3] = useState(60);
  const [recency4, setRecency4] = useState(80);
  const [frequency1, setFrequency1] = useState(20);
  const [frequency2, setFrequency2] = useState(40);
  const [frequency3, setFrequency3] = useState(60);
  const [frequency4, setFrequency4] = useState(80);
  const [monetary1, setMonetary1] = useState(20);
  const [monetary2, setMonetary2] = useState(40);
  const [monetary3, setMonetary3] = useState(60);
  const [monetary4, setMonetary4] = useState(80);

  useEffect(() => {
    let formData = new FormData();
    // formData.append("start_date1", start_time1.format());
    // formData.append("end_date1", end_time1.format());
    let api_address = InitObject.baseurl + "api/get_config/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setSegments(response.data.results.segment);
        setOutlayer(response.data.results.outlayer);
        setRecency1(response.data.results.recency1);
        setRecency2(response.data.results.recency2);
        setRecency3(response.data.results.recency3);
        setRecency4(response.data.results.recency4);
        setFrequency1(response.data.results.frequency1);
        setFrequency2(response.data.results.frequency2);
        setFrequency3(response.data.results.frequency3);
        setFrequency4(response.data.results.frequency4);
        setMonetary1(response.data.results.monetary1);
        setMonetary2(response.data.results.monetary2);
        setMonetary3(response.data.results.monetary3);
        setMonetary4(response.data.results.monetary4);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const location = useLocation();
  // const inputDataRef = useRef(null);
  // const [selected_file, SetSelected_file] = useState(null);
  // const [imports_list, SetImport_list] = useState({});

  const handleSegments = (e) => {
    setSegments(e.target.value);
  };

  const handleOutlayer = (e) => {
    if (outlayer === 0) {
      setOutlayer(1);
    } else {
      setOutlayer(0);
    }
    console.log(recency1);
  };

  const handleUpdateData = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("segments", segments);
    formData.append("outlayer", outlayer);
    formData.append("recency1", recency1);
    formData.append("recency2", recency2);
    formData.append("recency3", recency3);
    formData.append("recency4", recency4);
    formData.append("frequency1", frequency1);
    formData.append("frequency2", frequency2);
    formData.append("frequency3", frequency3);
    formData.append("frequency4", frequency4);
    formData.append("monetary1", monetary1);
    formData.append("monetary2", monetary2);
    formData.append("monetary3", monetary3);
    formData.append("monetary4", monetary4);
    let api_address = InitObject.baseurl + "api/update_config/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
        toast.success("تغییرات با موفقیت ثبت گردید");
      })
      .catch((error) => {
        console.log(error);
        toast.error("خطایی در ثبت تغییرات رخ داده است");
      });
  };

  return (
    <>
      <div className="flex h-full w-full">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        showSubMenu={showSubMenu}
        setShowSubMenu={setShowSubMenu}
      />
      {/* Navbar & Main Content */}
      <div className="flex h-full w-full flex-col items-end bg-lightPrimary dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] mt-4 h-full w-78p flex-none transition-all duration-700 ease-linear md:pe-2 ${
            !showSubMenu.allMenu && "w-96p"
          } `}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              
                  {/* outlayer section */}
                  <div className="bg-white p-3 rounded-md mb-4">
              <p>
                با انتخاب این گزینه مشتریانی که رفتار خرید آن‌ها، با میانگین
                رفتار خرید سایر مشتریان تفاوت دارد، از محاسبات تحلیل RFM خارج
                شده و در انتها، به عنوان دو دسته مجزا، به کل مشتریان در
                دسته‌بندی افزوده خواهند شد.
              </p>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="outlayer"
                  name="segment"
                  value="1"
                  onChange={handleOutlayer}
                />
                <label htmlFor="outlayer" className="mr-2 cursor-pointer">
                  حذف داده پرت
                </label>
              </div>
            </div>

            <div className="bg-white p-3 rounded-md mb-4">
              <p>
                در این قسمت می‌توانید انتخاب کنید که پس از محاسبه متد مشتریان
                شما به چند دسته تقسیم‌بندی شوند.
              </p>
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="segment"
                    id="elevenGroups"
                    value="11"
                    onClick={handleSegments}
                  />
                  <label htmlFor="elevenGroups" className="mx-2 cursor-pointer">
                    یازده دسته
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="segment"
                    id="threeGroups"
                    value="3"
                    onClick={handleSegments}
                  />
                  <label htmlFor="threeGroups" className="mx-2 cursor-pointer">
                    سه دسته
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="segment"
                    id="sixGroups"
                    value="6"
                    onClick={handleSegments}
                  />
                  <label htmlFor="sixGroups" className="mx-2 cursor-pointer">
                    شش دسته
                  </label>
                </div>
              </div>
            </div>
            {/* newShopIndex Section */}
            <div className="bg-white p-3 rounded-md mb-4">
              <p>
                در این قسمت می‌توانید بازه تقسیم‌بندی “شاخص تازگی خرید” مشتریان
                را به دلخواه خود و متناسب با نیاز، تغییر دهید.
              </p>
              <div className="flex flex-col md:flex-row md:justify-center md:items-center">
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value="0"
                    disabled
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={recency1}
                    onChange={(e) => setRecency1(e.target.value)}
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={recency2}
                    onChange={(e) => setRecency2(e.target.value)}
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={recency3}
                    onChange={(e) => setRecency3(e.target.value)}
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={recency4}
                    onChange={(e) => setRecency4(e.target.value)}
                    className="inputStyles"
                  />{" "}
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value="100"
                    disabled
                    className="inputStyles"
                  />
                </div>
              </div>
            </div>
            {/* quantityShopIndex Section */}
            <div className="bg-white p-3 rounded-md mb-4">
              <p>
                {" "}
                در این قسمت می‌توانید بازه تقسیم‌بندی “شاخص تعداد خرید” مشتریان
                را به دلخواه خود و متناسب با نیاز، تغییر دهید.
              </p>
              <div className="flex flex-col md:flex-row md:justify-center md:items-center">
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value="0"
                    disabled
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={frequency1}
                    onChange={(e) => setFrequency1(e.target.value)}
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  {" "}
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={frequency2}
                    onChange={(e) => setFrequency2(e.target.value)}
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  {" "}
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={frequency3}
                    onChange={(e) => setFrequency3(e.target.value)}
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  {" "}
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={frequency4}
                    onChange={(e) => setFrequency4(e.target.value)}
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value="100"
                    disabled
                    className="inputStyles"
                  />
                </div>
              </div>
            </div>
            {/* priceShopIndex Section */}
            <div className="bg-white p-3 rounded-md mb-4">
              <p>
                {" "}
                در این قسمت می‌توانید بازه تقسیم‌بندی “شاخص مبلغ خرید” مشتریان
                را به دلخواه خود و متناسب با نیاز، تغییر دهید.
              </p>
              <div className="flex flex-col md:flex-row md:justify-center md:items-center">
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value="0"
                    disabled
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={monetary1}
                    onChange={(e) => setMonetary1(e.target.value)}
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={monetary2}
                    onChange={(e) => setMonetary2(e.target.value)}
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={monetary3}
                    onChange={(e) => setMonetary3(e.target.value)}
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value={monetary4}
                    onChange={(e) => setMonetary4(e.target.value)}
                    className="inputStyles"
                  />
                  <label>
                    <BiChevronsLeft />
                  </label>
                </div>
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <input
                    size="10"
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    value="100"
                    disabled
                    className="inputStyles"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center md:justify-end items-center">
              <button
                className="btns flex justify-center items-center w-full md:w-auto"
                onClick={handleUpdateData}
              >
                {" "}
                <BiSave className="text-lg" />{" "}
                <span className="mr-2">ذخیره تغیرات </span>
              </button>
            </div>

              
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>


    </>
  );
}

export default AnalyseData;
