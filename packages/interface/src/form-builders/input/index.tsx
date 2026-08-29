import React, { InputHTMLAttributes } from 'react';
import { TextField, Label, Input as HeroInput, FieldError } from '@heroui/react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, required, ...props }, ref) => {
    return (
      <TextField isRequired={required} isInvalid={!!error} className={className}>
        {label && <Label className="text-zinc-900 dark:text-zinc-100 font-medium text-sm">{label}</Label>}
        <HeroInput ref={ref as any} {...(props as any)} />
        {error && <FieldError>{error}</FieldError>}
      </TextField>
    );
  }
);

Input.displayName = 'Input';