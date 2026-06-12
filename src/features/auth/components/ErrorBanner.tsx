import { AlertCircle, X } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onClose: () => void;
}

export function ErrorBanner({ message, onClose }: ErrorBannerProps) {
  if (!message) return null;

  return (
    <div
      className="bg-error-container p-4 flex items-start gap-3 border-b border-outline-variant"
      role="alert"
    >
      <AlertCircle className="text-on-error-container h-[20px] w-[20px] shrink-0" />
      <div className="flex-1">
        <p className="font-label-md text-label-md text-on-error-container">
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-on-error-container/70 hover:text-on-error-container transition-colors"
        aria-label="Dismiss error"
        type="button"
      >
        <X className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}
