import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message sent!', description: 'We will get back to you shortly.' });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-foreground mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-8">Have questions? We'd love to hear from you.</p>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Input placeholder="Your Name" required /></div>
              <div><Input type="email" placeholder="Your Email" required /></div>
              <div><Input placeholder="Subject" required /></div>
              <div><Textarea placeholder="Your Message" rows={4} required /></div>
              <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-6">
          {[
            { icon: Mail, label: 'Email', value: 'support@mutualfundpro.com' },
            { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
            { icon: MapPin, label: 'Address', value: 'Mumbai, Maharashtra, India' },
          ].map(c => (
            <div key={c.label} className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{c.label}</p>
                <p className="text-sm text-muted-foreground">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
