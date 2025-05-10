import { useApiHealth } from "@/hooks/useApiHealth";

const BackendStatusBadge = () => {
  const { connected } = useApiHealth();

  const statusText = connected === null
    ? "Verificando conexión..."
    : connected
    ? "🟢 Conectado al backend"
    : "🔴 Sin conexión";

  const colorClass = connected === null
    ? "text-yellow-500"
    : connected
    ? "text-green-500"
    : "text-red-500";

  return (
    <div className={`text-sm font-medium ${colorClass} text-center py-2`}>
      {statusText}
    </div>
  );
};

export default BackendStatusBadge;
