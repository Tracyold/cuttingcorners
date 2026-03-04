import { useEffect } from 'react';

const lines = [
  { gold: 'Color', rest: ' is the goal.' },
  { gold: 'Conscious', rest: ' of the weight.' },
  { gold: 'Careful', rest: ' with my approach.' },
  { gold: 'Cutting', rest: ' is my craft.' },
];

export default function PhilosophySection() {

  useEffect(() => {
    const elements = document.querySelectorAll('[data-philosophy-reveal]');

    elements.forEach((el) => {
      const h = el as HTMLElement;
      h.style.opacity = '0';
      h.style.transform = 'translateY(40px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const i = parseInt(el.dataset.philosophyIndex || '0');
            const delay = i * 100;
            el.style.transition = `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="philosophy-section" className="section-spacing">
      <div className="container-custom">
        <p
          className="uppercase text-gray-500 mb-4 text-center"
          style={{ fontSize: '12px', letterSpacing: '0.20em' }}
        >
          Philosophy
        </p>
        <h2 className="title-xl tracking-tight mb-12 text-center">My Four C&apos;s</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {lines.map(({ gold, rest }, i) => (
              <p
                key={gold}
                data-philosophy-reveal
                data-philosophy-index={`${i}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
                  fontWeight: 400,
                  lineHeight: 1.25,
                }}
              >
                <span style={{ color: '#d4af37', whiteSpace: 'nowrap' }}>{gold}</span>
                {rest}
              </p>
            ))}
          </div>

          <div
            data-philosophy-reveal
            data-philosophy-index="4"
            className="relative group overflow-hidden rounded"
          >
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/0 transition-all duration-500 z-10" />
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 60px 20px rgba(0,0,0,0.8)' }}
            />
            <div className="absolute inset-0 z-30 flex items-center justify-center transition-all duration-500 group-hover:opacity-0">
              <span className="title-sm text-white" style={{ fontSize: '0.875rem' }}>
                Studio
              </span>
            </div>
            <img
              src="/assets/Machine.jpeg"
              alt="Workshop"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
