import { useState } from "react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import AiMessage from "@/components/AiMessage";
import ModeCard from "@/components/ModeCard";
import PatientForm, { PatientData } from "@/components/PatientForm";
import TrafficLight from "@/components/TrafficLight";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CognitiveResultsDashboard from "@/components/CognitiveResultsDashboard";

type AppStep = 'welcome' | 'consent' | 'modeSelection' | 'patientData' | 'testPreparation' | 'test' | 'results';

// Mock test results for demonstration purposes
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
  ]
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [testMode, setTestMode] = useState<'camera' | 'text'>('text');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const handleNextStep = (nextStep: AppStep) => {
    setCurrentStep(nextStep);
  };
  
  const handleModeSelection = (mode: 'camera' | 'text') => {
    setTestMode(mode);
  };
  
  const handlePatientDataSubmit = (data: PatientData) => {
    setPatientData(data);
    handleNextStep('testPreparation');
  };

  const handleQuestionAnswer = () => {
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // After 5 questions (0-4), go to results
      setCurrentQuestion(0);
      handleNextStep('results');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center border-b border-neuro-secondary/20 dark:border-neuro-primary/20">
        <Logo />
        <ThemeToggle />
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto p-6 max-w-5xl">
        {/* Welcome Screen */}
        {currentStep === 'welcome' && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 animate-appear">
            <div className="text-center space-y-3 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Bienvenido a NeuroCheck
              </h1>
              <AiMessage 
                message="Hola, estoy aquí para acompañarte en esta evaluación. No te preocupes, es solo una charla tranquila."
                className="mx-auto"
              />
              <div className="h-4"></div>
              <AiMessage 
                message="Te ayudaré a detectar signos tempranos de deterioro cognitivo de forma simple y amable."
                delay={50}
                className="mx-auto"
              />
            </div>
            
            <Button 
              onClick={() => handleNextStep('consent')}
              className="mt-8 h-14 px-8 text-lg bg-neuro-primary hover:bg-neuro-primary/90 text-white"
            >
              Comenzar
            </Button>
          </div>
        )}
        
        {/* Consent Screen */}
        {currentStep === 'consent' && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 max-w-2xl mx-auto animate-appear">
            <h2 className="text-3xl font-bold gradient-text">Consentimiento Informado</h2>
            
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
                onCheckedChange={(checked) => setConsentAccepted(checked === true)}
              />
              <Label 
                htmlFor="consent" 
                className="text-base font-medium cursor-pointer"
              >
                He leído y acepto los términos de uso y política de privacidad
              </Label>
            </div>
            
            <div className="flex gap-4 w-full">
              <Button 
                onClick={() => handleNextStep('welcome')}
                variant="outline"
                className="flex-1 h-12"
              >
                Volver
              </Button>
              
              <Button 
                onClick={() => handleNextStep('modeSelection')}
                disabled={!consentAccepted}
                className="flex-1 h-12 bg-neuro-primary hover:bg-neuro-primary/90 text-white"
              >
                Continuar
              </Button>
            </div>
          </div>
        )}
        
        {/* Mode Selection Screen */}
        {currentStep === 'modeSelection' && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 animate-appear">
            <h2 className="text-3xl font-bold gradient-text">Selecciona el modo de evaluación</h2>
            
            <AiMessage 
              message="Puedes elegir entre realizar la evaluación con cámara o sin ella, según te resulte más cómodo."
              className="mx-auto"
            />
            
            <div className="flex flex-col md:flex-row gap-6 mt-8">
              <ModeCard
                title="Modo con Cámara"
                description="La IA analizará tus expresiones faciales durante la evaluación"
                isCamera={true}
                isSelected={testMode === 'camera'}
                onClick={() => handleModeSelection('camera')}
              />
              
              <ModeCard
                title="Modo sin Cámara"
                description="Responde a las preguntas seleccionando opciones en pantalla"
                isCamera={false}
                isSelected={testMode === 'text'}
                onClick={() => handleModeSelection('text')}
              />
            </div>
            
            <div className="flex gap-4 w-full max-w-md">
              <Button 
                onClick={() => handleNextStep('consent')}
                variant="outline"
                className="flex-1 h-12"
              >
                Volver
              </Button>
              
              <Button 
                onClick={() => handleNextStep('patientData')}
                className="flex-1 h-12 bg-neuro-primary hover:bg-neuro-primary/90 text-white"
              >
                Continuar
              </Button>
            </div>
          </div>
        )}
        
        {/* Patient Data Screen */}
        {currentStep === 'patientData' && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 animate-appear">
            <h2 className="text-3xl font-bold gradient-text">Información del Paciente</h2>
            
            <AiMessage 
              message="Por favor, proporciona la información del paciente para personalizar la evaluación."
              className="mx-auto"
            />
            
            <PatientForm onSubmit={handlePatientDataSubmit} />
            
            <Button 
              onClick={() => handleNextStep('modeSelection')}
              variant="outline"
              className="w-full max-w-lg h-12"
            >
              Volver
            </Button>
          </div>
        )}
        
        {/* Test Preparation Screen */}
        {currentStep === 'testPreparation' && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 animate-appear">
            <h2 className="text-3xl font-bold gradient-text">Preparación del Test</h2>
            
            <div className="text-center">
              <AiMessage 
                message={`Hola ${patientData?.name || 'paciente'}, vamos a comenzar con tu evaluación en modo ${testMode === 'camera' ? 'con cámara' : 'sin cámara'}.`}
                className="mx-auto mb-6"
              />
              
              <div className="flex flex-col items-center justify-center my-10">
                <div className="text-6xl font-bold text-neuro-primary dark:text-neuro-secondary animate-pulse-soft">
                  3
                </div>
                <p className="text-lg mt-4">Preparándose para comenzar...</p>
              </div>
              
              <AiMessage 
                message="Tómate tu tiempo para responder. Estoy contigo durante todo el proceso."
                delay={50}
                className="mx-auto"
              />
            </div>
            
            <div className="flex gap-4 w-full max-w-md">
              <Button 
                onClick={() => handleNextStep('patientData')}
                variant="outline"
                className="flex-1 h-12"
              >
                Volver
              </Button>
              
              <Button 
                onClick={() => handleNextStep('test')}
                className="flex-1 h-12 bg-neuro-primary hover:bg-neuro-primary/90 text-white"
              >
                Iniciar Test
              </Button>
            </div>
          </div>
        )}
        
        {/* Test Screen */}
        {currentStep === 'test' && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 animate-appear">
            <h2 className="text-3xl font-bold gradient-text">Evaluación Cognitiva</h2>
            
            <div className="w-full max-w-2xl">
              {testMode === 'camera' && (
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video mx-auto mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white">Vista de la cámara (simulada)</p>
                  </div>
                </div>
              )}
              
              {currentQuestion === 0 && (
                <AiMessage 
                  message="¿Qué día de la semana es hoy?" 
                  className="mb-6"
                />
              )}
              {currentQuestion === 1 && (
                <AiMessage 
                  message="¿Puedes recordar estas tres palabras? Casa, Perro, Azul" 
                  className="mb-6"
                />
              )}
              {currentQuestion === 2 && (
                <AiMessage 
                  message="¿En qué año estamos actualmente?" 
                  className="mb-6"
                />
              )}
              {currentQuestion === 3 && (
                <AiMessage 
                  message="¿Puedes restar 7 de 100?" 
                  className="mb-6"
                />
              )}
              {currentQuestion === 4 && (
                <AiMessage 
                  message="¿Recuerdas las tres palabras que te mencioné antes?" 
                  className="mb-6"
                />
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentQuestion === 0 && (
                  ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                    <Button
                      key={day}
                      variant="outline"
                      className="h-16 text-lg hover:bg-neuro-secondary/20 dark:hover:bg-neuro-primary/20"
                      onClick={handleQuestionAnswer}
                    >
                      {day}
                    </Button>
                  ))
                )}
                {currentQuestion === 1 && (
                  <Button
                    variant="outline"
                    className="h-16 text-lg col-span-4 hover:bg-neuro-secondary/20 dark:hover:bg-neuro-primary/20"
                    onClick={handleQuestionAnswer}
                  >
                    Listo, las he memorizado
                  </Button>
                )}
                {currentQuestion === 2 && (
                  ["2023", "2024", "2025", "2026"].map((year) => (
                    <Button
                      key={year}
                      variant="outline"
                      className="h-16 text-lg hover:bg-neuro-secondary/20 dark:hover:bg-neuro-primary/20"
                      onClick={handleQuestionAnswer}
                    >
                      {year}
                    </Button>
                  ))
                )}
                {currentQuestion === 3 && (
                  ["93", "94", "95", "97"].map((answer) => (
                    <Button
                      key={answer}
                      variant="outline"
                      className="h-16 text-lg hover:bg-neuro-secondary/20 dark:hover:bg-neuro-primary/20"
                      onClick={handleQuestionAnswer}
                    >
                      {answer}
                    </Button>
                  ))
                )}
                {currentQuestion === 4 && (
                  [
                    "Casa, Perro, Azul",
                    "Mesa, Gato, Rojo",
                    "Casa, Gato, Azul",
                    "Casa, Perro, Rojo"
                  ].map((answer) => (
                    <Button
                      key={answer}
                      variant="outline"
                      className="h-16 text-lg col-span-2 hover:bg-neuro-secondary/20 dark:hover:bg-neuro-primary/20"
                      onClick={handleQuestionAnswer}
                    >
                      {answer}
                    </Button>
                  ))
                )}
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-6">
                <div className="flex flex-col items-center">
                  <TrafficLight status="green" size="lg" />
                  <span className="mt-2">Correcto</span>
                </div>
                <div className="flex flex-col items-center">
                  <TrafficLight status="yellow" size="lg" />
                  <span className="mt-2">Regular</span>
                </div>
                <div className="flex flex-col items-center">
                  <TrafficLight status="red" size="lg" />
                  <span className="mt-2">Incorrecto</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 w-full max-w-md">
              <Button 
                onClick={() => handleNextStep('testPreparation')}
                variant="outline"
                className="flex-1 h-12"
              >
                Volver
              </Button>
              
              <Button 
                onClick={() => handleNextStep('results')}
                className="flex-1 h-12 bg-neuro-primary hover:bg-neuro-primary/90 text-white"
              >
                Finalizar Test
              </Button>
            </div>
          </div>
        )}
        
        {/* Results Screen */}
        {currentStep === 'results' && (
          <div className="flex flex-col items-center space-y-8 animate-appear">
            <h2 className="text-3xl font-bold gradient-text">Resultados de la Evaluación</h2>
            
            <AiMessage 
              message={`Los resultados de ${patientData?.name || 'paciente'} muestran algunas áreas que requieren atención. Revisa el dashboard para más detalles.`}
              className="mx-auto mb-6"
            />
            
            <div className="w-full">
              <CognitiveResultsDashboard results={mockTestResults} />
            </div>
            
            <div className="flex gap-4 w-full max-w-md mt-6">
              <Button 
                variant="outline"
                className="flex-1 h-12"
              >
                Descargar PDF
              </Button>
              
              <Button 
                onClick={() => handleNextStep('welcome')}
                className="flex-1 h-12 bg-neuro-primary hover:bg-neuro-primary/90 text-white"
              >
                Volver al inicio
              </Button>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-6 border-t border-neuro-secondary/20 dark:border-neuro-primary/20 text-center">
        <p className="text-sm text-neuro-neutral dark:text-neuro-light/70">
          © {new Date().getFullYear()} NeuroCheck - Detección temprana de deterioro cognitivo
        </p>
      </footer>
    </div>
  );
};

export default Index;
