import { Upload, Download, ChartPie, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import StatCard from '@/components/StatCard';
import { mutualFunds } from '@/data/mockData';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

const scatterData = mutualFunds.map(f => ({
  name: f.name,
  risk: f.riskLevel === 'Low' ? 1 : f.riskLevel === 'Moderate' ? 2 : f.riskLevel === 'High' ? 3 : 4,
  returns: f.returns3Y,
}));

const categoryDist = [
  { name: 'Equity', value: 4 },
  { name: 'Debt', value: 2 },
  { name: 'Hybrid', value: 1 },
  { name: 'Index', value: 1 },
  { name: 'ELSS', value: 1 },
  { name: 'Liquid', value: 1 },
];
const COLORS = ['hsl(217, 91%, 50%)', 'hsl(152, 60%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(199, 89%, 48%)', 'hsl(280, 60%, 50%)', 'hsl(340, 60%, 50%)'];

export default function AnalystDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Data Analyst Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <StatCard title="Total Funds" value="10" icon={TrendingUp} />
        <StatCard title="Data Points" value="12.5K" icon={ChartPie} />
        <StatCard title="Reports Generated" value="45" icon={Download} />
        <StatCard title="Last Upload" value="Today" icon={Upload} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Risk vs Return Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
                <XAxis type="number" dataKey="risk" name="Risk Level" tick={{ fontSize: 11 }} domain={[0, 5]} label={{ value: 'Risk Level', position: 'bottom', fontSize: 12 }} />
                <YAxis type="number" dataKey="returns" name="3Y Returns" tick={{ fontSize: 11 }} label={{ value: '3Y Returns (%)', angle: -90, position: 'insideLeft', fontSize: 12 }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value: number, name: string) => [name === 'returns' ? `${value}%` : value, name === 'returns' ? '3Y Returns' : 'Risk']} />
                <Scatter data={scatterData} fill="hsl(217, 91%, 50%)" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Fund Category Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryDist} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {categoryDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top performers table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Top Performing Funds</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-muted-foreground font-medium">Fund</th>
                  <th className="text-right p-3 text-muted-foreground font-medium">1Y</th>
                  <th className="text-right p-3 text-muted-foreground font-medium">3Y</th>
                  <th className="text-right p-3 text-muted-foreground font-medium">5Y</th>
                  <th className="text-right p-3 text-muted-foreground font-medium">Risk</th>
                </tr>
              </thead>
              <tbody>
                {[...mutualFunds].sort((a, b) => b.returns3Y - a.returns3Y).slice(0, 5).map(f => (
                  <tr key={f.id} className="border-b last:border-0">
                    <td className="p-3">
                      <p className="font-medium text-foreground">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{f.fundHouse}</p>
                    </td>
                    <td className="p-3 text-right text-success font-medium">{f.returns1Y}%</td>
                    <td className="p-3 text-right text-success font-medium">{f.returns3Y}%</td>
                    <td className="p-3 text-right text-success font-medium">{f.returns5Y}%</td>
                    <td className="p-3 text-right text-muted-foreground">{f.riskLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
