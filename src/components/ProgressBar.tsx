import { FileText, Eye, Cog, CheckCircle, XCircle } from 'lucide-react';
import type { RequestStatus } from '../App';

interface ProgressBarProps {
  currentStatus: RequestStatus;
}

interface Step {
  id: RequestStatus;
  label: string;
  icon: typeof FileText;
}

const steps: Step[] = [
  { id: 'submitted', label: 'Diterima', icon: FileText },
  { id: 'under_review', label: 'Review', icon: Eye },
  { id: 'processing', label: 'Proses', icon: Cog },
  { id: 'completed', label: 'Selesai', icon: CheckCircle }
];

export function ProgressBar({ currentStatus }: ProgressBarProps) {
  const getStepIndex = (status: RequestStatus): number => {
    if (status === 'rejected') return -1;
    return steps.findIndex(step => step.id === status);
  };

  const currentIndex = getStepIndex(currentStatus);
  const isRejected = currentStatus === 'rejected';

  return (
    <div className="w-full">
      {isRejected ? (
        // Rejected state
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-3">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-red-600">Permintaan Ditolak</p>
          </div>
        </div>
      ) : (
        // Normal progress bar
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-green-600 transition-all duration-500"
              style={{
                width: `${(currentIndex / (steps.length - 1)) * 100}%`
              }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isActive = index <= currentIndex;
              const isCurrent = index === currentIndex;
              const Icon = step.icon;

              return (
                <div key={step.id} className="flex flex-col items-center" style={{ width: `${100 / steps.length}%` }}>
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                      isActive
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-400'
                    } ${isCurrent ? 'ring-4 ring-green-200' : ''}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <p
                    className={`text-center text-sm transition-colors ${
                      isActive ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
