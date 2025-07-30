import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlatformSelector } from "./PlatformSelector";

export const PlatformSelectorTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="hero" 
        size="lg"
        onClick={() => setIsOpen(true)}
      >
        Comenzar a Crear
      </Button>
      <PlatformSelector isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};