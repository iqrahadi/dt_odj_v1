import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface SnackbarProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Snackbar({ isOpen, message, onClose, duration = 3000 }: SnackbarProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-[36px] right-[36px] z-[120] animate-slide-in-right">
      <div className="bg-gray-900 text-white rounded-lg shadow-2xl px-4 py-3 flex items-center gap-3 min-w-[320px] max-w-md">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-800 rounded transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
