import React from 'react';
import { Button as HeroButton, ButtonProps as HeroButtonProps } from '@heroui/react';

export interface ButtonProps extends HeroButtonProps {
  as?: React.ElementType;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <HeroButton 
        ref={ref as any} 
        className={className}
        {...props}
      >
        {children}
      </HeroButton>
    );
  }
);

Button.displayName = 'Button';
