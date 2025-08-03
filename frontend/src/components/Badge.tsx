// src/components/Badge.tsx
import { theme } from '@/styles/theme';

interface BadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export function Badge({ text, variant = 'default' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-700 text-gray-300',
    success: 'bg-green-900 text-green-300',
    warning: 'bg-yellow-900 text-yellow-300',
    danger: 'bg-red-900 text-red-300',
    info: 'bg-blue-900 text-blue-300'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${variantClasses[variant]} ${theme.transition}`}>
      {text}
    </span>
  );
}