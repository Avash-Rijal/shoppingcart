import axios from "axios";
import NavBar from "./NavBar";
import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [productsDetails, setProductsDetails] = useState([]);
  const [filterValue, setFilterValue] = useState("All");
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [filterValue]);

  const filterProducts = (e) => {
    e.preventDefault();
    setFilterValue(e.target.value);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/`);
      setProductsDetails(response.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="productsPage">
      <NavBar></NavBar>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p className="fs-3 mt-2 mb-4 ms-4">Products List: </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p className="fs-5 mt-2 me-3">Add Filter: </p>
          <select
            class="form-select me-4"
            aria-label="Default select example"
            style={{ width: "150px", height: "40px" }}
            onChange={filterProducts}
          >
            <option selected>All</option>
            <option value="men's clothing">Men's</option>
            <option value="women's clothing">Women's</option>
            <option value="jewelery">Jewelry</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>

      <div className="productsList">
        {productsDetails.map((data) =>
          filterValue === "All" ? (
            <>
              <Card
                style={{
                  width: "25rem",
                  height: "14rem",
                  padding: "5px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                className="col-xs-6"
              >
                <div style={{ width: "10rem", height: "10rem" }}>
                  <Card.Img variant="top" src={data.image} />
                </div>

                <div>
                  <Card.Body>
                    <Card.Title style={{ fontSize: "15px" }}>
                      {data.title}
                    </Card.Title>
                    <Card.Text>${data.price}</Card.Text>
                    <Link to={`/products/${data.id}`}>
                      <Button variant="dark">Show More</Button>
                    </Link>
                  </Card.Body>
                </div>
              </Card>
            </>
          ) : (
            <>
              {data.category === filterValue ? (
                <>
                  <Card
                    style={{
                      width: "25rem",
                      height: "12.5rem",
                      padding: "5px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    className="col-xs-6"
                  >
                    <div style={{ width: "10rem", height: "10rem" }}>
                      <Card.Img variant="top" src={data.image} />
                    </div>

                    <div>
                      <Card.Body>
                        <Card.Title style={{ fontSize: "15px" }}>
                          {data.title}
                        </Card.Title>
                        <Card.Text>${data.price}</Card.Text>
                        <Link to={`/products/${data.id}`}>
                          <Button variant="dark">Show More</Button>
                        </Link>
                      </Card.Body>
                    </div>
                  </Card>
                </>
              ) : (
                <></>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
