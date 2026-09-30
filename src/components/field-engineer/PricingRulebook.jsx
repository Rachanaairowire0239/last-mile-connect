import { panel } from "@/components/common/ui";

export function PricingRulebook() {
  return <details className={panel} open><summary className="cursor-pointer text-sm font-semibold">Pricing rulebook</summary><div className="mt-4 space-y-3 text-xs leading-5 text-muted-foreground"><p><strong className="text-foreground">L1:</strong> ₹1,000/hr, 4-hour minimum.</p><p><strong className="text-foreground">L2:</strong> ₹1,400/hr, 4-hour minimum.</p><p><strong className="text-foreground">After-hours:</strong> L1 ₹2,000/hr; L2 ₹2,500/hr.</p><p><strong className="text-foreground">Priority:</strong> Medium +15%, High +50%, Urgent +100%.</p><p><strong className="text-foreground">Cancellation:</strong> ₹1,000 minimum after one hour.</p></div></details>;
}