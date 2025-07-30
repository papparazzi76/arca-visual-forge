import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Instagram, Facebook, Linkedin, PlayCircle, FileImage, Layers } from "lucide-react";
import { PublicationCreator } from "./PublicationCreator";

const templates = [
  {
    id: 1,
    title: "Antes/Después - Reforma Integral",
    category: "Transformación",
    platform: "Instagram",
    type: "Carrusel",
    icon: <Layers className="h-4 w-4" />,
    preview: "bg-gradient-to-br from-muted to-accent/20"
  },
  {
    id: 2,
    title: "Testimonio Cliente",
    category: "Social Proof",
    platform: "Facebook",
    type: "Post",
    icon: <FileImage className="h-4 w-4" />,
    preview: "bg-gradient-to-br from-primary/20 to-muted"
  },
  {
    id: 3,
    title: "Proceso de Obra",
    category: "Educativo",
    platform: "TikTok",
    type: "Reel",
    icon: <PlayCircle className="h-4 w-4" />,
    preview: "bg-gradient-to-br from-accent/30 to-primary/10"
  },
  {
    id: 4,
    title: "Servicios Profesionales",
    category: "Promocional",
    platform: "LinkedIn",
    type: "Post",
    icon: <FileImage className="h-4 w-4" />,
    preview: "bg-gradient-to-br from-primary/30 to-accent/10"
  },
  {
    id: 5,
    title: "Tips de Construcción",
    category: "Informativo",
    platform: "Instagram",
    type: "Carrusel",
    icon: <Layers className="h-4 w-4" />,
    preview: "bg-gradient-to-br from-muted to-primary/20"
  },
  {
    id: 6,
    title: "Obra en Progreso",
    category: "Behind the Scenes",
    platform: "Instagram",
    type: "Reel",
    icon: <PlayCircle className="h-4 w-4" />,
    preview: "bg-gradient-to-br from-accent/20 to-muted"
  }
];

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "Instagram":
      return <Instagram className="h-4 w-4" />;
    case "Facebook":
      return <Facebook className="h-4 w-4" />;
    case "LinkedIn":
      return <Linkedin className="h-4 w-4" />;
    case "TikTok":
      return <PlayCircle className="h-4 w-4" />;
    default:
      return <FileImage className="h-4 w-4" />;
  }
};

export const TemplateLibrary = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  const handleUseTemplate = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setIsCreatorOpen(true);
  };

  const handleCloseCreator = () => {
    setIsCreatorOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Biblioteca de Plantillas
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plantillas diseñadas específicamente para el sector de construcción y reformas,
            optimizadas para cada red social.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="group hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className={`h-32 rounded-lg ${template.preview} flex items-center justify-center mb-4`}>
                  <div className="text-4xl text-primary/30">
                    {template.icon}
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg group-hover:text-accent transition-colors">
                      {template.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.category}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(template.platform)}
                    <span className="text-sm font-medium">{template.platform}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {template.type}
                  </Badge>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleUseTemplate(template)}
                >
                  Usar Plantilla
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="brand" size="lg">
            Ver Todas las Plantillas
          </Button>
        </div>
      </div>

      <PublicationCreator
        isOpen={isCreatorOpen}
        onClose={handleCloseCreator}
        template={selectedTemplate}
      />
    </section>
  );
};