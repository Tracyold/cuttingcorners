export default function GlobalStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
@import url('https://fonts.googleapis.com/css2?family=Oranienbaum&family=Comfortaa:wght@300;400&family=Montserrat:wght@400;500;600&display=swap');

:root {
  --font-display: 'Oranienbaum', Georgia, serif;
  --font-subtitle: 'Montserrat', sans-serif;
  --font-body: 'Comfortaa', sans-serif;
  --font-ui: 'Montserrat', sans-serif;
  --font-mono: 'Courier New', monospace;
}

html, body, #__next {
  font-family: var(--font-body);
  background-color: #050505;
  color: #FAFAFA;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-subtitle);
}

.hero-glow {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(56, 189, 248, 0.08) 0%,
    rgba(0, 0, 0, 0) 50%
  );
  pointer-events: none;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }

.title-xl {
  font-family: var(--font-display);
  font-size: 3rem;
  line-height: 1.2;
  letter-spacing: 0.04em;
  font-weight: 400;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 4.5rem;
  line-height: 1.1;
  letter-spacing: 0.04em;
  font-weight: 400;
}

.title-sm {
  font-family: var(--font-subtitle);
  font-weight: 500;
}

.name-title {
  font-size: 7rem;
  font-family: var(--font-display);
  font-weight: 400;
}

.spec-text {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.page-title {
  font-family: var(--font-display);
}

.container-custom {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

@media (min-width: 768px) {
  .container-custom {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

.section-spacing {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

@media (min-width: 768px) {
  .section-spacing {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
}

.gem-card {
  background-color: #101010;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.5s ease;
  overflow: hidden;
  position: relative;
}

.gem-card:hover {
  border-color: rgba(255, 255, 255, 0.20);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
}

@media (max-width: 767px) {
  .gem-card:active {
    border-color: rgba(245, 158, 11, 0.5);
  }
}

.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-6px);
}

.btn-primary {
  background-color: #ffffff;
  color: #000000;
  padding: 0.75rem 2rem;
  font-family: var(--font-ui);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #e5e5e5;
}

.btn-secondary {
  background-color: transparent;
  color: #FAFAFA;
  padding: 0.75rem 2rem;
  font-family: var(--font-ui);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.875rem;
  border: 1px solid rgba(255, 255, 255, 0.20);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 1);
  background-color: rgba(255, 255, 255, 0.05);
}

@media (max-width: 767px) {
  .hero-title {
    font-size: 2.4rem;
  }
  .page-title.title-xl {
    font-size: 2rem !important;
  }
  .name-title {
    font-size: 2rem !important;
  }
  .section-spacing {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  .container-custom {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  #services-section {
    padding-top: 0 !important;
  }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.15); }
}
`,
      }}
    />
  );
}
