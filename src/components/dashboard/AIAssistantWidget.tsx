"use client";

import { useState } from "react";
import { Sparkles, Send, Wand2, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { aiPromptEditingAssistant } from "@/ai/flows/ai-prompt-editing-assistant";
import { useToast } from "@/hooks/use-toast";

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleApply = async () => {
    if (!prompt) return;
    setIsLoading(true);
    try {
      const result = await aiPromptEditingAssistant({ editingStylePrompt: prompt });
      toast({
        title: "Style Interpreted",
        description: result.appliedStyleDescription,
      });
      setIsOpen(false);
      setPrompt("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not apply AI style. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-80 glass rounded-3xl shadow-2xl overflow-hidden p-6 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-headline font-bold text-lg">AI Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mb-4">
            How should I edit your project? Try "Make it look cinematic" or "Add a retro vlog feel".
          </p>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input 
                placeholder="Ask NeMo..." 
                className="rounded-xl border-white/20 bg-white/5 shadow-inner"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApply()}
              />
              <Button 
                onClick={handleApply}
                disabled={isLoading || !prompt}
                className="rounded-xl liquid-gradient w-10 p-0"
              >
                {isLoading ? <Zap className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              <button 
                onClick={() => setPrompt("Make it cinematic")}
                className="text-[10px] px-2 py-1 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                Cinematic
              </button>
              <button 
                onClick={() => setPrompt("Fast-paced vlog style")}
                className="text-[10px] px-2 py-1 rounded-full border border-secondary/20 bg-secondary/5 hover:bg-secondary/10 transition-colors"
              >
                Vlog Style
              </button>
              <button 
                onClick={() => setPrompt("Muted color grade")}
                className="text-[10px] px-2 py-1 rounded-full border border-muted-foreground/20 bg-muted-foreground/5 hover:bg-muted-foreground/10 transition-colors"
              >
                Muted Colors
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full liquid-gradient shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
      >
        <Wand2 className="w-8 h-8 group-hover:animate-float" />
      </Button>
    </div>
  );
}
