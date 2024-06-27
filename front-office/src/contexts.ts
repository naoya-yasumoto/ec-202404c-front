import { createContext, useState, ReactNode, FC } from 'react';

// Itemの型定義
export interface Item {
    /**
     * 商品のID。
     */
    id: number;

    /**
     * 商品の名前。
     */
    name: string;

    /**
     * 商品の説明。
     */
    description: string;

    /**
     * 商品の価格。
     */
    price: number;

    /**
     * 商品の種類。 ('top', 'bottom', 'set')
     */
    itemType: 'top' | 'bottom' | 'set';

    /**
     * 商品の画像パス。
     */
    imagePath: string;
}

// OrderItemの型定義
export interface OrderItem {
    /**
     * 注文アイテムのID。
     */
    id: number;

    /**
     * 注文のID。
     */
    orderId: number;

    /**
     * 商品。
     */
    item: Item;

    /**
     * 数量。
     */
    quantity: number;

    /**
     * サイズ。
     */
    size: string;
}

// CartItemとしてOrderItemを使用
export type CartItem = OrderItem;


type ContextValue = {
    cartItems: CartItem[];
    setCartItems: (cartItems: CartItem[]) => void;
};

export const ECsiteContext = createContext<ContextValue>({} as ContextValue);