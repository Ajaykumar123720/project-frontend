import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MutualFund } from '@/data/mockData';
import FundCard from '@/components/FundCard';

const categories = ['All', 'Equity', 'Debt', 'Hybrid', 'Index', 'ELSS', 'Liquid'];
const riskLevels = ['All', 'Low', 'Moderate', 'High', 'Very High'];

export default function FundsListPage() {
  const [funds, setFunds] = useState<MutualFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [risk, setRisk] = useState('All');
  const [sortBy, setSortBy] = useState<'returns1Y' | 'returns3Y' | 'returns5Y' | 'rating' | 'expenseRatio'>('returns1Y');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('/api/funds')
      .then(res => res.json())
      .then(data => {
        setFunds(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching funds:', err);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let filteredFunds = [...funds];
    if (search) filteredFunds = filteredFunds.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.fundHouse.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'All') filteredFunds = filteredFunds.filter(f => f.category === category);
    if (risk !== 'All') filteredFunds = filteredFunds.filter(f => f.riskLevel === risk);
    filteredFunds.sort((a, b) => sortBy === 'expenseRatio' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]);
    return filteredFunds;
  }, [funds, search, category, risk, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Explore Mutual Funds</h1>
        <p className="text-muted-foreground">Browse and filter through our curated collection of mutual funds.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search funds..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      {showFilters && (
        <div className="mb-6 rounded-xl border bg-card p-4 space-y-4">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <Badge key={c} variant={category === c ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => setCategory(c)}>
                  {c}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Risk Level</p>
            <div className="flex flex-wrap gap-2">
              {riskLevels.map(r => (
                <Badge key={r} variant={risk === r ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => setRisk(r)}>
                  {r}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Sort By</p>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'returns1Y', label: '1Y Returns' },
                { key: 'returns3Y', label: '3Y Returns' },
                { key: 'returns5Y', label: '5Y Returns' },
                { key: 'rating', label: 'Rating' },
                { key: 'expenseRatio', label: 'Expense Ratio' },
              ].map(s => (
                <Badge key={s.key} variant={sortBy === s.key ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => setSortBy(s.key as typeof sortBy)}>
                  {s.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} funds found</p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading funds from database...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(f => <FundCard key={f.id} fund={f} />)}
        </div>
      )}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No funds found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
