import { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { riskQuizQuestions, mutualFunds } from '@/data/mockData';
import FundCard from '@/components/FundCard';

type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive' | 'Very Aggressive';

function getProfile(score: number): { profile: RiskProfile; desc: string; categories: string[] } {
  if (score <= 8) return { profile: 'Conservative', desc: 'You prefer stability and capital preservation. Low-risk funds are best for you.', categories: ['Debt', 'Liquid'] };
  if (score <= 12) return { profile: 'Moderate', desc: 'You balance growth with safety. Hybrid and balanced funds suit your style.', categories: ['Hybrid', 'Debt', 'Index'] };
  if (score <= 16) return { profile: 'Aggressive', desc: 'You seek higher returns and can handle volatility. Equity funds align with your goals.', categories: ['Equity', 'ELSS', 'Index'] };
  return { profile: 'Very Aggressive', desc: 'You aim for maximum growth and are comfortable with high risk.', categories: ['Equity', 'ELSS'] };
}

export default function RiskQuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const handleAnswer = (score: number) => {
    const next = [...answers, score];
    setAnswers(next);
    if (next.length === riskQuizQuestions.length) {
      setDone(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = getProfile(totalScore);
  const recommended = mutualFunds.filter(f => result.categories.includes(f.category)).slice(0, 3);

  const reset = () => { setCurrent(0); setAnswers([]); setDone(false); };

  if (done) {
    const profileColors: Record<RiskProfile, string> = {
      Conservative: 'from-success to-info',
      Moderate: 'from-info to-primary',
      Aggressive: 'from-primary to-warning',
      'Very Aggressive': 'from-warning to-destructive',
    };

    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className={`rounded-2xl bg-gradient-to-r ${profileColors[result.profile]} p-8 text-center mb-8`}>
          <CheckCircle className="mx-auto h-12 w-12 text-primary-foreground mb-4" />
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">Your Risk Profile</h1>
          <p className="text-4xl font-extrabold text-primary-foreground mb-2">{result.profile}</p>
          <p className="text-primary-foreground/80">{result.desc}</p>
          <p className="text-sm text-primary-foreground/60 mt-2">Score: {totalScore}/{riskQuizQuestions.length * 4}</p>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-4">Recommended Funds</h2>
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {recommended.map(f => <FundCard key={f.id} fund={f} />)}
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="mr-2 h-4 w-4" /> Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  const q = riskQuizQuestions[current];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-foreground mb-2">Risk Profile Assessment</h1>
      <p className="text-muted-foreground mb-8">Answer {riskQuizQuestions.length} questions to discover your investment personality.</p>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {riskQuizQuestions.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < current ? 'bg-primary' : i === current ? 'bg-primary/50' : 'bg-muted'}`} />
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-xs text-muted-foreground mb-2">Question {current + 1} of {riskQuizQuestions.length}</p>
          <h2 className="text-lg font-semibold text-foreground mb-6">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.score)}
                className="w-full rounded-xl border p-4 text-left text-sm font-medium text-foreground hover:border-primary hover:bg-primary/5 transition-all"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
