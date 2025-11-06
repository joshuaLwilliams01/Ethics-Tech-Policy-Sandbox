'use client';
import { useEffect } from 'react';
import React from 'react';
import { playButtonClick } from '@/lib/sounds';

type ResultsData = {
  summary: string;
  benefits: string[];
  harms: string[];
};

export default function ResultsModal({ 
  isOpen, 
  onClose, 
  results 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  results: ResultsData | null;
}) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close on Escape key and scroll to top when modal opens
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Ensure modal scrolls to top when opening
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.scrollTop = 0;
        }
      }, 0);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !results) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
        style={{ animation: 'fade-in 0.3s ease-out' }}
      />
      
      {/* Modal */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-[100] flex items-start justify-center p-2 sm:p-4 pointer-events-none"
        style={{ paddingTop: '0.5rem', overflow: 'hidden' }}
      >
        <div
          ref={modalRef}
          className="bg-gradient-to-br from-white via-[#F7F6F3] to-white rounded-lg shadow-2xl max-w-3xl w-full overflow-y-auto relative border-2 border-[#8C1515] pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ 
            animation: 'modal-slide-in 0.3s ease-out',
            maxHeight: 'calc(100vh - 1rem)'
          }}
        >
          {/* Header with gradient - enhanced visibility */}
          <div className="bg-gradient-to-r from-[#8C1515] via-[#C41E3A] to-[#8C1515] px-3 sm:px-5 py-2 sm:py-3 rounded-t-lg sticky top-0 z-10 shadow-md">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <h2 className="text-sm sm:text-lg font-bold text-white flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                <span className="text-base sm:text-xl flex-shrink-0">🎯</span>
                <span className="truncate">Result(s) of Your Decision</span>
              </h2>
              <button
                onClick={() => {
                  playButtonClick();
                  onClose();
                }}
                className="text-white hover:text-gray-200 transition-colors duration-200 text-xl font-bold w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 flex-shrink-0"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
          </div>

          {/* Content - enhanced padding and spacing */}
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Summary */}
            <div className="bg-gradient-to-r from-[#8C1515]/10 to-[#175E54]/10 p-3 sm:p-4 rounded-lg border-l-4 border-[#8C1515] shadow-sm">
              <p className="text-[#1F2937] text-xs sm:text-sm font-semibold leading-relaxed">{results.summary}</p>
            </div>

            {/* Benefits and Harms Grid */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Benefits */}
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-3 sm:p-4 rounded-lg border-2 border-green-200 shadow-md">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl">✨</span>
                  <h3 className="text-base sm:text-lg font-bold text-green-800">Benefits</h3>
                </div>
                <ul className="space-y-1.5 sm:space-y-2">
                  {results.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#1F2937]">
                      <span className="text-green-600 font-bold mt-0.5 text-sm sm:text-base flex-shrink-0">✓</span>
                      <span className="leading-relaxed text-xs sm:text-sm font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Harms */}
              <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-3 sm:p-4 rounded-lg border-2 border-red-200 shadow-md">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl">⚠️</span>
                  <h3 className="text-base sm:text-lg font-bold text-red-800">Harms</h3>
                </div>
                <ul className="space-y-1.5 sm:space-y-2">
                  {results.harms.map((harm, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#1F2937]">
                      <span className="text-red-600 font-bold mt-0.5 text-sm sm:text-base flex-shrink-0">⚠</span>
                      <span className="leading-relaxed text-xs sm:text-sm font-medium">{harm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-3 sm:p-4 flex justify-end">
            <button
              onClick={() => {
                playButtonClick();
                onClose();
              }}
              className="btn px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold"
            >
              Got it! Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

