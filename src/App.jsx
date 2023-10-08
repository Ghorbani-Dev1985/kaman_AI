import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Main from "Layouts/Main/Main";
import AdminLayout from "Layouts/admin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./views/auth/SignIn";
import AnalyseData from "Components/config/Analyse";
import ImportData from "Components/config/Import_data";
import SmsPanel from "Components/config/SmsPanel";
import Users from "Components/Users/Users";
import Segment from "Components/Customers/Segment";
import Layout from "Layouts/Layout";
import Transition from "Components/Customers/Transition";
import Retention from "Components/Customers/Retention";
import LifeTime from "Components/Customers/LifeTime";
import ShareShoping from "Components/Customers/ShareShopping";
import Groups from "Components/Customers/Groups";
import Trends from "Components/Trends/Trends";
import Clustering from "Components/Customers/Clustering";
import ShoppingCartAnalysis from "Components/Products/ShoppingCartAnalysis";
import ProductPerformanceAnalysis from "Components/Products/ProductPerformanceAnalysis";
import PredictingCustomerFall from "Components/PredictiveAnalytics/PredictingCustomerFall";
import PurchaseInterval from "Components/PredictiveAnalytics/PurchaseInterval";


const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        closeOnClick
        rtl={true}
        autoClose={3000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<SignIn />} />
          <Route element={<Layout />} >
          <Route path="main/*" element={<Main />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/customerSegment" element={<Segment />} />
          <Route path="/transition" element={<Transition />} />
          <Route path="/retention" element={<Retention />} />
          <Route path="/lifeTime" element={<LifeTime />} />
          <Route path="/shareShopping" element={<ShareShoping />} />
          <Route path="/clustering" element={<Clustering />} />
          <Route path="/groups" element={<Groups />} /> 
          <Route path="/shoppingCartAnalysis" element={<ShoppingCartAnalysis />} />
          <Route path="/productPerformanceAnalysis" element={<ProductPerformanceAnalysis />} />
          <Route path="/predictingCustomerFall" element={<PredictingCustomerFall />} />
          <Route path="/purchaseInterval" element={<PurchaseInterval />} />
          <Route path="/users" element={<Users />} />
          <Route path="/analyse" element={<AnalyseData />} />
          <Route path="/importData" element={<ImportData />} />
          <Route path="/smsPanel" element={<SmsPanel />} />
          <Route path="admin/*" element={<AdminLayout />} />
          </Route>
      </Routes>
    </>
  );
};

export default App;
