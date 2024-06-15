import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    updateCartQuantity,
  } = useContext(ShopContext);

  const [promoCode, setPromoCode] = useState("");

  const [discount, setDiscount] = useState(0);

  const [success, setSucess] = useState("");

  const [appliedPromoCodes, setAppliedPromoCodes] = useState([]);

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value); // Update the promo code state variable
  };

  const handlePromoCodeSubmit = () => {
    if (appliedPromoCodes.includes(promoCode)) {
      setSucess("Promo code is already applied!!");
    } else if (promoCode === "guru106") {
      setDiscount(10);
      setAppliedPromoCodes([...appliedPromoCodes, promoCode]);
      setSucess("Promo code applied successfully!!");
    } else {
      setSucess("Invalid promo code!!");
    }
    setPromoCode("");
  };
  const handleQuantityChange = (productId, newQuantity) => {
    updateCartQuantity(productId, newQuantity);
  };
  const getTotalWithDiscount = () => {
    const totalAmount = getTotalCartAmount();
    return totalAmount > discount ? totalAmount - discount : 0;
  };

  return (
    <div className="cart-items">
      <div className="cart-items-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cart-items-format cart-items-format-main">
                <img className="cart-items-product-icon" src={e.image} alt="" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <select
                  className="cart-items-quantity"
                  value={cartItems[e.id]}
                  onChange={(event) =>
                    handleQuantityChange(e.id, parseInt(event.target.value))
                  }
                >
                  {[...Array(10).keys()].map((x) => (
                    <option value={x + 1}>{x + 1}</option>
                  ))}
                </select>
                {/* <button className="cart-items-quantity">
                  {cartItems[e.id]}
                </button> */}
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className="cart-items-remove-icon"
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  src={remove_icon}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cart-items-down">
        <div className="cart-items-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cart-items-total-items">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-items-total-items">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-items-total-items">
              <p>Discount</p>
              <p>-${discount}</p>
            </div>

            <div className="cart-items-total-items">
              <h3>Total</h3>
              <h3>${getTotalWithDiscount()}</h3>
            </div>
          </div>

          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
      <div className="cart-items-promocode">
        <p>If you have a promocode, Enter it here</p>
        <div className="cart-items-promobox">
          <input
            type="text"
            placeholder="Promo Code"
            value={promoCode}
            onChange={handlePromoCodeChange}
          />
          <button onClick={handlePromoCodeSubmit}>SUBMIT</button>
          {success && <p className="promo-message">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
