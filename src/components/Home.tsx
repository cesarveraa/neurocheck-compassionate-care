import { useState } from "react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AiMessage from "@/components/AiMessage";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import TermsAndConditions from "@/components/TermsAndConditions";

export type HomeStep = 'welcome' | 'consent' | 'modeSelection';

interface HomeProps {
  onConsentAccepted: () => void;
  onModeSelected: (mode: 'camera' | 'text') => void;
}

const Home = ({ onConsentAccepted, onModeSelected }: HomeProps) => {
  const { language, translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState<HomeStep>('welcome');
  const [consentAccepted, setConsentAccepted] = useState(false);

  const t = (key: keyof typeof translations) => translations[key][language];

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 container mx-auto p-6 max-w-5xl">
        {currentStep === 'welcome' && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 animate-appear">
            <div className="text-center space-y-3 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">{t('welcome')}</h1>
              <AiMessage message={t('intro1')} className="mx-auto" />
              <div className="h-4"></div>
              <AiMessage message={t('intro2')} delay={50} className="mx-auto" />
            </div>
            <Button
              onClick={() => setCurrentStep('consent')}
              className="mt-8 h-14 px-8 text-lg bg-neuro-primary hover:bg-neuro-primary/90 text-white"
            >
              {t('start')}
            </Button>
          </div>
        )}

        {currentStep === 'consent' && (
          <TermsAndConditions
            consentAccepted={consentAccepted}
            onConsentChange={setConsentAccepted}
            onBack={() => setCurrentStep('welcome')}
            onContinue={() => {
              if (consentAccepted) setCurrentStep('modeSelection');
            }}
          />
        )}

        {currentStep === 'modeSelection' && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 animate-appear">
            <h2 className="text-3xl font-bold gradient-text">{t('selectMode')}</h2>
            <AiMessage message={t('modeInfo')} className="mx-auto" />
            <div className="flex flex-col md:flex-row gap-6 mt-8">
              <Button onClick={() => onModeSelected('camera')}>{t('cameraMode')}</Button>
              <Button onClick={() => onModeSelected('text')}>{t('textMode')}</Button>
            </div>
            <Button
              onClick={() => setCurrentStep('consent')}
              variant="outline"
              className="mt-6"
            >
              {t('back')}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
