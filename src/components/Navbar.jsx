import React from 'react';
import { IconShoppingBag } from './Icons';

export default function Navbar({ currentStep, setCurrentStep, cartCount, cartTotal, isCartBumping }) {
  const steps = [
    { id: 'products', num: '01', label: 'CATALOG' },
    { id: 'cart', num: '02', label: `CART (${cartCount})` },
    { id: 'checkout', num: '03', label: 'CHECKOUT' },
    { id: 'confirmation', num: '04', label: 'CONFIRMATION' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => setCurrentStep('products')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition">
            <span className="font-mono text-sm font-bold tracking-tighter">&gt;_</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white font-mono">
                Kiro<span className="text-emerald-400">.Shop</span>
              </span>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800/80 px-2 py-1 rounded-lg">
          {steps.map((s, idx) => {
            const isActive = currentStep === s.id;
            const isClickable = s.id === 'products' || (s.id === 'cart' && cartCount >= 0) || (s.id === 'checkout' && cartCount > 0);
            return (
              <React.Fragment key={s.id}>
                {idx > 0 && <span className="text-slate-700 text-xs px-1">/</span>}
                <button
                  onClick={() => isClickable && setCurrentStep(s.id)}
                  disabled={!isClickable}
                  className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded transition ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : isClickable
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <span className={isActive ? 'text-slate-950 font-bold' : 'text-slate-500'}>{s.num}</span>
                  <span>{s.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Animated Cart Button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentStep('cart')}
            className={`flex items-center gap-3 px-3.5 py-2 rounded-lg bg-slate-900 border transition duration-300 group ${
              isCartBumping 
                ? 'scale-110 border-emerald-400 bg-slate-800 shadow-lg shadow-emerald-500/30' 
                : 'border-slate-800 hover:border-emerald-500/40 text-slate-300'
            }`}
          >
            <div className="relative">
              <IconShoppingBag className={`w-4 h-4 transition ${isCartBumping ? 'text-emerald-400 scale-110' : 'text-slate-400 group-hover:text-emerald-400'}`} />
              {cartCount > 0 && (
                <span className={`absolute -top-1.5 -right-2 bg-emerald-500 text-slate-950 font-mono text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition ${
                  isCartBumping ? 'scale-125 bg-emerald-400' : ''
                }`}>
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-mono text-slate-300 font-semibold hidden sm:inline">
              ${cartTotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
