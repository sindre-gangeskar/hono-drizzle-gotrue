import { useLocation, useNavigate } from "react-router"
import useSession from "../../hooks/useSession"
import { useEffect } from "react";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
export default function AppRouter() {
  const { session } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!session && !location.pathname.startsWith('/auth'))
      navigate('/auth/login');

    if (session && location.pathname.startsWith('/auth'))
      navigate('/');
  }, [ location.pathname, session, navigate ]);

  return (
    session ? <ProtectedRoutes /> : <PublicRoutes />
  );
}