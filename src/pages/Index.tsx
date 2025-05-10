import { useState } from "react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AiMessage from "@/components/AiMessage";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import TermsAndConditions from "@/components/TermsAndConditions";
import Home from "@/components/Home";
import PatientForm, { PatientData } from "@/components/PatientForm";
import TestPreparation from "@/components/TestPreparation";
import TestCognitivo from "@/components/Test";
import CognitiveResultsDashboard from "@/components/CognitiveResultsDashboard";

const mockTestResults = {
  overallScore: 75,
  responseTime: 3.2,
  domains: [
    { name: "Orientación", score: 85, status: "green" as const },
    { name: "Memoria", score: 70, status: "yellow" as const },
    { name: "Atención", score: 60, status: "yellow" as const },
    { name: "Lenguaje", score: 90, status: "green" as const },
    { name: "Cálculo", score: 45, status: "red" as const },
  ],
  timeData: [
    { timepoint: "P1", value: 2.1 },
    { timepoint: "P2", value: 3.5 },
    { timepoint: "P3", value: 4.2 },
    { timepoint: "P4", value: 2.8 },
    { timepoint: "P5", value: 3.4 },
  ],
};

type AppStep = 'home' | 'patientData' | 'testPreparation' | 'test' | 'results';

const Index = () => {
  const { language, translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState<AppStep>('home');
  const [testMode, setTestMode] = useState<'camera' | 'text'>('text');
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  const t = (key: keyof typeof translations) => translations[key][language];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center border-b border-neuro-secondary/20 dark:border-neuro-primary/20">
        <Logo />
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6 max-w-5xl">
        {currentStep === 'home' && (
          <Home
            onConsentAccepted={() => setCurrentStep('patientData')}
            onModeSelected={(mode) => {
              setTestMode(mode);
              setCurrentStep('patientData');
            }}
          />
        )}

        {currentStep === 'patientData' && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 animate-appear">
            <h2 className="text-3xl font-bold gradient-text">{t('patientInfo')}</h2>
            <AiMessage message={t('patientPrompt')} className="mx-auto" />
            <PatientForm onSubmit={(data) => {
              setPatientData(data);
              setCurrentStep('testPreparation');
            }} />
            <Button onClick={() => setCurrentStep('home')} variant="outline" className="w-full max-w-lg h-12">{t('back')}</Button>
          </div>
        )}

        {currentStep === 'testPreparation' && patientData && (
          <TestPreparation
            patientName={patientData.name || ''}
            testMode={testMode}
            onBack={() => setCurrentStep('patientData')}
            onStart={() => setCurrentStep('test')}
          />
        )}

        {currentStep === 'test' && patientData && (
          <TestCognitivo
            patientName={patientData.name || ''}
            testMode={testMode}
            onBack={() => setCurrentStep('testPreparation')}
            onFinish={() => setCurrentStep('results')}
          />
        )}

        {currentStep === 'results' && (
          <div className="flex flex-col items-center space-y-8 animate-appear">
            <h2 className="text-3xl font-bold gradient-text">{t('results')}</h2>
            <AiMessage message={translations.resultsDetails[language].replace('{name}', patientData?.name || (language === 'español' ? 'paciente' : 'usuta'))} className="mx-auto mb-6" />
            <div className="w-full">
              <CognitiveResultsDashboard results={mockTestResults} />
            </div>
            <div className="flex gap-4 w-full max-w-md mt-6">
              <Button variant="outline" className="flex-1 h-12">{t('downloadPDF')}</Button>
              <Button onClick={() => setCurrentStep('home')} className="flex-1 h-12 bg-neuro-primary hover:bg-neuro-primary/90 text-white">{t('backToHome')}</Button>
            </div>
          </div>
        )}
      </main>

      <footer className="py-4 px-6 border-t border-neuro-secondary/20 dark:border-neuro-primary/20 text-center">
        <p className="text-sm text-neuro-neutral dark:text-neuro-light/70">© {new Date().getFullYear()} {t('footer')}</p>
      </footer>
    </div>
  );
};

export default Index;