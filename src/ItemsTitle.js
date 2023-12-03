import axios from "axios";
import { useEffect, useState } from "react";

const ItemsTitle = (props) => {
  const [itemTitle, setItemTitle] = useState("");

  useEffect(() => {
    getItemsTitle();
  }, []);

  const getItemsTitle = async () => {
    let fetchItems = await axios.get(
      `https://fakestoreapi.com/products/${props.itemId}`
    );

    setItemTitle(fetchItems.data.title);
  };

  return (
    <>
      <p>
        {itemTitle}
        <b> X {props.itemQuantity}</b>
      </p>
    </>
  );
};

export default ItemsTitle;
