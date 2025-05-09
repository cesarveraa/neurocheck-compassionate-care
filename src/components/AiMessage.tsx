
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

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");
    setIsComplete(false);
    setIsAnimating(true);
    
    const typingInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(prev => prev + message[currentIndex]);
        currentIndex++;
        // Add small animation pulse every few characters
        if (currentIndex % 5 === 0) {
          setIsAnimating(prev => !prev);
        }
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
        setIsAnimating(false);
      }
    }, delay);
    
    return () => clearInterval(typingInterval);
  }, [message, delay]);

  return (
    <div 
      className={cn(
        "ai-bubble animate-float", 
        isComplete ? "opacity-100" : "opacity-90", 
        isAnimating ? "scale-102" : "scale-100",
        "transition-all duration-300",
        className
      )}
    >
      {displayedText}
      {!isComplete && <span className="ml-1 animate-pulse-soft">|</span>}
    </div>
  );
};

export default AiMessage;
