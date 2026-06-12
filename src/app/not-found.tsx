export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface text-center px-6">
      <div className="mb-8 w-28 h-28 rounded-3xl bg-primary/10 flex items-center justify-center">
        <span className="text-5xl font-bold text-primary">404</span>
      </div>
      <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-3">
        Page Not Found
      </h1>
      <p className="font-body-md text-on-surface-variant max-w-sm mb-10">
        The page you're looking for doesn't exist or has been moved. Check the URL or navigate back to safety.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <a
          href="/"
          className="bg-primary hover:bg-primary/90 text-on-primary font-label-md px-8 py-3 rounded-xl transition-all active:scale-[0.98] shadow-sm hover:shadow"
        >
          Go to Home
        </a>
        <a
          href="/dashboard"
          className="bg-surface border border-outline-variant text-on-surface font-label-md px-8 py-3 rounded-xl hover:bg-surface-container transition-all"
        >
          Go to Dashboard
        </a>
      </div>
      <p className="mt-16 text-on-surface-variant font-label-sm">
        Polytechnic University of the Philippines — Exchange Portal
      </p>
    </div>
  );
}
