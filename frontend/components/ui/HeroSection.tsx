import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  children?: ReactNode;
  backgroundGradient?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  children,
  backgroundGradient = true
}: HeroSectionProps) {
  return (
    <section className={`relative py-20 lg:py-32 ${backgroundGradient ? 'bg-gradient-to-br from-blue-50 via-white to-blue-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            {subtitle}
          </p>
          {description && (
            <p className="text-lg text-gray-500 mb-10 max-w-3xl mx-auto">
              {description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {primaryCTA && (
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                onClick={primaryCTA.onClick}
              >
                {primaryCTA.text}
              </Button>
            )}
            {secondaryCTA && (
              <Button
                variant="outline"
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                onClick={secondaryCTA.onClick}
              >
                {secondaryCTA.text}
              </Button>
            )}
          </div>

          {children && (
            <div className="mt-12">
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Background decoration */}
      {backgroundGradient && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
        </div>
      )}
    </section>
  );
}