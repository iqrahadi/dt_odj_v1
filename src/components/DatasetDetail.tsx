import { useState } from 'react';
import { ChevronLeft, Download, ChevronDown, Bookmark } from 'lucide-react';
import type { Dataset } from '../App';

interface DatasetDetailProps {
  dataset: Dataset;
  onBack: () => void;
  onSaveDataset: (dataset: Dataset) => void;
}

interface TableData {
  nama_provinsi: string;
  nama_kabupaten_kota: string;
  prb_edit: string;
  tahun: string;
}

const mockTableData: TableData[] = [
  { nama_provinsi: 'JAWA BARAT', nama_kabupaten_kota: 'KABUPATEN BOGOR', prb_edit: '92432', tahun: '2010' },
  { nama_provinsi: 'JAWA BARAT', nama_kabupaten_kota: 'KABUPATEN SUKABUMI', prb_edit: '28801', tahun: '2010' },
  { nama_provinsi: 'JAWA BARAT', nama_kabupaten_kota: 'KABUPATEN CIANJUR', prb_edit: '49013', tahun: '2010' },
  { nama_provinsi: 'JAWA BARAT', nama_kabupaten_kota: 'KABUPATEN BANDUNG', prb_edit: '48412', tahun: '2010' },
  { nama_provinsi: 'JAWA BARAT', nama_kabupaten_kota: 'KABUPATEN GARUT', prb_edit: '21445', tahun: '2010' },
  { nama_provinsi: 'JAWA BARAT', nama_kabupaten_kota: 'KABUPATEN TASIKMALAYA', prb_edit: '15953', tahun: '2010' },
  { nama_provinsi: 'JAWA BARAT', nama_kabupaten_kota: 'KABUPATEN CIAMIS', prb_edit: '13716', tahun: '2010' },
  { nama_provinsi: 'JAWA BARAT', nama_kabupaten_kota: 'KABUPATEN KUNINGAN', prb_edit: '9032', tahun: '2010' },
  { nama_provinsi: 'JAWA BARAT', nama_kabupaten_kota: 'KABUPATEN CIREBON', prb_edit: '21416', tahun: '2010' },
  { nama_provinsi: 'JAWA BARAT', nama_kabupaten_kota: 'KABUPATEN MAJALENGKA', prb_edit: '12585', tahun: '2010' },
];

export function DatasetDetail({ dataset, onBack, onSaveDataset }: DatasetDetailProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'grafik' | 'peta'>('about');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(mockTableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = mockTableData.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={onBack} className="hover:text-green-600 transition-colors">
              Data
            </button>
            <span>&gt;</span>
            <span className="text-gray-900">Metadata</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          
          <h1 className="mb-4 text-3xl md:text-4xl">{dataset.title}</h1>
          
          <div className="bg-white rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4 text-base leading-relaxed">
              Dataset ini berisi data jumlah domestik regional bruto atas dasar harga konstan berdasarkan Kabupaten/Kota di Provinsi Jawa Barat dari tahun 2010 sampai dengan tahun 2022.
            </p>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <strong>Dataset terakhir terpublikasikan di dalam Publikasi :</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                <li>Produk Domestik Regional Bruto Kabupaten/Kota Provinsi Jawa Barat menurut Lapangan Usaha 2018-2022 (Seri/Base Year 2010).</li>
                <li>Indeks Kesenjangan Wilayah mencakup rasio daya beli antar Produk Area Bruto untuk kategori PDRB yang lain pada seluruh Kabupaten Kota di Jawa Barat 2017-2022 dengan 9 IPI yang ada</li>
                <li>Indeks Kesenjangan daerah mencakup kota dan wilayah kabupaten dari tahun di Provinsi Jawa Barat untuk kategori PDRB pada tahun 2017-2022 dengan 9 IPI data tersedia.</li>
                <li>produk domestik regional bruto di tingkat kabupaten kota menggunakan PDRB yang ada untuk tahun 2017-2022 mengacu 9 indikator yang digunakan Regional Kategori dengan IPI yang rinci.</li>
                <li>Tahun : menyediakan tahun periode dengan data yang tersedia.</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              Unduh Dataset
            </button>
            <button 
              onClick={() => onSaveDataset(dataset)}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
            >
              <Bookmark className="w-4 h-4" />
              Simpan
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 border-b-2 transition-colors text-sm ${
                  activeTab === 'about'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Tentang
              </button>
              <button
                onClick={() => setActiveTab('grafik')}
                className={`py-4 border-b-2 transition-colors text-sm ${
                  activeTab === 'grafik'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Grafik
              </button>
              <button
                onClick={() => setActiveTab('peta')}
                className={`py-4 border-b-2 transition-colors text-sm ${
                  activeTab === 'peta'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Peta
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'about' && (
              <div>
                <h3 className="mb-4 text-xl">Data Kabupaten/Kota</h3>
                
                {/* Filter Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Unduh dataset</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option>Filter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Unduh contoh Data</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option>Filter</option>
                    </select>
                  </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">nama_provinsi</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">nama_kabupaten_kota</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">prb_edit</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">tahun</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 border-b border-gray-200 text-sm">
                            {row.nama_provinsi}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 text-sm">
                            {row.nama_kabupaten_kota}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 text-sm">
                            {row.prb_edit}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 text-sm">
                            {row.tahun}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-600">
                    *Tampilkan data dari {startIndex + 1} sampai {Math.min(endIndex, mockTableData.length)} dari total {mockTableData.length} data
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === page
                            ? 'bg-green-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'grafik' && (
              <div className="text-center py-12 text-gray-500">
                Grafik visualisasi data akan ditampilkan di sini
              </div>
            )}

            {activeTab === 'peta' && (
              <div className="text-center py-12 text-gray-500">
                Peta visualisasi data akan ditampilkan di sini
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
