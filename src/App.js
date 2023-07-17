import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Main from "layouts/main";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./views/auth/SignIn";
import AnalyseData from "components/config/Analyse";
import ImportData from "components/config/Import_data";

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
      <Route path="main/*" element={<Main />} />
      <Route path="/analyse" element={<AnalyseData />} />
        <Route path="/importData" element={<ImportData />} />
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
    </Routes>
    </>
  );
};

export default App;
