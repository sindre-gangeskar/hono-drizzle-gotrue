import { Navigate, Route, Routes } from "react-router";
import Login from "../../pages/login";

export default function PublicRoutes() {
  return <Routes>
    <Route path='/auth/login' element={<Login />} />
    <Route path='*' element={<Navigate to={"/auth/login"} replace />} />
  </Routes>
}