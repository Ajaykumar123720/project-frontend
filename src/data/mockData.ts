export interface MutualFund {
  id: string;
  name: string;
  category: 'Equity' | 'Debt' | 'Hybrid' | 'Index' | 'ELSS' | 'Liquid';
  subcategory: string;
  nav: number;
  aum: number; // in crores
  expenseRatio: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  rating: number; // 1-5
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  fundManager: string;
  fundHouse: string;
  minInvestment: number;
  sipMin: number;
  launched: string;
  benchmark: string;
  navHistory: { date: string; value: number }[];
}

export const mutualFunds: MutualFund[] = [
  {
    id: '1', name: 'BlueChip Growth Fund', category: 'Equity', subcategory: 'Large Cap',
    nav: 58.34, aum: 32500, expenseRatio: 0.89, riskLevel: 'High', rating: 5,
    returns1Y: 18.5, returns3Y: 15.2, returns5Y: 14.8, fundManager: 'Rajesh Kumar',
    fundHouse: 'Axis Mutual Fund', minInvestment: 5000, sipMin: 500, launched: '2013-01-15',
    benchmark: 'Nifty 50', navHistory: generateNavHistory(40, 58.34, 0.15),
  },
  {
    id: '2', name: 'Corporate Bond Fund', category: 'Debt', subcategory: 'Corporate Bond',
    nav: 15.67, aum: 18200, expenseRatio: 0.45, riskLevel: 'Low', rating: 4,
    returns1Y: 7.2, returns3Y: 7.8, returns5Y: 8.1, fundManager: 'Priya Sharma',
    fundHouse: 'HDFC Mutual Fund', minInvestment: 1000, sipMin: 100, launched: '2015-06-20',
    benchmark: 'CRISIL Corporate Bond', navHistory: generateNavHistory(12, 15.67, 0.07),
  },
  {
    id: '3', name: 'Balanced Advantage Fund', category: 'Hybrid', subcategory: 'Dynamic Asset Allocation',
    nav: 32.89, aum: 45000, expenseRatio: 0.72, riskLevel: 'Moderate', rating: 5,
    returns1Y: 12.4, returns3Y: 11.8, returns5Y: 12.5, fundManager: 'Amit Patel',
    fundHouse: 'ICICI Prudential', minInvestment: 5000, sipMin: 500, launched: '2014-03-10',
    benchmark: 'Nifty 50 Hybrid Composite', navHistory: generateNavHistory(25, 32.89, 0.12),
  },
  {
    id: '4', name: 'Nifty 50 Index Fund', category: 'Index', subcategory: 'Large Cap Index',
    nav: 195.42, aum: 12800, expenseRatio: 0.10, riskLevel: 'High', rating: 4,
    returns1Y: 16.8, returns3Y: 14.5, returns5Y: 13.9, fundManager: 'Sanjay Verma',
    fundHouse: 'UTI Mutual Fund', minInvestment: 1000, sipMin: 100, launched: '2019-08-05',
    benchmark: 'Nifty 50 TRI', navHistory: generateNavHistory(150, 195.42, 0.14),
  },
  {
    id: '5', name: 'Tax Saver Fund', category: 'ELSS', subcategory: 'ELSS',
    nav: 42.15, aum: 9500, expenseRatio: 0.65, riskLevel: 'High', rating: 4,
    returns1Y: 20.1, returns3Y: 16.7, returns5Y: 15.3, fundManager: 'Neha Gupta',
    fundHouse: 'Mirae Asset', minInvestment: 500, sipMin: 500, launched: '2016-12-01',
    benchmark: 'Nifty 200 TRI', navHistory: generateNavHistory(30, 42.15, 0.16),
  },
  {
    id: '6', name: 'Overnight Fund', category: 'Liquid', subcategory: 'Overnight',
    nav: 1125.80, aum: 8900, expenseRatio: 0.08, riskLevel: 'Low', rating: 3,
    returns1Y: 4.5, returns3Y: 4.2, returns5Y: 4.8, fundManager: 'Vikram Singh',
    fundHouse: 'SBI Mutual Fund', minInvestment: 500, sipMin: 500, launched: '2018-01-15',
    benchmark: 'CRISIL Liquid Fund', navHistory: generateNavHistory(1100, 1125.80, 0.04),
  },
  {
    id: '7', name: 'Mid Cap Opportunities', category: 'Equity', subcategory: 'Mid Cap',
    nav: 87.23, aum: 22300, expenseRatio: 0.95, riskLevel: 'Very High', rating: 5,
    returns1Y: 25.3, returns3Y: 19.8, returns5Y: 18.2, fundManager: 'Deepak Joshi',
    fundHouse: 'Kotak Mutual Fund', minInvestment: 5000, sipMin: 1000, launched: '2012-07-22',
    benchmark: 'Nifty Midcap 150', navHistory: generateNavHistory(55, 87.23, 0.19),
  },
  {
    id: '8', name: 'Small Cap Fund', category: 'Equity', subcategory: 'Small Cap',
    nav: 65.90, aum: 15600, expenseRatio: 1.05, riskLevel: 'Very High', rating: 4,
    returns1Y: 28.7, returns3Y: 22.1, returns5Y: 20.5, fundManager: 'Ravi Menon',
    fundHouse: 'Nippon India', minInvestment: 5000, sipMin: 500, launched: '2015-09-10',
    benchmark: 'Nifty Small Cap 250', navHistory: generateNavHistory(35, 65.90, 0.21),
  },
  {
    id: '9', name: 'Government Securities Fund', category: 'Debt', subcategory: 'Gilt',
    nav: 28.45, aum: 6200, expenseRatio: 0.52, riskLevel: 'Moderate', rating: 3,
    returns1Y: 6.8, returns3Y: 7.1, returns5Y: 7.5, fundManager: 'Anita Desai',
    fundHouse: 'DSP Mutual Fund', minInvestment: 1000, sipMin: 500, launched: '2017-04-18',
    benchmark: 'CRISIL Gilt Index', navHistory: generateNavHistory(22, 28.45, 0.07),
  },
  {
    id: '10', name: 'Flexi Cap Fund', category: 'Equity', subcategory: 'Flexi Cap',
    nav: 45.78, aum: 38000, expenseRatio: 0.78, riskLevel: 'High', rating: 5,
    returns1Y: 22.4, returns3Y: 17.9, returns5Y: 16.1, fundManager: 'Manish Agarwal',
    fundHouse: 'Parag Parikh', minInvestment: 1000, sipMin: 1000, launched: '2013-05-28',
    benchmark: 'Nifty 500 TRI', navHistory: generateNavHistory(28, 45.78, 0.17),
  },
];

