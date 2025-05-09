
import { cn } from "@/lib/utils";
import { Camera, Check } from "lucide-react";

interface ModeCardProps {
  title: string;
  description: string;
  isCamera?: boolean;
  isSelected?: boolean;
  onClick: () => void;
}

const ModeCard = ({ 
  title, 
  description, 
  isCamera = false, 
  isSelected = false, 
  onClick 
}: ModeCardProps) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative w-full md:w-64 h-64 p-6 rounded-2xl transition-all duration-300 card-gradient flex flex-col items-center justify-center gap-4",
        isSelected 
          ? "ring-4 ring-neuro-secondary dark:ring-neuro-secondary scale-105" 
          : "hover:scale-[1.02]"
      )}
    >
      <div 
        className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center",
          isCamera ? "bg-neuro-primary" : "bg-neuro-secondary",
          "dark:bg-opacity-70"
        )}
      >
        {isCamera ? (
          <Camera className="w-12 h-12 text-neuro-light" />
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-neuro-light">Aa</span>
            <span className="text-sm text-neuro-light">Texto</span>
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-center opacity-80">{description}</p>
      
      {isSelected && (
        <div className="absolute top-4 right-4 bg-neuro-secondary dark:bg-neuro-primary rounded-full p-1">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </button>
  );
};

export default ModeCard;
