import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { EcommerceTrackingEvent, formatCurrency, trackEcommerceEvent } from '@/api/EcommerceApi';
import pb from '@/lib/pocketbaseClient';

const CartContext = createContext();

const CART_STORAGE_KEY = 'e-commerce-cart';
const TAX_RATE = 0.0825; // Texas sales tax
const SHIPPING_FLAT = 499; // $4.99 flat for physical items

const isBookingItem = (item) => item?.product?.type?.value === 'booking';
const isDigitalItem = (item) => {
  const t = item?.product?.type?.value;
  return t === 'service' || t === 'digital' || /ebook|e-book|digital/i.test(item?.variant?.title || item?.product?.title || '');
};

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart).filter(item => !isBookingItem(item)) : [];
    } catch {
      return [];
    }
  });
  const [discount, setDiscount] = useState(null); // { code, type, value }
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product, variant, quantity, availableQuantity) => {
    return new Promise((resolve, reject) => {
      if (isBookingItem({ product })) {
        reject(new Error('Appointments are booked directly at checkout, not through the cart.'));
        return;
      }
      if (variant.manage_inventory) {
        const existingItem = cartItems.find(item => item.variant.id === variant.id);
        const currentCartQuantity = existingItem ? existingItem.quantity : 0;
        if ((currentCartQuantity + quantity) > availableQuantity) {
          reject(new Error(`Not enough stock for ${product.title} (${variant.title}). Only ${availableQuantity} left.`));
          return;
        }
      }
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.variant.id === variant.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.variant.id === variant.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevItems, { product, variant, quantity }];
      });
      trackEcommerceEvent({ event: EcommerceTrackingEvent.AddToCart, items: [{ product, variant, quantity }] });
      resolve();
    });
  }, [cartItems]);

  const removeFromCart = useCallback((variantId) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.variant.id === variantId);
      if (removedItem) {
        trackEcommerceEvent({ event: EcommerceTrackingEvent.RemoveFromCart, items: [removedItem] });
      }
      return prevItems.filter(item => item.variant.id !== variantId);
    });
  }, []);

  const updateQuantity = useCallback((variantId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.variant.id === variantId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setDiscount(null);
  }, []);

  const currencyInfo = cartItems[0]?.variant?.currency_info || null;

  const subtotalCents = useMemo(
    () => cartItems.reduce((total, item) => {
      const price = item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
      return total + price * item.quantity;
    }, 0),
    [cartItems]
  );

  const hasPhysical = useMemo(() => cartItems.some(item => !isDigitalItem(item)), [cartItems]);
  const isDigitalOnly = !hasPhysical;

  const discountCents = useMemo(() => {
    if (!discount || !discount.active) return 0;
    if (discount.type === 'percent') return Math.round(subtotalCents * (discount.value / 100));
    return Math.min(discount.value * 100, subtotalCents);
  }, [discount, subtotalCents]);

  const taxableCents = Math.max(0, subtotalCents - discountCents);
  const taxCents = Math.round(taxableCents * TAX_RATE);
  const shippingCents = isDigitalOnly || cartItems.length === 0 ? 0 : SHIPPING_FLAT;
  const totalCents = Math.max(0, taxableCents) + taxCents + shippingCents;

  const applyDiscount = useCallback(async (code) => {
    if (!code) return false;
    try {
      const rec = await pb.collection('discount_codes').getFirstListItem(
        pb.filter('code = {:code} && active = true', { code: code.trim().toUpperCase() })
      );
      if (rec.max_uses && rec.uses >= rec.max_uses) return false;
      setDiscount({ code: rec.code, type: rec.type, value: rec.value, active: true });
      return true;
    } catch {
      return false;
    }
  }, []);

  const removeDiscount = useCallback(() => setDiscount(null), []);

  const fmt = (cents) => formatCurrency(cents, currencyInfo);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyDiscount,
    removeDiscount,
    discount,
    isCartOpen,
    setIsCartOpen,
    cartCount: cartItems.reduce((s, i) => s + i.quantity, 0),
    subtotalCents,
    discountCents,
    taxCents,
    shippingCents,
    totalCents,
    isDigitalOnly,
    getCartTotal: () => fmt(totalCents),
    formatAmount: fmt,
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, applyDiscount, removeDiscount, discount, isCartOpen, subtotalCents, discountCents, taxCents, shippingCents, totalCents, isDigitalOnly, currencyInfo]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
