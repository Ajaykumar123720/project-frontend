import { useState } from 'react';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('investor');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // DEBUG: Direct alert to see if click reaches here
    console.log("Submit triggered!");
    setLoading(true);

    const endpoint = isLogin ? '/api/login' : '/api/register';
    const body = isLogin ? { email, password } : { fullName, email, password, role };

    try {
      // Use absolute URL with explicit IP and New Port
      const response = await fetch(`http://127.0.0.1:5001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast({ 
        title: isLogin ? 'Logged in successfully!' : 'Account created!', 
        description: isLogin ? `Welcome back, ${data.user.fullName}!` : 'Redirecting to login...' 
      });

      if (isLogin) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => navigate(`/dashboard/${data.user.role}`), 1000);
      } else {
        setIsLogin(true);
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      toast({ 
        title: 'Error', 
        description: err.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
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
                <Input 
                  placeholder="John Doe" 
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required 
                />
              </div>
            )}
            <div>
              <Label>Email</Label>
              <Input 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required 
              />
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required 
                />
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
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-10 px-4 py-2 rounded-md gradient-primary text-primary-foreground font-medium transition-opacity disabled:opacity-50 hover:opacity-90"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
