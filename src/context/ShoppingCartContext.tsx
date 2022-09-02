import { createContext, ReactNode, useContext } from "react";

type ShopingContextProviderProps = {
    children: ReactNode
}

const ShopingCartContext = createContext({})

export function useShopingContext(){
    return useContext(ShopingCartContext)
}

export function ShopingContextProvider({children}: ShopingContextProviderProps){
    return(
        <ShopingCartContext.Provider value={{}} >
            {children}
        </ShopingCartContext.Provider>
    )
}