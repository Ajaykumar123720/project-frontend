import { BookOpen, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { articles } from '@/data/mockData';

export default function EducationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Investment Education</h1>
        <p className="text-muted-foreground">Learn about mutual funds, investment strategies, and financial planning.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map(a => (
          <Card key={a.id} className="hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">{a.category}</span>
              <h3 className="font-semibold text-foreground text-lg mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{a.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {a.author}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.readTime}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
