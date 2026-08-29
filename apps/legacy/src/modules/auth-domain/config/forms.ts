export type FormFieldConfig = {
  name: string;
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
};

export type FormConfig = (FormFieldConfig | { type: 'row'; fields: FormFieldConfig[] })[];

export const SIGN_IN_FORM_CONFIG: FormConfig = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    id: 'sign-in-email',
    placeholder: 'you@example.com',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    id: 'sign-in-password',
    placeholder: '••••••••',
    autoComplete: 'current-password',
    required: true,
  },
];

export const SIGN_UP_FORM_CONFIG: FormConfig = [
  {
    type: 'row',
    fields: [
      {
        name: 'first_name',
        label: 'First name',
        type: 'text',
        id: 'sign-up-first-name',
        placeholder: 'John',
        autoComplete: 'given-name',
        required: true,
      },
      {
        name: 'last_name',
        label: 'Last name',
        type: 'text',
        id: 'sign-up-last-name',
        placeholder: 'Doe',
        autoComplete: 'family-name',
        required: true,
      },
    ],
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    id: 'sign-up-email',
    placeholder: 'you@example.com',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    id: 'sign-up-password',
    placeholder: '••••••••',
    autoComplete: 'new-password',
    required: true,
    minLength: 8,
  },
];
