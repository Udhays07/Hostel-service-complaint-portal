// src/components/Modal.tsx
import { ReactNode } from 'react';
import { theme } from '@/styles/theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`${theme.background.secondary} rounded-lg w-full max-w-md z-10 mx-4 shadow-2xl ${theme.transition} animate-fadeIn`}>
        <div className={`flex justify-between items-center p-4 border-b ${theme.border.default}`}>
          <h3 className={`font-semibold ${theme.text.primary}`}>{title}</h3>
          <button 
            onClick={onClose} 
            className={`${theme.text.secondary} hover:text-white ${theme.transition}`}
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
        {footer && (
          <div className={`p-4 border-t ${theme.border.default}`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}