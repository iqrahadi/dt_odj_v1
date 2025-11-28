import { Search, Menu, X, ShoppingCart, ChevronDown, LayoutDashboard, Package, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { SignInModal } from './SignInModal';

interface HeaderProps {
  cartCount: number;
  bookmarkCount: number;
  onCartClick: () => void;
  onBookmarkClick: () => void;
  currentView: 'home' | 'dashboard' | 'tracking' | 'detail';
  onNavigate: (view: 'home' | 'dashboard' | 'tracking' | 'detail') => void;
}

const categories = [
  { id: 'health', name: 'Kesehatan' },
  { id: 'education', name: 'Pendidikan' },
  { id: 'transportation', name: 'Transportasi' },
  { id: 'economy', name: 'Ekonomi' },
  { id: 'environment', name: 'Lingkungan' },
  { id: 'social', name: 'Layanan Sosial' },
  { id: 'infrastructure', name: 'Infrastruktur' },
  { id: 'tourism', name: 'Pariwisata' }
];

export function Header({ cartCount, bookmarkCount, onCartClick, onBookmarkClick, currentView, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  return (
    <>
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
      
      <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button 
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
              className="text-gray-900"
            >
              Open Data Jabar
            </button>
            
            <nav className="hidden lg:flex items-center gap-6">
              {/* Level 1: Informasi Publik */}
              <div className="flex items-center gap-5">
                {/* Topik Dropdown */}
                <div className="relative">
                  <button 
                    onMouseEnter={() => setIsTopicDropdownOpen(true)}
                    onMouseLeave={() => setIsTopicDropdownOpen(false)}
                    className="flex items-center gap-1 text-sm text-gray-700 hover:text-green-600 transition-colors whitespace-nowrap"
                  >
                    <span>Topik</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {isTopicDropdownOpen && (
                    <div 
                      onMouseEnter={() => setIsTopicDropdownOpen(true)}
                      onMouseLeave={() => setIsTopicDropdownOpen(false)}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                    >
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            onNavigate('home');
                            setIsTopicDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => onNavigate('home')}
                  className={`text-sm transition-colors whitespace-nowrap ${currentView === 'home' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
                >
                  Dataset
                </button>
                
                <a href="#" className="text-sm text-gray-700 hover:text-green-600 transition-colors whitespace-nowrap">
                  Pemanfaatan Data
                </a>
                
                <a href="#" className="text-sm text-gray-700 hover:text-green-600 transition-colors whitespace-nowrap">
                  Organisasi
                </a>
                
                <a href="#" className="text-sm text-gray-700 hover:text-green-600 transition-colors whitespace-nowrap">
                  Portal Data Kab/Kota
                </a>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-300"></div>
              
              {/* Level 2: User Actions */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={onCartClick}
                  className="relative p-2 rounded-lg border border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-green-600 text-white rounded-full text-xs min-w-[18px] h-[18px] flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={onBookmarkClick}
                  className="relative p-2 rounded-lg border border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                >
                  <Bookmark className="w-4 h-4" />
                  {bookmarkCount > 0 && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-green-600 text-white rounded-full text-xs min-w-[18px] h-[18px] flex items-center justify-center">
                      {bookmarkCount}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm whitespace-nowrap transition-colors ${
                    (currentView === 'dashboard' || currentView === 'tracking')
                      ? 'border-green-600 text-green-600 bg-green-50'
                      : 'border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Lacak Dataset</span>
                </button>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile cart and bookmark icons */}
            <div className="lg:hidden flex items-center gap-2">
              <button 
                onClick={onCartClick}
                className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={onBookmarkClick}
                className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <Bookmark className="w-6 h-6" />
                {bookmarkCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                    {bookmarkCount}
                  </span>
                )}
              </button>
            </div>

            {/* Level 3: Authentication */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={(e) => { e.preventDefault(); setIsSignInModalOpen(true); }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm shadow-sm"
              >
                Sign In
              </button>
            </div>

            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {/* Level 1: Informasi Publik */}
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-gray-500 px-2 mb-3">Informasi Publik</div>
                
                <div className="py-2">
                  <div className="text-gray-700 mb-2 px-2">Topik</div>
                  <div className="pl-4 space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          onNavigate('home');
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left py-1 text-sm text-gray-600 hover:text-green-600 transition-colors"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}
                  className={`text-left py-2 px-2 transition-colors w-full ${currentView === 'home' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
                >
                  Dataset
                </button>
                
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors py-2 px-2 block">
                  Pemanfaatan Data
                </a>
                
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors py-2 px-2 block">
                  Organisasi
                </a>
                
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors py-2 px-2 block">
                  Portal Data Kab/Kota
                </a>
              </div>

              <div className="border-t border-gray-200"></div>

              {/* Level 2: User Actions */}
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-gray-500 px-2 mb-3">Aksi Pengguna</div>
                
                <button 
                  onClick={() => { onNavigate('dashboard'); setIsMenuOpen(false); }}
                  className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                    (currentView === 'dashboard' || currentView === 'tracking')
                      ? 'border-green-600 text-green-600 bg-green-50'
                      : 'border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Lacak Dataset</span>
                </button>
              </div>

              <div className="border-t border-gray-200"></div>
              
              {/* Level 3: Authentication */}
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-gray-500 px-2 mb-3">Akun</div>
                <button 
                  onClick={(e) => { e.preventDefault(); setIsSignInModalOpen(true); setIsMenuOpen(false); }}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                >
                  Sign In
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  );
}
