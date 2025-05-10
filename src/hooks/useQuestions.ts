import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export interface Question {
  question_id: string;
  field_name: string;
  text: string;
  response_type: string;
  options?: string[];
  category: string;
  language: string;
}

export const useQuestions = (language: "es" | "ay" = "es") => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await api.get("/questions");
        const filtered = res.data.filter((q: Question) => q.language === language);
        setQuestions(filtered);
      } catch (err) {
        setError("Error al cargar preguntas");
        toast.error("Error al cargar preguntas");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [language]);

  return { questions, loading, error };
};
