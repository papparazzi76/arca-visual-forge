import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Wand2, Eye, Download, Palette, Settings, Smartphone, Monitor } from "lucide-react";

const features = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: "Carga Intuitiva",
    description: "Arrastra y suelta imágenes y vídeos directamente en el editor. Compatible con todos los formatos populares.",
    color: "text-accent"
  },
  {
    icon: <Wand2 className="h-8 w-8" />,
    title: "IA Generativa",
    description: "Genera automáticamente textos, hashtags y descripciones optimizadas para cada red social.",
    color: "text-primary"
  },
  {
    icon: <Eye className="h-8 w-8" />,
    title: "Vista Previa en Tiempo Real",
    description: "Visualiza cómo se verá tu contenido en cada plataforma antes de exportar.",
    color: "text-accent"
  },
  {
    icon: <Download className="h-8 w-8" />,
    title: "Exportación Optimizada",
    description: "Descarga en formatos específicos para cada red social con la máxima calidad.",
    color: "text-primary"
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Brand Lock",
    description: "Mantén la consistencia de marca con colores, tipografías y elementos bloqueados.",
    color: "text-accent"
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "Editor Avanzado",
    description: "Herramientas profesionales de edición con animaciones y efectos especiales.",
    color: "text-primary"
  }
];

const platforms = [
  { name: "Instagram", icon: <Smartphone className="h-6 w-6" />, formats: "Posts, Stories, Reels" },
  { name: "Facebook", icon: <Monitor className="h-6 w-6" />, formats: "Posts, Videos" },
  { name: "LinkedIn", icon: <Monitor className="h-6 w-6" />, formats: "Posts Corporativos" },
  { name: "TikTok", icon: <Smartphone className="h-6 w-6" />, formats: "Videos Verticales" }
];

export const FeatureShowcase = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container px-6">
        {/* Main Features */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Herramientas Profesionales
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Todo lo que necesitas para crear contenido visual impactante, 
            sin conocimientos técnicos de diseño.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-soft hover:shadow-accent transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-muted mb-6 group-hover:bg-accent/10 transition-colors ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Compatibility */}
        <div className="bg-card rounded-3xl p-8 shadow-brand">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
              Compatible con Todas las Plataformas
            </h3>
            <p className="text-lg text-muted-foreground">
              Optimizado para los formatos nativos de cada red social
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="border-none shadow-soft">
                <CardContent className="p-6 text-center">
                  <div className="text-accent mb-4">
                    {platform.icon}
                  </div>
                  <h4 className="font-semibold text-primary mb-2">
                    {platform.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {platform.formats}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg">
              Comenzar a Crear
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};