function generateNavHistory(startNav: number, endNav: number, annualReturn: number) {
  const points: { date: string; value: number }[] = [];
  const months = 60;
  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i));
    const progress = i / months;
    const noise = (Math.random() - 0.5) * 2;
    const value = startNav + (endNav - startNav) * progress + noise;
    points.push({ date: date.toISOString().split('T')[0], value: Math.round(value * 100) / 100 });
  }
  return points;
}

export const riskQuizQuestions = [
  {
    id: 1,
    question: 'What is your primary investment objective?',
    options: [
      { text: 'Capital preservation', score: 1 },
      { text: 'Regular income', score: 2 },
      { text: 'Growth with some income', score: 3 },
      { text: 'Aggressive growth', score: 4 },
    ],
  },
  {
    id: 2,
    question: 'How long do you plan to keep your investment?',
    options: [
      { text: 'Less than 1 year', score: 1 },
      { text: '1-3 years', score: 2 },
      { text: '3-5 years', score: 3 },
      { text: 'More than 5 years', score: 4 },
    ],
  },
  {
    id: 3,
    question: 'If your investment dropped 20% in value, what would you do?',
    options: [
      { text: 'Sell everything immediately', score: 1 },
      { text: 'Sell some of it', score: 2 },
      { text: 'Hold and wait', score: 3 },
      { text: 'Buy more at the lower price', score: 4 },
    ],
  },
  {
    id: 4,
    question: 'What percentage of your monthly income can you invest?',
    options: [
      { text: 'Less than 10%', score: 1 },
      { text: '10-20%', score: 2 },
      { text: '20-30%', score: 3 },
      { text: 'More than 30%', score: 4 },
    ],
  },
  {
    id: 5,
    question: 'How would you describe your investment experience?',
    options: [
      { text: 'No experience', score: 1 },
      { text: 'Some experience with FDs/savings', score: 2 },
      { text: 'Experience with mutual funds/stocks', score: 3 },
      { text: 'Experienced investor with diverse portfolio', score: 4 },
    ],
  },
];

export const articles = [
  { id: '1', title: 'Understanding Mutual Fund Basics', category: 'Beginner', author: 'Priya Sharma', date: '2026-03-15', readTime: '5 min', excerpt: 'Learn the fundamentals of mutual fund investing, including types, benefits, and how they work.' },
  { id: '2', title: 'SIP vs Lump Sum: Which is Better?', category: 'Strategy', author: 'Rajesh Kumar', date: '2026-03-20', readTime: '7 min', excerpt: 'A detailed comparison of systematic investment plans versus lump sum investments.' },
  { id: '3', title: 'Tax Benefits of ELSS Funds', category: 'Tax Planning', author: 'Neha Gupta', date: '2026-03-25', readTime: '6 min', excerpt: 'How ELSS mutual funds can help you save taxes under Section 80C.' },
  { id: '4', title: 'Risk Management in Mutual Funds', category: 'Advanced', author: 'Amit Patel', date: '2026-04-01', readTime: '8 min', excerpt: 'Strategies to manage and mitigate risks in your mutual fund portfolio.' },
  { id: '5', title: 'Building a Retirement Portfolio', category: 'Planning', author: 'Deepak Joshi', date: '2026-04-05', readTime: '10 min', excerpt: 'Step-by-step guide to building a mutual fund portfolio for retirement.' },
];
