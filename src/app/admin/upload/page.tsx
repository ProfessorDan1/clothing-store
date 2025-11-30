// src/app/admin/upload/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [adminSecret, setAdminSecret] = useState("");

  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const router = useRouter();

  const categories = [
    "T-Shirts",
    "Hoodies",
    "Jackets",
    "Pants",
    "Shorts",
    "Accessories",
    "Footwear",
    "Other"
  ];

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const uploadAndCreate = () =>
    new Promise<{ ok: boolean; body: any }>((resolve, reject) => {
      if (!file) return reject(new Error("No file provided"));

      const form = new FormData();
      form.append("name", name.trim());
      form.append("price", price.toString());
      form.append("category", category);
      form.append("description", description.trim());
      form.append("secret", adminSecret);
      form.append("image", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/admin/upload");

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(pct);
        }
      };

      xhr.onload = () => {
        try {
          const parsed = xhr.responseText ? JSON.parse(xhr.responseText) : null;
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({ ok: true, body: parsed });
          } else {
            resolve({ ok: false, body: parsed });
          }
        } catch (err) {
          reject(new Error("Invalid server response"));
        }
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(form);
    });

  const handleSubmit = async () => {
    setError(null);
    setStatus("");
    if (!file) return setError("Please select an image file.");
    if (!name.trim()) return setError("Please provide a product name.");
    if (!category) return setError("Please select a category.");
    if (!price || Number.isNaN(Number(price))) return setError("Please provide a valid price.");
    if (!adminSecret) return setError("Admin secret is required.");

    setLoading(true);
    setUploadProgress(0);
    setStatus("Uploading image & creating product...");

    try {
      const { ok, body } = await uploadAndCreate();

      if (!ok) {
        const errMsg = (body && (body.error || body.message)) ?? "Upload/create failed";
        throw new Error(errMsg);
      }

      setStatus("Product created! Redirecting to shop...");
      setTimeout(() => router.push("/shop"), 700);
    } catch (err: any) {
      setError(err?.message ?? "An unknown error occurred");
      setStatus("");
    } finally {
      setLoading(false);
      setUploadProgress(null);
    }
  };

  const handleReset = () => {
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setFile(null);
    setStatus("");
    setError(null);
    setUploadProgress(null);
  };

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Upload Product</h1>
          <p className="text-slate-400">Add new products to your catalog</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Admin Secret */}
            <div>
              <label className="block text-sm font-medium mb-2">Admin Secret</label>
              <input
                type="password"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Enter admin secret"
                disabled={loading}
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="e.g., Oversized Graphic Tee"
                disabled={loading}
              />
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price (₦)</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="15000"
                  inputMode="decimal"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  disabled={loading}
                >
                  <option value="" className="bg-black">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-black">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                rows={4}
                placeholder="Describe the product..."
                disabled={loading}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Product Image</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="hidden"
                  id="file-upload"
                  disabled={loading}
                />
                <label
                  htmlFor="file-upload"
                  className={`flex items-center justify-center gap-2 w-full px-4 py-8 rounded-lg bg-white/5 border-2 border-dashed border-white/20 hover:border-purple-500 transition-colors cursor-pointer ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Upload size={24} className="text-slate-400" />
                  <span className="text-slate-400">
                    {file ? file.name : "Click to upload image"}
                  </span>
                </label>
              </div>
            </div>

            {/* Upload Progress */}
            {uploadProgress !== null && (
              <div>
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading..." : "Upload & Create"}
              </button>

              <button
                onClick={handleReset}
                disabled={loading}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </button>
            </div>

            {/* Status Messages */}
            {status && (
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm text-blue-400">{status}</p>
              </div>
            )}
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <label className="block text-sm font-medium mb-4">Preview</label>
            <div className="rounded-lg bg-white/5 border border-white/10 overflow-hidden">
              {previewUrl ? (
                <div className="relative aspect-[3/4]">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setFile(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="aspect-[3/4] flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">No image selected</p>
                  </div>
                </div>
              )}
              
              {previewUrl && (
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">
                    {name || "Product Name"}
                  </h3>
                  {category && (
                    <p className="text-xs text-slate-400 uppercase tracking-wider">
                      {category}
                    </p>
                  )}
                  {price && (
                    <p className="text-xl font-bold text-purple-400">
                      ₦{parseFloat(price).toLocaleString()}
                    </p>
                  )}
                  {description && (
                    <p className="text-sm text-slate-400 line-clamp-3">
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}