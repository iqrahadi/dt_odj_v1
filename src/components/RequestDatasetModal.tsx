import { X } from 'lucide-react';
import { useState } from 'react';

interface RequestDatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RequestDatasetFormData) => void;
}

export interface RequestDatasetFormData {
  name: string;
  phone: string;
  email: string;
  occupation: string;
  datasetTitle: string;
  hasAccessedOPD: 'yes' | 'no' | '';
  description: string;
  purpose: string;
  agreedToContact: 'yes' | 'no' | '';
}

const occupationOptions = [
  'Pilih Pekerjaan',
  'Mahasiswa/Pelajar',
  'Peneliti',
  'Akademisi',
  'Jurnalis',
  'Pegawai Negeri Sipil',
  'Pegawai Swasta',
  'Wirausaha',
  'LSM/Organisasi Non-Profit',
  'Lainnya'
];

const purposeOptions = [
  'Pilih Tujuan',
  'Penelitian Akademik',
  'Analisis Bisnis',
  'Tugas Akhir/Skripsi',
  'Jurnalisme/Media',
  'Pengembangan Aplikasi',
  'Kebijakan Publik',
  'Transparansi & Akuntabilitas',
  'Lainnya'
];

export function RequestDatasetModal({ isOpen, onClose, onSubmit }: RequestDatasetModalProps) {
  const [formData, setFormData] = useState<RequestDatasetFormData>({
    name: '',
    phone: '',
    email: '',
    occupation: 'Pilih Pekerjaan',
    datasetTitle: '',
    hasAccessedOPD: '',
    description: '',
    purpose: 'Pilih Tujuan',
    agreedToContact: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.occupation === 'Pilih Pekerjaan') {
      alert('Silakan pilih pekerjaan Anda');
      return;
    }
    if (formData.purpose === 'Pilih Tujuan') {
      alert('Silakan pilih tujuan penggunaan dataset');
      return;
    }
    if (!formData.hasAccessedOPD) {
      alert('Silakan jawab apakah Anda sudah mengakses OPD terkait');
      return;
    }
    if (!formData.agreedToContact) {
      alert('Silakan jawab apakah Anda bersedia dihubungi oleh tim kami');
      return;
    }

    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      occupation: 'Pilih Pekerjaan',
      datasetTitle: '',
      hasAccessedOPD: '',
      description: '',
      purpose: 'Pilih Tujuan',
      agreedToContact: ''
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-gray-900">Form Request Dataset</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Identitas */}
          <div className="space-y-4">
            <h3 className="text-sm text-green-600">Identitas</h3>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">Nama</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Nomor Telepon</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Masukkan nomor telepon"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Masukkan email"
              />
            </div>
          </div>

          {/* Informasi Pekerjaan */}
          <div className="space-y-4">
            <h3 className="text-sm text-green-600">Informasi Pekerjaan</h3>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">Pekerjaan</label>
              <select
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              >
                {occupationOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Informasi Kebutuhan Dataset */}
          <div className="space-y-4">
            <h3 className="text-sm text-green-600">Informasi Kebutuhan Dataset</h3>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">Judul dataset yang diminta</label>
              <input
                type="text"
                required
                value={formData.datasetTitle}
                onChange={(e) => setFormData({ ...formData, datasetTitle: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Masukkan judul"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Apakah Anda mengakses Organisasi Perangkat Daerah (OPD) pengelola/sumber dataset terkait?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasAccessedOPD"
                    value="yes"
                    checked={formData.hasAccessedOPD === 'yes'}
                    onChange={(e) => setFormData({ ...formData, hasAccessedOPD: e.target.value as 'yes' })}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Ya</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasAccessedOPD"
                    value="no"
                    checked={formData.hasAccessedOPD === 'no'}
                    onChange={(e) => setFormData({ ...formData, hasAccessedOPD: e.target.value as 'no' })}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Tidak</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Deskripsi kebutuhan dataset</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Deskripsikan kebutuhan dataset anda"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Tujuan penggunaan dataset</label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              >
                {purposeOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Persetujuan */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Apakah Anda bersedia dihubungi oleh tim kami untuk menindaklanjuti pengumpulan data dan layanan Open Data Jabar?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="agreedToContact"
                    value="yes"
                    checked={formData.agreedToContact === 'yes'}
                    onChange={(e) => setFormData({ ...formData, agreedToContact: e.target.value as 'yes' })}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Ya</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="agreedToContact"
                    value="no"
                    checked={formData.agreedToContact === 'no'}
                    onChange={(e) => setFormData({ ...formData, agreedToContact: e.target.value as 'no' })}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Tidak</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
              Kirim Permohonan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
