import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";

const RouterPrincipal = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default RouterPrincipal;
