import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import AiMessage from "@/components/AiMessage";
import { Button } from "@/components/ui/button";
import TrafficLight from "@/components/TrafficLight";

interface TestCognitivoProps {
    onBack: () => void;
    onFinish: () => void;
    testMode: "camera" | "text";
    patientName: string; 
}
  

const questions = [
  {
    es: "¿Qué día de la semana es hoy?",
    ay: "¿Kunüri aka semanana?",
    options_es: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    options_ay: ["Lunisa", "Martisa", "Mirkulisa", "Juywisa", "Wirnisa", "Sawruta", "Tuminka"],
  },
  {
    es: "¿Puedes recordar estas tres palabras? Casa, Perro, Azul",
    ay: "¿Aka kimsa arunak amtaskismati? Uta, Anu, Larama",
    options_es: ["Listo, las he memorizado"],
    options_ay: ["Waliki, amtastwa"],
  },
  {
    es: "¿En qué año estamos actualmente?",
    ay: "¿Kuna maratsa jichhasti?",
    options_es: ["2023", "2024", "2025", "2026"],
    options_ay: ["2023", "2024", "2025", "2026"],
  },
  {
    es: "¿Puedes restar 7 de 100?",
    ay: "¿Patakati 7 jark'aqasmati?",
    options_es: ["93", "94", "95", "97"],
    options_ay: ["93", "94", "95", "97"],
  },
  {
    es: "¿Recuerdas las tres palabras que te mencioné antes?",
    ay: "¿Amtasktati nayra kimsa arunaka?",
    options_es: [
      "Casa, Perro, Azul",
      "Mesa, Gato, Rojo",
      "Casa, Gato, Azul",
      "Casa, Perro, Rojo"
    ],
    options_ay: [
      "Uta, Anu, Larama",
      "Misa, Pisi, Chupika",
      "Uta, Pisi, Larama",
      "Uta, Anu, Chupika"
    ]
  },
];

const TestCognitivo = ({ onBack, onFinish, testMode }: TestCognitivoProps) => {
  const { language, translations } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
      onFinish();
    }
  };

  const q = questions[currentQuestion];
  const lang = language === "español" ? "es" : "ay";
  const options = language === "español" ? q.options_es : q.options_ay;

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-appear">
      <h2 className="text-3xl font-bold gradient-text">{translations.cognitiveTest[language]}</h2>

      {testMode === "camera" && (
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video mx-auto mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white">{language === 'español' ? 'Vista de la cámara (simulada)' : 'Cámara uñtata (simulada)'}</p>
          </div>
        </div>
      )}

      <AiMessage message={q[lang]} className="mb-6" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {options.map((opt) => (
          <Button
            key={opt}
            variant="outline"
            className="h-16 text-lg hover:bg-neuro-secondary/20 dark:hover:bg-neuro-primary/20"
            onClick={handleAnswer}
          >
            {opt}
          </Button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <TrafficLight status="green" size="lg" />
          <span className="mt-2">{translations.correct[language]}</span>
        </div>
        <div className="flex flex-col items-center">
          <TrafficLight status="yellow" size="lg" />
          <span className="mt-2">{translations.regular[language]}</span>
        </div>
        <div className="flex flex-col items-center">
          <TrafficLight status="red" size="lg" />
          <span className="mt-2">{translations.incorrect[language]}</span>
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-md">
        <Button onClick={onBack} variant="outline" className="flex-1 h-12">
          {translations.back[language]}
        </Button>

        <Button onClick={onFinish} className="flex-1 h-12 bg-neuro-primary hover:bg-neuro-primary/90 text-white">
          {translations.finishTest[language]}
        </Button>
      </div>
    </div>
  );
};

export default TestCognitivo;
