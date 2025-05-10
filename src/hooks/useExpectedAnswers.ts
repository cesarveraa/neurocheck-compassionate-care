import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
export const useExpectedAnswers = () => {
    const addExpectedAnswer = async (patientId: string, questionId: string, value: any) => {
      try {
        await api.post(`/expected_answers/${patientId}`, {
          question_id: questionId,
          expected_value: value !== undefined ? value : null,
        });
      } catch (err) {
        console.error("Error al guardar respuesta esperada", err);
      }
    };
  
    return { addExpectedAnswer };
  };
  
  