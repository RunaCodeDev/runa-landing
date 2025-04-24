import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  text: string;
  speed?: number;
}

export default function TypewriterEffect({
  text,
  speed = 25,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed, isComplete]);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <div className="min-h-[20px]">
      <p className="text-sm">
        {displayText}
        {!isComplete && (
          <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
        )}
      </p>
    </div>
  );
}
