import React, { useEffect, useState } from 'react';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  cancelLabel,
  type = 'danger'
}) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    }
  }, [isOpen]);

  if (!isRendered && !isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop with Blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px]" />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-md bg-[#0a0a1a] border border-[#1e1e3a] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'
        }`}
      >
        {/* Top Accent Line */}
        <div className={`h-1.5 w-full ${type === 'danger' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-[#4f46e5] to-[#22d3ee]'}`} />

        <div className="p-8">
          <div className="flex items-start gap-5">
            {/* Icon Circle */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
              type === 'danger'
                ? 'bg-red-500/10 text-red-500'
                : 'bg-[#4f46e5]/10 text-[#4f46e5]'
            }`}>
              {type === 'danger' ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                {title}
              </h3>
              <p className="text-[#94a3b8] leading-relaxed text-[15px]">
                {message}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-10">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[#94a3b8] hover:text-white hover:bg-[#161630] transition-all duration-300 active:scale-95"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-300 active:scale-95 ${
                type === 'danger'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400'
                  : 'bg-gradient-to-r from-[#4f46e5] to-[#4338ca] hover:from-[#5e54ff] hover:to-[#4f46e5]'
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
