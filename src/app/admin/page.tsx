// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Package, 
  DollarSign, 
  TrendingUp,
  Filter,
  Eye
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  imageUrl: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [adminSecret, setAdminSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const categories = ["All", "T-Shirts", "Hoodies", "Jackets", "Pants", "Shorts", "Accessories", "Footwear", "Other"];

  // Fetch products
  useEffect(() => {
    if (!isAuthenticated) return;
    
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [isAuthenticated]);

  // Filter products
  useEffect(() => {
    let result = [...products];

    if (categoryFilter !== "All") {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, categoryFilter, products]);

  // Handle authentication
  const handleAuth = () => {
    if (adminSecret === process.env.ADMIN_SECRET 
        || adminSecret === "your-secret-key") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid admin secret");
    }
  };

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleteLoading(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-secret": adminSecret,
        },
      });

      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        setFilteredProducts(prev => prev.filter(p => p.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Calculate stats
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0;

  // Auth screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Enter your admin secret to continue</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <label className="block text-sm font-medium mb-2">Admin Secret</label>
            <input
              type="password"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAuth()}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors mb-4"
              placeholder="Enter secret key"
            />
            
            {authError && (
              <p className="text-sm text-red-400 mb-4">{authError}</p>
            )}

            <button
              onClick={handleAuth}
              className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition-colors"
            >
              Access Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your products and inventory</p>
          </div>
          
          <Link
            href="/admin/upload"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Plus size={20} />
            Add Products
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-400">Total Products</h3>
              <Package className="text-purple-400" size={20} />
            </div>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-400">Total Value</h3>
              <DollarSign className="text-green-400" size={20} />
            </div>
            <p className="text-3xl font-bold">₦{totalValue.toLocaleString()}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-400">Average Price</h3>
              <TrendingUp className="text-blue-400" size={20} />
            </div>
            <p className="text-3xl font-bold">₦{Math.round(avgPrice).toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    categoryFilter === cat
                      ? "bg-white text-black"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-lg">
            <Package size={48} className="mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-slate-400 mb-6">
              {searchQuery || categoryFilter !== "All" 
                ? "Try adjusting your filters"
                : "Start by adding your first product"}
            </p>
            <Link
              href="/admin/upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Plus size={20} />
              Add Products
            </Link>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Product</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Category</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Price</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Created</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-sm text-slate-400 line-clamp-1">
                              {product.description || "No description"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        ₦{product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/product/${product.id}`}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            title="View"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            href={`/admin/edit/${product.id}`}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deleteLoading === product.id}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleteLoading === product.id ? (
                              <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results Count */}
        {!loading && filteredProducts.length > 0 && (
          <div className="mt-6 text-center text-sm text-slate-400">
            Showing {filteredProducts.length} of {totalProducts} products
          </div>
        )}
      </div>
    </div>
  );
}