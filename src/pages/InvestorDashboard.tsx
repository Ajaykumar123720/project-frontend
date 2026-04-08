import { TrendingUp, Users, DollarSign, Eye, Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import StatCard from '@/components/StatCard';
import { mutualFunds } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const watchlist = mutualFunds.slice(0, 4);
const pieData = [
  { name: 'Equity', value: 45 },
  { name: 'Debt', value: 25 },
  { name: 'Hybrid', value: 20 },
  { name: 'Others', value: 10 },
];
const COLORS = ['hsl(217, 91%, 50%)', 'hsl(152, 60%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(199, 89%, 48%)'];

const portfolioTrend = Array.from({ length: 12 }).map((_, i) => ({
  month: new Date(2025, i).toLocaleString('default', { month: 'short' }),
  value: 100000 + Math.floor(Math.random() * 20000) + i * 3000,
}));

export default function InvestorDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Investor Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <StatCard title="Portfolio Value" value="₹2,45,000" change="+12.5% this year" icon={DollarSign} positive />
        <StatCard title="Total Investments" value="8" icon={TrendingUp} />
        <StatCard title="Watchlist" value="4" icon={Heart} />
        <StatCard title="Profile Score" value="85/100" icon={Star} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Portfolio Growth</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={portfolioTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
                <Line type="monotone" dataKey="value" stroke="hsl(217, 91%, 50%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Asset Allocation</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold text-foreground mb-4">Watchlist</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {watchlist.map(f => (
          <Card key={f.id} className="hover:shadow-elevated transition-shadow">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{f.fundHouse}</p>
              <p className="font-medium text-foreground text-sm mt-1 truncate">{f.name}</p>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-muted-foreground">NAV: ₹{f.nav}</span>
                <span className="text-success font-medium">{f.returns1Y}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
