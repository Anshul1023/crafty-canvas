import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingAddButtonProps {
  onClick: () => void;
  className?: string;
}

export function FloatingAddButton({ onClick, className }: FloatingAddButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg",
        "gradient-primary border-0",
        "hover:scale-110 active:scale-95 transition-transform",
        "md:hidden", // Only show on mobile
        className
      )}
      size="icon"
    >
      <Plus className="w-6 h-6" />
    </Button>
  );
}
