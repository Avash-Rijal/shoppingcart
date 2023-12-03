import { useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import AddedToCartItems from "./AddedToCartItems";
import ItemsTitle from "./ItemsTitle";
import NavBar from "./NavBar";

const Cart = () => {
  let theItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const [modalShow, setModalShow] = useState(false);

  const [displayType, setDisplayType] = useState("none");

  const [totalPrice, setTotalPrice] = useState(0);

  const showFinalOrderCard = async () => {
    setDisplayType("block");

    const sum = theItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(sum);
  };

  return (
    <>
      <NavBar />
      <div
        className="fs-1 ms-4 me-4"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p className="mt-1">Cart: </p>
        <Button variant="dark" onClick={showFinalOrderCard}>
          Order All
        </Button>
      </div>

      <div
        className="finalOrder"
        style={{
          display: `${displayType}`,
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "1000",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          width: "80%",
          maxWidth: "30rem",
        }}
      >
        <Card style={{ width: "100%" }}>
          <Card.Body style={{ width: "100%" }}>
            <Card.Title style={{ textAlign: "center" }}>
              Total Orders
            </Card.Title>
            <Card.Body
              style={{
                width: "100%",
                textAlign: "start",
                paddingLeft: "0",
                paddingBottom: "0",
              }}
            >
              {theItems.map((data) => (
                <ItemsTitle
                  itemId={data.id}
                  itemQuantity={data.quantity}
                ></ItemsTitle>
              ))}
            </Card.Body>
            <Card.Title
              style={{ textAlign: "center", width: "100%" }}
              className="border-top pt-2 pb-2"
            >
              ${totalPrice.toFixed(2)}
            </Card.Title>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "50px",
                justifyContent: "center",
              }}
            >
              <Button variant="dark" onClick={() => setModalShow(true)}>
                Order
              </Button>
              <Button variant="dark" onClick={() => setDisplayType("none")}>
                Close
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Container className="mt-3">
        {theItems.map((data) => (
          <AddedToCartItems itemId={data.id}></AddedToCartItems>
        ))}
      </Container>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Uh-Oh</Modal.Title>
        </Modal.Header>
        <Modal.Body>You can not buy yet in this site HEHEHEHE</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
