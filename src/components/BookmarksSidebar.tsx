import { X, Bookmark, Building2, Calendar, Eye, Download, Trash2, Search } from 'lucide-react';
import type { Dataset } from '../App';

interface BookmarksSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedDatasets: Dataset[];
  onRemoveBookmark: (datasetId: number) => void;
  onViewDetail: (dataset: Dataset) => void;
}

export function BookmarksSidebar({ 
  isOpen, 
  onClose, 
  bookmarkedDatasets, 
  onRemoveBookmark,
  onViewDetail 
}: BookmarksSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Bookmarks Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-green-600" />
              <h2 className="text-gray-900">Dataset Tersimpan</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {bookmarkedDatasets.length} dataset tersimpan
          </p>
        </div>

        {/* Search */}
        {bookmarkedDatasets.length > 0 && (
          <div className="px-6 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari dataset..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        )}

        {/* Bookmarked Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {bookmarkedDatasets.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Belum ada dataset yang disimpan</p>
              <p className="text-sm text-gray-400">
                Simpan dataset favorit Anda untuk akses lebih mudah
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarkedDatasets.map((dataset) => (
                <div
                  key={`bookmark-${dataset.id}`}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs mb-2">
                        {dataset.category}
                      </span>
                      <h4 className="text-gray-900 mb-1">{dataset.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {dataset.description}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveBookmark(dataset.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                      title="Hapus dari simpanan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5" />
                      <span className="truncate">{dataset.organization}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Update: {dataset.updated}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        <span>{dataset.downloads.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{dataset.views.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-600">Format:</span>
                    <div className="flex gap-1">
                      {dataset.format.map((fmt) => (
                        <span key={fmt} className="px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onViewDetail(dataset)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Lihat Detail</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {bookmarkedDatasets.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Dataset:</span>
              <span className="text-gray-900">{bookmarkedDatasets.length}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
