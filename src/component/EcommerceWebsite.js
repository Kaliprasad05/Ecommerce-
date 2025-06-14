import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Star, Heart, Search, Menu, X, Filter } from 'lucide-react';

const EcommerceStore = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "https://www.bhphotovideo.com/images/images2500x2500/beats_by_dr_dre_900_00198_01_studio_wireless_headphones_matte_1016367.jpg",
      category: "Electronics",
      rating: 4.5,
      reviews: 128,
      description: "Premium wireless headphones with noise cancellation"
      
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 249.99,
      image: "https://m.media-amazon.com/images/I/71KjTSO8M9L._SL1500_.jpg",
      category: "Electronics",
      rating: 4.8,
      reviews: 95,
      description: "Advanced fitness tracking and health monitoring"
    },
    {
      id: 3,
      name: "Leather Backpack",
      price: 79.99,
      image: "https://assets.bigcartel.com/product_images/271330169/11071125952_1180834914.jpg?auto=format&fit=max&w=2000",
      category: "Fashion",
      rating: 4.3,
      reviews: 67,
      description: "Premium leather laptop backpack for professionals"
    },
    {
      id: 4,
      name: "Coffee Maker",
      price: 159.99,
      image: "https://tse3.mm.bing.net/th?id=OIP.cr94pklL3ktICbSuKb63hgHaHa&pid=Api&P=0&h=180" ,
      category: "Home",
      rating: 4.6,
      reviews: 203,
      description: "Automatic drip coffee maker with programmable timer"
    },
    {
      id: 5,
      name: "Running Shoes",
      price: 129.99,
      image: "https://sp.yimg.com/ib/th?id=OPAC.Lp%2bZHIpVaYnf7g474C474&o=5&pid=21.1&w=160&h=105",
      category: "Sports",
      rating: 4.7,
      reviews: 156,
      description: "Lightweight running shoes with superior cushioning"
    },
    {
      id: 6,
      name: "Desk Lamp",
      price: 45.99,
      image: "https://sp.yimg.com/ib/th?id=OPAC.zuIiaw14%2btEFnA474C474&o=5&pid=21.1&w=160&h=105",
      category: "Home",
      rating: 4.2,
      reviews: 89,
      description: "Modern LED desk lamp with adjustable brightness"
    },
    {
      id: 7,
      name: "Men's clothes",
      price: 50.99,
      image: "https://tse1.mm.bing.net/th?id=OIP.tku69jTu8T8LW2ajk0pHWQHaLH&pid=Api&P=0&h=180",
      category: "Fashion",
      rating: 4.5,
      reviews: 92,
      description: "Stylish Men's clothes"
    },
     {
      id: 8,
      name: "Women's clothes",
      price: 50.99,
      image: "https://tse4.mm.bing.net/th?id=OIP.T_2Two1poB3H6MjZlA-EugHaEo&pid=Api&P=0&h=180",
      category: "Fashion",
      rating: 4.5,
      reviews: 92,
      description: "Stylish Women's clothes"
    },
     {
      id: 9,
      name: "Led tv",
      price: 268.99,
      image: "https://tse2.mm.bing.net/th?id=OIP.qflWxmXbKovWsQ0lCbUZ6wHaEz&pid=Api&P=0&h=180",
      category: "Electronics",
      rating: 4.8,
      reviews: 95,
      description: "Advanced Led tv"
    },
    {
      id: 10,
      name: "Sound bar",
      price: 268.99,
      image: "https://tse2.mm.bing.net/th?id=OIP._-w1ypI-YKLOtROPNBAX_wHaHN&pid=Api&P=0&h=180",
      category: "Electronics",
      rating: 4.8,
      reviews: 95,
      description: "feel like cinema's with this speakers"
    },
    {
      id: 11,
      name: "Cricket bat",
      price: 229.99,
      image: "https://sp.yimg.com/ib/th?id=OPAC.u50mmLCCgYqlAQ474C474&o=5&pid=21.1&w=160&h=105",
      category: "Sports",
      rating: 4.7,
      reviews: 156,
      description: "good leather bat"
    },
      {
      id: 12,
      name: "badminton",
      price: 199.99,
      image: "https://tse3.mm.bing.net/th?id=OIP.F0hjYqKQ8podPwaUZ9TkJQHaHf&pid=Api&P=0&h=180",
      category: "Sports",
      rating: 4.7,
      reviews: 156,
      description: "good badminton bat"
    },


  ]);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">NexGen Shop</h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Cart and Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Filter className="w-5 h-5 text-gray-600 mt-2" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=${encodeURIComponent(product.name)}`;
                  }}
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      wishlist.some(item => item.id === product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center mt-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/64x64/4F46E5/FFFFFF?text=${encodeURIComponent(item.name.substring(0, 3))}`;
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-gray-600 text-sm">${item.price}</p>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="mx-3 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total: ${getTotalPrice()}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceStore;