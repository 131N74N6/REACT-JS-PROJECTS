import { memo } from "react";

function Cart({ 
    cart, totalItem, totalPrice, checkOut, clearAllItem, increment, decrement, removeItem 
}) {
    return (
        <div className="cart-wrap">
            <div className="detail-info">
                <div>total item : {totalItem}</div>
                <div>total price : ${totalPrice.toFixed(2)}</div>
                <div className="btn-group">
                    <button type="button" onClick={checkOut}>Check Out</button>
                    <button type="button" onClick={clearAllItem}>Remove All</button>
                </div>
            </div>
            <div className="cart-content">
                {cart.length > 0 ? 
                    cart.map((c, index) => (
                        <div className="selected-card" key={`selected-product-${index}`}>
                            <div>{c.title}</div>
                            <div className="image-wrap">
                                <img src={c.images[0]} alt={c.title}/>
                            </div>
                            <div>Price : ${c.price}</div>
                            <div>Total item : {c.quantity}</div>
                            <div>Total Price : ${(c.quantity * c.price).toFixed(2)}</div>
                            <div className="btn-group">
                                <button type="button" onClick={() => increment(c.id)}>+</button>
                                <button type="button" onClick={() => decrement(c.id)}>-</button>
                                <button type="button" onClick={() => removeItem(c)}>Remove</button>
                            </div>
                        </div>
                    )) : <div>keranjangmu masih kosong</div> 
                }
            </div>
        </div>
    )
}

export default memo(Cart);