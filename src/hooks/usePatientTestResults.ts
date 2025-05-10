import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export interface CognitiveTestResult {
  overallScore: number;
  responseTime: number;
  domains: { name: string; score: number; status: "green"|"yellow"|"red" }[];
  timeData: { timepoint: string; value: number }[];
}

export interface AlzheimerModelResult {
  diagnosis: "Alzheimer" | "No Alzheimer";
  probability: number;
  risk_level: "Bajo" | "Moderado" | "Alto";
}

export interface CombinedTestResults {
  cognitive?: CognitiveTestResult;
  alzheimer?: AlzheimerModelResult;
}

export const usePatientTestResults = (patientId: string | null) => {
  const [results, setResults] = useState<CombinedTestResults>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!patientId) {
      setResults({});
      return;
    }
    setLoading(true);
    api
      .get("/test-results/", { params: { patient_id: patientId } })
      .then((res) => {
        console.log(res.data); 
        const docs: any[] = res.data;
        if (docs.length === 0) {
          setResults({});
          return;
        }
        const latest = docs.sort((a, b) =>
          a.timestamp > b.timestamp ? -1 : 1
        )[0];
        const combined: CombinedTestResults = {};
        latest.results.forEach((r: any) => {
          if (r.test_type === "cognitive_model") {
            combined.cognitive = {
              overallScore: r.score,
              responseTime: r.responseTime,
              domains: r.domains,
              timeData: r.timeData,
            };
          }
          if (r.test_type === "alzheimer_model") {
            combined.alzheimer = {
              diagnosis: r.diagnosis,
              probability: r.probability,
              risk_level: r.risk_level,
            };
          }
        });
        setResults(combined);
      })
      .catch((err) => {
        console.error("[usePatientTestResults]", err);
        toast.error("No se pudieron cargar resultados");
      })
      .finally(() => setLoading(false));
  }, [patientId]);

  return { results, loading };
};
