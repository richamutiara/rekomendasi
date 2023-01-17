import { Fragment } from "react";
import NavHeader from "./components/NavHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import OptionPage from "./components/OptionPage";

function App() {
  return (
    <Fragment>
      <NavHeader />
      {/* <HomePage /> */}
      <OptionPage />
      {/* <MainPage /> */}
      {/* <DetailPage /> */}
    </Fragment>
  );
}

export default App;
