
import React, { createContext, useState, useContext, ReactNode } from "react";

type Language = "español" | "aymara";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, Record<Language, string>>;
};

const translations = {
  welcome: {
    español: "Bienvenido a NeuroCheck",
    aymara: "Suma puriwi NeuroCheck",
  },
  intro1: {
    español: "Hola, estoy aquí para acompañarte en esta evaluación. No te preocupes, es solo una charla tranquila.",
    aymara: "Kamisaraki, nayax aka chiqan uñjañatakiwa. Jan llakisimti, mä k'uchi aruskipañakiwa.",
  },
  intro2: {
    español: "Te ayudaré a detectar signos tempranos de deterioro cognitivo de forma simple y amable.",
    aymara: "Nayax yanapt'mamawa jan wali amuyunaka katjañataki mä suma amuyumpi.",
  },
  start: {
    español: "Comenzar",
    aymara: "Qalltaña",
  },
  consent: {
    español: "Consentimiento Informado",
    aymara: "Yatiyawi Iyawsata",
  },
  consentCheck: {
    español: "He leído y acepto los términos de uso y política de privacidad",
    aymara: "Nayax ulltwa ukat iyawstwa apnaqañ amtanaka",
  },
  continue: {
    español: "Continuar",
    aymara: "Sarantaña",
  },
  back: {
    español: "Volver",
    aymara: "Kutintaña",
  },
  selectMode: {
    español: "Selecciona el modo de evaluación",
    aymara: "Kunjams uñjañ ajlliñani",
  },
  modeInfo: {
    español: "Puedes elegir entre realizar la evaluación con cámara o sin ella, según te resulte más cómodo.",
    aymara: "Cámara uñtasinxa jan ukax janiw uñtasisax, kunats juman aski ukhamawa.",
  },
  cameraMode: {
    español: "Modo con Cámara",
    aymara: "Cámara uñtasa",
  },
  cameraDesc: {
    español: "La IA analizará tus expresiones faciales durante la evaluación",
    aymara: "IA uñjaniwa kunjams ajayu uñtatama",
  },
  textMode: {
    español: "Modo sin Cámara",
    aymara: "Jan cámara uñtasa",
  },
  textDesc: {
    español: "Responde a las preguntas seleccionando opciones en pantalla",
    aymara: "Jiskht'awinakaru kutiyaña pantallat ajlliña",
  },
  patientInfo: {
    español: "Información del Paciente",
    aymara: "Usuta Jaqina Yatiyawi",
  },
  patientPrompt: {
    español: "Por favor, proporciona la información del paciente para personalizar la evaluación.",
    aymara: "Usuta jaqin yatiyawipa churañani suma uñakipañataki.",
  },
  testPrep: {
    español: "Preparación del Test",
    aymara: "Yant'awi Wakichata",
  },
  prepTime: {
    español: "Preparándose para comenzar...",
    aymara: "Qalltañataki wakichasisa...",
  },
  takeTime: {
    español: "Tómate tu tiempo para responder. Estoy contigo durante todo el proceso.",
    aymara: "Jan jank'aki arsuña. Nayax jumanpiñapiniwa.",
  },
  startTest: {
    español: "Iniciar Test",
    aymara: "Yant'awi Qalltaña",
  },
  cognitiveTest: {
    español: "Evaluación Cognitiva",
    aymara: "Amuyu Uñakipawi",
  },
  correct: {
    español: "Correcto",
    aymara: "Suma",
  },
  regular: {
    español: "Regular",
    aymara: "Jani suma",
  },
  incorrect: {
    español: "Incorrecto",
    aymara: "Jan wali",
  },
  finishTest: {
    español: "Finalizar Test",
    aymara: "Yant'awi Tukuya",
  },
  results: {
    español: "Resultados de la Evaluación",
    aymara: "Yant'awi Uñstayawi",
  },
  resultsDetails: {
    español: "Los resultados de {name} muestran algunas áreas que requieren atención. Revisa el dashboard para más detalles.",
    aymara: "{name} yant'awinakapax mä juk'a jan walt'awinakaniwa. Dashboard uñxataña juk'amp yatxatañataki.",
  },
  downloadPDF: {
    español: "Descargar PDF",
    aymara: "PDF apaqaña",
  },
  backToHome: {
    español: "Volver al inicio",
    aymara: "Qalltawiru kutiña",
  },
  footer: {
    español: "NeuroCheck - Detección temprana de deterioro cognitivo",
    aymara: "NeuroCheck - Jan walt'awi amuya nayraqata katjaña",
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: "español",
  setLanguage: () => {},
  translations,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("español");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
