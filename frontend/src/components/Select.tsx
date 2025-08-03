// src/components/Select.tsx
import { ChangeEvent } from 'react';
import { theme } from '@/styles/theme';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export function Select({
  label,
  name,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  required = false,
  error
}: SelectProps) {
  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium ${theme.text.secondary} mb-1`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 ${theme.transition} bg-gray-800 border ${error ? 'border-red-500' : theme.border.default}
        rounded-md ${theme.text.primary} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none`}
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, 
                backgroundPosition: 'right 0.5rem center', 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: '1.5em 1.5em', 
                paddingRight: '2.5rem' }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}