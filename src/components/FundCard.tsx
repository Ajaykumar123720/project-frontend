import { Link } from 'react-router-dom';
import { Star, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MutualFund } from '@/data/mockData';

const riskColor: Record<string, string> = {
  Low: 'bg-success/10 text-success',
  Moderate: 'bg-warning/10 text-warning',
  High: 'bg-destructive/10 text-destructive',
  'Very High': 'bg-destructive/15 text-destructive',
};

export default function FundCard({ fund }: { fund: MutualFund }) {
  return (
    <Link to={`/funds/${fund.id}`}>
      <Card className="group h-full transition-all hover:shadow-elevated hover:-translate-y-0.5 cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground mb-1">{fund.fundHouse}</p>
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{fund.name}</h3>
            </div>
            <Badge variant="secondary" className={riskColor[fund.riskLevel]}>{fund.riskLevel}</Badge>
          </div>
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < fund.rating ? 'fill-warning text-warning' : 'text-muted'}`} />
            ))}
            <span className="text-xs text-muted-foreground ml-1">{fund.category} • {fund.subcategory}</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: '1Y Return', value: fund.returns1Y },
              { label: '3Y Return', value: fund.returns3Y },
              { label: '5Y Return', value: fund.returns5Y },
            ].map(r => (
              <div key={r.label} className="text-center rounded-lg bg-muted/50 p-2">
                <p className="text-xs text-muted-foreground">{r.label}</p>
                <p className={`text-sm font-semibold flex items-center justify-center gap-0.5 ${r.value >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {r.value >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {r.value}%
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>NAV: ₹{fund.nav}</span>
            <span>AUM: ₹{(fund.aum / 100).toFixed(0)}B</span>
            <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-1.5 transition-all">
              Details <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
