import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DatasetList } from './components/DatasetList';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { BookmarksSidebar } from './components/BookmarksSidebar';
import { Dashboard } from './components/Dashboard';
import { TrackingDetail } from './components/TrackingDetail';
import { RequestDatasetModal } from './components/RequestDatasetModal';
import { DownloadSuccessModal } from './components/DownloadSuccessModal';
import { Snackbar } from './components/Snackbar';
import { DatasetDetail } from './components/DatasetDetail';
import type { RequestDatasetFormData } from './components/RequestDatasetModal';

export interface Dataset {
  id: number;
  title: string;
  description: string;
  organization: string;
  category: string;
  format: string[];
  updated: string;
  downloads: number;
  views: number;
}

export interface DownloadedDataset extends Dataset {
  downloadedAt: Date;
  downloadedFormats: string[];
}

export type RequestStatus = 'submitted' | 'under_review' | 'processing' | 'completed' | 'rejected';

export interface DataRequest {
  id: number;
  title: string;
  description: string;
  category: string;
  purpose: string;
  organization: string;
  email: string;
  status: RequestStatus;
  requestDate: Date;
  updatedDate: Date;
  rejectionReason?: string;
  trackingNumber: string;
  timeline: {
    status: RequestStatus;
    timestamp: Date;
    description: string;
  }[];
}

