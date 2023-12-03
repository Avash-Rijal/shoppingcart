import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

const AddedToCartItems = (props) => {
  const [getProductDetails, setGetProductDetails] = useState("");

  const [modalShow, setModalShow] = useState(false);

  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
      // Reset reloadPage to false after reloading to avoid continuous reloading
      setReloadPage(false);
    }
  }, [reloadPage]);

  useEffect(() => {
    getItem();
  }, []);

  let getItemDetails = JSON.parse(localStorage.getItem("cartItems")) || [];

  let itemsObject = {};

  getItemDetails.map(
    (data) =>
      data.id === getProductDetails.id && (itemsObject[data.id] = data.quantity)
  );

  const getItem = async () => {
    const itemFetch = await axios.get(
      `https://fakestoreapi.com/products/${props.itemId}`
    );

    setGetProductDetails(itemFetch.data);
  };

  const removeTheItem = () => {
    // console.log(props.itemId);

    const indexOfObject = getItemDetails.findIndex(
      (obj) => obj.id === props.itemId
    );
    console.log(indexOfObject);
    const updatedArray = getItemDetails.filter(
      (item) => item.id !== props.itemId
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedArray));
    setReloadPage(true);
  };

  let productPrice =
    getProductDetails.price * itemsObject[getProductDetails.id];

  return (
    <>
      <Card key={getProductDetails} className="ms-3">
        <Card.Img
          style={{
            width: "12rem",
            height: "12rem",
            padding: "6px",
            marginLeft: "4rem",
          }}
          variant="top"
          src={getProductDetails.image}
        />
        <Card.Body>
          <Card.Text>{getProductDetails.title}</Card.Text>
          <Card.Title>${productPrice}</Card.Title>
          Quantity: {itemsObject[getProductDetails.id]}
          <div className="buttons mt-4 me-5 mb-2">
            <Button
              variant="dark"
              onClick={() => {
                setModalShow(true);
              }}
            >
              Buy Now
            </Button>
            <Button variant="outline-secondary light" onClick={removeTheItem}>
              Remove
            </Button>
          </div>
        </Card.Body>
      </Card>

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

export default AddedToCartItems;
