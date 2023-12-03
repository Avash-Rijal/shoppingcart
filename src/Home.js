import { Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <NavBar />
      <div className="homeContent fs-1">
        <p className="text-white pt-2  text-center">
          Welcome to <br /> MysticMart!
        </p>
        <p className="storeBio fs-5 text-white pt-3">
          Your go-to online store for trendy, comfortable clothing and unique
          finds. Elevate your wardrobe with our exclusive selection, designed to
          inspire.
        </p>
        <Link to="/products/">
          <Button variant="light" className="mt-2">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
