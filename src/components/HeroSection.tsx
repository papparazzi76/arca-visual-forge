import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle py-20">
      <div className="container px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-tight">
                Crea contenido 
                <span className="text-accent"> profesional</span> para tus redes sociales
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Genera plantillas personalizadas para Instagram, Facebook, LinkedIn y TikTok 
                con la identidad visual de Arca Grupo Carranza. Sin conocimientos de diseño.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8">
                Comenzar Ahora
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Ver Plantillas
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <Card className="p-4 text-center border-none shadow-soft">
                <Sparkles className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-primary">IA Integrada</h3>
                <p className="text-sm text-muted-foreground">Textos automáticos</p>
              </Card>
              <Card className="p-4 text-center border-none shadow-soft">
                <Zap className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-primary">Editor Visual</h3>
                <p className="text-sm text-muted-foreground">Tiempo real</p>
              </Card>
              <Card className="p-4 text-center border-none shadow-soft">
                <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-primary">Brand Lock</h3>
                <p className="text-sm text-muted-foreground">Identidad protegida</p>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-brand">
              <img 
                src={heroImage} 
                alt="Arca Construcciones - Profesionales en acción"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};