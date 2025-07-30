import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeAlt = "Antes",
  afterAlt = "Después",
  className
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  }, [isDragging]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-2xl cursor-ew-resize select-none", className)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Imagen "Después" (fondo) */}
      <div className="relative w-full h-full">
        <img 
          src={afterImage} 
          alt={afterAlt}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
          Después
        </div>
      </div>

      {/* Imagen "Antes" (se corta con clip-path) */}
      <div 
        className="absolute inset-0 transition-all duration-75 ease-out"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      >
        <img 
          src={beforeImage} 
          alt={beforeAlt}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-muted/90 text-foreground px-3 py-1 rounded-full text-sm font-medium">
          Antes
        </div>
      </div>

      {/* Línea divisoria y controlador */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 transition-all duration-75 ease-out"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Controlador circular */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-brand cursor-ew-resize flex items-center justify-center border-2 border-primary/20 hover:scale-110 transition-transform"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="w-1 h-4 bg-primary/60 rounded-full"></div>
        </div>
      </div>

      {/* Overlay para mejorar el arrastre */}
      {isDragging && (
        <div className="absolute inset-0 z-20 cursor-ew-resize" />
      )}
    </div>
  );
};