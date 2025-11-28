import { ArrowLeft, FileText, Clock, CheckCircle, XCircle, Eye, Package } from 'lucide-react';
import type { DataRequest, RequestStatus } from '../App';
import { ProgressBar } from './ProgressBar';

interface TrackingDetailProps {
  request: DataRequest;
  onBack: () => void;
}

export function TrackingDetail({ request, onBack }: TrackingDetailProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: RequestStatus) => {
    if (status === 'rejected') return 'text-red-600';
    if (status === 'completed') return 'text-green-600';
    return 'text-blue-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali ke Lacak Dataset</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Tracking Permintaan Data</h1>
        <p className="text-gray-600">Lacak status dan progres permintaan dataset Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Request Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h3 className="text-gray-900 mb-4">Informasi Permintaan</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">Nomor Tracking</label>
                <p className="text-gray-900">{request.trackingNumber}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-500 block mb-1">Nama Dataset</label>
                <p className="text-gray-900">{request.title}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-500 block mb-1">Organisasi</label>
                <p className="text-gray-900">{request.organization}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-500 block mb-1">Email Kontak</label>
                <p className="text-gray-900">{request.email}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-500 block mb-1">Tanggal Permintaan</label>
                <p className="text-gray-900">{formatDate(request.requestDate)}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-500 block mb-1">Kategori</label>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {request.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Progress and Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Status Progres</h3>
            <ProgressBar currentStatus={request.status} />
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">
              Riwayat Aktivitas
              {request.status === 'rejected' && (
                <span className="ml-2 text-sm text-red-600">(Ditolak)</span>
              )}
              {request.status === 'completed' && (
                <span className="ml-2 text-sm text-green-600">(Selesai)</span>
              )}
            </h3>
            
            <div className="space-y-4">
              {[...request.timeline].reverse().map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === request.status ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                    {index < request.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between mb-1">
                      <p className={`${getStatusColor(item.status)}`}>
                        {item.description}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(item.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {request.status === 'rejected' && request.rejectionReason && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="text-red-800 mb-2">Alasan Penolakan</h4>
                <p className="text-sm text-red-700">{request.rejectionReason}</p>
              </div>
            )}

            {request.status === 'completed' && (
              <div className="mt-6">
                <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <Package className="w-5 h-5" />
                  <span>Download Dataset</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
