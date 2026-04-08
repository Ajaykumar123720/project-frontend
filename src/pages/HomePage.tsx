import { Link } from 'react-router-dom';
import { Search, TrendingUp, Shield, BarChart3, BookOpen, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { mutualFunds, articles } from '@/data/mockData';
import FundCard from '@/components/FundCard';
import { useState } from 'react';

const features = [
  { icon: TrendingUp, title: 'Smart Fund Selection', desc: 'Compare and select mutual funds based on performance, risk, and goals.' },
  { icon: Shield, title: 'Risk Profiling', desc: 'Take our quiz to understand your risk appetite and get personalized recommendations.' },
  { icon: BarChart3, title: 'Performance Analytics', desc: 'Track NAV trends, returns, and portfolio analytics with interactive charts.' },
  { icon: BookOpen, title: 'Expert Insights', desc: 'Learn from financial advisors with curated articles and investment guides.' },
];

export default function HomePage() {
  const [search, setSearch] = useState('');
  const topFunds = mutualFunds.filter(f => f.rating === 5).slice(0, 3);
  const filteredFunds = search
    ? mutualFunds.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.category.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-4 leading-tight">
            Invest Smarter with<br />
            <span className="bg-gradient-to-r from-info to-accent bg-clip-text text-transparent">Data-Driven Insights</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-8">
            Analyze mutual fund performance, understand investment behavior, and make informed decisions with MutualFundPro.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search mutual funds by name, category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-12 pl-12 pr-4 rounded-xl bg-card text-foreground shadow-elevated border-0"
            />
            {filteredFunds.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border bg-card shadow-elevated max-h-64 overflow-auto z-10">
                {filteredFunds.slice(0, 5).map(f => (
                  <Link key={f.id} to={`/funds/${f.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors">
                    <div>
                      <p className="text-sm font-medium text-foreground">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{f.category} • {f.fundHouse}</p>
                    </div>
                    <span className="text-sm font-semibold text-success">{f.returns1Y}%</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button asChild size="lg" className="gradient-primary border-0 text-primary-foreground rounded-xl">
              <Link to="/funds">Explore Funds <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/risk-quiz">Take Risk Quiz</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground text-center mb-10">Why MutualFundPro?</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(f => (
            <Card key={f.title} className="text-center hover:shadow-elevated transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Rated Funds */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Top Rated Funds</h2>
            <Button asChild variant="ghost" className="text-primary">
              <Link to="/funds">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {topFunds.map(f => <FundCard key={f.id} fund={f} />)}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-4 text-center">
          {[
            { label: 'Mutual Funds', value: '10+' },
            { label: 'Total AUM', value: '₹2.1L Cr' },
            { label: 'Fund Houses', value: '10' },
            { label: 'Active Investors', value: '50K+' },
          ].map(s => (
            <div key={s.label} className="rounded-xl bg-primary/5 p-6">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Latest Insights</h2>
            <Button asChild variant="ghost" className="text-primary">
              <Link to="/education">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map(a => (
              <Card key={a.id} className="hover:shadow-elevated transition-shadow cursor-pointer">
                <CardContent className="p-5">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">{a.category}</span>
                  <h3 className="font-semibold text-foreground mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{a.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{a.author}</span>
                    <span>{a.readTime} read</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
