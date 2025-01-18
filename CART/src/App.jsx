import { useCallback, useState } from "react";
import productData from "./Data/products";
import Modal from "./Components/Modal";
import DisplayProduct from "./Components/DisplayProduct";
import Cart from "./Components/Cart";
import "./App.css";

export default function App() {
    const [cart, setCart] = useState([]);
    const [modal, setModal] = useState({ isShow: false, message: "" });

    const increment = useCallback((id) => {
        setCart((currentCondition) => {
            const index = currentCondition.findIndex((item) => item.id === id);
            const updated = [...currentCondition]
            if (index !== -1) {
                updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 }
                return updated;
            }
            else {
                return currentCondition;
            }
        });
    }, []);

    const decrement = useCallback((id) => {
        setCart((currentCondition) => {
            const index = currentCondition.findIndex((item) => item.id === id);
            const updated = [...currentCondition]
            const changeQuantity = updated[index].quantity - 1;
            if (index !== -1) {
                if (changeQuantity > 0) {
                    updated[index] = { ...updated[index], quantity: changeQuantity }
                    return updated;
                }
                else {
                    return currentCondition.filter((item) => item.id !== id);
                }
            }
            else {
                return currentCondition;
            }
        });
    }, []);

    const addToCart = useCallback((selected) => {
        setCart((currentCondition) => {
            const isExist = currentCondition.find((item) => item.id === selected.id);
            if (isExist) {
                return currentCondition.map((item) => item.id === selected.id ? 
                    { ...item, quantity: item.quantity + 1 } : item
                );
            }
            else {
                return [...currentCondition, { ...selected, quantity: 1 }]
            }
        });
    }, []);

    const removeItem = useCallback((selected) => {
        const removed = cart.filter((c) => c !== selected );
        setCart([...removed]);
    }, []);

    const clearAllItem = useCallback(() => {
        if (cart.length === 0) {
            setModal({ isShow: true, message: "Kamu belum menambahkan produk satu pun" });
        }
        else {
            setModal({ isShow: true, message: "Keranjang dikosongkan" });
            setCart([]);
        }
    }, [cart]);

    const checkOut = useCallback(() => {
        if (cart.length > 0) {
            setModal({ isShow: true, message: "Terima kasih sudah berbelanja 😊" });
            setCart([]);
        }
        else {
            setModal({ isShow: true, message: "Kamu belum menambahkan produk satu pun" });
        }
    }, [cart]);

    const totalItem = cart?.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart?.reduce((total, item) => total + item.quantity * item.price, 0);

    return (
        <div className="shopping-cart">
            <Cart 
                cart={cart} 
                totalItem={totalItem}
                totalPrice={totalPrice}
                checkOut={checkOut}
                clearAllItem={clearAllItem}
                increment={increment} 
                decrement={decrement} 
                removeItem={removeItem}
            />
            <DisplayProduct 
                productData={productData} 
                addToCart={addToCart}
            />
            <Modal 
                isShow={modal.isShow}
                text={modal.message} 
                onClick={() => setModal({ isShow: false, message: modal.message })}
            /> 
        </div>
    )
}
