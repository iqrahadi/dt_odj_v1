import { useState } from 'react';
import { X } from 'lucide-react';
import type { DataRequest } from '../App';

interface RequestDataFormProps {
  onSubmit: (data: Omit<DataRequest, 'id' | 'status' | 'requestDate' | 'updatedDate'>) => void;
  onCancel: () => void;
}

const categories = [
  'Health',
  'Education',
  'Transportation',
  'Economy',
  'Environment',
  'Social Services',
  'Infrastructure',
  'Tourism'
];

const purposes = [
  'Penelitian Akademik',
  'Riset Komersial',
  'Analisis Bisnis',
  'Pengembangan Aplikasi',
  'Jurnalisme',
  'Kebijakan Publik',
  'Lainnya'
];

export function RequestDataForm({ onSubmit, onCancel }: RequestDataFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    purpose: '',
    organization: '',
    email: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul data diperlukan';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi diperlukan';
    }
    if (!formData.category) {
      newErrors.category = 'Kategori diperlukan';
    }
    if (!formData.purpose) {
      newErrors.purpose = 'Tujuan penggunaan diperlukan';
    }
    if (!formData.organization.trim()) {
      newErrors.organization = 'Nama organisasi diperlukan';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email diperlukan';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-4">
        <h3 className="text-gray-900 mb-2">Request Data Baru</h3>
        <p className="text-sm text-gray-600">
          Isi formulir di bawah ini untuk mengajukan permintaan dataset
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Judul Data <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Contoh: Data Kualitas Air Sungai"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Deskripsi Detail <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Jelaskan data yang Anda butuhkan secara detail..."
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Pilih kategori</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-red-500 mt-1">{errors.category}</p>
          )}
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Tujuan Penggunaan <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.purpose}
            onChange={(e) => handleChange('purpose', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.purpose ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Pilih tujuan</option>
            {purposes.map(purpose => (
              <option key={purpose} value={purpose}>{purpose}</option>
            ))}
          </select>
          {errors.purpose && (
            <p className="text-xs text-red-500 mt-1">{errors.purpose}</p>
          )}
        </div>

        {/* Organization */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Nama Organisasi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => handleChange('organization', e.target.value)}
            placeholder="Contoh: Universitas Indonesia"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.organization ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.organization && (
            <p className="text-xs text-red-500 mt-1">{errors.organization}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Email Kontak <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="email@example.com"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Kirim Permintaan
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
