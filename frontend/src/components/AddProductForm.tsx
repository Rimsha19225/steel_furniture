'use client';
import { useState, FormEvent } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

interface ProductFormData {
  name: string;
  title: string;
  description: string;
  price: string;
  category: string;
  stock_quantity: string;
  is_available: boolean;
}

interface AddProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddProductForm({ onClose, onSuccess }: AddProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    title: '',
    description: '',
    price: '',
    category: '',
    stock_quantity: '',
    is_available: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return '';

    setUploadingImage(true);
    setError('');
    const formDataImage = new FormData();
    formDataImage.append('image', imageFile);

    const token = localStorage.getItem('adminToken');

    if (!token) {
      setUploadingImage(false);
      setError('Admin authentication required. Please login as admin first.');
      throw new Error('No admin token found');
    }

    console.log('Uploading image to:', `${API_BASE_URL}/api/products/upload`);

    try {
      const res = await fetch(`${API_BASE_URL}/api/products/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataImage,
      });

      const data = await res.json();
      console.log('Upload response:', data);

      if (!res.ok) {
        throw new Error(data.message || `Upload failed with status ${res.status}`);
      }

      setUploadingImage(false);
      return data.imageUrl;
    } catch (err) {
      setUploadingImage(false);
      const message = err instanceof Error ? err.message : 'Failed to upload image';
      setError(message);
      throw err;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Upload image first
      let imageUrl = uploadedImageUrl;
      if (imageFile && !uploadedImageUrl) {
        imageUrl = await uploadImage();
        setUploadedImageUrl(imageUrl);
      }

      const token = localStorage.getItem('adminToken');

      if (!token) {
        setError('Admin authentication required. Please login first.');
        setLoading(false);
        return;
      }

      const productData = {
        name: formData.name,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        image: imageUrl,
        category: formData.category,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        is_available: formData.is_available,
      };

      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      // Success
      onSuccess();
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full sm:w-[90%] max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-[#ea580c] mb-4 sm:mb-6 pr-8">Add New Product</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image
            </label>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {imagePreview ? (
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                  <Image src={imagePreview} alt="Preview" fill className="object-contain" />
                </div>
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
              )}
              <div className="flex flex-col items-center sm:items-start gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-[#ea580c] hover:bg-[#c2410c] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded transition-colors inline-block text-sm sm:text-base"
                >
                  {uploadingImage ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin inline" /> : 'Choose Image'}
                </label>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-sm sm:text-base"
              placeholder="e.g., 3 Door Cupboard"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title/Subtitle
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-sm sm:text-base"
              placeholder="e.g., Spacious Storage"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-sm sm:text-base resize-none"
              placeholder="Product description..."
            />
          </div>

          {/* Price and Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-sm sm:text-base"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-sm sm:text-base"
              >
                <option value="">Select Category</option>
                <option value="Cupboard">Cupboard</option>
                <option value="Divider">Divider</option>
                <option value="Wardrobe">Wardrobe</option>
                <option value="Shelf">Shelf</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-[#ea580c] text-sm sm:text-base"
              placeholder="0"
            />
          </div>

          {/* Availability Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_available"
              checked={formData.is_available}
              onChange={handleChange}
              className="w-4 h-4 accent-[#ea580c]"
            />
            <label className="text-sm font-semibold text-gray-700">
              Available for sale
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 sm:py-3 rounded transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-2.5 sm:py-3 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  Adding Product...
                </>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
