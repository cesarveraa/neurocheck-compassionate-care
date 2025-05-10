import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AiMessage from "@/components/AiMessage";
import { useLanguage } from "@/contexts/LanguageContext";

type TermsAndConditionsProps = {
  consentAccepted: boolean;
  onConsentChange: (accepted: boolean) => void;
  onBack: () => void;
  onContinue: () => void;
};

const TermsAndConditions = ({
  consentAccepted,
  onConsentChange,
  onBack,
  onContinue,
}: TermsAndConditionsProps) => {
  const { language, translations } = useLanguage();
  const t = (key: keyof typeof translations) => translations[key][language];

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 max-w-2xl mx-auto animate-appear">
      <h2 className="text-3xl font-bold gradient-text">{t("consent")}</h2>

      <div className="bg-white dark:bg-neuro-neutral/10 rounded-lg p-6 shadow-sm border border-neuro-secondary/20 dark:border-neuro-primary/20 w-full max-h-[400px] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Términos de uso y privacidad</h3>

        <div className="space-y-4 text-neuro-neutral dark:text-neuro-light/80">
          <p>
            NeuroCheck es una aplicación diseñada para realizar evaluaciones cognitivas no invasivas.
            Esta herramienta no sustituye el diagnóstico médico profesional.
          </p>

          <h4 className="text-lg font-medium">Uso de los datos</h4>
          <p>
            La información recopilada durante la evaluación se utilizará únicamente con fines de detección temprana.
            Sus datos personales serán tratados con la máxima confidencialidad y no serán compartidos con terceros sin su consentimiento explícito.
          </p>

          <h4 className="text-lg font-medium">Grabación de video (solo modo cámara)</h4>
          <p>
            Si selecciona el modo de evaluación con cámara, se analizarán sus expresiones faciales durante la prueba.
            Estas imágenes se procesarán en tiempo real y no se almacenarán permanentemente.
          </p>

          <h4 className="text-lg font-medium">Resultados</h4>
          <p>
            Los resultados de la evaluación son orientativos y deben ser interpretados por un profesional de la salud.
            NeuroCheck no emite diagnósticos definitivos sobre condiciones neurológicas o cognitivas.
          </p>

          <h4 className="text-lg font-medium">Comunicación</h4>
          <p>
            Al aceptar estos términos, confirma que la información proporcionada es verídica y que comprende
            que esta evaluación es una herramienta de apoyo y no reemplaza la consulta médica especializada.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 w-full">
        <Checkbox
          id="consent"
          checked={consentAccepted}
          onCheckedChange={(checked) => onConsentChange(checked === true)}
        />
        <Label htmlFor="consent" className="text-base font-medium cursor-pointer">
          {t("consentCheck")}
        </Label>
      </div>

      <div className="flex gap-4 w-full">
        <Button onClick={onBack} variant="outline" className="flex-1 h-12">
          {t("back")}
        </Button>

        <Button
          onClick={onContinue}
          disabled={!consentAccepted}
          className="flex-1 h-12 bg-neuro-primary hover:bg-neuro-primary/90 text-white"
        >
          {t("continue")}
        </Button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
