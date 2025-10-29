import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Check authentication on mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }
    loadCart();
  }, [navigate]);

  const toggleItemSelection = (itemId, itemType) => {
    const itemKey = `${itemId}-${itemType}`;
    setSelectedItems(prev => 
      prev.includes(itemKey) 
        ? prev.filter(key => key !== itemKey)
        : [...prev, itemKey]
    );
  };

  const isItemSelected = (itemId, itemType) => {
    return selectedItems.includes(`${itemId}-${itemType}`);
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      // Deselect all
      setSelectedItems([]);
    } else {
      // Select all
      const allItemKeys = cartItems.map(item => `${item.id}-${item.type}`);
      setSelectedItems(allItemKeys);
    }
  };

  const isAllSelected = () => {
    return cartItems.length > 0 && selectedItems.length === cartItems.length;
  };

  const loadCart = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  };

  const updateQuantity = (itemId, itemType, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === itemId && item.type === itemType
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleQuantityInput = (itemId, itemType, value) => {
    // Parse the input value
    const numValue = parseInt(value);
    
    // Update only if it's a valid positive number
    if (!isNaN(numValue) && numValue > 0) {
      updateQuantity(itemId, itemType, numValue);
    } else if (value === '') {
      // Allow empty field temporarily
      const updatedCart = cartItems.map(item => 
        item.id === itemId && item.type === itemType
          ? { ...item, quantity: '' }
          : item
      );
      setCartItems(updatedCart);
    }
  };

  const handleQuantityBlur = (itemId, itemType, currentQty) => {
    // If empty or invalid on blur, reset to 1
    if (currentQty === '' || currentQty < 1) {
      updateQuantity(itemId, itemType, 1);
    }
  };

  const removeFromCart = (itemId, itemType) => {
    const updatedCart = cartItems.filter(item => !(item.id === itemId && item.type === itemType));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const calculateSubtotal = () => {
    return cartItems
      .filter(item => isItemSelected(item.id, item.type))
      .reduce((total, item) => total + (item.price * item.quantity), 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const delivery = subtotal > 0 && selectedItems.length > 0 ? 2.00 : 0;
    return (subtotal + delivery).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to checkout');
      return;
    }
    // Save selected items to localStorage for checkout page
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-16 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text mb-4">
              My Order
            </h1>
            <p className="text-gray-600 text-lg">Your delicious items</p>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <FaShoppingCart className="text-6xl text-orange-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Order is Empty</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Start adding delicious Khmer dishes to your order!
            </p>
            <Link 
              to="/MenuFood" 
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const delivery = 2;
  const total = calculateTotal();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-16 px-6 md:px-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text mb-2">
              My Order
            </h1>
            <p className="text-gray-600 text-lg">
              You have {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your order
            </p>
          </div>
          <button
            onClick={clearCart}
            className="mt-4 md:mt-0 px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <FaTrash />
            Clear Order
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select All Checkbox */}
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAllSelected()}
                  onChange={toggleSelectAll}
                  className="w-5 h-5 accent-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
                />
                <span className="ml-3 text-gray-900 font-semibold">
                  Select All ({selectedItems.length}/{cartItems.length})
                </span>
              </label>
            </div>

            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.type}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="flex gap-4 p-6">
                  {/* Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      <p className="text-2xl font-bold text-orange-600">${item.price}</p>
                    </div>

                    {/* Quantity Controls and Total */}
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.type, (item.quantity || 1) - 1)}
                          className="w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus className="text-orange-600 text-sm" />
                        </button>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={item.quantity}
                          onChange={(e) => handleQuantityInput(item.id, item.type, e.target.value)}
                          onBlur={() => handleQuantityBlur(item.id, item.type, item.quantity)}
                          className="w-16 h-9 text-center text-xl font-bold text-gray-900 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.type, (item.quantity || 0) + 1)}
                          className="w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-colors duration-300"
                        >
                          <FaPlus className="text-orange-600 text-sm" />
                        </button>
                      </div>

                      <p className="text-xl font-bold text-gray-900 whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Checkbox & Delete Column - Right Side */}
                  <div className="flex flex-col items-center justify-between gap-3 pl-4 border-l border-gray-200">
                    <label className="cursor-pointer p-1 hover:bg-orange-50 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={isItemSelected(item.id, item.type)}
                        onChange={() => toggleItemSelection(item.id, item.type)}
                        className="w-6 h-6 accent-orange-600 border-2 border-gray-300 rounded-md focus:ring-orange-500 focus:ring-2 cursor-pointer hover:border-orange-400 transition-colors"
                      />
                    </label>
                    
                    <button
                      onClick={() => removeFromCart(item.id, item.type)}
                      className="p-2.5 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white rounded-lg transition-all duration-300 hover:shadow-lg group"
                      title="Remove item"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-2">
                    <MdDeliveryDining className="text-xl" />
                    Delivery
                  </span>
                  <span className="font-semibold">${delivery.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-orange-600">${total}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/MenuFood"
                className="block text-center text-orange-600 hover:text-orange-700 font-semibold"
              >
                ← Continue Shopping
              </Link>

              {/* Promo */}
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
                <p className="text-sm font-semibold text-gray-900 mb-1">🎉 Free Delivery!</p>
                <p className="text-xs text-gray-700">On orders over $20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
