
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface AiMessageProps {
  message: string;
  delay?: number;
  className?: string;
}

const AiMessage = ({ message, delay = 100, className }: AiMessageProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");
    setIsComplete(false);
    setIsAnimating(true);
    
    const typingInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(prev => prev + message[currentIndex]);
        currentIndex++;
        
        // Add randomized pulse intensity for more organic feeling
        setPulseIntensity(Math.random() * 0.4 + 0.6); // Values between 0.6 and 1.0
        
        // Add small animation pulse every few characters
        if (currentIndex % 3 === 0) {
          setIsAnimating(prev => !prev);
        }
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
        setIsAnimating(false);
        setPulseIntensity(0);
      }
    }, delay);
    
    return () => clearInterval(typingInterval);
  }, [message, delay]);

  return (
    <div className="relative flex items-start">
      {/* AI Orb/Sphere */}
      {!isComplete && (
        <div className="absolute -left-12 top-1/2 -translate-y-1/2">
          <div 
            className={cn(
              "w-8 h-8 rounded-full overflow-hidden",
              "transition-all duration-300 ease-in-out",
              isAnimating ? "scale-105" : "scale-100"
            )}
            style={{
              transform: `scale(${1 + pulseIntensity * 0.05})`,
              boxShadow: `0 0 ${10 + pulseIntensity * 5}px ${2 + pulseIntensity * 3}px rgba(135, 187, 162, 0.5)`
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-neuro-light to-neuro-secondary relative overflow-hidden">
              <div 
                className={cn(
                  "absolute inset-0 bg-gradient-to-b from-neuro-light/90 to-neuro-secondary",
                  "animate-pulse-soft"
                )}
                style={{
                  animation: !isComplete ? `pulse ${0.8 + pulseIntensity}s infinite ease-in-out` : 'none'
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Message bubble */}
      <div 
        className={cn(
          "ai-bubble animate-float", 
          isComplete ? "opacity-100" : "opacity-95", 
          isAnimating ? "scale-102" : "scale-100",
          "transition-all duration-300",
          "ml-8", // Add margin to make room for the orb
          className
        )}
      >
        {displayedText}
        {!isComplete && <span className="ml-1 animate-pulse-soft">|</span>}
      </div>
    </div>
  );
};

export default AiMessage;
