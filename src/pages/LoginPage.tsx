import { useState } from 'react';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('investor');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: isLogin ? 'Logged in successfully!' : 'Account created!', description: `Redirecting to ${role} dashboard...` });
    setTimeout(() => navigate(`/dashboard/${role}`), 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
              {isLogin ? <LogIn className="h-6 w-6 text-primary-foreground" /> : <UserPlus className="h-6 w-6 text-primary-foreground" />}
            </div>
            <h1 className="text-2xl font-bold text-foreground">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-sm text-muted-foreground mt-1">{isLogin ? 'Sign in to your account' : 'Start your investment journey'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label>Full Name</Label>
                <Input placeholder="John Doe" required />
              </div>
            )}
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label>Role</Label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value="investor">Investor</option>
                <option value="advisor">Financial Advisor</option>
                <option value="analyst">Data Analyst</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
