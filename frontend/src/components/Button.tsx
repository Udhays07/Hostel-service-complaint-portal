// src/components/Button.tsx
import { theme } from '@/styles/theme';

interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({ 
  text, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled = false,
  fullWidth = false
}: ButtonProps) {
  const baseClasses = `px-4 py-2 rounded-md shadow-md ${theme.transition}`;
  
  const variantClasses = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-gray-100 transform hover:-translate-y-0.5",
    secondary: "bg-gray-700 hover:bg-gray-600 text-gray-200 transform hover:-translate-y-0.5",
    danger: "bg-red-600 hover:bg-red-700 text-gray-100 transform hover:-translate-y-0.5",
    success: "bg-green-600 hover:bg-green-700 text-gray-100 transform hover:-translate-y-0.5"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${fullWidth ? 'w-full' : ''}`}
    >
      {text}
    </button>
  );
}