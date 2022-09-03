import { createContext, ReactNode, useContext, useState } from "react";
import { ShopingCart } from "../components/ShopingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShopingContextProviderProps = {
  children: ReactNode;
};

type ShopingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromItems: (id: number) => void;
  cartQuantity: number;
  cartItem: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShopingCartContext = createContext({} as ShopingCartContext);

export function useShopingContext() {
  return useContext(ShopingCartContext);
}

export function ShopingContextProvider({
  children,
}: ShopingContextProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItem, setCartItem] = useLocalStorage<CartItem[]>(
    "shopping cart",
    []
  );

  const cartQuantity = cartItem.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: number) {
    setCartItem((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: number) {
    setCartItem((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromItems(id: number) {
    setCartItem((currItems) => currItems.filter((item) => item.id !== id));
  }

  return (
    <ShopingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromItems,
        cartItem,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShopingCart isOpen={isOpen} />
    </ShopingCartContext.Provider>
  );
}
