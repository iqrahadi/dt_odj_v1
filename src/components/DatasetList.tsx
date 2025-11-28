import { useState } from 'react';
import { Search, Grid, List, FileText, LayoutDashboard, Stethoscope, GraduationCap, Bus, TrendingUp, Leaf, Users, Building, Plane, LayoutGrid } from 'lucide-react';
import { DatasetCard } from './DatasetCard';
import { RequestDatasetModal } from './RequestDatasetModal';
import type { Dataset } from '../App';
import type { RequestDatasetFormData } from './RequestDatasetModal';

const categories = [
  { id: 'all', name: 'Semua Kategori', icon: LayoutGrid, color: 'gray' },
  { id: 'health', name: 'Kesehatan', icon: Stethoscope, color: 'red' },
  { id: 'education', name: 'Pendidikan', icon: GraduationCap, color: 'blue' },
  { id: 'transportation', name: 'Transportasi', icon: Bus, color: 'yellow' },
  { id: 'economy', name: 'Ekonomi', icon: TrendingUp, color: 'green' },
  { id: 'environment', name: 'Lingkungan', icon: Leaf, color: 'emerald' },
  { id: 'social', name: 'Layanan Sosial', icon: Users, color: 'purple' },
  { id: 'infrastructure', name: 'Infrastruktur', icon: Building, color: 'orange' },
  { id: 'tourism', name: 'Pariwisata', icon: Plane, color: 'cyan' }
];

const categoryMapping: { [key: string]: string } = {
  'Health': 'health',
  'Education': 'education',
  'Transportation': 'transportation',
  'Economy': 'economy',
  'Environment': 'environment',
  'Social Services': 'social',
  'Infrastructure': 'infrastructure',
  'Tourism': 'tourism'
};

const datasets = [
  {
    id: 1,
    title: 'Data Fasilitas Kesehatan Jawa Barat',
    description: 'Daftar lengkap fasilitas kesehatan publik termasuk rumah sakit, puskesmas, dan klinik dengan data lokasi, kapasitas tempat tidur, dan tenaga medis di seluruh Jawa Barat.',
    organization: 'Dinas Kesehatan Provinsi Jawa Barat',
    category: 'Health',
    format: ['CSV', 'JSON', 'API'],
    updated: '2024-11-20',
    downloads: 1234,
    views: 5678
  },
  {
    id: 2,
    title: 'Statistik Pendidikan Sekolah 2024',
    description: 'Data statistik pendidikan tahunan meliputi tingkat partisipasi sekolah, kelulusan, dan nilai ujian nasional di seluruh sekolah negeri dan swasta Jawa Barat.',
    organization: 'Dinas Pendidikan Provinsi Jawa Barat',
    category: 'Education',
    format: ['XLSX', 'CSV'],
    updated: '2024-11-15',
    downloads: 892,
    views: 3421
  },
  {
    id: 3,
    title: 'Rute dan Jadwal Transportasi Publik',
    description: 'Data real-time dan jadwal rute transportasi umum termasuk bus, kereta api, dan angkutan kota dengan informasi titik pemberhentian dan waktu operasional.',
    organization: 'Dinas Perhubungan Provinsi Jawa Barat',
    category: 'Transportation',
    format: ['JSON', 'GTFS', 'API'],
    updated: '2024-11-25',
    downloads: 2341,
    views: 8765
  },
  {
    id: 4,
    title: 'Indikator Ekonomi Regional Jawa Barat',
    description: 'Data ekonomi triwulanan meliputi PDRB, tingkat pengangguran, registrasi usaha, inflasi, dan statistik perdagangan regional Jawa Barat.',
    organization: 'Badan Pusat Statistik Jawa Barat',
    category: 'Economy',
    format: ['CSV', 'XLSX', 'PDF'],
    updated: '2024-11-10',
    downloads: 567,
    views: 2345
  },
  {
    id: 5,
    title: 'Data Pemantauan Kualitas Udara',
    description: 'Pengukuran kualitas udara per jam dari stasiun pemantau meliputi PM2.5, PM10, CO2, SO2, dan polutan lainnya di berbagai titik di Jawa Barat.',
    organization: 'Dinas Lingkungan Hidup Provinsi Jawa Barat',
    category: 'Environment',
    format: ['CSV', 'JSON', 'API'],
    updated: '2024-11-27',
    downloads: 1876,
    views: 6543
  },
  {
    id: 6,
    title: 'Registrasi Program Bantuan Sosial',
    description: 'Direktori program bantuan sosial, kriteria penerima, jumlah penerima manfaat, dan distribusi bantuan per kabupaten/kota di Jawa Barat.',
    organization: 'Dinas Sosial Provinsi Jawa Barat',
    category: 'Social Services',
    format: ['CSV', 'PDF'],
    updated: '2024-11-18',
    downloads: 432,
    views: 1987
  },
  {
    id: 7,
    title: 'Proyek Pembangunan Infrastruktur',
    description: 'Daftar proyek infrastruktur yang sedang berjalan dan selesai meliputi jalan, jembatan, dan fasilitas publik dengan anggaran dan timeline pelaksanaan.',
    organization: 'Dinas Pekerjaan Umum dan Penataan Ruang',
    category: 'Infrastructure',
    format: ['XLSX', 'JSON'],
    updated: '2024-11-22',
    downloads: 765,
    views: 3210
  },
  {
    id: 8,
    title: 'Destinasi Wisata dan Statistik Pengunjung',
    description: 'Database destinasi pariwisata, jumlah kunjungan wisatawan tahunan, pendapatan sektor pariwisata, dan fasilitas wisata per lokasi di Jawa Barat.',
    organization: 'Dinas Pariwisata dan Kebudayaan Jawa Barat',
    category: 'Tourism',
    format: ['CSV', 'JSON', 'API'],
    updated: '2024-11-12',
    downloads: 1123,
    views: 4567
  }
];

