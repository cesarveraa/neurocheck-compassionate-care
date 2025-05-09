
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-neuro-primary rounded-full opacity-70 animate-ping-small" />
        <div className="absolute inset-0 bg-neuro-secondary rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
      </div>
      <span className="text-xl font-bold gradient-text">NeuroCheck</span>
    </div>
  );
};

export default Logo;
