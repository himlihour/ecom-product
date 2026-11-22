import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import SpiderWebBackground from './components/SpiderWebBackground';
import { PRODUCTS } from './data/products';

export default function App() {
  const [currentStep, setCurrentStep] = useState('products');
  
  const [cart, setCart] = useState([]);

  const [completedOrder, setCompletedOrder] = useState(null);
  const [isCartBumping, setIsCartBumping] = useState(false);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Trigger Cart Box Animation
    setIsCartBumping(true);
    setTimeout(() => setIsCartBumping(false), 500);
  };

  const handleUpdateQty = (productId, delta) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty >= 1 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handlePlaceOrder = (orderData) => {
    const newOrder = {
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: `${orderData.firstName} ${orderData.lastName}`,
      customerEmail: orderData.email,
      customerPhone: orderData.phone,
      customerAddress: `${orderData.street}, ${orderData.city}, ${orderData.state} ${orderData.zipCode}`,
      orderDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      products: [...cart],
      subtotal: orderData.subtotal,
      shippingCost: orderData.shippingCost,
      shippingMethodName: orderData.shippingMethodName,
      grandTotal: orderData.grandTotal,
      status: "Pending"
    };

    setCompletedOrder(newOrder);
    setCart([]);
    setCurrentStep('confirmation');
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased relative">
      
      {/* Spider Web & Light Cursor Wave Background */}
      <SpiderWebBackground />

      {/* Navbar with Cart Bump Animation */}
      <Navbar 
        currentStep={currentStep} 
        setCurrentStep={setCurrentStep} 
        cartCount={cartCount} 
        cartTotal={cartTotal}
        isCartBumping={isCartBumping}
      />

      {/* Body Views */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">
        {currentStep === 'products' && (
          <ProductList 
            products={PRODUCTS} 
            cart={cart} 
            onAddToCart={handleAddToCart} 
          />
        )}

        {currentStep === 'cart' && (
          <Cart 
            cart={cart} 
            onUpdateQty={handleUpdateQty} 
            onRemoveItem={handleRemoveItem} 
            onProceedToCheckout={() => setCurrentStep('checkout')}
            onBackToProducts={() => setCurrentStep('products')}
          />
        )}

        {currentStep === 'checkout' && (
          <Checkout 
            cart={cart} 
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={() => setCurrentStep('cart')}
          />
        )}

        {currentStep === 'confirmation' && completedOrder && (
          <OrderConfirmation 
            order={completedOrder} 
            onContinueShopping={() => {
              setCompletedOrder(null);
              setCurrentStep('products');
            }} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 backdrop-blur-sm py-8 text-xs font-mono text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">Kiro.Shop</span>
            <span>/ API-GRADE PRODUCT SYSTEM</span>
          </div>
          <p className="text-slate-600">Procurement & Fulfillment Architecture</p>
        </div>
      </footer>
    </div>
  );
}
