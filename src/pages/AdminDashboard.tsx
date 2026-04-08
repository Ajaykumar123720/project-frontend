import { Shield, Users, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import StatCard from '@/components/StatCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const userActivity = Array.from({ length: 7 }).map((_, i) => ({
  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
  logins: Math.floor(Math.random() * 200) + 50,
  searches: Math.floor(Math.random() * 300) + 100,
}));

const recentUsers = [
  { name: 'Rahul Sharma', role: 'Investor', status: 'Active', joined: '2026-04-01' },
  { name: 'Priya Singh', role: 'Advisor', status: 'Active', joined: '2026-03-28' },
  { name: 'Amit Patel', role: 'Analyst', status: 'Pending', joined: '2026-04-05' },
  { name: 'Neha Gupta', role: 'Investor', status: 'Active', joined: '2026-04-07' },
];

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <StatCard title="Total Users" value="1,245" change="+8% this month" icon={Users} positive />
        <StatCard title="Active Funds" value="10" icon={TrendingUp} />
        <StatCard title="Articles Published" value="24" icon={FileText} />
        <StatCard title="Pending Approvals" value="3" icon={AlertCircle} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">User Activity (7 Days)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="logins" fill="hsl(217, 91%, 50%)" radius={[4, 4, 0, 0]} name="Logins" />
                <Bar dataKey="searches" fill="hsl(152, 60%, 45%)" radius={[4, 4, 0, 0]} name="Searches" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Recent Users</h3>
            <div className="space-y-3">
              {recentUsers.map((u, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div>
                    <p className="font-medium text-foreground text-sm">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.role} • {u.joined}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${u.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    {u.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
