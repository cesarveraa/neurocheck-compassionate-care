import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export const useApiHealth = () => {
    const [connected, setConnected] = useState<boolean | null>(null);
  
    useEffect(() => {
      const checkConnection = async () => {
        try {
          await api.get("/questions");
          setConnected(true);
          toast.success("Conectado al backend");
        } catch (err) {
          setConnected(false);
          toast.error("Error al conectar con el backend");
        }
      };
  
      checkConnection();
    }, []);
  
    return { connected };
  };
  
