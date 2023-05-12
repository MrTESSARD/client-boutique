import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../lib/redux/selectors";
import GoogleBtn from "./GoogleBtn";

function CartDropdown({ show, handleOnClick }) {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);

  return (
    <div
      onClick={handleOnClick}
      className={`dropdown-menu dropdown-menu-right p-3 ${show && "show"}`}
      aria-labelledby="dropdownCart"
      style={{ minWidth: "300px" }}
    >
      <div className="d-flex justify-content-between">
        <span>
          {items.length} {!!items.length && "items"}
        </span>
        <span className="emphasis">€{total.toFixed(2)}</span>
      </div>
      <div className="dropdown-divider"></div>
      <ul
        className="shopping-cart-items pt-2 pl-0"
        aria-labelledby="dropdownCart"
      >
        {items.map((item) => {
          return (
            <li key={item.id} className="row mt-3">
              <div className="col-md-4 col-2">
                <img
                  src={`images/${item.id}.png`}
                  alt=""
                  className="img-fluid rounded mb-2 shadow"
                />
              </div>
              <div className="col-8">
                <h6>
                  <Link to="/product" state={item}>
                    {item.name}
                  </Link>
                </h6>
                <span className="text-muted">quantity: {item.quantity}</span>
                <br />
                <span className="emphasis">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <Link
        to="/cart"
        className="btn btn-md btn-block btn-orange mt-3"
        style={{ margin: 0 }}
      >
        view cart
      </Link>
    </div>
  );
}
function Header() {
  const items = useSelector((state) => state.cart.items);
  const [currentLink] = useState("");
  // const [active, setActive] = useState(false);
  const [log, setLog] = useState(false);
  function logChange(newValue) {
    setLog(newValue);
    console.log(newValue)
  }

  const [show, setShow] = useState(false);
  const links = ["cart", "orders"];
  const accessToken = localStorage.getItem("accessToken")
  useEffect(() => {
    setLog(localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken").length > 0);
    
  }, []);
  const handleOnClick = () => setShow(!show);
  return (
    <header className="target-hover">
      <nav className="navbar navbar-dark bg-dark navbar-expand-md fixed-top">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand font"
            style={{ fontSize: "30px" }}
          >
            CLICK & COLLECT
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav3"
            aria-controls="navbarNav3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarNav3">
            <ul className="navbar-nav ml-auto">
              {links.map((link, index) => {
                const isCurrent = link === currentLink;
                const isActive = link === currentLink && "active";
                return (
                  <li key={index} className={`nav-item ${isActive}`} style={link==="orders" && !log ? { pointerEvents: 'none' } : null}>
                    <Link
                      to={link}
                      className="nav-link"
                      aria-current={isCurrent}
                      
                      
                      >
                      {link}
                    </Link>
                  </li>
                );
              })}

              <li className="nav-item dropdown" onClick={() => setShow(!show)}>
                <button
                  className={`nav-link dropdown-toggle ${show && "show"}`}
                >
                  <span className="badge bg-orange">{items.length || ""}</span>
                  <i className="fas fa-shopping-cart"></i>
                </button>
                <CartDropdown  show={show} handleOnClick={handleOnClick} />
              </li>
            </ul>
            <GoogleBtn log={logChange}/>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
