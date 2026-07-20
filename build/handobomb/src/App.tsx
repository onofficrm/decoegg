import { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/layout/Hero';
import { DiagnosticSection } from './components/layout/DiagnosticSection';
import { DashboardSection } from './components/layout/DashboardSection';
import { LiveConsultingDashboard } from './components/layout/LiveConsultingDashboard';
import { ConsultingStatsDashboard } from './components/layout/ConsultingStatsDashboard';
import { FinanceSection } from './components/layout/FinanceSection';
import { PaymentSimulatorSection, SimulatorPrefill } from './components/layout/PaymentSimulatorSection';
import { VehicleGarageSection } from './components/layout/VehicleGarageSection';
import { ConsultStatusSection } from './components/layout/ConsultStatusSection';
import { ProcessTimelineSection } from './components/layout/ProcessTimelineSection';
import { ConsultReportSection } from './components/layout/ConsultReportSection';
import { StatusGuideSection } from './components/layout/StatusGuideSection';
import { FAQSection } from './components/layout/FAQSection';
import { ConsultForm } from './components/layout/ConsultForm';
import { FinalCTASection } from './components/layout/FinalCTASection';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { PCFloatingNav } from './components/layout/PCFloatingNav';
import { ExitIntentPopup } from './components/layout/ExitIntentPopup';
import {
  applyDocumentMeta,
  getPageByPath,
  goConsult,
  scrollToPageSection,
} from './lib/sitePages';

export default function App() {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [simPrefill, setSimPrefill] = useState<SimulatorPrefill>({
    monthlyPayment: '',
    vehicleType: '',
    message: '',
  });
  const [prefillKey, setPrefillKey] = useState(0);

  useEffect(() => {
    const page = getPageByPath(window.location.pathname);
    applyDocumentMeta(page);
    const timer = window.setTimeout(() => {
      scrollToPageSection(page, page.path === '/' ? 'auto' : 'smooth');
    }, 120);

    const onPopState = () => {
      const next = getPageByPath(window.location.pathname);
      applyDocumentMeta(next);
      scrollToPageSection(next, 'smooth');
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    goConsult();
  };

  const handleSimApply = (prefill: SimulatorPrefill) => {
    setSimPrefill(prefill);
    setPrefillKey((k) => k + 1);
    goConsult();
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg pb-[72px] md:pb-0">
      <Header />
      
      <main className="flex-grow pt-24">
        <Hero />
        <DiagnosticSection onSelectStatus={handleStatusSelect} />
        <StatusGuideSection onSelectStatus={handleStatusSelect} />
        <DashboardSection />
        <FinanceSection />
        <PaymentSimulatorSection onApplyToConsult={handleSimApply} />
        <ConsultForm
          initialStatus={selectedStatus}
          initialMonthlyPayment={simPrefill.monthlyPayment}
          initialVehicleType={simPrefill.vehicleType}
          initialMessage={simPrefill.message}
          prefillKey={prefillKey}
        />
        <ConsultStatusSection />
        <LiveConsultingDashboard />
        <ConsultingStatsDashboard />
        <VehicleGarageSection />
        <ProcessTimelineSection />
        <ConsultReportSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer />
      <MobileBottomNav />
      <PCFloatingNav />
      <ExitIntentPopup />
    </div>
  );
}