export default function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookmarksSidebarOpen, setIsBookmarksSidebarOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isDownloadSuccessOpen, setIsDownloadSuccessOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [downloadCount, setDownloadCount] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'tracking' | 'detail'>('home');
  const [detailSource, setDetailSource] = useState<'home' | 'bookmarks'>('home');
  const [cartItems, setCartItems] = useState<Dataset[]>([]);
  const [downloadedDatasets, setDownloadedDatasets] = useState<DownloadedDataset[]>([]);
  const [bookmarkedDatasets, setBookmarkedDatasets] = useState<Dataset[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [dataRequests, setDataRequests] = useState<DataRequest[]>([
    {
      id: 1,
      title: 'Data Penduduk per Kecamatan',
      description: 'Membutuhkan data jumlah penduduk per kecamatan untuk penelitian demografi',
      category: 'Social Services',
      purpose: 'Penelitian Akademik',
      organization: 'Universitas Indonesia',
      email: 'researcher@ui.ac.id',
      status: 'completed',
      requestDate: new Date('2024-11-15'),
      updatedDate: new Date('2024-11-20'),
      trackingNumber: 'DREQ20241115001',
      timeline: [
        {
          status: 'submitted',
          timestamp: new Date('2024-11-15T09:00:00'),
          description: 'Permintaan data telah diterima dan sedang menunggu review'
        },
        {
          status: 'under_review',
          timestamp: new Date('2024-11-15T14:30:00'),
          description: 'Tim kami sedang melakukan review terhadap permintaan Anda'
        },
        {
          status: 'processing',
          timestamp: new Date('2024-11-17T10:15:00'),
          description: 'Data sedang diproses dan disiapkan'
        },
        {
          status: 'completed',
          timestamp: new Date('2024-11-20T11:20:00'),
          description: 'Dataset telah berhasil diproses dan siap diunduh'
        }
      ]
    },
    {
      id: 2,
      title: 'Data Kualitas Udara Real-time',
      description: 'Data sensor kualitas udara untuk analisis pola polusi',
      category: 'Environment',
      purpose: 'Riset Lingkungan',
      organization: 'Green Earth Foundation',
      email: 'research@greenearth.org',
      status: 'processing',
      requestDate: new Date('2024-11-22'),
      updatedDate: new Date('2024-11-25'),
      trackingNumber: 'DREQ20241122002',
      timeline: [
        {
          status: 'submitted',
          timestamp: new Date('2024-11-22T10:30:00'),
          description: 'Permintaan data telah diterima dan sedang menunggu review'
        },
        {
          status: 'under_review',
          timestamp: new Date('2024-11-23T09:15:00'),
          description: 'Tim kami sedang melakukan review terhadap permintaan Anda'
        },
        {
          status: 'processing',
          timestamp: new Date('2024-11-25T14:20:00'),
          description: 'Data sedang diproses dan disiapkan'
        }
      ]
    }
  ]);

  const addToCart = (dataset: Dataset) => {
    if (!cartItems.find(item => item.id === dataset.id)) {
      setCartItems([...cartItems, dataset]);
      setSnackbarMessage(`"${dataset.title}" berhasil ditambahkan ke keranjang`);
      setIsSnackbarOpen(true);
    }
  };

  const removeFromCart = (datasetId: number) => {
    setCartItems(cartItems.filter(item => item.id !== datasetId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleDownloadAll = (datasets: Dataset[]) => {
    const now = new Date();
    const downloaded: DownloadedDataset[] = datasets.map(dataset => ({
      ...dataset,
      downloadedAt: now,
      downloadedFormats: dataset.format
    }));
    
    setDownloadedDatasets([...downloaded, ...downloadedDatasets]);
    setDownloadCount(datasets.length);
    setIsDownloadSuccessOpen(true);
    setIsCartOpen(false);
    setCartItems([]);
  };

  const handleViewDashboard = () => {
    setCurrentView('dashboard');
  };

  const addDataRequest = (request: Omit<DataRequest, 'id' | 'status' | 'requestDate' | 'updatedDate' | 'trackingNumber' | 'timeline'>) => {
    const now = new Date();
    const trackingNumber = `DREQ${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(dataRequests.length + 1).padStart(3, '0')}`;
    
    const newRequest: DataRequest = {
      ...request,
      id: dataRequests.length + 1,
      status: 'submitted',
      requestDate: now,
      updatedDate: now,
      trackingNumber,
      timeline: [
        {
          status: 'submitted',
          timestamp: now,
          description: 'Permintaan data telah diterima dan sedang menunggu review'
        }
      ]
    };
    setDataRequests([newRequest, ...dataRequests]);
  };

  const handleRequestDatasetSubmit = (data: RequestDatasetFormData) => {
    // Convert RequestDatasetFormData to DataRequest format
    addDataRequest({
      title: data.datasetTitle,
      description: data.description,
      category: 'General',
      purpose: data.purpose === 'Pilih Tujuan' ? 'Lainnya' : data.purpose,
      organization: data.occupation === 'Pilih Pekerjaan' ? 'Lainnya' : data.occupation,
      email: data.email
    });
    alert(`Permohonan dataset berhasil dikirim!\n\nNama: ${data.name}\nDataset: ${data.datasetTitle}\n\nSilakan cek Lacak Dataset untuk melacak status permohonan Anda.`);
  };

  const handleViewTracking = (requestId: number) => {
    setSelectedRequestId(requestId);
    setCurrentView('tracking');
  };

  const handleViewDatasetDetail = (dataset: Dataset, source: 'home' | 'bookmarks' = 'home') => {
    setSelectedDataset(dataset);
    setDetailSource(source);
    setCurrentView('detail');
    if (source === 'bookmarks') {
      setIsBookmarksSidebarOpen(false);
    }
  };

  const handleSaveDataset = (dataset: Dataset) => {
    if (!bookmarkedDatasets.find(item => item.id === dataset.id)) {
      setBookmarkedDatasets([...bookmarkedDatasets, dataset]);
      setSnackbarMessage('Data telah tersimpan');
      setIsSnackbarOpen(true);
    }
  };

  const handleRemoveBookmark = (datasetId: number) => {
    setBookmarkedDatasets(bookmarkedDatasets.filter(item => item.id !== datasetId));
    setSnackbarMessage('Dataset dihapus dari simpanan');
    setIsSnackbarOpen(true);
  };

  const handleAddBookmarkToCart = (dataset: Dataset) => {
    if (!cartItems.find(item => item.id === dataset.id)) {
      setCartItems([...cartItems, dataset]);
      setSnackbarMessage(`"${dataset.title}" ditambahkan ke keranjang`);
      setIsSnackbarOpen(true);
    } else {
      setSnackbarMessage('Dataset sudah ada di keranjang');
      setIsSnackbarOpen(true);
    }
  };

  const handleBookmarkClick = () => {
    setIsBookmarksSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartCount={cartItems.length}
        bookmarkCount={bookmarkedDatasets.length}
        onCartClick={() => setIsCartOpen(true)}
        onBookmarkClick={handleBookmarkClick}
        currentView={currentView}
        onNavigate={setCurrentView}
      />
      
      {currentView === 'home' && (
        <>
          <Hero onNavigateToDashboard={handleViewDashboard} />
          <DatasetList 
            onAddToCart={addToCart} 
            cartItems={cartItems}
            onRequestDataset={handleRequestDatasetSubmit}
            onNavigateToDashboard={handleViewDashboard}
            onViewDetail={handleViewDatasetDetail}
          />
        </>
      )}
      
      {currentView === 'dashboard' && (
        <Dashboard 
          requests={dataRequests} 
          onViewTracking={handleViewTracking}
          downloadedDatasets={downloadedDatasets}
        />
      )}
      

      {currentView === 'tracking' && selectedRequestId && (
        <TrackingDetail 
          request={dataRequests.find(r => r.id === selectedRequestId)!}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      
      {currentView === 'detail' && selectedDataset && (
        <DatasetDetail 
          dataset={selectedDataset}
          onBack={() => {
            setSelectedDataset(null);
            if (detailSource === 'bookmarks') {
              setIsBookmarksSidebarOpen(true);
              setCurrentView('home');
            } else {
              setCurrentView('home');
            }
          }}
          onSaveDataset={handleSaveDataset}
        />
      )}
      
      <Footer />
      <Chatbot 
        isOpen={isChatbotOpen} 
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        onSubmitRequest={addDataRequest}
        onOpenRequestModal={() => setIsRequestModalOpen(true)}
      />
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onDownloadAll={handleDownloadAll}
      />
      <BookmarksSidebar
        isOpen={isBookmarksSidebarOpen}
        onClose={() => setIsBookmarksSidebarOpen(false)}
        bookmarkedDatasets={bookmarkedDatasets}
        onRemoveBookmark={handleRemoveBookmark}
        onViewDetail={(dataset) => handleViewDatasetDetail(dataset, 'bookmarks')}
      />
      <RequestDatasetModal 
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={handleRequestDatasetSubmit}
      />
      <DownloadSuccessModal 
        isOpen={isDownloadSuccessOpen}
        onClose={() => setIsDownloadSuccessOpen(false)}
        onViewDashboard={handleViewDashboard}
        downloadCount={downloadCount}
      />
      <Snackbar 
        isOpen={isSnackbarOpen}
        message={snackbarMessage}
        onClose={() => setIsSnackbarOpen(false)}
      />
    </div>
  );
}
