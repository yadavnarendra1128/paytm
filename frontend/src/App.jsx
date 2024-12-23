import SignUp from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import SendMoney from "./pages/sendMoney";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="*" element={<Dashboard />} /> */}
          <Route path="*" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
