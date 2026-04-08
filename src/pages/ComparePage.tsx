import { useState, useMemo } from 'react';
import { Plus, X, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mutualFunds } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { useSearchParams } from 'react-router-dom';

export default function ComparePage() {
  const [searchParams] = useSearchParams();
  const initial = searchParams.get('funds')?.split(',').filter(Boolean) || [];
  const [selectedIds, setSelectedIds] = useState<string[]>(initial);
  const [showPicker, setShowPicker] = useState(false);

  const selected = useMemo(() => mutualFunds.filter(f => selectedIds.includes(f.id)), [selectedIds]);

  const chartData = selected.map(f => ({
    name: f.name.length > 20 ? f.name.slice(0, 20) + '…' : f.name,
    '1Y': f.returns1Y, '3Y': f.returns3Y, '5Y': f.returns5Y,
  }));

  const compareFields: { label: string; key: string; fmt?: (v: number) => string; highlight?: boolean }[] = [
    { label: 'Fund House', key: 'fundHouse' },
    { label: 'Category', key: 'category' },
    { label: 'NAV', key: 'nav', fmt: (v: number) => `₹${v}` },
    { label: 'AUM (Cr)', key: 'aum', fmt: (v: number) => `₹${v.toLocaleString()}` },
    { label: 'Expense Ratio', key: 'expenseRatio', fmt: (v: number) => `${v}%` },
    { label: '1Y Return', key: 'returns1Y', fmt: (v: number) => `${v}%`, highlight: true },
    { label: '3Y Return', key: 'returns3Y', fmt: (v: number) => `${v}%`, highlight: true },
    { label: '5Y Return', key: 'returns5Y', fmt: (v: number) => `${v}%`, highlight: true },
    { label: 'Risk Level', key: 'riskLevel' },
    { label: 'Min Investment', key: 'minInvestment', fmt: (v: number) => `₹${v.toLocaleString()}` },
    { label: 'Fund Manager', key: 'fundManager' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Compare Mutual Funds</h1>
      <p className="text-muted-foreground mb-8">Select up to 4 funds to compare side by side.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {selected.map(f => (
          <Badge key={f.id} variant="secondary" className="gap-1 py-1.5 px-3">
            {f.name}
            <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedIds(ids => ids.filter(i => i !== f.id))} />
          </Badge>
        ))}
        {selectedIds.length < 4 && (
          <Button variant="outline" size="sm" onClick={() => setShowPicker(!showPicker)}>
            <Plus className="mr-1 h-4 w-4" /> Add Fund
          </Button>
        )}
      </div>

      {showPicker && (
        <Card className="mb-6">
          <CardContent className="p-4 max-h-60 overflow-auto">
            {mutualFunds.filter(f => !selectedIds.includes(f.id)).map(f => (
              <button
                key={f.id}
                onClick={() => { setSelectedIds(ids => [...ids, f.id]); setShowPicker(false); }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-muted text-sm transition-colors"
              >
                <span className="text-foreground">{f.name}</span>
                <span className="text-muted-foreground">{f.category}</span>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {selected.length >= 2 && (
        <>
          {/* Chart */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Returns Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="1Y" fill="hsl(217, 91%, 50%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="3Y" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="5Y" fill="hsl(152, 60%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">Parameter</th>
                    {selected.map(f => (
                      <th key={f.id} className="text-center p-4 font-medium text-foreground min-w-[180px]">
                        <div>{f.name}</div>
                        <div className="flex items-center justify-center gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < f.rating ? 'fill-warning text-warning' : 'text-muted'}`} />
                          ))}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareFields.map((field, idx) => (
                    <tr key={field.label} className={idx % 2 === 0 ? '' : 'bg-muted/30'}>
                      <td className="p-4 font-medium text-muted-foreground">{field.label}</td>
                      {selected.map(f => {
                        const val = f[field.key as keyof typeof f];
                        const formatted = 'fmt' in field && field.fmt ? field.fmt(val as number) : String(val);
                        const isReturn = field.highlight && typeof val === 'number';
                        return (
                          <td key={f.id} className={`p-4 text-center font-medium ${isReturn ? (val as number >= 0 ? 'text-success' : 'text-destructive') : 'text-foreground'}`}>
                            {formatted}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}

      {selected.length < 2 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">Select at least 2 funds to compare.</p>
        </div>
      )}
    </div>
  );
}
