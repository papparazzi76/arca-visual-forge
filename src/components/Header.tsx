import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Download, Settings, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import ArcaLogo from "@/assets/Logo_Horiz_Vect_rgb_ARCA_1.png";
import { toast } from "sonner";

const NavLinks = () => (
  <>
    <Button variant="ghost" size="sm">
      <Palette className="h-4 w-4" />
      Plantillas
    </Button>
    <Button variant="ghost" size="sm">
      <Download className="h-4 w-4" />
      Mis Diseños
    </Button>
    <Button variant="ghost" size="sm">
      <Settings className="h-4 w-4" />
      Configuración
    </Button>
  </>
);

export const Header = () => {
  const isMobile = useIsMobile();

  const handleExportClick = () => {
    toast.success("¡Proyecto exportado con éxito!");
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <img src={ArcaLogo} alt="Arca Grupo Carranza Logo" className="h-8" />
            </a>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Beta
          </Badge>
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-4/5">
              <nav className="flex flex-col items-start gap-4 pt-8">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-1">
            <NavLinks />
          </nav>
        )}

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm">
            Guardar Proyecto
          </Button>
          <Button variant="brand" size="sm" onClick={handleExportClick}>
            Exportar
          </Button>
        </div>
      </div>
    </header>
  );
};
