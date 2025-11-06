'use client';
import { useEffect } from 'react';
import HowToPlay from './HowToPlay';
import { playButtonClick } from '@/lib/sounds';

export default function HowToPlayModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
        style={{ animation: 'fade-in 0.3s ease-out' }}
      />
      
      {/* Modal */}
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 pointer-events-none"
      >
        <div
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative border-2 border-[#8C1515] pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: 'modal-slide-in 0.3s ease-out' }}
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#8C1515] via-[#C41E3A] to-[#8C1515] p-3 sm:p-4 rounded-t-lg sticky top-0 z-10">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xl sm:text-3xl flex-shrink-0">📖</span>
                <span className="truncate">How to Play</span>
              </h2>
              <button
                onClick={() => {
                  playButtonClick();
                  onClose();
                }}
                className="text-white hover:text-gray-200 transition-colors duration-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <HowToPlay />
          </div>

          {/* Footer with close button */}
          <div className="border-t border-gray-200 p-4 flex justify-end">
            <button
              onClick={() => {
                playButtonClick();
                onClose();
              }}
              className="btn px-6 py-2 text-sm font-semibold"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

