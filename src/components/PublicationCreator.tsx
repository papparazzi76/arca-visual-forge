import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Upload, 
  Loader2, 
  Wand2, 
  Copy, 
  Download,
  Instagram,
  Facebook,
  Linkedin,
  PlayCircle,
  X,
  ImageIcon
} from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: number;
  title: string;
  category: string;
  platform: string;
  type: string;
}

interface PublicationCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
}

export const PublicationCreator = ({ isOpen, onClose, template }: PublicationCreatorProps) => {
  const [activeTab, setActiveTab] = useState("content");
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [customText, setCustomText] = useState("");

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
        return <ImageIcon className="h-4 w-4" />;
    }
  };

  // Determine what media types are supported based on platform
  const supportsImages = template?.platform !== "TikTok";
  const supportsVideos = template?.platform === "TikTok" || template?.platform === "Instagram";
  const maxImages = template?.type === "Carrusel" ? 10 : 1;
  const maxVideos = template?.platform === "TikTok" ? 1 : (template?.type === "Reel" ? 1 : 3);

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast.error("Por favor, describe qué tipo de contenido quieres crear");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('https://ynfesnszjbjafusfmssj.functions.supabase.co/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          platform: template?.platform || "Instagram",
          contentType: template?.type || "Post",
          industry: "construcción y reformas",
          tone: "profesional y cercano"
        }),
      });

      if (!response.ok) {
        throw new Error('Error al generar contenido');
      }

      const data = await response.json();
      setGeneratedContent(data.content);
      setActiveTab("preview");
      toast.success("¡Contenido generado exitosamente!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error al generar contenido. Verifica que la API key esté configurada.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (images.length + files.length > maxImages) {
      toast.error(`Máximo ${maxImages} imágenes permitidas para ${template?.type}`);
      return;
    }
    setImages(prev => [...prev, ...files.slice(0, maxImages - prev.length)]);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (videos.length + files.length > maxVideos) {
      toast.error(`Máximo ${maxVideos} video(s) permitido(s) para ${template?.platform}`);
      return;
    }
    setVideos(prev => [...prev, ...files.slice(0, maxVideos - prev.length)]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  };

  const copyContent = () => {
    const content = generatedContent || customText;
    navigator.clipboard.writeText(content);
    toast.success("Contenido copiado al portapapeles");
  };

  const downloadContent = () => {
    const content = generatedContent || customText;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template?.platform || 'contenido'}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Contenido descargado");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {template && getPlatformIcon(template.platform)}
            Crear Publicación {template && `- ${template.title}`}
          </DialogTitle>
        </DialogHeader>

        {template && (
          <div className="flex gap-2 mb-4">
            <Badge variant="outline">{template.platform}</Badge>
            <Badge variant="outline">{template.type}</Badge>
            <Badge variant="outline">{template.category}</Badge>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="media">
              {template?.platform === "TikTok" ? "Videos" : "Media"}
            </TabsTrigger>
            <TabsTrigger value="preview">Vista Previa</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Generar con IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Describe tu publicación</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Ej: Quiero mostrar una reforma de cocina antes y después, destacando los acabados de calidad y el diseño moderno..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <Button 
                  onClick={generateContent} 
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generar Contenido
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>O escribe tu propio contenido</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Escribe tu contenido personalizado aquí..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="min-h-[150px]"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            {supportsImages && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Subir Imágenes (máximo {maxImages})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Input
                        type="file"
                        multiple={maxImages > 1}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground">
                          Arrastra imágenes aquí o haz clic para seleccionar
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {images.length}/{maxImages} imágenes cargadas
                        </p>
                      </Label>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {supportsVideos && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Subir Videos (máximo {maxVideos})
                    {template?.platform === "TikTok" && (
                      <p className="text-sm text-muted-foreground font-normal mt-1">
                        Formato vertical recomendado 9:16 para TikTok
                      </p>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Input
                        type="file"
                        multiple={maxVideos > 1}
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                        id="video-upload"
                      />
                      <Label htmlFor="video-upload" className="cursor-pointer">
                        <PlayCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground">
                          Arrastra videos aquí o haz clic para seleccionar
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {videos.length}/{maxVideos} video(s) cargado(s)
                        </p>
                      </Label>
                    </div>

                    {videos.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {videos.map((video, index) => (
                          <div key={index} className="relative">
                            <video
                              src={URL.createObjectURL(video)}
                              className="w-full h-32 object-cover rounded-lg"
                              controls
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6"
                              onClick={() => removeVideo(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa del Contenido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(generatedContent || customText) && (
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                      {generatedContent || customText}
                    </pre>
                  </div>
                )}

                {images.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Imágenes:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {videos.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Videos:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {videos.map((video, index) => (
                        <video
                          key={index}
                          src={URL.createObjectURL(video)}
                          className="w-full h-40 object-cover rounded-lg"
                          controls
                        />
                      ))}
                    </div>
                  </div>
                )}

                {(generatedContent || customText || images.length > 0 || videos.length > 0) && (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={copyContent}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button variant="outline" onClick={downloadContent}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="brand">
            Publicar en {template?.platform || "Red Social"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};