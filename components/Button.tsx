import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg active:scale-95";
  
  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white border-2 border-transparent",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white border-2 border-transparent",
    outline: "bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};