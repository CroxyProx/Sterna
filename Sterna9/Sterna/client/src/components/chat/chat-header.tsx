import { Brain, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClearConversation: () => void;
}

export default function ChatHeader({ onClearConversation }: ChatHeaderProps) {
  return (
    <header className="gradient-bg text-primary-foreground p-4 sm:p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Brain className="text-primary text-lg" size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold" data-testid="app-title">Sterna</h1>
            <p className="text-primary-foreground/80 text-sm" data-testid="app-subtitle">By Lumen</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-primary-foreground hover:text-primary-foreground"
            onClick={onClearConversation}
            data-testid="button-clear-conversation"
          >
            <Trash2 size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-primary-foreground hover:text-primary-foreground"
            data-testid="button-settings"
          >
            <Settings size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
