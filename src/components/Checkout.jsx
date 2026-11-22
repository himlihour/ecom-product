import React, { useState } from 'react';
import { IconArrowLeft, IconShield, IconAlert } from './Icons';
import { SHIPPING_METHODS } from '../data/products';

export default function Checkout({ cart, onPlaceOrder, onBackToCart }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    shippingMethod: 'free'
  });

  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const selectedShipping = SHIPPING_METHODS.find(m => m.id === formData.shippingMethod) || SHIPPING_METHODS[0];
  const shippingCost = selectedShipping.price;
  const grandTotal = subtotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email formatting";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.street.trim()) newErrors.street = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State / Province is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onPlaceOrder({
      ...formData,
      subtotal,
      shippingCost,
      shippingMethodName: selectedShipping.name,
      grandTotal
    });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Customer Checkout Verification
          </h1>
        </div>

        <button 
          onClick={onBackToCart}
          className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition"
        >
          <IconArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO CART</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer Personal Details */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  01
                </span>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Customer Credentials
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">* Required Fields</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">First Name *</label>
                <input 
                  type="text"
                  placeholder="e.g. Alex"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={`w-full bg-slate-950 border ${errors.firstName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition`}
                />
                {errors.firstName && (
                  <span className="flex items-center gap-1 text-[11px] text-rose-400 mt-1 font-mono">
                    <IconAlert className="w-3 h-3" /> {errors.firstName}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Last Name *</label>
                <input 
                  type="text"
                  placeholder="e.g. Mercer"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={`w-full bg-slate-950 border ${errors.lastName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition`}
                />
                {errors.lastName && (
                  <span className="flex items-center gap-1 text-[11px] text-rose-400 mt-1 font-mono">
                    <IconAlert className="w-3 h-3" /> {errors.lastName}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Email Address *</label>
                <input 
                  type="email"
                  placeholder="developer@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-slate-950 border ${errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition`}
                />
                {errors.email && (
                  <span className="flex items-center gap-1 text-[11px] text-rose-400 mt-1 font-mono">
                    <IconAlert className="w-3 h-3" /> {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Phone Number *</label>
                <input 
                  type="tel"
                  placeholder="+855 12 345 678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full bg-slate-950 border ${errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition`}
                />
                {errors.phone && (
                  <span className="flex items-center gap-1 text-[11px] text-rose-400 mt-1 font-mono">
                    <IconAlert className="w-3 h-3" /> {errors.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Coordinates */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  02
                </span>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Physical Address Coordinates
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Street Address / Facility No. *</label>
                <input 
                  type="text"
                  placeholder="Building 4, Russian Confederation Blvd"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className={`w-full bg-slate-950 border ${errors.street ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition`}
                />
                {errors.street && (
                  <span className="flex items-center gap-1 text-[11px] text-rose-400 mt-1 font-mono">
                    <IconAlert className="w-3 h-3" /> {errors.street}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">City / Municipality *</label>
                  <input 
                    type="text"
                    placeholder="Phnom Penh"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full bg-slate-950 border ${errors.city ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition`}
                  />
                  {errors.city && (
                    <span className="flex items-center gap-1 text-[11px] text-rose-400 mt-1 font-mono">
                      <IconAlert className="w-3 h-3" /> {errors.city}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">State / Province *</label>
                  <input 
                    type="text"
                    placeholder="Phnom Penh"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={`w-full bg-slate-950 border ${errors.state ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition`}
                  />
                  {errors.state && (
                    <span className="flex items-center gap-1 text-[11px] text-rose-400 mt-1 font-mono">
                      <IconAlert className="w-3 h-3" /> {errors.state}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Postal / Zip Code *</label>
                  <input 
                    type="text"
                    placeholder="12000"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className={`w-full bg-slate-950 border ${errors.zipCode ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition`}
                  />
                  {errors.zipCode && (
                    <span className="flex items-center gap-1 text-[11px] text-rose-400 mt-1 font-mono">
                      <IconAlert className="w-3 h-3" /> {errors.zipCode}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Freight Routing */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                03
              </span>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Logistics Routing Method
              </h3>
            </div>

            <div className="space-y-3 pt-1">
              {SHIPPING_METHODS.map(method => (
                <label 
                  key={method.id}
                  className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition ${
                    formData.shippingMethod === method.id 
                      ? 'bg-slate-950 border-emerald-500 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio"
                      name="shippingMethod"
                      value={method.id}
                      checked={formData.shippingMethod === method.id}
                      onChange={() => setFormData({ ...formData, shippingMethod: method.id })}
                      className="w-4 h-4 text-emerald-500 bg-slate-900 border-slate-700 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                        {method.name}
                        <span className="text-[10px] text-slate-400 font-normal">[{method.duration}]</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{method.desc}</p>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-xs">
                    {method.price === 0 ? <span className="text-emerald-400">FREE</span> : `$${method.price.toFixed(2)}`}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-5 sticky top-24">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">ALLOCATION SUMMARY</span>
              <h3 className="text-base font-bold text-white font-sans">Order Ledger</h3>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <img src={item.image} alt={item.name} className="w-9 h-9 rounded object-cover bg-slate-950 border border-slate-800 shrink-0" />
                    <div className="truncate">
                      <p className="font-mono text-white truncate text-xs">{item.name}</p>
                      <p className="text-[11px] font-mono text-slate-400">QTY: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-200 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>SUBTOTAL</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>LOGISTICS</span>
                <span className="text-white">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-slate-800/80 pt-3 flex justify-between items-baseline">
                <span className="text-xs font-bold text-white font-sans">GRAND TOTAL</span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
            >
              <IconShield className="w-3.5 h-3.5" />
              <span>PLACE ORDER NOW</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
