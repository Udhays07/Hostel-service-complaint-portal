// src/components/ComplaintCard.tsx
import { Card } from './Card';
import { StatusBadge } from './StatusBadge';
import { theme } from '@/styles/theme';

interface ComplaintProps {
  id: number;
  title: string;
  category: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
  createdAt: string;
  onClick?: () => void;
}

export function ComplaintCard({ 
  title, 
  category, 
  description, 
  status, 
  createdAt,
  onClick 
}: ComplaintProps) {
  return (
    <Card 
      className={`${onClick ? 'transform hover:translate-x-1 hover:border-indigo-500' : ''}`} 
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-semibold ${theme.text.primary}`}>{title}</h3>
          <p className={`text-sm ${theme.text.muted}`}>{category}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <p className={`mt-2 ${theme.text.secondary}`}>
        {description.substring(0, 100)}{description.length > 100 ? '...' : ''}
      </p>
      <div className={`mt-3 text-xs ${theme.text.muted}`}>
        Submitted on {new Date(createdAt).toLocaleDateString()}
      </div>
    </Card>
  );
}