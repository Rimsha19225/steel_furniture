'use client';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import { useCart } from '../app/contexts/page';
import { useEffect, useState, Suspense } from 'react';
import { CheckCircle, Filter, ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

interface Product {
  id: string;
  name: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
  category?: string;
  colors?: string[];
  created_at?: string;
}

interface ProductAPI {
  id: string;
  name: string;
  title: string;
  price: string | number;
  image: string;
  quantity: number;
  description?: string;
  category?: string;
  colors?: string | string[];
  created_at?: string;
}

type SortOption = 'latest' | 'lowest' | 'highest';

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showColorFilter, setShowColorFilter] = useState<boolean>(false);

  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize searchQuery from URL parameter
  useEffect(() => {
    if (!searchParams) return;
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  const availableColors = ['#ea580c', '#2563eb', '#16a34a', '#dc2626', '#9333ea', '#000000', '#6b7280', '#ffffff'];

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: ProductAPI[] = await res.json();
      if (Array.isArray(data)) {
        const productsWithNumbers = data.map((p: ProductAPI) => ({
          ...p,
          price: Number(p.price) || 0,
          colors: p.colors ? (typeof p.colors === 'string' ? JSON.parse(p.colors) : p.colors) : ['#ea580c', '#2563eb', '#16a34a'],
        }));
        setProducts(productsWithNumbers);
      } else {
        setError('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to find similar products based on search query
  const findSimilarProducts = (query: string, allProducts: Product[]): Product[] => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase().trim();
    const words = searchTerm.split(' ').filter(w => w.length > 0);

    // Score each product based on match quality
    const scored = allProducts.map(product => {
      let score = 0;
      const name = product.name.toLowerCase();
      const title = (product.title || '').toLowerCase();
      const description = (product.description || '').toLowerCase();
      const category = (product.category || '').toLowerCase();

      // Exact match gets highest score
      if (name === searchTerm) score += 100;
      else if (name.startsWith(searchTerm)) score += 50;
      else if (name.includes(searchTerm)) score += 30;

      // Word-by-word matching
      words.forEach(word => {
        if (name.includes(word)) score += 20;
        if (title.includes(word)) score += 10;
        if (category.includes(word)) score += 15;
        if (description.includes(word)) score += 5;
      });

      return { product, score };
    });

    // Filter products with score > 0 and sort by score
    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  };

  // Apply filters, sorting, and search
  useEffect(() => {
    let result = [...products];

    // Search functionality
    if (searchQuery.trim()) {
      const similarProducts = findSimilarProducts(searchQuery, result);
      if (similarProducts.length > 0) {
        result = similarProducts;
      } else {
        // If no similar products found, show all products
        result = [...products];
      }
    }

    // Category filter (only if not searching, or apply on top of search)
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors?.some((color) => selectedColors.includes(color))
      );
    }

    // Sorting
    switch (sortOption) {
      case 'latest':
        result.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        break;
      case 'lowest':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'highest':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortOption, selectedColors, searchQuery]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setSuccessMessage(`${product.name} successfully added to cart!`);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleCardClick = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSortOption('latest');
    setSelectedColors([]);
    setSearchQuery('');
  };

  const categories = ['all', 'Cupboard', 'Divider', 'Showcase', 'Office Safe'];

  return (
    <div>
      <Navbar />
      <main className="w-[95%] sm:w-[80%] mx-auto pt-[6.5rem] sm:pt-[8.5rem]">
        <h1 className="text-[2.3rem] text-[#ea580c] font-bold mb-7 sm:mb-12 text-center mt-4">Products</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        {showMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white w-[30%] h-[30%] text-green-700 font-semibold border border-green-300 px-6 py-4 rounded shadow-lg flex items-center gap-2 text-center pointer-events-auto animate-fade-in-out">
              <CheckCircle className="w-[30%] h-[30%] text-green-600 animate-bounce" />
              <div className="w-full text-[1.5rem]">{successMessage}</div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters (Fixed) */}
          <aside className="w-full lg:w-[25%] lg:shrink-0">
            <div className="bg-white rounded-lg shadow-md p-5 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b">
                <Filter className="w-5 h-5 text-[#ea580c]" />
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Category</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Sort By</h3>
                <div className="space-y-1">
                  {[
                    { value: 'latest', label: 'Latest' },
                    { value: 'lowest', label: 'Price: Low to High' },
                    { value: 'highest', label: 'Price: High to Low' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors text-sm ${
                        sortOption === option.value
                          ? 'bg-[#ea580c]/10 text-[#ea580c] font-semibold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortOption === option.value}
                        onChange={() => setSortOption(option.value as SortOption)}
                        className="accent-[#ea580c]"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-5">
                <button
                  onClick={() => setShowColorFilter(!showColorFilter)}
                  className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-2 hover:text-[#ea580c] transition-colors"
                >
                  Color
                  {showColorFilter ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showColorFilter && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColors.includes(color)
                            ? 'border-[#ea580c] ring-2 ring-[#ea580c]/30 scale-110'
                            : 'border-gray-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded transition-colors text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Right Side - Search Bar + Product Cards */}
          <div className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name, category, or description..."
                  className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent text-gray-700 placeholder-gray-400 shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-gray-600">
                  Showing results for <span className="font-semibold text-[#ea580c]">&quot;{searchQuery}&quot;</span>
                  {filteredProducts.length > 0 && ` — ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
                </p>
              )}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {loading ? (
                <div className="col-span-full text-center text-gray-500 py-12">
                  Loading products...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-12">
                  {searchQuery ? `No products match "${searchQuery}". Try a different search term.` : 'No products match your filters.'}
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleCardClick(product)}
                    className="group relative w-[100%] bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg shadow-lg overflow-hidden p-2 sm:p-4 cursor-pointer transition-opacity duration-300 ease-in hover:scale-102"
                  >
                    <div className="w-full h-28 sm:h-50 rounded mb-3 flex items-center justify-center overflow-hidden">
                      {product.image && (
                        <Image
                          src={product.image.startsWith('/') ? `${API_BASE_URL}${product.image}` : product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                          width={300}
                          height={300}
                        />
                      )}
                    </div>
                    <h2 className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h2>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{product.title}</p>
                    <p className="text-sm sm:text-xl font-bold text-[#ea580c] mt-2">${product.price.toFixed(2)}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="w-full mt-2 bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-1 sm:py-2 rounded transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProductPageContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">Loading products...</div>
      </div>
    }>
      <ProductPage />
    </Suspense>
  );
}

export default ProductPageContent;
