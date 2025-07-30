import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hammer, Palette, Download, Settings } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-brand rounded-lg shadow-brand">
              <Hammer className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Arca Creator Studio</h1>
              <p className="text-sm text-muted-foreground">by Arca Grupo Carranza</p>
            </div>
          </div>
          <Badge variant="secondary" className="ml-2">
            Beta
          </Badge>
        </div>

        <nav className="hidden md:flex items-center gap-6">
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
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Guardar Proyecto
          </Button>
          <Button variant="brand" size="sm">
            Exportar
          </Button>
        </div>
      </div>
    </header>
  );
};