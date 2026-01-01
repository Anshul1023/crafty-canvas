import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, PiggyBank, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInsights } from "@/hooks/useInsights";

const iconMap = {
  spending: ShoppingBag,
  saving: PiggyBank,
  category: TrendingUp,
  warning: AlertTriangle,
};

const colorMap = {
  spending: "bg-info/10 text-info",
  saving: "bg-success/10 text-success",
  category: "bg-warning/10 text-warning",
  warning: "bg-destructive/10 text-destructive",
};

export function InsightsCard() {
  const insights = useInsights();

  if (insights.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Smart Insights</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Add more expenses to get personalized spending insights and tips.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Smart Insights</h3>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight) => {
          const Icon = iconMap[insight.type];
          return (
            <div
              key={insight.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", colorMap[insight.type])}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-foreground">{insight.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{insight.description}</p>
              </div>
              {insight.trend && insight.trend !== "neutral" && (
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                  insight.trend === "up" ? "bg-destructive/10" : "bg-success/10"
                )}>
                  {insight.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 text-destructive" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-success" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
