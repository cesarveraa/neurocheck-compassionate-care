import { useLanguage } from "@/contexts/LanguageContext";
import AiMessage from "@/components/AiMessage";
import { Button } from "@/components/ui/button";

interface TestPreparationProps {
  patientName: string;
  testMode: "camera" | "text";
  onBack: () => void;
  onStart: () => void;
}

const TestPreparation = ({ patientName, testMode, onBack, onStart }: TestPreparationProps) => {
  const { language, translations } = useLanguage();
  const t = (key: keyof typeof translations) => translations[key][language];

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-appear">
      <h2 className="text-3xl font-bold gradient-text">{t("testPrep")}</h2>

      <div className="text-center">
        <AiMessage
          message={`${language === "español" ? "Hola" : "Kamisaraki"} ${patientName || (language === "español" ? "paciente" : "usuta")}, ${language === "español" ? "vamos a comenzar con tu evaluación en modo" : "qalltañani aka yant\'awi"} ${testMode === "camera" ? (language === "español" ? "con cámara" : "cámara uñtasa") : (language === "español" ? "sin cámara" : "jan cámara uñtasa")}.`}
          className="mx-auto mb-6"
        />

        <div className="flex flex-col items-center justify-center my-10">
          <div className="text-6xl font-bold text-neuro-primary dark:text-neuro-secondary animate-pulse-soft">
            3
          </div>
          <p className="text-lg mt-4">{t("prepTime")}</p>
        </div>

        <AiMessage message={t("takeTime") || ""} delay={50} className="mx-auto" />
      </div>

      <div className="flex gap-4 w-full max-w-md">
        <Button onClick={onBack} variant="outline" className="flex-1 h-12">
          {t("back")}
        </Button>

        <Button
          onClick={onStart}
          className="flex-1 h-12 bg-neuro-primary hover:bg-neuro-primary/90 text-white"
        >
          {t("startTest")}
        </Button>
      </div>
    </div>
  );
};

export default TestPreparation;
