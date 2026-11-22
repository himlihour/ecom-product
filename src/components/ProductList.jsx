import React from 'react';
import { IconStar, IconPlus } from './Icons';

export default function ProductList({ products, cart, onAddToCart }) {
  return (
    <div className="space-y-8 relative z-10 select-none">
      {/* Header Banner without unwanted tags */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Hardware Inventory Catalog
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Enterprise grade developer workstations and peripheral devices.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">
            TOTAL UNITS: <strong className="text-white">{products.length}</strong>
          </span>
          <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-emerald-400">
            AVAILABILITY: IN_STOCK
          </span>
        </div>
      </div>

      {/* Grid: Clean minimal cards without long tech specs/descriptions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map(product => {
          const inCartItem = cart.find(c => c.id === product.id);
          return (
            <div 
              key={product.id}
              className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden flex flex-col hover:border-slate-700 hover:bg-slate-900/90 transition duration-200 group shadow-lg"
            >
              {/* Image & Badges */}
              <div className="relative h-48 bg-slate-950 overflow-hidden border-b border-slate-800/80">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-slate-950/90 border border-slate-800 text-slate-300 font-mono text-[10px] px-2 py-0.5 rounded">
                    {product.sku}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-semibold px-2 py-0.5 rounded">
                    {product.tag}
                  </span>
                </div>
              </div>

              {/* Information: Clean, simple, professional */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono text-slate-400 text-[11px] uppercase tracking-wider">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-slate-400 font-mono text-xs">
                      <IconStar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-600">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">UNIT PRICE</span>
                    <span className="text-xl font-bold font-mono text-white">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <button 
                    onClick={() => onAddToCart(product)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-mono text-xs font-bold transition shadow-sm"
                  >
                    <IconPlus className="w-3.5 h-3.5" />
                    <span>ADD TO CART</span>
                    {inCartItem && (
                      <span className="ml-1 px-1.5 py-0.2 rounded bg-slate-950 text-emerald-400 text-[10px] font-mono">
                        {inCartItem.quantity}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
