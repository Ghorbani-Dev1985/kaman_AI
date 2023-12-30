import React, { useEffect, useState } from "react";
import Select from "react-select";
import "react-select-search/style.css";


function ShowInfo({ results , showLoading , setShowLoading}) {
  function ShowValues(
    results,
    options,
    selectedOption,
    selectedOption_value,
    setSelectedOption,
    setSelectedOptionValue,
    setSelectedOptionImprove,
    selectedOption_improve,
  ) {
    const ChangeValue = (e) => {
      setSelectedOptionValue(results.date1[e.value]);
      setSelectedOption(e.label);
      setSelectedOptionImprove(results.percentage[e.value]);
      
    };
   console.log(showLoading)
    return (
      <>

   {
        showLoading ? <div role="status" className="max-w-sm animate-pulse flex flex-col justify-between h-full p-3">
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-52 mb-4"></div>
      <div className="w-full flex justify-between items-center">
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
      </div>
  </div> : <div className="flex h-full flex-col justify-between p-3">
          <Select
            onChange={ChangeValue}
            options={options}
            placeholder={selectedOption}
            className="select-search text-navy-500"
            theme="neutral50"
          />
          <div className="my-3 flex w-full items-center justify-between">
            <div className="number">{selectedOption_value}</div>
            <div className="rounded-md bg-gray-100 px-3 py-1 dark:bg-navy-500 dark:text-white">
              {selectedOption_improve}
            </div>
          </div>
        </div>
   }
        
      </>
    );
  }
  const options = [
    // {label: 'میانگین تعداد محصول در فاکتور', value: 'factor_product_average'},
    // {label: 'میانگین تعداد سطر در فاکتور', value: 'factor_rows_average'},
    // {label: "تعداد فاکتورهای فروش", value: 'sale_factor_count'},
    // {label: "تعداد فاکتورهای مرجوعی", value: 'rejected_factor_count'},
    // {label: "میانگین مبلغ فاکتورها", value: 'factor_amount_average'},
    // {label: "میانگین مبلغ کالاها", value: 'factor_amount_product_average'},
    { value: "sale_factor_count", label: "تعداد فاکتورهای فروش" },
    { value: "rejected_factor_count", label: "تعداد فاکتورهای مرجوعی" },
    { value: "factor_product_average", label: "میانگین تعداد محصول در فاکتور" },
    { value: "factor_rows_average", label: "میانگین تعداد سطر فاکتورها" },
    { value: "factor_amount_average", label: "میانگین مبلغ فاکتورها" },
    { value: "factor_amount_product_average", label: "میانگین مبلغ کالاها" },
    {
      value: "customer_income_average",
      label: "میانگین مبلغ درامد خالص از مشتری",
    },
    { value: "gross_sale", label: "فروش ناخالص" },
    { value: "factor_product_count", label: "تعداد ناخالص محصول فروخته شده" },
    { value: "factor_product_weight", label: "وزن محصولات در فاکتورهای فروش" },
    { value: "factor_commisions", label: "مجموع کارمزد" },
    { value: "pure_factor_counts", label: "تعداد خالص فاکتورها" },
    { value: "pure_gross_sale", label: "مبلغ خالص پرداختی فاکتورها" },
    { value: "gross_rejected", label: "مبلغ فاکتورهای مرجوعی" },
    { value: "pure_sale", label: "فروش خالص" },
    { value: "rejected_product_count", label: "تعداد محصولات مرجوعی" },
    { value: "pure_product_count", label: "تعداد خالص محصولات فروخته شده" },
    { value: "rejedted_product_weight", label: "وزن محصولات مرجوعی" },
    { value: "pure_product_weight", label: "وزن محصولات در تمام فاکتورها" },
    { value: "users_count", label: "تعداد مشتریان" },
    { value: "new_users_count", label: "تعداد مشتریان جدید" },
    { value: "old_users_count", label: "تعداد مشتریان تکراری" },
    { value: "percent_users", label: "درصد مشتریان تکراری" },
    { value: "percent_rejected_count", label: "درصد کالاهای مرجوعی" },
    { value: "percent_rejected_amount", label: "درصد مبلغ مرجوعی" },
    { value: "sum_discount", label: "مبلغ تخفیف فاکتورها" },
    { value: "gross_new_users", label: "مجموع درآمد از مشتریان جدید" },
  ];

  const options_keys = {
    "تعداد فاکتورهای فروش": "sale_factor_count",
    "تعداد فاکتورهای مرجوعی": "rejected_factor_count",
    "میانگین تعداد محصول در فاکتور": "factor_product_average",
    "میانگین تعداد سطر فاکتورها": "factor_rows_average",
    "میانگین مبلغ فاکتورها": "factor_amount_average",
    "میانگین مبلغ کالاها": "factor_amount_product_average",
    "میانگین مبلغ درامد خالص از مشتری": "customer_income_average",
    "فروش ناخالص": "gross_sale",
    "تعداد ناخالص محصول فروخته شده": "factor_product_count",
    "وزن محصولات در فاکتورهای فروش": "factor_product_weight",
    "مجموع کارمزد": "factor_commisions",
    "تعداد خالص فاکتورها": "pure_factor_counts",
    "مبلغ خالص پرداختی فاکتورها": "pure_gross_sale",
    "مبلغ فاکتورهای مرجوعی": "gross_rejected",
    "فروش خالص": "pure_sale",
    "تعداد محصولات مرجوعی": "rejected_product_count",
    "تعداد خالص محصولات فروخته شده": "pure_product_count",
    "وزن محصولات مرجوعی": "rejedted_product_weight",
    "وزن محصولات در تمام فاکتورها": "pure_product_weight",
    "تعداد مشتریان": "users_count",
    "تعداد مشتریان جدید": "new_users_count",
    "تعداد مشتریان تکراری": "old_users_count",
    "درصد مشتریان تکراری": "percent_users",
    "درصد کالاهای مرجوعی": "percent_rejected_count",
    "درصد مبلغ مرجوعی": "percent_rejected_amount",
    "مبلغ تخفیف فاکتورها": "sum_discount",
    "مجموع درآمد از مشتریان جدید": "gross_new_users",
  };

  const [selectedOption1, setSelectedOption1] = React.useState(
    "میانگین تعداد سطر در فاکتور"
  );
  const [selectedOption1_value, setSelectedOptionValue1] = React.useState(
    results.date1.factor_rows_average
  );
  const [selectedOption1_improve, setSelectedOptionImprove1] =
    React.useState("0");

  const [selectedOption2, setSelectedOption2] = React.useState(
    "میانگین تعداد محصول در فاکتور"
  );
  const [selectedOption2_value, setSelectedOptionValue2] = React.useState(
    results.date1.factor_product_average
  );
  const [selectedOption2_improve, setSelectedOptionImprove2] =
    React.useState("0");

  const [selectedOption3, setSelectedOption3] = React.useState(
    "تعداد فاکتورهای فروش"
  );
  const [selectedOption3_value, setSelectedOptionValue3] = React.useState(
    results.date1.sale_factor_count
  );
  const [selectedOption3_improve, setSelectedOptionImprove3] =
    React.useState("0");

  const [selectedOption4, setSelectedOption4] = React.useState(
    "تعداد فاکتورهای مرجوعی"
  );
  const [selectedOption4_value, setSelectedOptionValue4] = React.useState(
    results.date1.rejected_factor_count
  );
  const [selectedOption4_improve, setSelectedOptionImprove4] =
    React.useState("0");

  const [selectedOption5, setSelectedOption5] = React.useState(
    "میانگین مبلغ فاکتورها"
  );
  const [selectedOption5_value, setSelectedOptionValue5] = React.useState(
    results.date1.factor_amount_average
  );
  const [selectedOption5_improve, setSelectedOptionImprove5] =
    React.useState("0");

  const [selectedOption6, setSelectedOption6] = React.useState(
    "میانگین مبلغ کالاها"
  );
  const [selectedOption6_value, setSelectedOptionValue6] = React.useState(
    results.date1.factor_amount_product_average
  );
  const [selectedOption6_improve, setSelectedOptionImprove6] =
    React.useState("0");

  useEffect(() => {
    setSelectedOptionValue1(results.date1[options_keys[selectedOption1]]);
    setSelectedOptionValue2(results.date1[options_keys[selectedOption2]]);
    setSelectedOptionValue3(results.date1[options_keys[selectedOption3]]);
    setSelectedOptionValue4(results.date1[options_keys[selectedOption4]]);
    setSelectedOptionValue5(results.date1[options_keys[selectedOption5]]);
    setSelectedOptionValue6(results.date1[options_keys[selectedOption6]]);
    if (results.percentage !== undefined) {
      setSelectedOptionImprove1(
        results.percentage[options_keys[selectedOption1]]
      );
      setSelectedOptionImprove2(
        results.percentage[options_keys[selectedOption2]]
      );
      setSelectedOptionImprove3(
        results.percentage[options_keys[selectedOption3]]
      );
      setSelectedOptionImprove4(
        results.percentage[options_keys[selectedOption4]]
      );
      setSelectedOptionImprove5(
        results.percentage[options_keys[selectedOption5]]
      );
      setSelectedOptionImprove6(
        results.percentage[options_keys[selectedOption6]]
      );
    } else {
      setSelectedOptionImprove1(0);
      setSelectedOptionImprove2(0);
      setSelectedOptionImprove3(0);
      setSelectedOptionImprove4(0);
      setSelectedOptionImprove5(0);
      setSelectedOptionImprove6(0);
    }
  });
 
  return (
    <>
     
      <div className="my-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {/* {response} */}
        
          <div className="min-h-[13rem] cursor-pointer rounded-md bg-white p-2 shadow-lg dark:bg-navy-700 dark:text-white">
          {ShowValues(
            results,
            options,
            selectedOption1,
            selectedOption1_value,
            setSelectedOption1,
            setSelectedOptionValue1,
            setSelectedOptionImprove1,
            selectedOption1_improve
          )    
        }
       </div>
        <div className="min-h-[13rem] cursor-pointer rounded-md bg-white p-2 shadow-lg dark:bg-navy-700 dark:text-white">
          {ShowValues(
            results,
            options,
            selectedOption2,
            selectedOption2_value,
            setSelectedOption2,
            setSelectedOptionValue2,
            setSelectedOptionImprove2,
            selectedOption2_improve
          )}
        </div>
        <div className="min-h-[13rem] cursor-pointer rounded-md bg-white p-2 shadow-lg dark:bg-navy-700 dark:text-white">
          {ShowValues(
            results,
            options,
            selectedOption3,
            selectedOption3_value,
            setSelectedOption3,
            setSelectedOptionValue3,
            setSelectedOptionImprove3,
            selectedOption3_improve
          )}
        </div>
        <div className="min-h-[13rem] cursor-pointer rounded-md bg-white p-2 shadow-lg dark:bg-navy-700 dark:text-white">
          {ShowValues(
            results,
            options,
            selectedOption4,
            selectedOption4_value,
            setSelectedOption4,
            setSelectedOptionValue4,
            setSelectedOptionImprove4,
            selectedOption4_improve
          )}
        </div>
        <div className="min-h-[13rem] cursor-pointer rounded-md bg-white p-2 shadow-lg dark:bg-navy-700 dark:text-white">
          {ShowValues(
            results,
            options,
            selectedOption5,
            selectedOption5_value,
            setSelectedOption5,
            setSelectedOptionValue5,
            setSelectedOptionImprove5,
            selectedOption5_improve
          )}
        </div>
        <div className="min-h-[13rem] cursor-pointer rounded-md bg-white p-2 shadow-lg dark:bg-navy-700 dark:text-white">
          {ShowValues(
            results,
            options,
            selectedOption6,
            selectedOption6_value,
            setSelectedOption6,
            setSelectedOptionValue6,
            setSelectedOptionImprove6,
            selectedOption6_improve
          )}
        </div>
      </div>
    </>
  );
}

export { ShowInfo };
