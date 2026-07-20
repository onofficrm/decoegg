import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/layout/Hero';
import { DiagnosticSection } from './components/layout/DiagnosticSection';
import { DashboardSection } from './components/layout/DashboardSection';
import { LiveConsultingDashboard } from './components/layout/LiveConsultingDashboard';
import { ConsultingStatsDashboard } from './components/layout/ConsultingStatsDashboard';
import { FinanceSection } from './components/layout/FinanceSection';
import { CustomerCheckpointsSection } from './components/layout/CustomerCheckpointsSection';
import { VehicleGarageSection } from './components/layout/VehicleGarageSection';
import { ConsultStatusSection } from './components/layout/ConsultStatusSection';
import { ProcessTimelineSection } from './components/layout/ProcessTimelineSection';
import { ConsultReportSection } from './components/layout/ConsultReportSection';
import { FAQSection } from './components/layout/FAQSection';
import { ConsultForm } from './components/layout/ConsultForm';
import { FinalCTASection } from './components/layout/FinalCTASection';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { PCFloatingNav } from './components/layout/PCFloatingNav';

export default function App() {
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    // Scroll to form smoothly
    const formElement = document.getElementById('consult-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg pb-[72px] md:pb-0">
      <Header />
      
      <main className="flex-grow pt-24">
        <Hero />
        <DiagnosticSection onSelectStatus={handleStatusSelect} />
        <DashboardSection />
        <FinanceSection />
        <ConsultForm initialStatus={selectedStatus} />
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
    </div>
  );
}


