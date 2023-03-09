import React from "react";
import { useSelector } from "react-redux";
import CartFooter from "./CartFooter";
import { Table } from "../components";
import Row from "./Row";
// import { selectCartTotal } from "../../lib/redux/selectors";

function Cart({ value }) {
  const items = useSelector((state) => state.cart.items);
  // const total = useSelector(selectCartTotal);
  // debugger;
  // console.log(value);
  return (
    <Table
      items={items}
      heading="My Shopping Cart"
      subheading="items in your cart"
    >
      <tbody>
      {!items.length &&<tr><td>No Items in the cart yet</td></tr>}
        {/* {item} */}
        {items.map((item) => (
          <Row key={item.id} {...item} />
        ))}

      </tbody>
      <tbody>
      <CartFooter  />

      </tbody>
      
      
    </Table>
  );
}
export default Cart;
