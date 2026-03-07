import TopNav from '../components/shared/TopNav';
import Footer from '../components/shared/Footer';
import DesktopCompanyModel from '../components/company-model/DesktopCompanyModel';
import MobileCompanyModel from '../components/company-model/MobileCompanyModel';

export default function CompanyModelPage() {
  return (
    <>
      <TopNav />
      <main>
        <section style={{ padding: '140px 0 0', background: '#050505' }}>
          <div className="container-custom" style={{ maxWidth: '1160px', width: '100%' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '16px', textAlign: 'center' }}>
              Get to Know Us
            </p>
            <h1 style={{ fontFamily: 'Oranienbaum, serif', fontSize: 'clamp(28px, 4vw, 56px)', color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginBottom: '80px', lineHeight: 1.15 }}>
              Cutting Corners Gems
            </h1>
            <div className="hidden-mobile">
              <DesktopCompanyModel />
            </div>
            <div className="hidden-desktop">
              <MobileCompanyModel />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
