import { useContext } from "react"
import CartContext from "../../context/CartContext"
import { CartItem } from "../../types/CartItem";
import { CartActionType } from "../../reducers/CartReducer";
import { Button } from "../../components/Button";
import { FaMinus, FaPlus, FaTrash } from "../../icons";

export const Cart = () => {
    const { cart, dispatch } = useContext(CartContext);

    const totalCartPrice = cart.reduce(
        (total, item: CartItem) => total + item.product.price * item.quantity,
        0
    );

    const handleRemoveFromCart = (cartItem: CartItem) => {
        dispatch({
            type: CartActionType.REMOVE_ITEM,
            payload: cartItem,
        })
    }

    const handleChangeQuantity = (cartItem: CartItem, change: number) => {
        dispatch({
            type: CartActionType.CHANGE_QUANTITY,
            payload: { ...cartItem, quantity: change },
        });
    };

    const handleResetCart = () => {
        dispatch({
            type: CartActionType.RESET_CART,
            payload: null,
        });
    };

    return (

        <div className="cart-wrapper">
            <h2>Shopping Cart</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-div">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.product.id} className="cart-item">
                                <div className="item-details">
                                    <div className="product-img">
                                    <img src={item.product.image} alt={item.product.name} />
                                    </div>
                                    <div className="product-text">
                                        <h3>{item.product.name}</h3>
                                        <p>{item.product.price} kr</p>
                                    </div>
                                </div>
                                <div className="item-actions">
                                    <div className="quantity-controls">
                                        <Button className="minus-btn" onClick={() => handleChangeQuantity(item, -1)}><FaMinus /></Button>
                                        <span>{item.quantity}</span>
                                        <Button className="plus-btn" onClick={() => handleChangeQuantity(item, 1)}><FaPlus /></Button>
                                    </div>
                                    <Button className="trash-btn" onClick={() => handleRemoveFromCart(item)}><FaTrash /></Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Total: {totalCartPrice} kr</h3>
                        <Button className="trash-btn" onClick={handleResetCart}>Clear Cart</Button>
                        <Button className="submit-btn" disabled={cart.length === 0}>Proceed to Checkout</Button>
                    </div>
                </div>
            )}
        </div>
    )
}