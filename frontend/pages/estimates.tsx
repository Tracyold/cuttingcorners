import TopNav from '../components/shared/TopNav';
import Footer from '../components/shared/Footer';
import DesktopEstimates from '../components/estimates/DesktopEstimates';
import MobileEstimates from '../components/estimates/MobileEstimates';

export default function EstimatesPage() {
  return (
    <>
      <TopNav />
      <main>
        <section style={{ padding: '140px 0 80px', background: '#050505' }}>
          <div className="container-custom" style={{ maxWidth: '1160px', width: '100%', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '16px', textAlign: 'center' }}>
              Get Started
            </p>
            <h1 style={{ fontFamily: 'Oranienbaum, serif', fontSize: 'clamp(32px, 5vw, 64px)', color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginBottom: '20px', lineHeight: 1.1 }}>
              Choose Your Estimate Path
            </h1>
            <p style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(14px, 1.5vw, 17px)', color: 'rgba(255,255,255,0.4)', textAlign: 'center', maxWidth: '560px', margin: '0 auto 64px', lineHeight: 1.8 }}>
              Every path yields a different estimate. Start wherever feels right — you can always go deeper.
            </p>

            <div className="hidden-mobile">
              <DesktopEstimates />
            </div>
            <div className="hidden-desktop">
              <MobileEstimates />
            </div>

            <div style={{ marginTop: '64px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.9, maxWidth: '560px', margin: '0 auto' }}>
                Not sure which path is right for you? All estimates are non-binding. We recommend starting with an Online Estimate if you have photos, or an In-Person Estimate if you are ready to move forward.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
