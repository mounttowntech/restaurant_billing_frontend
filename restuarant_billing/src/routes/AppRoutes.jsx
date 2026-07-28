import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../../src/pages/Auth/Login/Login";
import Register from "../../src/pages/Auth/Register/Register";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;