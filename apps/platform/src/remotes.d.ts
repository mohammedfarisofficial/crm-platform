declare module 'legacyApp/SampleComponent' {
  import React from 'react';
  const SampleComponent: React.ComponentType<any>;
  export default SampleComponent;
}

declare module 'federatedApp/Button' {
  import React from 'react';
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
  }
  const Button: React.FC<ButtonProps>;
  export default Button;
}
