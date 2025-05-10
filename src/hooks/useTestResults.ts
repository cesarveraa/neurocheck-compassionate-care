import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
export const useTestResults = () => {
    const saveTestResult = async (patientId: string, result: any) => {
      try {
        await api.post(`/test_results/${patientId}`, result);
      } catch (err) {
        console.error("Error al guardar resultado del test", err);
      }
    };
  
    return { saveTestResult };
  };