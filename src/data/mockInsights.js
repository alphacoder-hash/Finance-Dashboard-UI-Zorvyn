import { Lightbulb, Zap, TrendingDown, Target, CheckCircle } from 'lucide-react';

export const MOCK_MONTHLY_STATS = [
  { name: 'Jan', income: 85000, expense: 42000 },
  { name: 'Feb', income: 92000, expense: 58000 },
  { name: 'Mar', income: 78000, expense: 61000 },
  { name: 'Apr', income: 105000, expense: 49000 },
  { name: 'May', income: 98000, expense: 52000 },
  { name: 'Jun', income: 110000, expense: 45000 }
];

export const HAND_PICKED_INSIGHTS = [
  {
    id: 1,
    title: 'Subscription Audit',
    description: 'You have 12 active subscriptions. 3 of them haven\'t been used in 30 days, costing you ₹2,400 monthly.',
    type: 'warning',
    icon: 'Zap',
    color: 'var(--warning)'
  },
  {
    id: 2,
    title: 'Savings Milestone',
    description: 'Your savings rate this month is 59%, which is 15% higher than your yearly average. Excellent work!',
    type: 'success',
    icon: 'CheckCircle',
    color: 'var(--success)'
  },
  {
    id: 3,
    title: 'Spending Pattern',
    description: 'Grocery spending peaks on Saturdays. Switching your shopping to Wednesdays could save you up to 10% on discounts.',
    type: 'info',
    icon: 'Lightbulb',
    color: 'var(--accent-primary)'
  }
];

export const TOP_CATEGORIES = [
  { name: 'Housing', value: 35, color: '#FF5A1F' },
  { name: 'Food', value: 25, color: '#10B981' },
  { name: 'Transport', value: 15, color: '#F59E0B' },
  { name: 'Other', value: 25, color: '#3B82F6' }
];
