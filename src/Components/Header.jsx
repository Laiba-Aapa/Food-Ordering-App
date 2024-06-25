import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "./Store/CartContext.jsx";
import UserProgress from './Store/UserProgressContext.jsx';

export default function Header() {
  const cartctx = useContext(CartContext);
  const progressCtx = useContext(UserProgress);

  function handleOpenCartModal(){
    progressCtx.showCart();
  }

  const totalCartItems = cartctx.items.reduce((totalNoOfItems, item) => {
    return totalNoOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>Eat Curious</h1>
      </div>
      <nav>
        <Button onClick={handleOpenCartModal} textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
