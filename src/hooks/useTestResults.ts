// hooks/useTestResults.ts
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export interface CognitiveResult {
  test_type: "cognitive_model";
  score: number;
  level: "Bajo" | "Moderado" | "Alto";
}

export interface AlzheimerResult {
  test_type: "alzheimer_model";
  diagnosis: "Alzheimer" | "No Alzheimer";
  probability: number;
  risk_level: "Bajo" | "Moderado" | "Alto";
}

export type TestResult = CognitiveResult | AlzheimerResult;

export const useTestResults = () => {
  const saveTestResult = async (
    patientId: string,
    results: TestResult[]
  ) => {
    const timestamp = new Date().toISOString();
    try {
      await api.post("/test-results/", {
        patient_id: patientId,
        results,
        timestamp,
      });
      toast.success("✅ Resultados guardados");
    } catch (err) {
      console.error("[useTestResults] Error al guardar resultados:", err);
      toast.error("❌ No se pudo guardar los resultados");
    }
  };

  return { saveTestResult };
};
