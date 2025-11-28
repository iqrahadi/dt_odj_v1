import { X, Trash2, Download, ShoppingCart } from 'lucide-react';
import type { Dataset } from '../App';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Dataset[];
  onRemoveItem: (datasetId: number) => void;
  onClearCart: () => void;
  onDownloadAll: (datasets: Dataset[]) => void;
}

export function Cart({ isOpen, onClose, cartItems, onRemoveItem, onClearCart, onDownloadAll }: CartProps) {
  if (!isOpen) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDownloadAll = () => {
    onDownloadAll(cartItems);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-green-600" />
              <h2 className="text-gray-900">Keranjang Dataset</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {cartItems.length} dataset dipilih
          </p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Keranjang kosong</p>
              <p className="text-sm text-gray-400">
                Tambahkan dataset yang ingin Anda unduh
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs mb-2">
                        {item.category}
                      </span>
                      <h4 className="text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors flex-shrink-0"
                      title="Hapus dari keranjang"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      Update: {formatDate(item.updated)}
                    </div>
                    <div className="flex gap-1">
                      {item.format.map((fmt) => (
                        <span
                          key={fmt}
                          className="px-2 py-1 bg-white text-gray-700 rounded text-xs border border-gray-200"
                        >
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-200 space-y-3">
            <button
              onClick={handleDownloadAll}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Semua ({cartItems.length})</span>
            </button>
            <button
              onClick={onClearCart}
              className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Kosongkan Keranjang</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
