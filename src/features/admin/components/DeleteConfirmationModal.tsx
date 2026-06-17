"use client";

import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  applicationId: string;
  studentName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function DeleteConfirmationModal({ isOpen, applicationId, studentName, onClose, onConfirm }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const isMatch = inputValue === applicationId;

  const handleConfirm = async () => {
    if (!isMatch) return;
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3 text-error">
              <div className="p-2 bg-error/10 rounded-full">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h2 className="font-title-lg text-title-lg text-on-surface">Delete Application</h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-on-surface-variant hover:text-on-surface transition-colors"
              disabled={isDeleting}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="text-body-md text-on-surface-variant mb-4">
            You are about to permanently delete the application for <strong className="text-on-surface">{studentName}</strong>. This action cannot be undone and will erase all associated university choices and files.
          </p>

          <div className="space-y-2 mb-6">
            <label className="font-label-md text-label-md text-on-surface">
              To confirm, type <strong className="select-all bg-surface-container px-1 py-0.5 rounded text-error">{applicationId}</strong> below:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={applicationId}
              disabled={isDeleting}
              className="w-full bg-surface-container-low border border-outline rounded-lg px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-error focus:ring-2 focus:ring-error/10 transition-all"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-6 py-2.5 rounded-lg font-label-md transition-colors text-on-surface-variant hover:bg-surface-container disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!isMatch || isDeleting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-label-md transition-all bg-error text-white hover:bg-error/90 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              {isDeleting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete Application
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
