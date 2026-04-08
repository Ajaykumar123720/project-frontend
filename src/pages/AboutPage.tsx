import { Target, Users, BarChart3, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const team = [
  { name: 'Dr. Rajesh Kumar', role: 'Lead Researcher', bio: 'Expert in behavioral finance and mutual fund analysis.' },
  { name: 'Priya Sharma', role: 'Financial Advisor', bio: '15+ years of experience in wealth management.' },
  { name: 'Amit Patel', role: 'Data Scientist', bio: 'Specializes in investment analytics and ML models.' },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-foreground mb-2">About MutualFundPro</h1>
      <p className="text-muted-foreground mb-8">FSAD-PS06: Mutual Fund Investment Perception and Selection Behavior</p>

      <div className="prose prose-sm max-w-none mb-12">
        <Card><CardContent className="p-6">
          <p className="text-muted-foreground leading-relaxed">
            MutualFundPro is a comprehensive platform designed to help investors understand, compare, and select mutual funds based on risk tolerance, returns, and financial goals. Our platform combines data-driven insights with expert guidance to enable informed investment decisions.
          </p>
        </CardContent></Card>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-12">
        {[
          { icon: Target, title: 'Mission', desc: 'Democratize mutual fund investing' },
          { icon: Users, title: 'Users', desc: '50K+ active investors' },
          { icon: BarChart3, title: 'Data', desc: 'Real-time fund analytics' },
          { icon: Shield, title: 'Trust', desc: 'Secure & transparent' },
        ].map(f => (
          <Card key={f.title} className="text-center">
            <CardContent className="p-5">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{f.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-6">Our Team</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {team.map(t => (
          <Card key={t.name}>
            <CardContent className="p-5 text-center">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="font-semibold text-foreground">{t.name}</h3>
              <p className="text-xs text-primary font-medium">{t.role}</p>
              <p className="text-sm text-muted-foreground mt-2">{t.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
