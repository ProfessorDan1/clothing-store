// src/app/admin/upload/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [adminSecret, setAdminSecret] = useState("");

  const [status, setStatus] = useState(""); // short status message
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // send all fields (name, price, description, secret, image) to /api/admin/upload
  const uploadAndCreate = () =>
    new Promise<{ ok: boolean; body: any }>((resolve, reject) => {
      if (!file) return reject(new Error("No file provided"));

      const form = new FormData();
      form.append("name", name.trim());
      form.append("price", price.toString());
      form.append("description", description.trim());
      form.append("secret", adminSecret);
      // server expects field "image"
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
    if (!price || Number.isNaN(Number(price))) return setError("Please provide a valid price.");
    if (!adminSecret) return setError("Admin secret is required.");

    setLoading(true);
    setUploadProgress(0);
    setStatus("Uploading image & creating product...");

    try {
      const { ok, body } = await uploadAndCreate();

      if (!ok) {
        // server returns { error: "..." } on your route
        const errMsg = (body && (body.error || body.message)) ?? "Upload/create failed";
        throw new Error(errMsg);
      }

      // success: route returns the created product
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

  return (
    <div className="max-w-3xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin — Upload Product</h1>

      <div className="grid gap-4">
        <label className="block">
          <span className="text-sm text-gray-300">Admin secret</span>
          <input
            type="password"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
            className="mt-2 w-full px-3 py-2 rounded bg-gray-800 text-white"
            placeholder="Enter admin secret"
            disabled={loading}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full px-3 py-2 rounded bg-gray-800 text-white"
            placeholder="Product name"
            disabled={loading}
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-300">Price</span>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-2 w-full px-3 py-2 rounded bg-gray-800 text-white"
              placeholder="0.00"
              inputMode="decimal"
              disabled={loading}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-2 w-full text-white"
              disabled={loading}
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm text-gray-300">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full px-3 py-2 rounded bg-gray-800 text-white"
            rows={4}
            disabled={loading}
          />
        </label>

        {previewUrl && (
          <div className="mt-2">
            <span className="text-sm text-gray-300">Preview</span>
            <div className="mt-2 w-full h-48 rounded overflow-hidden border border-white/10">
              <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {uploadProgress !== null && (
          <div className="mt-2">
            <div className="text-sm text-gray-300 mb-1">Upload progress: {uploadProgress}%</div>
            <div className="w-full bg-white/10 rounded h-2">
              <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded font-semibold disabled:opacity-60"
          >
            {loading ? "Working..." : "Upload & Create"}
          </button>

          <button
            onClick={() => {
              setName("");
              setPrice("");
              setDescription("");
              setFile(null);
              setStatus("");
              setError(null);
              setUploadProgress(null);
            }}
            disabled={loading}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-60"
          >
            Reset
          </button>
        </div>

        {status && <p className="mt-3 text-sm text-gray-300">{status}</p>}
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}
