# CODEX.COMMERCE — Developer Hardware Procurement System

Professional React-based e-commerce platform built according to the specifications in [លំហាត់អនុវត្ត.pdf](លំហាត់អនុវត្ត.pdf) (Practical Exercises 1, 2, and 3).

---

## 🎨 Design System & Aesthetic Reference
* **Style Inspiration:** Developer & API Documentation Theme (`https://api.laalaa.me/`)
* **Color Palette:** Deep Slate (`#030712`, `#0f172a`), Border Slate (`#1e293b`), and Emerald Accent (`#10b981`, `#059669`).
* **Iconography:** 100% Crisp Professional SVG Icons (Lucide-inspired) — **Zero Emojis**.
* **Typography:** Inter (Headings & UI) + JetBrains Mono (Data, IDs, Prices, Specs, SKUs).

---

## 🚀 Execution & Preview Options

### Option 1: Instant Standalone Preview (No CLI required)
Double-click on:
👉 **[preview.html](preview.html)** to launch directly in your web browser. Everything is bundled with React 18, Babel, and Tailwind CSS.

### Option 2: Run via Vite / Node.js
If you have Node.js and want to run it via local development server:
```bash
cmd /c npm install
cmd /c npm run dev
```

---

## 📋 Compliance with Assignment Requirements

### Practical Exercise 1: Products & Shopping Cart Ledger
* **4 Products with exact pricing:**
  * `Laptop`: **$650.00** (SKU: HW-LT-650)
  * `Mouse`: **$15.00** (SKU: HW-MS-015)
  * `Keyboard`: **$25.00** (SKU: HW-KB-025)
  * `Monitor`: **$120.00** (SKU: HW-MN-120)
* **Add to Cart Action:** Adds product to ledger, updates navbar bag counter.
* **Shopping Cart Ledger:**
  * View items, specs, and unit price.
  * Update quantity (`+` and `−` buttons with live recalculation).
  * Remove item completely (SVG trash icon).
  * Live Subtotal & Estimated Total computation.
  * "Proceed to Checkout" button.

### Practical Exercise 2: Customer Checkout Form & Validation
* **Customer Credentials Fields:**
  1. First Name
  2. Last Name
  3. Email Address (with email regex format validation)
  4. Phone Number
  5. Shipping Address (Street, City, State/Province, Zip Code)
* **Field Validation:** Prevents submission with empty fields, highlighting invalid inputs in rose/red with error messages.
* **Shipping Methods:**
  * Standard Ground Delivery ($0.00 — 7-20 Days)
  * Priority Express Delivery ($9.00 — 1-3 Days)

### Practical Exercise 3: Order Confirmation Ledger (Slide 28)
* Triggered after clicking "Place Order Now":
  * **Message:** `Order Placed Successfully!`
  * **Order ID:** `ORD-XXXX` (Dynamic ID)
  * **Customer Name:** Full Name from checkout
  * **Order Date:** Accurate formatted timestamp
  * **Ordered Products:** Itemized list with quantities and line totals
  * **Total Amount:** Grand total including shipping
  * **Order Status:** `Pending` (amber status badge)
  * Includes "Print Receipt" action.
