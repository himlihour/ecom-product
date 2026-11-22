export const PRODUCTS = [
  {
    id: 1,
    name: "Laptop",
    model: "Workstation Pro 15.6\"",
    category: "Hardware",
    sku: "HW-LT-650",
    price: 650.00,
    rating: 4.9,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&auto=format&fit=crop&q=80",
    specs: "Intel Core i7-13700H / 16GB DDR5 / 512GB PCIe 4.0 NVMe / FHD IPS Anti-Glare",
    tag: "High Priority"
  },
  {
    id: 2,
    name: "Mouse",
    model: "Precision Optical Sensor 4K",
    category: "Peripherals",
    sku: "HW-MS-015",
    price: 15.00,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=700&auto=format&fit=crop&q=80",
    specs: "2.4GHz Ultra-Low Latency / 4000 DPI Optical Sensor / Silent Switch Mechanism",
    tag: "Essential"
  },
  {
    id: 3,
    name: "Keyboard",
    model: "Mechanical Tactical Board",
    category: "Peripherals",
    sku: "HW-KB-025",
    price: 25.00,
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80",
    specs: "Custom Blue Mechanical Switches / N-Key Rollover / PBT Double-Shot Keycaps",
    tag: "Developer Choice"
  },
  {
    id: 4,
    name: "Monitor",
    model: "UltraWide Color Calibrated 27\"",
    category: "Displays",
    sku: "HW-MN-120",
    price: 120.00,
    rating: 4.9,
    reviews: 97,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80",
    specs: "4K UHD IPS Panel / 99% sRGB Color Accuracy / HDR10 / USB-C 65W Power Delivery",
    tag: "Reference Display"
  }
];

export const SHIPPING_METHODS = [
  { 
    id: 'free', 
    name: 'Standard Ground Delivery', 
    price: 0.00, 
    duration: '7 - 20 Business Days', 
    carrier: 'Postal Freight Network',
    desc: 'Fully tracked standard shipment with delivery confirmation.' 
  },
  { 
    id: 'express', 
    name: 'Priority Express Delivery', 
    price: 9.00, 
    duration: '1 - 3 Business Days', 
    carrier: 'Global Air Cargo',
    desc: 'Guaranteed rapid air courier with real-time checkpoint telemetry.' 
  }
];
