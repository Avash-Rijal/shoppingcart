import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

const ViewProduct = () => {
  const getParams = useParams();
  const getId = getParams.id;

  useEffect(() => {
    getSingleProduct();
  }, []);

  const [getProductDetails, setGetProductDetails] = useState("");

  const [productRating, setProductRating] = useState("0");

  const [modalShow, setModalShow] = useState(false);

  const [itemsNumber, setItemsNumber] = useState(1);

  const [btnDisabled, setBtnDisabled] = useState(false);

  const getSingleProduct = async () => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${getId}`
    );
    setGetProductDetails(response.data);
    setProductRating(response.data.rating.rate);
  };

  const addToCart = (e) => {
    e.preventDefault();
    const cartItem = {
      id: getProductDetails.id,
      quantity: itemsNumber,
      price: getProductDetails.price * itemsNumber,
    };

    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingCartItemIndex = existingCartItems.findIndex(
      (item) => item.id === cartItem.id
    );

    if (existingCartItemIndex !== -1) {
      existingCartItems[existingCartItemIndex].quantity = itemsNumber;
      existingCartItems[existingCartItemIndex].price =
        getProductDetails.price * itemsNumber;
    } else {
      existingCartItems.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCartItems));

    setBtnDisabled(true);
  };

  const increaseCartItemsNumber = () => {
    setItemsNumber(itemsNumber + 1);
    setBtnDisabled(false);
  };

  const decreaseCartItemsNumber = () => {
    setItemsNumber(Math.max(itemsNumber - 1, 1));
    setBtnDisabled(false);
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="productDetails mt-5 ms-5 me-5">
        <div className="imageContainer">
          <img
            src={getProductDetails.image}
            alt="productImage"
            height="300rem"
            width="200rem"
          ></img>
        </div>

        <div className="productContents">
          <p className="fs-2 fw-bold" style={{ maxWidth: "50rem" }}>
            {getProductDetails.title}
          </p>
          <p className="fs-4">Price: ${getProductDetails.price}</p>
          <p style={{ maxWidth: "50rem" }}>{getProductDetails.description}</p>
          <div className="rating">
            Rating:
            <ProgressBar
              variant="dark"
              now={(productRating / 5) * 100}
              style={{ width: "20rem" }}
            />
          </div>
          <div className="quantity mt-3">
            Quantity:
            <Button
              variant="secondary ms-2 me-2"
              style={{ padding: "0px 6px 0px 6px" }}
              onClick={decreaseCartItemsNumber}
            >
              -
            </Button>
            <p
              style={{
                padding: "0px",
                margin: "0px",
                width: "20px",
                textAlign: "center",
              }}
            >
              {itemsNumber}
            </p>
            <Button
              variant="dark ms-2 me-2"
              style={{ padding: "0px 6px 0px 6px" }}
              onClick={increaseCartItemsNumber}
            >
              +
            </Button>
          </div>
          <div className="buttons mt-4 me-5">
            <Button variant="dark" onClick={addToCart} disabled={btnDisabled}>
              Add To Cart
            </Button>
            <Button
              variant="outline-secondary light"
              onClick={() => setModalShow(true)}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

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

export default ViewProduct;
