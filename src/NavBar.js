import { Container, Navbar } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const NavBar = () => {
  let getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  let totalItems = 0;

  getCartItems.map((data) => (totalItems += data.quantity));

  return (
    <>
      <Navbar className="bg-dark">
        <Container fluid>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand className="text-white fs-2">MysticMart</Navbar.Brand>
          </Link>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text></Navbar.Text>
            <Link to="/cart/" style={{ textDecoration: "none" }}>
              <AiOutlineShoppingCart className="fs-3 text-white me-2" />
              {totalItems ? (
                <>
                  <span className="cartItemCount">{totalItems}</span>
                </>
              ) : (
                <></>
              )}
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
