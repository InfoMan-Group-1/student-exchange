export function CtaSection() {
  return (
    <section className="bg-surface-container-highest py-20">
      <div className="max-w-4xl mx-auto px-container-padding text-center">
        <h3 className="font-headline-lg text-headline-lg text-on-surface mb-6">
          Ready to start your journey?
        </h3>
        <p className="font-body-md text-body-md text-on-tertiary-container mb-10">
          Application windows for the Fall semester are now open.<br />
          Consult with your department head for nomination details.
        </p>
        <div className="inline-flex">
          <button className="px-8 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:brightness-110 transition-all active:scale-95 shadow-sm">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
}
