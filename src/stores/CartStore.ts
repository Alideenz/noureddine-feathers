/** @format */

import { writable } from 'svelte/store';

// interfaces
import type I_CartItem from '$interfaces/I_CartItem';
import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';
import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';

function createCart() {
  let memoryCart: I_CartItem[] = [];

  const { subscribe, set } = writable<{
    cartItems: I_CartItem[];
    cartTotalPrice: number;
    cartTotalItems: number;
    isLoadingCartItems: boolean;
  }>({
    cartItems: [],
    cartTotalPrice: 0,
    cartTotalItems: 0,
    isLoadingCartItems: true,
  });

  const calculateTotals = (cart: I_CartItem[]) => {
    let _cartTotalPrice: number = 0;
    let _cartTotalItems: number = 0;

    cart.forEach((cartItem: I_CartItem) => {
      _cartTotalPrice =
        _cartTotalPrice + cartItem.price * cartItem.cart_item_quantity;
      _cartTotalItems = _cartTotalItems + cartItem.cart_item_quantity;
    });

    return { cartTotalPrice: _cartTotalPrice, cartTotalItems: _cartTotalItems };
  };

  const getStorage = () => {
    if (typeof window === 'undefined') return null;

    try {
      if (!window.localStorage) return null;

      const testKey = 'nf-cart-storage-test';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    } catch (error) {
      return null;
    }
  };

  const saveCartItems = (cartItems: I_CartItem[]) => {
    memoryCart = cartItems;

    const storage = getStorage();
    if (storage) storage.setItem('cart', JSON.stringify(cartItems));
  };

  const getCartItems = () => {
    let _cart: I_CartItem[] = [];
    const storage = getStorage();

    const cart: string | null = storage ? storage.getItem('cart') : null;

    if (cart) {
      try {
        _cart = JSON.parse(cart);
      } catch (error) {
        _cart = [];
        saveCartItems([]);
      }
    } else if (!storage) {
      _cart = memoryCart;
    } else {
      storage.setItem('cart', JSON.stringify([]));
    }

    const { cartTotalPrice, cartTotalItems } = calculateTotals(_cart);

    set({
      cartItems: _cart,
      cartTotalPrice,
      cartTotalItems,
      isLoadingCartItems: false,
    });

    return _cart;
  };

  const addCartItem = (
    product: I_ProductTableRecord,
    productPrice: I_ProductPriceTableRecord,
    cartItemQuantity: number
  ) => {
    const _cartItems: I_CartItem[] = getCartItems();

    const _cartItemIndex: number = _cartItems.findIndex(
      (_cartItem: I_CartItem) => _cartItem.product_price_id === productPrice.id
    );

    if (_cartItemIndex !== -1) {
      let _cardItemQuantity =
        _cartItems[_cartItemIndex].cart_item_quantity + cartItemQuantity;

      if (_cardItemQuantity > 100) _cardItemQuantity = 100;

      _cartItems[_cartItemIndex].cart_item_quantity = _cardItemQuantity;
    } else {
      const _cartItem = {
        product_id: product.id,
        product_price_id: productPrice.id,
        name: product.name,
        category: product.category,
        color: product.color,
        size: product.size,
        size_unit: product.size_unit,
        price: productPrice.price,
        quantity: productPrice.quantity,
        stripe_price_id: productPrice.stripe_price_id,
        cart_item_quantity: cartItemQuantity,
      };

      _cartItems.push(_cartItem);
    }

    saveCartItems(_cartItems);

    getCartItems();
  };

  const removeCartItem = (cartItemIndex: number) => {
    const _cartItems = getCartItems();

    _cartItems.splice(cartItemIndex, 1);

    saveCartItems(_cartItems);

    getCartItems();
  };

  const updateCartItem = (cartItemIndex: number, cartItemQuantity: number) => {
    const _cartItems = getCartItems();

    if (!_cartItems[cartItemIndex]) return;

    if (cartItemQuantity < 1) cartItemQuantity = 1;
    if (cartItemQuantity > 100) cartItemQuantity = 100;

    _cartItems[cartItemIndex].cart_item_quantity = cartItemQuantity;

    saveCartItems(_cartItems);

    getCartItems();
  };

  const clearCart = () => {
    saveCartItems([]);

    set({
      cartItems: [],
      cartTotalPrice: 0,
      cartTotalItems: 0,
      isLoadingCartItems: false,
    });
  };

  return {
    subscribe,
    getCartItems,
    addCartItem,
    removeCartItem,
    updateCartItem,
    clearCart,
  };
}

export const cart = createCart();
