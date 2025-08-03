// src/components/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };
  
  return (
    <div className="flex justify-center">
      <div className={`${sizeClasses[size]} border-4 border-gray-700 border-t-indigo-500 rounded-full animate-spin`}></div>
    </div>
  );
}