import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* About Open Data Jabar */}
          <div className="lg:col-span-2">
            <div className="mb-4">Open Data Jabar</div>
            <p className="text-sm text-gray-400 mb-4">
              Portal resmi data terbuka Pemerintah Provinsi Jawa Barat. Menyediakan akses data publik untuk mendorong transparansi, inovasi, dan partisipasi masyarakat dalam pembangunan daerah.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors" aria-label="Youtube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Jelajahi Data */}
          <div>
            <div className="mb-4">Jelajahi Data</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Dataset</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pemanfaatan Data</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Organisasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Topik & Kategori</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Portal Kab/Kota</a></li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <div className="mb-4">Layanan</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Permohonan Dataset</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lacak Permintaan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Panduan Penggunaan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Standar Data</a></li>
            </ul>
          </div>

          {/* Informasi & Bantuan */}
          <div>
            <div className="mb-4">Informasi</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lisensi Data</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-800 rounded-lg">
                <Mail className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Email</div>
                <a href="mailto:opendata@jabarprov.go.id" className="text-sm hover:text-white transition-colors">
                  opendata@jabarprov.go.id
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-800 rounded-lg">
                <Phone className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Telepon</div>
                <a href="tel:+622122605000" className="text-sm hover:text-white transition-colors">
                  (022) 2605000
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-800 rounded-lg">
                <MapPin className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Alamat</div>
                <p className="text-sm">
                  Gedung Sate, Jl. Diponegoro No. 22<br />Bandung, Jawa Barat 40115
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2024 Open Data Jabar - Pemerintah Provinsi Jawa Barat. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
