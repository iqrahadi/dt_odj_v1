import { Database, Building2, Download } from 'lucide-react';

interface HeroProps {
  onNavigateToDashboard: () => void;
}

export function Hero({ onNavigateToDashboard }: HeroProps) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="mb-4 text-4xl md:text-5xl">Portal Data Terbuka Jawa Barat</h1>
          <p className="text-green-100 mb-8 text-lg md:text-xl">
            Akses data publik untuk transparansi, inovasi, dan pembangunan berbasis data
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-white/20 rounded-full">
                  <Database className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl mb-1">1,247</div>
              <div className="text-sm text-green-100">Total Dataset</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-white/20 rounded-full">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl mb-1">89</div>
              <div className="text-sm text-green-100">Organisasi</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-white/20 rounded-full">
                  <Download className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl mb-1">45K+</div>
              <div className="text-sm text-green-100">Total Unduhan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
