import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, TrendingUp, TrendingDown, Heart, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MutualFund } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useState, useEffect } from 'react';

export default function FundDetailPage() {
  const { id } = useParams();
  const [fund, setFund] = useState<MutualFund | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watchlisted, setWatchlisted] = useState(false);

  useEffect(() => {
    fetch(`/api/funds/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Fund not found');
        return res.json();
      })
      .then(data => {
        setFund(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching fund details:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
      <p className="text-muted-foreground">Loading fund details...</p>
    </div>
  );

  if (!fund || error) return (
    <div className="container mx-auto px-4 py-16 text-center">
      <p className="text-lg text-muted-foreground">{error || 'Fund not found.'}</p>
      <Button asChild className="mt-4"><Link to="/funds">Back to Funds</Link></Button>
    </div>
  );

  const details = [
    { label: 'Fund House', value: fund.fundHouse },
    { label: 'Category', value: `${fund.category} - ${fund.subcategory}` },
    { label: 'NAV', value: `₹${fund.nav}` },
    { label: 'AUM', value: `₹${fund.aum.toLocaleString()} Cr` },
    { label: 'Expense Ratio', value: `${fund.expenseRatio}%` },
    { label: 'Fund Manager', value: fund.fundManager },
    { label: 'Benchmark', value: fund.benchmark },
    { label: 'Min Investment', value: `₹${fund.minInvestment.toLocaleString()}` },
    { label: 'Min SIP', value: `₹${fund.sipMin.toLocaleString()}` },
    { label: 'Launch Date', value: new Date(fund.launched).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/funds" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Funds
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{fund.fundHouse}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{fund.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < fund.rating ? 'fill-warning text-warning' : 'text-muted'}`} />
                  ))}
                </div>
                <Badge variant="secondary">{fund.riskLevel} Risk</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setWatchlisted(!watchlisted)}>
                <Heart className={`mr-1.5 h-4 w-4 ${watchlisted ? 'fill-destructive text-destructive' : ''}`} />
                {watchlisted ? 'Watchlisted' : 'Watchlist'}
              </Button>
              <Button asChild size="sm"><Link to={`/compare?funds=${fund.id}`}><Plus className="mr-1.5 h-4 w-4" /> Compare</Link></Button>
            </div>
          </div>

          {/* Returns */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '1 Year', value: fund.returns1Y },
              { label: '3 Years', value: fund.returns3Y },
              { label: '5 Years', value: fund.returns5Y },
            ].map(r => (
              <Card key={r.label}>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">{r.label}</p>
                  <p className={`text-xl font-bold flex items-center justify-center gap-1 ${r.value >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {r.value >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {r.value}%
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* NAV Chart */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">NAV History (5 Years)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fund.navHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(0, 7)} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '0.5rem', border: '1px solid hsl(214, 25%, 90%)' }} />
                  <Line type="monotone" dataKey="value" stroke="hsl(217, 91%, 50%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-4">
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground mb-4">Fund Details</h3>
              <div className="space-y-3">
                {details.map(d => (
                  <div key={d.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{d.label}</span>
                    <span className="font-medium text-foreground text-right">{d.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="gradient-primary border-0">
            <CardContent className="p-5 text-primary-foreground text-center">
              <h3 className="font-semibold mb-2">Start Investing</h3>
              <p className="text-sm opacity-80 mb-4">Begin your investment journey with as low as ₹{fund.sipMin}/month</p>
              <Button variant="secondary" size="sm" className="w-full">Invest Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
