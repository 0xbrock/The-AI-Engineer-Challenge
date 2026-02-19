"use client";

import { useRef, useCallback, useState, useEffect } from "react";

interface StarExplosionButtonProps {
  /** Optional: called when button is clicked (e.g. for form submit handling) */
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const STAR_COUNT = 24;
const BURST_DISTANCE = 80;

/**
 * StarExplosionButton - A submit button that explodes into golden stars
 * when clicked. The stars burst outward and remain visible (gentle drift)
 * until loading completes, evoking a magical forest wish-granting feel.
 */
export function StarExplosionButton({
  onClick,
  disabled,
  isLoading,
  children,
  className = "",
}: StarExplosionButtonProps) {
  const [stars, setStars] = useState<Array<{ id: number; angle: number; distance: number }>>([]);
  const [isExploding, setIsExploding] = useState(false);
  const idRef = useRef(0);
  const wasLoadingRef = useRef(false);

  // Clear stars when loading completes
  useEffect(() => {
    if (wasLoadingRef.current && !isLoading && stars.length > 0) {
      const timer = setTimeout(() => {
        setStars([]);
        setIsExploding(false);
      }, 400);
      return () => clearTimeout(timer);
    }
    wasLoadingRef.current = Boolean(isLoading);
  }, [isLoading, stars.length]);

  const handleClick = useCallback(() => {
    if (disabled || isLoading) return;

    // Create burst of stars with random angles
    const newStars = Array.from({ length: STAR_COUNT }, (_, i) => {
      const angle = (i / STAR_COUNT) * 360 + Math.random() * 15;
      const distance = BURST_DISTANCE + Math.random() * 40;
      return { id: idRef.current++, angle, distance };
    });

    setStars(newStars);
    setIsExploding(true);
    wasLoadingRef.current = true;
    onClick?.();
  }, [disabled, isLoading, onClick]);

  return (
    <div className="star-explosion-container relative inline-flex">
      <button
        type="submit"
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={`
          relative z-10 px-6 py-3 rounded-xl font-medium
          bg-amber-600/90 hover:bg-amber-500/95 active:bg-amber-700
          text-amber-50 shadow-lg shadow-amber-900/30
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isExploding && isLoading ? "opacity-0 pointer-events-none scale-95" : "opacity-100"}
          ${className}
        `}
      >
        {children}
      </button>

      {/* Star particles - rendered when explosion triggers */}
      {stars.map(({ id, angle, distance }) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * distance;
        const y = Math.sin(rad) * distance;
        return (
          <div
            key={id}
            className="star-particle"
            style={
              {
                "--star-transform": `translate(${x}px, ${y}px)`,
                left: "50%",
                top: "50%",
                marginLeft: -4,
                marginTop: -4,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