interface DatasetListProps {
  onAddToCart: (dataset: Dataset) => void;
  cartItems: Dataset[];
  onRequestDataset: (data: RequestDatasetFormData) => void;
  onNavigateToDashboard: () => void;
  onViewDetail: (dataset: Dataset) => void;
}

export function DatasetList({ onAddToCart, cartItems, onRequestDataset, onNavigateToDashboard, onViewDetail }: DatasetListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const filteredDatasets = datasets.filter(d => {
    const matchesCategory = selectedCategory === 'all' || categoryMapping[d.category] === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRequestSubmit = (data: RequestDatasetFormData) => {
    onRequestDataset(data);
  };

  return (
    <>
      <RequestDatasetModal 
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={handleRequestSubmit}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Title and Request Button */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl">Dataset</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onNavigateToDashboard}
              className="px-4 py-2 bg-white text-green-700 border border-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2 whitespace-nowrap text-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              Lacak Dataset
            </button>
            <button
              onClick={() => setIsRequestModalOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 whitespace-nowrap text-sm"
            >
              <FileText className="w-4 h-4" />
              Permohonan Dataset
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari dataset, organisasi, atau topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

      {/* Categories */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters and View Options */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          >
            <option value="recent">Terbaru</option>
            <option value="popular">Terpopuler</option>
            <option value="downloads">Paling Banyak Diunduh</option>
            <option value="name">Nama A-Z</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Dataset Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'flex flex-col gap-4'
      }>
        {filteredDatasets.map((dataset) => (
          <DatasetCard 
            key={dataset.id} 
            dataset={dataset} 
            viewMode={viewMode}
            onAddToCart={onAddToCart}
            isInCart={cartItems.some(item => item.id === dataset.id)}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>

        {filteredDatasets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada dataset yang ditemukan</p>
          </div>
        )}
      </div>
    </>
  );
}
