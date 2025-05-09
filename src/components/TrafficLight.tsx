
import { cn } from "@/lib/utils";

export type TrafficLightStatus = "green" | "yellow" | "red" | "neutral";

interface TrafficLightProps {
  status: TrafficLightStatus;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

const TrafficLight = ({ 
  status = "neutral", 
  size = "md", 
  animate = false,
  className 
}: TrafficLightProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };
  
  const statusClasses = {
    red: "bg-neuro-red shadow-glow-red",
    yellow: "bg-neuro-yellow shadow-glow-yellow",
    green: "bg-neuro-green shadow-glow-green",
    neutral: "bg-neuro-neutral bg-opacity-30",
  };
  
  return (
    <div 
      className={cn(
        "rounded-full flex items-center justify-center transition-all duration-300", 
        sizeClasses[size], 
        statusClasses[status],
        animate && status !== "neutral" && "animate-pulse-soft",
        className
      )}
    >
      {status !== "neutral" && (
        <div className="w-2/3 h-2/3 rounded-full bg-white bg-opacity-30 animate-ping-small" />
      )}
    </div>
  );
};

export default TrafficLight;
