// src/components/StatusBadge.tsx
import { theme } from '@/styles/theme';

interface StatusBadgeProps {
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusClasses = {
    'Pending': theme.status.pending,
    'In Progress': theme.status.inProgress,
    'Resolved': theme.status.resolved,
    'Rejected': theme.status.rejected
  };
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]} ${theme.transition}`}>
      {status}
    </span>
  );
}