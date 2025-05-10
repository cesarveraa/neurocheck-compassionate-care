import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export const useTestResponses = () => {
    const addTestResponse = async (patientId: string, questionId: string, answer: any, match: boolean, color: string) => {
      try {
        await api.post(`/test_responses/${patientId}`, {
          question_id: questionId,
          answer,
          match,
          color
        });
      } catch (err) {
        console.error("Error al registrar respuesta del test", err);
      }
    };
  
    return { addTestResponse };
  };