import { CheckCircle, ArrowRight, X, Download } from 'lucide-react';

interface DownloadSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewDashboard: () => void;
  downloadCount: number;
}

export function DownloadSuccessModal({ 
  isOpen, 
  onClose, 
  onViewDashboard, 
  downloadCount 
}: DownloadSuccessModalProps) {
  if (!isOpen) return null;

  const handleViewDashboard = () => {
    onViewDashboard();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[110] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-gray-900">Download Berhasil!</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">
              {downloadCount} Dataset Berhasil Diunduh
            </h3>
            <p className="text-gray-600">
              Dataset Anda telah berhasil diunduh dan disimpan. Anda dapat melihat riwayat download di Lacak Dataset.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="mb-1">Dataset telah tersimpan dan siap digunakan.</p>
                <p className="text-green-700">
                  Cek Lacak Dataset untuk melihat detail lengkap dan riwayat download Anda.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleViewDashboard}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Lihat di Lacak Dataset</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
