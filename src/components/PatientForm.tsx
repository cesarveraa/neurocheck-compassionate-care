
import { useState } from "react";
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

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
}

export interface PatientData {
  name: string;
  age: number;
  gender: string;
  education: string;
  medicalHistory: string;
}

const PatientForm = ({ onSubmit }: PatientFormProps) => {
  const [formData, setFormData] = useState<PatientData>({
    name: "",
    age: 0,
    gender: "",
    education: "",
    medicalHistory: "",
  });
  
  const handleChange = (field: keyof PatientData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg">Nombre completo</Label>
        <Input
          id="name"
          placeholder="Ingrese nombre completo"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="h-12 text-lg bg-white dark:bg-neuro-neutral dark:bg-opacity-10"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-lg">Edad</Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="120"
            placeholder="Edad"
            value={formData.age || ""}
            onChange={(e) => handleChange("age", parseInt(e.target.value) || 0)}
            className="h-12 text-lg bg-white dark:bg-neuro-neutral dark:bg-opacity-10"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-lg">Género</Label>
          <Select onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger 
              id="gender"
              className="h-12 text-lg bg-white dark:bg-neuro-neutral dark:bg-opacity-10"
            >
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Masculino</SelectItem>
              <SelectItem value="female">Femenino</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="education" className="text-lg">Nivel educativo</Label>
        <Select onValueChange={(value) => handleChange("education", value)}>
          <SelectTrigger 
            id="education"
            className="h-12 text-lg bg-white dark:bg-neuro-neutral dark:bg-opacity-10"
          >
            <SelectValue placeholder="Seleccionar nivel educativo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sin estudios formales</SelectItem>
            <SelectItem value="primary">Primaria</SelectItem>
            <SelectItem value="secondary">Secundaria</SelectItem>
            <SelectItem value="highschool">Bachillerato</SelectItem>
            <SelectItem value="university">Universidad</SelectItem>
            <SelectItem value="postgraduate">Posgrado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="medicalHistory" className="text-lg">Antecedentes médicos relevantes</Label>
        <Input
          id="medicalHistory"
          placeholder="Enfermedades, medicamentos, etc."
          value={formData.medicalHistory}
          onChange={(e) => handleChange("medicalHistory", e.target.value)}
          className="h-12 text-lg bg-white dark:bg-neuro-neutral dark:bg-opacity-10"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-14 text-lg bg-neuro-primary hover:bg-neuro-primary/90 text-white"
      >
        Continuar
      </Button>
    </form>
  );
};

export default PatientForm;
