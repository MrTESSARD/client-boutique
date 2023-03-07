import React from "react";
import { useSelector } from "react-redux";
import CartFooter from "./CartFooter";
import { Table } from "../components";
import  Row  from "./Row";



function Cart({ value }) {
  const items = useSelector((state) => state.items);
  // debugger;
  console.log(value);
  return (
    <Table 
    items={items} 
    heading="My Shopping Cart" 
    subheading="items in your cart">
      
      <tbody>
        {!items.length &&          <div>No Items in the cart yet </div>}
        {items.map((item)=>(<Row key={item.id} {...item}/>))}

      </tbody>
      <CartFooter />
    </Table>
  );
}
export default Cart;
