import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { useQuestions } from "@/hooks/useQuestions";
import { usePatient } from "@/hooks/usePatient";
import { useExpectedAnswers } from "@/hooks/useExpectedAnswers";
import { useLanguage } from "@/contexts/LanguageContext";


// Al principio del archivo
export interface PatientData {
  patient_id?: string; // El ID real generado por backend (opcional si lo crea el servidor)
  name: string;        // Nombre completo del paciente (obligatorio)
  [key: string]: any;  // Permite campos dinámicos adicionales
}


interface PatientFormProps {
  onSubmit?: (data: PatientData) => void;
}

const PatientForm = ({ onSubmit }: PatientFormProps) => {
  const { language, translations } = useLanguage();
  const t = (key: keyof typeof translations) => translations[key][language];
  const { questions, loading } = useQuestions(language === "español" ? "es" : "ay");

  const { createPatient } = usePatient();
  const { addExpectedAnswer } = useExpectedAnswers();
  const [formData, setFormData] = useState<PatientData>({ name: "" });


  useEffect(() => {
    if (!loading && questions.length > 0) {
      const initial: PatientData = { name: "" };
      questions.forEach((q) => {
        if (q.response_type === "boolean") {
          initial[q.field_name] = false;
        } else if (q.response_type === "number") {
          initial[q.field_name] = 0;
        } else {
          initial[q.field_name] = "";
        }
      });
      setFormData(initial);
    }
  }, [questions, loading]);
  

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const patient = await createPatient({ ...formData });
      const patientId = patient?.patient_id;
      if (!patientId) {
        toast.error("No se pudo recuperar el ID del paciente");
        console.error("[PatientForm] patient_id no retornado por backend.");
        return;
      }
  
      for (const q of questions) {
       
        await addExpectedAnswer(patientId, q.question_id, formData[q.field_name]);
      }
  
      toast.success("Respuestas guardadas correctamente");
    
  
      if (onSubmit) {
     
        onSubmit({ name: formData.name });
      } else {
  
      }
  
    } catch (err) {
      
      toast.error("Error al registrar paciente o respuestas");
    }
  };
  
  
  
  
  const renderQuestion = (q: any) => {
    const val = formData[q.field_name];
    switch (q.response_type) {
      case "number":
        return (
          <div key={q.question_id} className="space-y-2">
            <Label>{q.text}</Label>
            <Input
              type="number"
              value={val || ""}
              onChange={(e) => handleChange(q.field_name, Number(e.target.value))}
            />
          </div>
        );
      case "boolean":
        return (
          <div key={q.question_id} className="space-y-2">
            <Label>{q.text}</Label>
            <Select
              onValueChange={(v) => handleChange(q.field_name, v === "true")}
              value={val !== undefined ? val.toString() : ""}
            >
              <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="true">{t("yes")}</SelectItem>
                <SelectItem value="false">{t("no")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "choice":
        return (
          <div key={q.question_id} className="space-y-2">
            <Label>{q.text}</Label>
            <Select
              onValueChange={(v) => handleChange(q.field_name, v)}
              value={val}
            >
              <SelectTrigger><SelectValue placeholder={t("select")} /></SelectTrigger>
              <SelectContent>
                {q.options?.map((opt: string) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return (
          <div key={q.question_id} className="space-y-2">
            <Label>{q.text}</Label>
            <Input
              type="text"
              value={val || ""}
              onChange={(e) => handleChange(q.field_name, e.target.value)}
            />
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-4xl mx-auto">
      <div className="space-y-4">
        <Label>{t("form_name")}</Label>
        <Input
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {questions.map(renderQuestion)}
      </div>

      <Button type="submit" className="w-full h-14 text-lg bg-neuro-primary text-white">
        Guardar paciente
      </Button>
    </form>
  );
};

export default PatientForm;
