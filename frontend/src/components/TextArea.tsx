// components/TextArea.tsx
import { ChangeEvent } from 'react';
import { theme } from '@/styles/theme';

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  error?: string;
}

export function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  rows = 4,
  error
}: TextAreaProps) {
  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium ${theme.text.secondary} mb-1`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-3 py-2 ${theme.transition} bg-gray-800 border ${error ? 'border-red-500' : theme.border.default}
        rounded-md ${theme.text.primary} placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
      ></textarea>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}