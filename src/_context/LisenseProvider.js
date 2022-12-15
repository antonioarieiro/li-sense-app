/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import LisenseContext from "./LisenseContext";

export const LisenseProvider = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [isSeller, setSeller] = useState(false);
  const [company, setCompany] = useState(false);
  const [cart, setCart] = useState([]);
  const [search, setCurrentSearch] = useState('');

  React.useEffect(() => {
    var cartItems = localStorage.getItem("cart");
    if (cartItems) {
      var jsonItems = JSON.parse(cartItems);
      setCart(jsonItems);
    }
  }, []);

  const addItemInCart = (item) => {

    cart.push(item);
    alert(`Produto ${item.nome} adicionado ao carrinho`)
    localStorage.setItem("cart", JSON.stringify(cart));

  };

  const filterCart = (id) => {
    setCart(cart.filter((value) => value.id !== id));
    var filtered = cart.filter((value) => value.id !== id);
    localStorage.setItem("cart", JSON.stringify(filtered));
  };

  const clearCart = () => {
    setCart([])
    const empty = []
    localStorage.setItem("cart", empty);
  }
  return (
    <LisenseContext.Provider
      value={{
        currentProduct,
        setCurrentProduct,
        setUser,
        user,
        addItemInCart,
        cart,
        isSeller,
        setSeller,
        company,
        setCompany,
        filterCart,
        clearCart,
        search, 
        setCurrentSearch
      }}
    >
      {children}
    </LisenseContext.Provider>
  );
};
