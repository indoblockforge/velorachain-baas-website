import { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient';
  padding?: 'normal' | 'large' | 'small';
  id?: string;
}

export default function SectionContainer({ 
  children, 
  className = '', 
  background = 'white',
  padding = 'normal',
  id
}: SectionContainerProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
  };

  const paddingClasses = {
    small: 'py-12',
    normal: 'py-16 lg:py-20',
    large: 'py-20 lg:py-32'
  };

  return (
    <section id={id} className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}