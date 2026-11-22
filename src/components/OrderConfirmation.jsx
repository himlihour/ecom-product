import React from 'react';
import { IconCheck, IconPrinter, IconArrowRight, IconPackage } from './Icons';

export default function OrderConfirmation({ order, onContinueShopping }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header Block */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
          <IconCheck className="w-7 h-7" />
        </div>

        <div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
            STATUS CODE: 200 OK / PROCESSED
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans mt-3">
            Order Placed Successfully!
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Transaction receipt dispatched to: <span className="text-emerald-400">{order.customerEmail}</span>
          </p>
        </div>

        {/* 4 Required Key Metadata Fields according to Slide 28 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-left font-mono">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Order ID</span>
            <span className="text-xs font-bold text-emerald-400">{order.orderId}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Customer Name</span>
            <span className="text-xs font-bold text-white truncate block">{order.customerName}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Order Date</span>
            <span className="text-[11px] text-slate-300 block">{order.orderDate}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block tracking-wider">Order Status</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              {order.status}
            </span>
          </div>
        </div>
      </div>

      {/* Ordered Products Breakdown */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <IconPackage className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Ordered Products Ledger
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {order.products.length} Units Manifested
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {order.products.map(item => (
            <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold font-mono text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold font-mono text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Calculations */}
        <div className="border-t border-slate-800/80 pt-4 space-y-2 text-xs font-mono">
          <div className="flex justify-between text-slate-400">
            <span>SUBTOTAL</span>
            <span className="text-white">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>LOGISTICS ({order.shippingMethodName})</span>
            <span className="text-white">
              {order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
            <span className="text-xs font-bold text-white font-sans">TOTAL AMOUNT</span>
            <span className="text-xl font-bold font-mono text-emerald-400">
              ${order.grandTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Destination Info */}
        <div className="bg-slate-950 rounded-lg p-3.5 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">DISPATCH TARGET</span>
          <p className="text-slate-200">{order.customerAddress}</p>
          <p className="text-slate-400">Contact: {order.customerPhone}</p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={onContinueShopping}
            className="flex-1 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <span>NEW ORDER / CONTINUE</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => window.print()}
            className="px-5 py-3 rounded-lg bg-slate-950 hover:bg-slate-900 text-slate-300 font-mono text-xs border border-slate-800 transition flex items-center justify-center gap-2"
          >
            <IconPrinter className="w-3.5 h-3.5" />
            <span>PRINT RECEIPT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
