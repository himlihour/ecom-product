import React from 'react';
import { IconTrash, IconArrowRight, IconArrowLeft, IconPlus, IconMinus } from './Icons';

export default function Cart({ cart, onUpdateQty, onRemoveItem, onProceedToCheckout, onBackToProducts }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Shopping Cart Ledger
          </h1>
        </div>

        <button 
          onClick={onBackToProducts}
          className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition"
        >
          <IconArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO INVENTORY</span>
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-16 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-slate-400">
            [NULL]
          </div>
          <h3 className="text-lg font-bold text-white font-mono">CART IS EMPTY</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No items have been assigned to your procurement session. Select items from the catalog.
          </p>
          <button 
            onClick={onBackToProducts}
            className="mt-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition"
          >
            VIEW PRODUCTS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table / List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="hidden sm:grid grid-cols-12 text-[11px] font-mono uppercase tracking-wider text-slate-500 px-4 py-2 border-b border-slate-800/80">
              <span className="col-span-6">ITEM / SPECIFICATION</span>
              <span className="col-span-3 text-center">QUANTITY</span>
              <span className="col-span-3 text-right">TOTAL PRICE</span>
            </div>

            {cart.map(item => (
              <div 
                key={item.id}
                className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:grid sm:grid-cols-12 items-center gap-4 hover:border-slate-700 transition"
              >
                {/* Product Detail */}
                <div className="col-span-6 flex items-center gap-3.5 w-full">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-emerald-400 px-1.5 py-0.2 bg-emerald-500/10 border border-emerald-500/20 rounded">
                        {item.sku}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">{item.name}</h4>
                    <p className="text-xs font-mono text-slate-400">${item.price.toFixed(2)} / unit</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="col-span-3 flex items-center justify-center gap-2 w-full sm:w-auto">
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                    <button 
                      onClick={() => onUpdateQty(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className={`w-7 h-7 rounded bg-slate-900 text-slate-300 flex items-center justify-center transition ${
                        item.quantity <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-800'
                      }`}
                      aria-label="Decrease quantity"
                    >
                      <IconMinus className="w-3 h-3" />
                    </button>
                    <span className="w-9 text-center font-mono text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-7 h-7 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition"
                      aria-label="Increase quantity"
                    >
                      <IconPlus className="w-3 h-3" />
                    </button>
                  </div>

                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition"
                    title="Remove item"
                  >
                    <IconTrash className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="col-span-3 text-right w-full sm:w-auto">
                  <span className="text-sm font-mono font-bold text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Ledger Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-5 sticky top-24">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">FINANCIAL OVERVIEW</span>
                <h3 className="text-base font-bold text-white font-sans">Summary Breakdown</h3>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>UNITS SELECTED</span>
                  <span className="text-white font-bold">{totalUnits} items</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>SHIPPING ESTIMATE</span>
                  <span className="text-emerald-400">Calculated at Checkout</span>
                </div>
                <div className="border-t border-slate-800/80 pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white font-sans block">ESTIMATED TOTAL</span>
                    <span className="text-[10px] text-slate-500 font-sans">Applicable taxes included</span>
                  </div>
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button 
                onClick={onProceedToCheckout}
                className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <span>PROCEED TO CHECKOUT</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
