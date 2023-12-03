import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import Home from "./Home";
import ProductsPage from "./ProductsPage";
import ViewProduct from "./ViewProduct";

const SiteRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/" element={<ProductsPage />}></Route>
          <Route path="/products/:id" element={<ViewProduct />}></Route>
          <Route path="/cart/" element={<Cart />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default SiteRoutes;
