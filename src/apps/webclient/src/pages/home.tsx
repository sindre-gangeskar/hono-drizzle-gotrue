import Container from "../components/Container"
import { Link } from "react-router"
import Navbar from "../components/Navbar"
export default function Home() {
  return <>
    <Navbar />
    <Container>
      <p className="text-3xl">Home</p>
      <Link to={'/login'}>Click here to go to the login page</Link>
    </Container>
  </>
}