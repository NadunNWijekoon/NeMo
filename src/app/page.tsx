"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { AIAssistantWidget } from "@/components/dashboard/AIAssistantWidget";
import { Button } from "@/components/ui/button";
import { Plus, Video, Music, Image as ImageIcon, Sparkles, ChevronRight, FileVideo, Clock, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { aiMediaEnhancement } from "@/ai/flows/ai-media-enhancements-flow";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const { toast } = useToast();

  const templates = [
    { id: 'template-1', title: 'Minimalist Vlog', category: 'TikTok', image: PlaceHolderImages.find(img => img.id === 'template-1')?.imageUrl || '' },
    { id: 'template-2', title: 'Travel Film', category: 'Cinematic', image: PlaceHolderImages.find(img => img.id === 'template-2')?.imageUrl || '' },
    { id: 'template-3', title: 'Product Showcase', category: 'Ad', image: PlaceHolderImages.find(img => img.id === 'template-3')?.imageUrl || '' },
  ];

  const handleQuickAction = async (type: string, request: string) => {
    setIsProcessing(type);
    try {
      // Mocking a media file for the quick action demo
      const mockMediaUri = "data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29tYXZjMQ==";
      const result = await aiMediaEnhancement({
        mediaDataUri: mockMediaUri,
        mediaType: type === 'audio' ? 'audio' : 'video',
        enhancementRequest: request,
      });

      toast({
        title: "Magic Applied!",
        description: result.summary,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Action Failed",
        description: "Could not process the AI request. Check your API key.",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-16">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-12">
        {/* Hero Section */}
        <section className="relative w-full h-80 rounded-[2.5rem] overflow-hidden group">
          <div className="absolute inset-0 liquid-gradient opacity-90" />
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/nemo-bg/1920/1080')] bg-cover bg-center mix-blend-overlay opacity-30" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter animate-in fade-in slide-in-from-top-4 duration-700">
              Create magic with <span className="underline decoration-secondary/50">AI</span>.
            </h1>
            <p className="max-w-xl text-lg text-white/80 font-medium">
              NeMo is your next-gen creative assistant. Edit videos, enhance audio, and sync beats in seconds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/editor/new">
                <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 shadow-xl shadow-primary/20">
                  <Plus className="w-5 h-5 mr-2" />
                  Start New Project
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-white/40">
                <Sparkles className="w-5 h-5 mr-2" />
                Browse Templates
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            disabled={!!isProcessing}
            onClick={() => handleQuickAction('video', 'Make this video look cinematic')}
            className="glass-card p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-primary/5 group disabled:opacity-50"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              {isProcessing === 'video' ? <Loader2 className="w-6 h-6 animate-spin" /> : <Video className="w-6 h-6" />}
            </div>
            <span className="font-headline font-bold text-sm">Video AI</span>
          </button>
          
          <button 
            disabled={!!isProcessing}
            onClick={() => handleQuickAction('audio', 'Reduce background noise and boost voice')}
            className="glass-card p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-secondary/5 group disabled:opacity-50"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              {isProcessing === 'audio' ? <Loader2 className="w-6 h-6 animate-spin" /> : <Music className="w-6 h-6" />}
            </div>
            <span className="font-headline font-bold text-sm">Audio Enhancer</span>
          </button>

          <button 
            disabled={!!isProcessing}
            onClick={() => handleQuickAction('video', 'Remove the background from this clip')}
            className="glass-card p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-accent group disabled:opacity-50"
          >
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent-foreground group-hover:scale-110 transition-transform">
              {isProcessing === 'bg' ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImageIcon className="w-6 h-6" />}
            </div>
            <span className="font-headline font-bold text-sm">Magic BG Remover</span>
          </button>

          <button 
            className="glass-card p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-primary/5 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-sm">Auto Template</span>
          </button>
        </section>

        {/* Recent Projects */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Recent Projects
            </h2>
            <Link href="/projects" className="text-sm font-semibold text-primary flex items-center hover:underline">
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProjectCard 
              title="Summer Vlog 2024" 
              duration="02:15" 
              lastEdited="2 hours ago" 
              thumbnail="https://picsum.photos/seed/p1/600/400" 
            />
            <ProjectCard 
              title="Product Promo AI" 
              duration="00:30" 
              lastEdited="Yesterday" 
              thumbnail="https://picsum.photos/seed/p2/600/400" 
            />
            <ProjectCard 
              title="Cinematic Intro" 
              duration="00:15" 
              lastEdited="3 days ago" 
              thumbnail="https://picsum.photos/seed/p3/600/400" 
            />
            <ProjectCard 
              title="Podcast Highlights" 
              duration="10:00" 
              lastEdited="1 week ago" 
              thumbnail="https://picsum.photos/seed/p4/600/400" 
            />
          </div>
        </section>

        {/* Trending Templates */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-secondary" />
              Trending Templates
            </h2>
            <Link href="/templates" className="text-sm font-semibold text-primary flex items-center hover:underline">
              Explore Library
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="relative group cursor-pointer overflow-hidden rounded-2xl glass shadow-lg">
                <div className="aspect-[4/5] relative">
                  <img 
                    src={template.image} 
                    alt={template.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-6 left-6 text-white space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-secondary-foreground bg-secondary px-2 py-0.5 rounded-full">
                      {template.category}
                    </span>
                    <h3 className="text-xl font-headline font-bold">{template.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <AIAssistantWidget />
    </div>
  );
}
