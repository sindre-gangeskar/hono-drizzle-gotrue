import { useNavigate } from "react-router";
import useSession from "../hooks/useSession"
import Button from "./Button";

export default function Navbar() {
  const { session, clearSession } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate('/auth/login');
  }

  return <div className="sticky top-0 left-0 p-6 flex mx-auto mt-4 overflow-hidden rounded-2xl 
  backdrop-blur-3xl
  before:content-['']
  before:w-full
  before:absolute
  before:inset-0
  before:opacity-15
  h-14
  justify-between items-center">
    <div id="left-content">more stuff</div>
    <div className="">&nbsp;</div>
    <div id="right-content"><p>stuff</p></div>
    {session && (<Button className="z-1" type="button" onClick={handleLogout}>Log out</Button>)}
  </div>
}