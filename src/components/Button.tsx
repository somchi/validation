import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<any> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <button ref={ref} className={className} {...props} />;
  }
);
export { Button };
