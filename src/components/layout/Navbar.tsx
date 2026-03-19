"use client";

import Link from "next/link";
import { Sparkles, LayoutDashboard, Settings, User, Video, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass border-b flex items-center px-6 justify-between">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg liquid-gradient flex items-center justify-center text-white font-headline">N</div>
          <span className="font-headline font-bold text-xl tracking-tight">NeMo</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <Link href="/templates" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Sparkles className="w-4 h-4" />
          Templates
        </Link>
        <Link href="/assets" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Video className="w-4 h-4" />
          Assets
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="hidden sm:flex rounded-full">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button size="sm" className="rounded-full liquid-gradient border-none shadow-lg hover:shadow-primary/20 transition-all">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
        <div className="w-8 h-8 rounded-full bg-muted border flex items-center justify-center cursor-pointer overflow-hidden">
          <User className="w-4 h-4" />
        </div>
      </div>
    </nav>
  );
}
