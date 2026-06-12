export function CtaSection() {
  return (
    <section className="bg-surface-container-highest py-20">
      <div className="max-w-4xl mx-auto px-container-padding text-center">
        <h3 className="font-headline-lg text-headline-lg text-on-surface mb-6">
          Ready to start your journey?
        </h3>
        <p className="font-body-md text-body-md text-on-tertiary-container mb-10">
          Application windows for the Fall semester are now open. Consult with
          your department head for nomination details.
        </p>
        <div className="inline-flex p-1 bg-surface rounded-xl shadow-sm border border-outline-variant">
          <button className="px-8 py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md">
            Apply Now
          </button>
          <button className="px-8 py-3 rounded-lg text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md">
            View Deadlines
          </button>
        </div>
      </div>
    </section>
  );
}
