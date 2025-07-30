import { Hammer, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import ArcaLogo from "@/assets/Logo_Horiz_Vect_rgb_ARCA_2 (1).png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <a href="/" className="flex items-center gap-2">
                <img src={ArcaLogo} alt="Arca Grupo Carranza Logo" className="h-10" />
              </a>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Especialistas en construcciones y reformas integrales. 
              Creamos espacios únicos con la máxima calidad y profesionalidad.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">983 36 12 50</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">arca@arcal.es</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-1" />
                <span className="text-primary-foreground/80">
                  Calle Ferrari 5<br />
                  47002 Valladolid
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Enlaces</h4>
            <div className="space-y-3">
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Acerca de Nosotros
              </a>
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Nuestros Servicios
              </a>
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Portfolio
              </a>
              <a href="#" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Contacto
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 Arca Grupo Carranza S.L. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
