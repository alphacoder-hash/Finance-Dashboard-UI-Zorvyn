import { 
  ShoppingBag, 
  Utensils, 
  Home, 
  Car, 
  Activity, 
  MonitorPlay, 
  Briefcase, 
  TrendingUp, 
  Zap
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'food', name: 'Food & Dining', icon: Utensils, color: '#F59E0B' }, // Amber
  { id: 'housing', name: 'Housing', icon: Home, color: '#3B82F6' }, // Blue
  { id: 'transport', name: 'Transportation', icon: Car, color: '#8B5CF6' }, // Purple
  { id: 'entertainment', name: 'Entertainment', icon: MonitorPlay, color: '#EC4899' }, // Pink
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: '#06B6D4' }, // Cyan
  { id: 'health', name: 'Healthcare', icon: Activity, color: '#EF4444' }, // Red
  { id: 'utilities', name: 'Utilities', icon: Zap, color: '#EAB308' }, // Yellow
  { id: 'salary', name: 'Salary', icon: Briefcase, color: '#10B981', type: 'income' }, // Green
  { id: 'investment', name: 'Investment', icon: TrendingUp, color: '#14B8A6', type: 'income' } // Teal
];

export const getCategoryConfig = (id) => {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
};
