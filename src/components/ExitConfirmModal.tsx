/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ExitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExit: () => void;
}

export const ExitConfirmModal: React.FC<ExitConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmExit
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#151B2B] border border-white/10 shadow-2xl text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#9AA4B8] hover:text-[#F5F7FF] rounded-lg transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#FF5577]/10 border border-[#FF5577]/30 flex items-center justify-center text-[#FF5577] shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 id="exit-modal-title" className="text-base font-bold text-[#F5F7FF]">
              Exit Current Assessment?
            </h3>
            <span className="text-xs font-mono text-[#9AA4B8]">
              Unsaved session warning
            </span>
          </div>
        </div>

        <p className="text-xs text-[#9AA4B8] leading-relaxed mb-6">
          Exiting now will discard your current level attempt. Your completed levels and previous results in history will remain intact.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#F5F7FF] bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            Stay & Continue
          </button>
          <button
            onClick={onConfirmExit}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#FF5577] hover:bg-[#FF5577]/90 rounded-xl transition-all shadow-[0_0_15px_rgba(255,85,119,0.3)] cursor-pointer"
          >
            Exit Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
