import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export const usePatient = () => {
  const [loading, setLoading] = useState(false);

  const createPatient = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.post("/patients", data);
      toast.success("Paciente registrado");
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error("Error al registrar paciente");
      return null;
    } finally {
      setLoading(false);
    }
  };
  

  const getPatient = async (patientId: string) => {
    try {
      const res = await api.get(`/patients/${patientId}`);
      return res.data;
    } catch (err) {
      toast.error("No se pudo obtener el paciente");
      return null;
    }
  };


  return { createPatient, getPatient, loading };
};