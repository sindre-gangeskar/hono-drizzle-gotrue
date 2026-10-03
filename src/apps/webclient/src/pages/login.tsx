import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import { Link } from "react-router";
export default function Login() {
  return <div className="flex flex-row h-screen">
    <div className="img-wrapper w-fit h-screen max-sm:hidden block ">
      <div id="img-wrapper" className="relative z-0 h-full after:content-[''] after:z-1 after:inset-0 after:absolute after:backdrop-blur-sm">
        <img src="images/fields.jpg" className="relative z-0 h-full object-cover" alt="" />
      </div>
    </div>
    <Container className="h-screen flex justify-center flex-col max-w-300 space-y-4">
      <p className="text-3xl self-center">Login</p>
      <form action="" className="w-full flex flex-col justify-center self-center space-y-4 items-center max-w-sm">
        <Input className="w-full form-control" type="email" id="email" placeholder="Enter your email" />
        <Input className="w-full form-control" placeholder="Enter your password" type="password" />
        <Button className="w-full" loading={false}>Log in</Button>
        <Link className="" to="/login">Forgot your password?</Link>
      </form>
    </Container>
  </div>
}