import { Navigate, Route, Routes } from "react-router";
import Auth from "../../pages/auth";

export default function PublicRoutes() {
  return <Routes>
    <Route path='/auth/login' element={<Auth />} />
    <Route path='/auth/signup' element={<Auth />} />
    <Route path='*' element={<Navigate to={"/auth/login"} replace />} />
  </Routes>
}