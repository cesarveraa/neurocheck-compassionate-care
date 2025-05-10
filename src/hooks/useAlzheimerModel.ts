import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
import { PatientData } from "@/components/PatientForm";

/**
 * Llama al modelo de Alzheimer para predecir diagnóstico.
 */
export const useAlzheimerModel = () => {
  const predictAlzheimer = async (data: PatientData) => {
    try {
      const res = await api.post("/predict-alzheimer", data);
      return res.data;
    } catch (err) {
      console.error("[useAlzheimerModel] Error al predecir Alzheimer:", err);
      toast.error(" No se pudo obtener la predicción de Alzheimer");
      return null;
    }
  };

  return { predictAlzheimer };
};
