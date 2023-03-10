import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { selectCartTotal } from '../../lib/redux/selectors';

const styles = {
  disabled: {
    // cursor: 'not-allowed', 
    opacity: 0.5,
    
  },
  to:"/checkout" 
}

function CartFooter() {
  const total = useSelector(selectCartTotal);
const items = useSelector((state=>state.cart.items))
    return(
      
      <tr>
       <td className="text-right mb-4">
          <h4>Subtotal:</h4>
          <h1>€{total.toFixed(2)}</h1>
        </td>  
        <td className="d-flex justify-content-between">
        <Link  to="/">
          <i className="fas fa-arrow-left mr-2"></i> Continue Shopping 
        </Link>
        <Link className="btn btn-primary mb-4 btn-lg pl-5 pr-5" to={!items.length ? {} : styles.to  } style={!items.length ? styles.disabled : {}}>
          Checkout
        </Link>
      </td>
      </tr>
    )
  }
  export default CartFooter