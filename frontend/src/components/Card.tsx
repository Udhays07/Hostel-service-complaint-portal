// components/Card.tsx
import { ReactNode } from 'react';
import { theme } from '@/styles/theme';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, title, className = '', onClick }: CardProps) {
  return (
    <div 
      className={`${theme.background.secondary} p-6 rounded-lg shadow-lg border ${theme.border.default} 
      ${onClick ? 'cursor-pointer transform hover:scale-[1.01] hover:shadow-xl' : ''} ${theme.transition} ${className}`}
      onClick={onClick}
    >
      {title && <h3 className={`text-lg font-semibold mb-4 ${theme.text.primary}`}>{title}</h3>}
      {children}
    </div>
  );
}