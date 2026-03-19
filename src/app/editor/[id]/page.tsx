"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Timeline } from "@/components/editor/Timeline";
import { AIAssistantWidget } from "@/components/dashboard/AIAssistantWidget";
import { Button } from "@/components/ui/button";
import { 
  Undo, Redo, Download, Share2, 
  Layers, Music, Type, Sticker, 
  Filter, Play, Settings2, Trash2, 
  ChevronLeft, Layout
} from "lucide-react";
import Link from "next/link";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState('layers');

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col pt-16">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 gap-4">
        {/* Left Sidebar Tools */}
        <aside className="w-full md:w-20 glass rounded-2xl flex md:flex-col items-center justify-between p-4 md:py-8 shrink-0">
          <div className="flex md:flex-col gap-6 items-center">
            <button 
              onClick={() => setActiveTab('layers')}
              className={`p-3 rounded-xl transition-all ${activeTab === 'layers' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-primary/10'}`}
            >
              <Layers className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setActiveTab('audio')}
              className={`p-3 rounded-xl transition-all ${activeTab === 'audio' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-primary/10'}`}
            >
              <Music className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setActiveTab('text')}
              className={`p-3 rounded-xl transition-all ${activeTab === 'text' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-primary/10'}`}
            >
              <Type className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setActiveTab('stickers')}
              className={`p-3 rounded-xl transition-all ${activeTab === 'stickers' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-primary/10'}`}
            >
              <Sticker className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setActiveTab('filters')}
              className={`p-3 rounded-xl transition-all ${activeTab === 'filters' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-primary/10'}`}
            >
              <Filter className="w-6 h-6" />
            </button>
          </div>
          
          <button className="p-3 rounded-xl text-muted-foreground hover:bg-primary/10 transition-all hidden md:block">
            <Settings2 className="w-6 h-6" />
          </button>
        </aside>

        {/* Main Editor Center */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Editor Header */}
          <header className="h-14 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="font-headline font-bold text-lg hidden sm:block">Untitled Project</h1>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Undo className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Redo className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-full hidden sm:flex">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className="rounded-full liquid-gradient shadow-lg">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </header>

          {/* Preview Window */}
          <div className="flex-1 glass rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <img 
                src="https://picsum.photos/seed/preview1/1280/720" 
                alt="Video Preview" 
                className="max-h-full max-w-full object-contain"
              />
              {/* Overlays */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto cursor-pointer">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                 </div>
              </div>
            </div>
            
            {/* View Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1 glass rounded-full">
              <Button variant="ghost" size="sm" className="h-8 rounded-full px-4 text-[10px] font-bold tracking-widest uppercase">4K</Button>
              <div className="h-4 w-px bg-white/20" />
              <Button variant="ghost" size="sm" className="h-8 rounded-full px-4 text-[10px] font-bold tracking-widest uppercase">60 FPS</Button>
              <div className="h-4 w-px bg-white/20" />
              <Button variant="ghost" size="sm" className="h-8 rounded-full px-4">
                <Layout className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Timeline Wrapper */}
          <div className="h-72">
            <Timeline />
          </div>
        </div>

        {/* Right Assets/Properties Panel */}
        <aside className="w-full md:w-80 glass rounded-2xl p-6 hidden lg:flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold">Assets</h3>
            <Button variant="ghost" size="sm" className="text-[10px] font-bold tracking-widest uppercase text-primary">Add New</Button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 items-center group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
                <div className="w-16 h-16 rounded-lg bg-muted relative overflow-hidden shrink-0">
                  <img src={`https://picsum.photos/seed/asset${i}/100/100`} alt="Asset" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <span className="text-xs font-bold truncate">Clip_{i}.mp4</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">12.4 MB • 0:15</span>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 h-8 w-8 text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="pt-6 border-t mt-auto">
            <div className="glass rounded-xl p-4 bg-primary/5 border-primary/20">
               <div className="flex items-center gap-2 mb-2">
                 <Sparkles className="w-4 h-4 text-primary" />
                 <span className="text-xs font-bold uppercase tracking-widest">AI Suggestion</span>
               </div>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 The audio in Clip_3 has high background noise. NeMo can remove it with one click.
               </p>
               <Button size="sm" variant="outline" className="w-full mt-3 rounded-full text-xs font-bold bg-white/10">Apply Noise Reduction</Button>
            </div>
          </div>
        </aside>
      </div>

      <AIAssistantWidget />
    </div>
  );
}
