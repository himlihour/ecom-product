import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import { PRODUCTS } from './data/products';

export default function App() {
  const [currentStep, setCurrentStep] = useState('products'); // 'products' | 'cart' | 'checkout' | 'confirmation'
  
  // Initial cart with Laptop (1) and Mouse (2)
  const [cart, setCart] = useState([
    { ...PRODUCTS[0], quantity: 1 },
    { ...PRODUCTS[1], quantity: 2 }
  ]);

  const [completedOrder, setCompletedOrder] = useState(null);
  const [notification, setNotification] = useState(null);

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

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
    notify(`SKU: ${product.sku} [${product.name}] added to cart ledger.`);
  };

  const handleUpdateQty = (productId, delta) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const handleRemoveItem = (productId) => {
    const item = cart.find(i => i.id === productId);
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    if (item) {
      notify(`Item [${item.name}] removed from cart ledger.`);
    }
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 antialiased">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/50 text-emerald-400 px-4 py-2.5 rounded-lg shadow-xl text-xs font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar 
        currentStep={currentStep} 
        setCurrentStep={setCurrentStep} 
        cartCount={cartCount} 
        cartTotal={cartTotal} 
      />

      {/* Body Views */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
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
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">CODEX.COMMERCE</span>
            <span>/ API-GRADE PRODUCT SYSTEM</span>
          </div>
          <p className="text-slate-600">Enterprise Practical Exercise Architecture</p>
        </div>
      </footer>
    </div>
  );
}
