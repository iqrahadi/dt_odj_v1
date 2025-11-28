import { Download, Eye, Calendar, Building2, ShoppingCart, Check } from 'lucide-react';
import type { Dataset } from '../App';

interface DatasetCardProps {
  dataset: Dataset;
  viewMode: 'grid' | 'list';
  onAddToCart: (dataset: Dataset) => void;
  isInCart: boolean;
  onViewDetail: (dataset: Dataset) => void;
}

const categoryTranslations: { [key: string]: string } = {
  'Health': 'Kesehatan',
  'Education': 'Pendidikan',
  'Transportation': 'Transportasi',
  'Economy': 'Ekonomi',
  'Environment': 'Lingkungan',
  'Social Services': 'Layanan Sosial',
  'Infrastructure': 'Infrastruktur',
  'Tourism': 'Pariwisata'
};

export function DatasetCard({ dataset, viewMode, onAddToCart, isInCart, onViewDetail }: DatasetCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getCategoryName = (category: string) => {
    return categoryTranslations[category] || category;
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {getCategoryName(dataset.category)}
              </span>
            </div>
            <h3 
              className="mb-2 text-gray-900 hover:text-green-600 cursor-pointer text-xl"
              onClick={() => onViewDetail(dataset)}
            >
              {dataset.title}
            </h3>
            <p className="text-gray-600 mb-3 text-sm leading-relaxed">{dataset.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                <span>{dataset.organization}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Diperbarui {formatDate(dataset.updated)}</span>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:gap-3">
            <div className="flex gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span>{formatNumber(dataset.downloads)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{formatNumber(dataset.views)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {dataset.format.map((fmt) => (
                <span key={fmt} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {fmt}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onViewDetail(dataset)}
                className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat Detail</span>
              </button>
              <button
                onClick={() => onAddToCart(dataset)}
                disabled={isInCart}
                title={isInCart ? 'Sudah ditambahkan' : 'Tambah ke keranjang'}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-center ${
                  isInCart
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isInCart ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col">
      <div className="mb-3">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          {getCategoryName(dataset.category)}
        </span>
      </div>
      <h3 
        className="mb-2 text-gray-900 hover:text-green-600 cursor-pointer text-lg"
        onClick={() => onViewDetail(dataset)}
      >
        {dataset.title}
      </h3>
      <p className="text-gray-600 mb-4 flex-1 text-sm leading-relaxed">{dataset.description}</p>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Building2 className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{dataset.organization}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span>Diperbarui {formatDate(dataset.updated)}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{formatNumber(dataset.downloads)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(dataset.views)}</span>
            </div>
          </div>
          <div className="flex gap-1">
            {dataset.format.map((fmt) => (
              <span key={fmt} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {fmt}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onViewDetail(dataset)}
            className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700"
          >
            <Eye className="w-4 h-4" />
            <span>Lihat Detail</span>
          </button>
          <button
            onClick={() => onAddToCart(dataset)}
            disabled={isInCart}
            title={isInCart ? 'Sudah ditambahkan' : 'Tambah ke keranjang'}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-center ${
              isInCart
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isInCart ? (
              <Check className="w-5 h-5" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
