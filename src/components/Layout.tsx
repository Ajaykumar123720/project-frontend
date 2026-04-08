import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, TrendingUp, BarChart3, GitCompare, ClipboardList,
  BookOpen, Users, Shield, ChartPie, LogIn, Menu, X, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Mutual Funds', path: '/funds', icon: TrendingUp },
  { label: 'Compare', path: '/compare', icon: GitCompare },
  { label: 'Risk Quiz', path: '/risk-quiz', icon: ClipboardList },
  { label: 'Education', path: '/education', icon: BookOpen },
];

const dashboardItems = [
  { label: 'Investor', path: '/dashboard/investor', icon: BarChart3 },
  { label: 'Admin', path: '/dashboard/admin', icon: Shield },
  { label: 'Advisor', path: '/dashboard/advisor', icon: Users },
  { label: 'Analyst', path: '/dashboard/analyst', icon: ChartPie },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MutualFund<span className="text-gradient">Pro</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setDashboardOpen(!dashboardOpen)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboards
                <ChevronDown className={`h-3 w-3 transition-transform ${dashboardOpen ? 'rotate-180' : ''}`} />
              </button>
              {dashboardOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border bg-card p-1 shadow-elevated">
                  {dashboardItems.map(item => (
                    <button
                      key={item.path}
                      onClick={() => { navigate(item.path); setDashboardOpen(false); }}
                      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive(item.path) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => navigate('/login')}>
              <LogIn className="mr-1.5 h-4 w-4" /> Login
            </Button>
            <button className="md:hidden rounded-lg p-2 hover:bg-muted" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="border-t bg-card p-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive(item.path) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              ))}
              <div className="mt-2 border-t pt-2">
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase">Dashboards</p>
                {dashboardItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive(item.path) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4" /> {item.label}
                  </Link>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => { navigate('/login'); setMobileOpen(false); }}>
                <LogIn className="mr-1.5 h-4 w-4" /> Login
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Click-away for dropdown */}
      {dashboardOpen && <div className="fixed inset-0 z-40" onClick={() => setDashboardOpen(false)} />}

      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                  <TrendingUp className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">MutualFundPro</span>
              </div>
              <p className="text-sm text-muted-foreground">Your trusted platform for mutual fund investment analysis and selection.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/funds" className="hover:text-primary">Mutual Funds</Link>
                <Link to="/compare" className="hover:text-primary">Compare Funds</Link>
                <Link to="/risk-quiz" className="hover:text-primary">Risk Quiz</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Resources</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/education" className="hover:text-primary">Education</Link>
                <Link to="/about" className="hover:text-primary">About Us</Link>
                <Link to="/contact" className="hover:text-primary">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Disclaimer</h4>
              <p className="text-xs text-muted-foreground">Mutual fund investments are subject to market risks. Past performance is not indicative of future results.</p>
            </div>
          </div>
          <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
            © 2026 MutualFundPro (FSAD-PS06). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
