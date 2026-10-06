import { Navigate, Route, Routes } from "react-router";
import Home from "../../pages/home";
export default function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/auth/*' element={<Navigate to={"/"} replace />} />
      <Route path='*' element={<Navigate to={"/"} replace />} />
    </Routes>
  );
}