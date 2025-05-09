
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

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");
    setIsComplete(false);
    
    const typingInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(prev => prev + message[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
      }
    }, delay);
    
    return () => clearInterval(typingInterval);
  }, [message, delay]);

  return (
    <div className={cn("ai-bubble animate-float", isComplete ? "opacity-100" : "opacity-90", className)}>
      {displayedText}
      {!isComplete && <span className="ml-1 animate-pulse-soft">|</span>}
    </div>
  );
};

export default AiMessage;
