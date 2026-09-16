import React, { useEffect, useState, useRef } from 'react';

interface RunningCounterProps {
  value: string | number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const RunningCounter: React.FC<RunningCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1800,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Parse numeric target and any letters like K, M, B or symbols
  const rawString = String(value);
  const match = rawString.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
  const extractedPrefix = match ? match[1] : '';
  const numericTarget = match ? parseFloat(match[2]) : NaN;
  const extractedSuffix = match ? match[3] : '';
  const finalPrefix = prefix || extractedPrefix;
  const finalSuffix = suffix || extractedSuffix;
  const isDecimal = match && match[2].includes('.');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          if (isNaN(numericTarget)) {
            setDisplayValue(rawString);
            return;
          }

          const startTime = performance.now();

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic calculation
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = easeOutProgress * numericTarget;

            if (isDecimal) {
              setDisplayValue(currentNumber.toFixed(1));
            } else {
              setDisplayValue(Math.round(currentNumber).toString());
            }

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              // Exact final target reached & stopped
              if (isDecimal) {
                setDisplayValue(numericTarget.toFixed(1));
              } else {
                setDisplayValue(numericTarget.toString());
              }
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [numericTarget, duration, hasAnimated, isDecimal, rawString]);

  return (
    <span ref={elementRef} className={className}>
      {finalPrefix}
      {displayValue}
      {finalSuffix}
    </span>
  );
};
