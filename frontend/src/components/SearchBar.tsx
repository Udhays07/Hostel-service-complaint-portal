// components/SearchBar.tsx
import { ChangeEvent } from 'react';
import { theme } from '@/styles/theme';

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className={`w-4 h-4 ${theme.text.muted}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="search"
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-3 py-2 ${theme.background.secondary} border ${theme.border.default} 
        rounded-md ${theme.text.primary} placeholder-gray-500 ${theme.transition} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
        placeholder={placeholder}
      />
    </div>
  );
}