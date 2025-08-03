// src/styles/theme.ts
export const theme = {
  colors: {
    background: {
      primary: 'bg-gray-900',
      secondary: 'bg-gray-800',
      accent: 'bg-indigo-900'
    },
    text: {
      primary: 'text-gray-100',
      secondary: 'text-gray-300',
      muted: 'text-gray-400'
    },
    border: {
      default: 'border-gray-700',
      focus: 'border-indigo-500'
    },
    accent: {
      primary: 'bg-indigo-600 hover:bg-indigo-700',
      secondary: 'bg-purple-600 hover:bg-purple-700'
    },
    status: {
      pending: 'bg-yellow-900 text-yellow-300',
      inProgress: 'bg-blue-900 text-blue-300',
      resolved: 'bg-green-900 text-green-300',
      rejected: 'bg-red-900 text-red-300'
    }
  },
  transition: 'transition-all duration-200'
};