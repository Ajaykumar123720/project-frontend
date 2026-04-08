import { Users, MessageSquare, FileText, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import StatCard from '@/components/StatCard';
import { articles } from '@/data/mockData';

const queries = [
  { from: 'Rahul S.', question: 'Should I invest in mid-cap funds now?', time: '2 hours ago' },
  { from: 'Priya M.', question: 'Best ELSS fund for tax saving?', time: '5 hours ago' },
  { from: 'Amit K.', question: 'How to diversify my portfolio?', time: '1 day ago' },
];

export default function AdvisorDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Financial Advisor Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <StatCard title="Active Clients" value="32" change="+5 this month" icon={Users} positive />
        <StatCard title="Pending Queries" value="3" icon={MessageSquare} />
        <StatCard title="Articles Published" value="8" icon={FileText} />
        <StatCard title="Guides Created" value="12" icon={BookOpen} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Recent Investor Queries</h3>
            <div className="space-y-3">
              {queries.map((q, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground text-sm">{q.from}</span>
                    <span className="text-xs text-muted-foreground">{q.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{q.question}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Your Published Articles</h3>
            <div className="space-y-3">
              {articles.slice(0, 4).map(a => (
                <div key={a.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div>
                    <p className="font-medium text-foreground text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.date} • {a.readTime}</p>
                  </div>
                  <span className="text-xs font-medium text-success">Published</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
