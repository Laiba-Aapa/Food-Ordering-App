import React, {  useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from './Store/CartContext'
import {currencyFormatter} from '../util/formatting'
import Button from './UI/Button.jsx';
import UserProgress from './Store/UserProgressContext.jsx';
import CartItem from './CartItem.jsx';

export default function Cart() {
    const cartCtx=useContext(CartContext);
    const progressCtx = useContext(UserProgress);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) =>{
        return totalPrice + item.quantity * item.price
    },0);

    function handleCloseCart(){
        progressCtx.hideCart();
    }
    function handleOpenCheckout(){
        progressCtx.showCheckout();
    }
    
  return (
    <Modal className='cart' open={progressCtx.progress === 'cart'} onClose={progressCtx.progress === 'cart'?handleCloseCart:null}>
        <h2>Your Cart </h2>
        <ul>{cartCtx.items.map((item)=>(
            <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} OnIncrease={()=>cartCtx.addToCart(item)} onDecrease={()=>cartCtx.removeItem(item.id)}/>
        ))}</ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length > 0 && <Button onClick={handleOpenCheckout}>Go To Checkout</Button>}
        </p>
    </Modal>
  )
}
