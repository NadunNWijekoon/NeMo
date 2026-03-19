"use client";

import Image from "next/image";
import { MoreVertical, Play, Clock, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  lastEdited: string;
  duration: string;
  thumbnail: string;
}

export function ProjectCard({ title, lastEdited, duration, thumbnail }: ProjectCardProps) {
  return (
    <div className="glass-card group relative overflow-hidden flex flex-col">
      <div className="aspect-video relative overflow-hidden rounded-t-xl bg-muted">
        <Image 
          src={thumbnail} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint="video thumbnail"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-current ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-mono">
          {duration}
        </div>
      </div>
      
      <div className="p-4 flex flex-col gap-1">
        <div className="flex items-start justify-between">
          <h3 className="font-headline font-semibold text-sm truncate">{title}</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {lastEdited}
          </span>
          <span className="flex items-center gap-1">
            <FileVideo className="w-3 h-3" />
            4K Video
          </span>
        </div>
      </div>
    </div>
  );
}
