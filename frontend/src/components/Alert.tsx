// components/Alert.tsx
import { ReactNode } from 'react';
import { theme } from '@/styles/theme';

interface AlertProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Alert({ 
  children, 
  variant = 'info', 
  dismissible = false,
  onDismiss
}: AlertProps) {
  const variantClasses = {
    success: 'bg-green-900 text-green-300 border-green-700',
    warning: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    error: 'bg-red-900 text-red-300 border-red-700',
    info: 'bg-blue-900 text-blue-300 border-blue-700'
  };

  return (
    <div className={`px-4 py-3 rounded border ${variantClasses[variant]} relative ${theme.transition}`}>
      {children}
      {dismissible && (
        <button 
          className={`absolute top-0 right-0 mt-3 mr-4 ${theme.transition} hover:opacity-70`}
          onClick={onDismiss}
        >
          <span className="text-xl">&times;</span>
        </button>
      )}
    </div>
  );
}