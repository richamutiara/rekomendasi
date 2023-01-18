import React, { Fragment } from "react";
import NavHeader from "./components/NavHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import OptionPage from "./components/OptionPage";
import MainPage from "./components/MainPage";

function App() {
  return (
    <>
      <NavHeader />
      {/* <OptionPage />
      <DetailPage /> */}
      <MainPage />
    </>
  );
}

export default App;
