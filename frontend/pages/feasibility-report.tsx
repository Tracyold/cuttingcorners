import TopNav from '../components/shared/TopNav';
import Footer from '../components/shared/Footer';
import FeasibilityDesktop from '../components/feasibility-report/FeasibilityDesktop';
import FeasibilityMobile from '../components/feasibility-report/FeasibilityMobile';
import { valueProps, useCases } from '../components/feasibility-report/shared-feasibility';

export default function FeasibilityReportPage() {
  return (
    <>
      <TopNav />
      <main>
        <style>{`
          @media (max-width: 860px) {
            .fr-card-grid {
              display: flex !important;
              flex-direction: column !important;
              gap: 16px !important;
            }
            .fr-card {
              width: 100% !important;
              min-height: 280px !important;
              padding: 40px 28px !important;
            }
            .fr-card-num {
              font-size: 100px !important;
            }
            .fr-card-title {
              font-size: 21px !important;
            }
            .fr-card-body {
              font-size: 17px !important;
              line-height: 1.85 !important;
            }
            .fr-section-eyebrow {
              font-size: 13px !important;
            }
            .fr-section-heading {
              font-size: clamp(28px, 8vw, 38px) !important;
            }
          }
        `}</style>
        {/* Hero */}
        <section style={{ padding: '140px 0 80px', background: '#050505' }}>
          <div className="container-custom" style={{ maxWidth: '1160px', width: '100%', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '17px', textAlign: 'center' }}>
              Documentation
            </p>
            <h1 style={{ fontFamily: 'Oranienbaum, serif', fontSize: 'clamp(32px, 5vw, 64px)', color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginBottom: '23px', lineHeight: 1.1 }}>
              CCG Cut Feasibility Report
            </h1>
            <p style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(17px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.8)', textAlign: 'center', maxWidth: '620px', margin: '0 auto 64px', lineHeight: 1.85 }}>
              A professional structural evaluation of your gemstone before a single facet is touched — and a complete change record after. Objective, documented, and yours to keep.
            </p>
            <div className="fr-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px' }}>
              {valueProps.map(v => (
                <div key={v.n} className="fr-card" style={{ padding: '36px 32px', background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="fr-card-num" style={{ fontFamily: 'Oranienbaum, serif', fontSize: 'clamp(80px, 14vw, 140px)', letterSpacing: '0', color: 'rgba(212,175,55,0.2)', marginBottom: '0', lineHeight: '1' }}>{v.n}</p>
                  <h3 className="fr-card-title" style={{ fontFamily: 'Oranienbaum, serif', fontSize: 'clamp(21px, 2.5vw, 28px)', color: 'rgba(212,175,55,0.95)', marginBottom: '14px', lineHeight: 1.3 }}>{v.title}</h3>
                  <p className="fr-card-body" style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.85 }}>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section style={{ padding: '80px 0', background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="container-custom" style={{ maxWidth: '1160px', width: '100%', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '12px', textAlign: 'center' }}>Who Uses These Reports</p>
            <h2 style={{ fontFamily: 'Oranienbaum, serif', fontSize: 'clamp(23px, 3vw, 38px)', color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginBottom: '48px' }}>Built for Different Situations</h2>
            <div className="fr-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2px' }}>
              {useCases.map(u => (
                <div key={u.title} className="fr-card" style={{ padding: '36px 32px', background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 className="fr-card-title" style={{ fontFamily: 'Oranienbaum, serif', fontSize: 'clamp(21px, 2.5vw, 28px)', color: 'rgba(212,175,55,0.95)', marginBottom: '14px', lineHeight: 1.3 }}>{u.title}</h3>
                  <p className="fr-card-body" style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.85 }}>{u.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Reports */}
        <section style={{ padding: '80px 0', background: '#080808', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="container-custom" style={{ maxWidth: '1220px', width: '100%', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '12px', textAlign: 'center' }}>Sample Reports</p>
            <h2 style={{ fontFamily: 'Oranienbaum, serif', fontSize: 'clamp(23px, 3.5vw, 42px)', color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginBottom: '17px' }}>What a Report Looks Like</h2>
            <p style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '56px', lineHeight: 1.8 }}>
              The following is a sample report pair for a Ceylon sapphire. All data is illustrative.
            </p>
            <div className="hidden-mobile"><FeasibilityDesktop /></div>
            <div className="hidden-desktop"><FeasibilityMobile /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
