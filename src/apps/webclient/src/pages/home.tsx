import Container from "../components/Container"
import { Link } from "react-router"
import Navbar from "../components/Navbar"
import useSession from "../hooks/useSession"
export default function Home() {
  const { session } = useSession();
  return (
    <>
      <Navbar />
      <Container>
        <p className="text-3xl">Home</p>
        {session?.user ? <p>You are logged in as {session.user.email}</p> :
          <Link to={"/login"}>Click here to go to the login page</Link>
        }
      </Container>
    </>
  );
}