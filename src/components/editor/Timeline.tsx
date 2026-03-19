"use client";

import React, { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Scissors, Trash2, Plus, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface TrackItem {
  id: string;
  name: string;
  type: 'video' | 'audio';
  start: number; // in percentage for demo
  duration: number; // in percentage for demo
  color: string;
}

export function Timeline() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPos, setPlayheadPos] = useState(25);
  const [tracks, setTracks] = useState<TrackItem[]>([
    { id: '1', name: 'Intro Clip', type: 'video', start: 0, duration: 30, color: 'bg-primary/40 border-primary' },
    { id: '2', name: 'Main Action', type: 'video', start: 30, duration: 45, color: 'bg-primary/40 border-primary' },
    { id: '3', name: 'Background Music', type: 'audio', start: 5, duration: 80, color: 'bg-secondary/40 border-secondary' },
  ]);

  return (
    <div className="w-full h-full flex flex-col glass rounded-t-3xl border-t shadow-2xl overflow-hidden">
      {/* Timeline Toolbar */}
      <div className="h-12 border-b flex items-center justify-between px-6 bg-white/10">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Scissors className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
          <div className="h-4 w-px bg-border mx-2" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPlayheadPos(0)}>
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button 
            onClick={() => setIsPlaying(!isPlaying)}
            size="icon" 
            className="h-10 w-10 rounded-full liquid-gradient shadow-md"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPlayheadPos(100)}>
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 w-32">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
        </div>
      </div>

      {/* Tracks Area */}
      <div className="flex-1 overflow-y-auto relative p-6 space-y-4 select-none">
        {/* Playhead */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-primary z-10 pointer-events-none"
          style={{ left: `calc(${playheadPos}% + 1.5rem)` }}
        >
          <div className="w-3 h-3 bg-primary rounded-full -ml-[5px] -mt-1 shadow-sm shadow-primary/50" />
        </div>

        {/* Video Track */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-2">Video Track</span>
          <div className="timeline-track group">
            {tracks.filter(t => t.type === 'video').map(item => (
              <div 
                key={item.id}
                className={cn("timeline-item", item.color)}
                style={{ left: `${item.start}%`, width: `${item.duration}%` }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Audio Track */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground ml-2">Audio Track</span>
          <div className="timeline-track group">
             {tracks.filter(t => t.type === 'audio').map(item => (
              <div 
                key={item.id}
                className={cn("timeline-item", item.color)}
                style={{ left: `${item.start}%`, width: `${item.duration}%` }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Time Scale */}
        <div className="pt-4 flex justify-between px-2 text-[10px] font-mono text-muted-foreground border-t mt-4">
          <span>00:00</span>
          <span>00:15</span>
          <span>00:30</span>
          <span>00:45</span>
          <span>01:00</span>
          <span>01:15</span>
          <span>01:30</span>
        </div>
      </div>
    </div>
  );
}
