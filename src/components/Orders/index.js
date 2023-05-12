import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "../components";
import Row from "./Row";
import { GET_ORDERS } from "../../lib/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
// import {  useLocation } from "react-router-dom";


function Orders() {
  
  
 

  const {profile} = useSelector((state)=>state.user)
 
    const { loading, error, data } = useQuery(GET_ORDERS, {
      variables: { ownerId: profile.id },
    })
    
 
    // const items = useSelector((state) => state.cart.items);
 const items=data?.orders




  return (


    <Table heading="My Orders" subheading="orders in your account" items={items}>
            <tbody>
      {!items?.length &&<tr><td>No Items in the cart yet</td></tr>}
        {/* {item} */}
        {items?.map((item) => (
          <Row key={item.id} {...item} />
        ))}

      </tbody>
      
      <tbody className="row mt-4 d-flex">
        <tr className="col-sm-4 mb-3 mb-m-1 text-md-left">
          <td>
          <Link to="/">
            <i className="fas fa-arrow-left mr-2"></i> Continue Shopping
          </Link>
          </td>
        </tr>
      </tbody>
      
    </Table>
  );
  }
export default Orders;
