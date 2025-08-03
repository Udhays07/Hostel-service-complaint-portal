// components/Input.tsx
import { ChangeEvent } from 'react';
import { theme } from '@/styles/theme';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error
}: InputProps) {
  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium ${theme.text.secondary} mb-1`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 ${theme.transition} bg-gray-800 border ${error ? 'border-red-500' : theme.border.default} 
        rounded-md ${theme.text.primary} placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}