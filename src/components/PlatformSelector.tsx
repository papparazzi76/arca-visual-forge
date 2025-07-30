import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Smartphone } from "lucide-react";
import { PublicationCreator } from "./PublicationCreator";

export interface Platform {
  id: string;
  name: string;
  icon: any;
  description: string;
  formats: string[];
  imageSizes: {
    post: string;
    story?: string;
    cover?: string;
  };
  videoSpecs?: {
    maxDuration: string;
    aspectRatio: string;
  };
}

const platforms: Platform[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    description: "Posts, Stories, Reels",
    formats: ["Imagen cuadrada", "Stories verticales", "Reels verticales"],
    imageSizes: {
      post: "1080x1080px",
      story: "1080x1920px"
    },
    videoSpecs: {
      maxDuration: "90s",
      aspectRatio: "9:16"
    }
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    description: "Posts, Stories, Videos",
    formats: ["Imagen horizontal", "Stories verticales", "Videos cuadrados"],
    imageSizes: {
      post: "1200x630px",
      story: "1080x1920px",
      cover: "1200x315px"
    },
    videoSpecs: {
      maxDuration: "240s",
      aspectRatio: "16:9"
    }
  },
  {
    id: "twitter",
    name: "Twitter/X",
    icon: Twitter,
    description: "Tweets, Hilos, Videos",
    formats: ["Imagen horizontal", "Videos cortos"],
    imageSizes: {
      post: "1200x675px"
    },
    videoSpecs: {
      maxDuration: "140s",
      aspectRatio: "16:9"
    }
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    description: "Posts profesionales, Artículos",
    formats: ["Imagen horizontal", "Carruseles", "Videos profesionales"],
    imageSizes: {
      post: "1200x627px",
      cover: "1584x396px"
    },
    videoSpecs: {
      maxDuration: "600s",
      aspectRatio: "16:9"
    }
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    description: "Videos, Shorts, Thumbnails",
    formats: ["Thumbnails", "Shorts verticales", "Videos horizontales"],
    imageSizes: {
      post: "1280x720px"
    },
    videoSpecs: {
      maxDuration: "60s (Shorts)",
      aspectRatio: "9:16"
    }
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: Smartphone,
    description: "Videos verticales cortos",
    formats: ["Videos verticales"],
    imageSizes: {
      post: "1080x1920px"
    },
    videoSpecs: {
      maxDuration: "180s",
      aspectRatio: "9:16"
    }
  }
];

interface PlatformSelectorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PlatformSelector = ({ isOpen, onOpenChange }: PlatformSelectorProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [showCreator, setShowCreator] = useState(false);

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    setShowCreator(true);
  };

  const handleCloseCreator = () => {
    setShowCreator(false);
    setSelectedPlatform(null);
  };

  if (showCreator && selectedPlatform) {
    return (
        <PublicationCreator
          isOpen={showCreator}
          onClose={handleCloseCreator}
          template={{
            id: 1,
            title: `Publicación para ${selectedPlatform.name}`,
            category: "Personalizado",
            platform: selectedPlatform.name,
            type: "Post"
          }}
        />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Elige tu Plataforma
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            Selecciona la red social donde quieres publicar tu contenido
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <Card 
                key={platform.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => handlePlatformSelect(platform)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{platform.name}</CardTitle>
                  <CardDescription>{platform.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Formatos:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {platform.formats.map((format, index) => (
                        <li key={index}>• {format}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Tamaños de imagen:</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Post: {platform.imageSizes.post}</div>
                      {platform.imageSizes.story && (
                        <div>Story: {platform.imageSizes.story}</div>
                      )}
                      {platform.imageSizes.cover && (
                        <div>Portada: {platform.imageSizes.cover}</div>
                      )}
                    </div>
                  </div>

                  {platform.videoSpecs && (
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Video:</h4>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Duración: {platform.videoSpecs.maxDuration}</div>
                        <div>Relación: {platform.videoSpecs.aspectRatio}</div>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full mt-4" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlatformSelect(platform);
                    }}
                  >
                    Crear Contenido
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};