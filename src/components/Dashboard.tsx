import { useState } from 'react';
import { Clock, CheckCircle, XCircle, Calendar, FileText, Building2, Mail, Eye, Download, Package } from 'lucide-react';
import type { DataRequest, DownloadedDataset } from '../App';

interface DashboardProps {
  requests: DataRequest[];
  onViewTracking: (requestId: number) => void;
  downloadedDatasets: DownloadedDataset[];
}

type TabType = 'downloads' | 'requests';

export function Dashboard({ requests, onViewTracking, downloadedDatasets }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('requests');
  const getStatusConfig = (status: DataRequest['status']) => {
    switch (status) {
      case 'submitted':
        return {
          label: 'Diterima',
          icon: FileText,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200'
        };
      case 'under_review':
        return {
          label: 'Direview',
          icon: Clock,
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          borderColor: 'border-yellow-200'
        };
      case 'processing':
        return {
          label: 'Diproses',
          icon: Clock,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200'
        };

      case 'completed':
        return {
          label: 'Selesai',
          icon: CheckCircle,
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          borderColor: 'border-green-200'
        };
      case 'rejected':
        return {
          label: 'Ditolak',
          icon: XCircle,
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          borderColor: 'border-red-200'
        };
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const requestStats = {
    total: requests.length,
    inProgress: requests.filter(r => ['submitted', 'under_review', 'processing'].includes(r.status)).length,
    completed: requests.filter(r => r.status === 'completed').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  const downloadStats = {
    total: downloadedDatasets.length,
    thisMonth: downloadedDatasets.filter(d => {
      const downloadDate = new Date(d.downloadedAt);
      const now = new Date();
      return downloadDate.getMonth() === now.getMonth() && downloadDate.getFullYear() === now.getFullYear();
    }).length,
    categories: [...new Set(downloadedDatasets.map(d => d.category))].length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Lacak Dataset</h1>
        <p className="text-gray-600">Kelola dataset dan permintaan data Anda</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('requests')}
              className={`pb-4 px-1 border-b-2 transition-colors ${
                activeTab === 'requests'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>Daftar Permintaan</span>
                {requests.length > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === 'requests'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {requests.length}
                  </span>
                )}
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('downloads')}
              className={`pb-4 px-1 border-b-2 transition-colors ${
                activeTab === 'downloads'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>Data yang Sudah Didownload</span>
                {downloadedDatasets.length > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === 'downloads'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {downloadedDatasets.length}
                  </span>
                )}
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Stats Cards - Conditional based on active tab */}
      {activeTab === 'requests' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Permintaan</p>
                <p className="text-2xl text-gray-900">{requestStats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sedang Diproses</p>
                <p className="text-2xl text-blue-600">{requestStats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Selesai</p>
                <p className="text-2xl text-green-600">{requestStats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ditolak</p>
                <p className="text-2xl text-red-600">{requestStats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'downloads' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Download</p>
                <p className="text-2xl text-gray-900">{downloadStats.total}</p>
              </div>
              <Download className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Download Bulan Ini</p>
                <p className="text-2xl text-green-600">{downloadStats.thisMonth}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Kategori Berbeda</p>
                <p className="text-2xl text-blue-600">{downloadStats.categories}</p>
              </div>
              <Package className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'downloads' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2>Dataset yang Sudah Didownload</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Riwayat dataset yang telah Anda download
                </p>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {downloadedDatasets.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Belum ada dataset yang didownload</p>
                <p className="text-sm text-gray-400">
                  Dataset yang Anda download akan muncul di sini
                </p>
              </div>
            ) : (
              downloadedDatasets.map((dataset) => (
                <div key={`downloaded-${dataset.id}-${dataset.downloadedAt.getTime()}`} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {dataset.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          <Download className="w-3 h-3" />
                          Downloaded
                        </span>
                      </div>
                      
                      <h3 className="text-gray-900 mb-2">{dataset.title}</h3>
                      <p className="text-gray-600 mb-4">{dataset.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Building2 className="w-4 h-4" />
                          <span>{dataset.organization}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Didownload: {formatDate(dataset.downloadedAt)}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-gray-600">Format yang didownload:</span>
                        <div className="flex gap-1">
                          {dataset.downloadedFormats.map((fmt) => (
                            <span key={fmt} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {fmt}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2>Daftar Permintaan</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Lacak status permintaan dataset Anda
                </p>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {requests.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Belum ada permintaan data</p>
                <p className="text-sm text-gray-400">
                  Gunakan chatbot untuk mengajukan permintaan data baru
                </p>
              </div>
            ) : (
              requests.map((request) => {
                const statusConfig = getStatusConfig(request.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                            <StatusIcon className="w-4 h-4" />
                            {statusConfig.label}
                          </span>
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {request.category}
                          </span>
                        </div>
                        
                        <h3 className="text-gray-900 mb-2">{request.title}</h3>
                        <p className="text-gray-600 mb-4">{request.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Building2 className="w-4 h-4" />
                            <span>{request.organization}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{request.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Diajukan: {formatDate(request.requestDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>Update: {formatDate(request.updatedDate)}</span>
                          </div>
                        </div>

                        {request.status === 'rejected' && request.rejectionReason && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800">
                              <span>Alasan penolakan: </span>
                              {request.rejectionReason}
                            </p>
                          </div>
                        )}

                        <div className="mt-4 flex gap-2">
                          <button 
                            onClick={() => onViewTracking(request.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Lihat Tracking
                          </button>
                          {request.status === 'completed' && (
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                              Download Dataset
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
