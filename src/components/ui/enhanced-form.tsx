import { forwardRef, useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Enhanced Input Component
export interface EnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'floating' | 'minimal';
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({
    className,
    type,
    label,
    error,
    success,
    helperText,
    icon,
    iconPosition = 'left',
    variant = 'default',
    validation,
    value,
    onChange,
    onBlur,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
      setHasValue(!!value);
    }, [value]);

    const validateInput = (inputValue: string) => {
      if (!validation) return null;

      if (validation.required && !inputValue.trim()) {
        return 'This field is required';
      }

      if (validation.minLength && inputValue.length < validation.minLength) {
        return `Minimum ${validation.minLength} characters required`;
      }

      if (validation.maxLength && inputValue.length > validation.maxLength) {
        return `Maximum ${validation.maxLength} characters allowed`;
      }

      if (validation.pattern && !validation.pattern.test(inputValue)) {
        return 'Invalid format';
      }

      if (validation.custom) {
        return validation.custom(inputValue);
      }

      return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setHasValue(!!newValue);
      
      if (validation) {
        const error = validateInput(newValue);
        setValidationError(error);
      }
      
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      
      if (validation) {
        const error = validateInput(e.target.value);
        setValidationError(error);
      }
      
      onBlur?.(e);
    };

    const displayError = error || validationError;
    const hasError = !!displayError;
    const hasSuccess = !!success && !hasError;

    const inputClasses = cn(
      "flex h-12 w-full rounded-xl border bg-background px-4 py-3 text-sm transition-all duration-200",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "placeholder:text-muted-foreground focus-visible:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Variants
      variant === 'floating' && [
        "pt-6 pb-2",
        hasValue || isFocused ? "pt-6 pb-2" : "pt-3 pb-3"
      ],
      variant === 'minimal' && "border-0 border-b-2 rounded-none bg-transparent",
      // States
      hasError && "border-destructive focus-visible:ring-destructive",
      hasSuccess && "border-green-500 focus-visible:ring-green-500",
      !hasError && !hasSuccess && [
        "border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      ],
      // Icon spacing
      icon && iconPosition === 'left' && "pl-12",
      icon && iconPosition === 'right' && "pr-12",
      type === 'password' && "pr-12",
      className
    );

    const labelClasses = cn(
      "block text-sm font-medium transition-all duration-200",
      variant === 'floating' && [
        "absolute left-4 pointer-events-none",
        hasValue || isFocused
          ? "top-2 text-xs text-muted-foreground"
          : "top-3 text-sm text-muted-foreground"
      ],
      hasError && "text-destructive",
      hasSuccess && "text-green-600",
      !hasError && !hasSuccess && "text-foreground"
    );

    return (
      <div className="space-y-2">
        <div className="relative">
          {label && variant !== 'floating' && (
            <label className={labelClasses}>{label}</label>
          )}
          
          <div className="relative">
            {/* Left Icon */}
            {icon && iconPosition === 'left' && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                {icon}
              </div>
            )}

            {/* Input */}
            <input
              type={type === 'password' && showPassword ? 'text' : type}
              className={inputClasses}
              ref={ref}
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              {...props}
            />

            {/* Floating Label */}
            {label && variant === 'floating' && (
              <label className={labelClasses}>{label}</label>
            )}

            {/* Right Icon / Password Toggle */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {type === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
              
              {icon && iconPosition === 'right' && (
                <div className="text-muted-foreground">{icon}</div>
              )}
              
              {/* Status Icons */}
              {hasError && <X className="h-4 w-4 text-destructive" />}
              {hasSuccess && <Check className="h-4 w-4 text-green-500" />}
            </div>
          </div>
        </div>

        {/* Helper Text / Error / Success */}
        {(displayError || success || helperText) && (
          <div className="flex items-center gap-2 text-sm">
            {hasError && <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />}
            {hasSuccess && <Check className="h-4 w-4 text-green-500 flex-shrink-0" />}
            
            <span className={cn(
              hasError && "text-destructive",
              hasSuccess && "text-green-600",
              !hasError && !hasSuccess && "text-muted-foreground"
            )}>
              {displayError || success || helperText}
            </span>
          </div>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput";

// Enhanced Textarea Component
export interface EnhancedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  variant?: 'default' | 'floating' | 'minimal';
  autoResize?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

export const EnhancedTextarea = forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  ({
    className,
    label,
    error,
    success,
    helperText,
    variant = 'default',
    autoResize = false,
    maxLength,
    showCharCount = false,
    value,
    onChange,
    onBlur,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
      setHasValue(!!value);
      setCharCount(typeof value === 'string' ? value.length : 0);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setHasValue(!!newValue);
      setCharCount(newValue.length);
      
      if (autoResize) {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
      
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    const textareaClasses = cn(
      "flex min-h-[120px] w-full rounded-xl border bg-background px-4 py-3 text-sm transition-all duration-200",
      "placeholder:text-muted-foreground focus-visible:outline-none resize-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Variants
      variant === 'floating' && [
        "pt-6 pb-2",
        hasValue || isFocused ? "pt-6 pb-2" : "pt-3 pb-3"
      ],
      variant === 'minimal' && "border-0 border-b-2 rounded-none bg-transparent",
      // States
      hasError && "border-destructive focus-visible:ring-destructive",
      hasSuccess && "border-green-500 focus-visible:ring-green-500",
      !hasError && !hasSuccess && [
        "border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      ],
      className
    );

    const labelClasses = cn(
      "block text-sm font-medium transition-all duration-200",
      variant === 'floating' && [
        "absolute left-4 pointer-events-none",
        hasValue || isFocused
          ? "top-2 text-xs text-muted-foreground"
          : "top-3 text-sm text-muted-foreground"
      ],
      hasError && "text-destructive",
      hasSuccess && "text-green-600",
      !hasError && !hasSuccess && "text-foreground"
    );

    return (
      <div className="space-y-2">
        <div className="relative">
          {label && variant !== 'floating' && (
            <label className={labelClasses}>{label}</label>
          )}
          
          <div className="relative">
            <textarea
              className={textareaClasses}
              ref={ref}
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              maxLength={maxLength}
              {...props}
            />

            {/* Floating Label */}
            {label && variant === 'floating' && (
              <label className={labelClasses}>{label}</label>
            )}
          </div>
        </div>

        {/* Footer with character count and messages */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {hasError && <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />}
            {hasSuccess && <Check className="h-4 w-4 text-green-500 flex-shrink-0" />}
            
            {(error || success || helperText) && (
              <span className={cn(
                hasError && "text-destructive",
                hasSuccess && "text-green-600",
                !hasError && !hasSuccess && "text-muted-foreground"
              )}>
                {error || success || helperText}
              </span>
            )}
          </div>

          {(showCharCount || maxLength) && (
            <span className={cn(
              "text-muted-foreground",
              maxLength && charCount > maxLength * 0.9 && "text-orange-500",
              maxLength && charCount >= maxLength && "text-destructive"
            )}>
              {charCount}{maxLength && `/${maxLength}`}
            </span>
          )}
        </div>
      </div>
    );
  }
);

EnhancedTextarea.displayName = "EnhancedTextarea";

// Form Field Wrapper
interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export const FormField = ({ children, className, required }: FormFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
      {required && (
        <span className="text-destructive text-sm">* Required</span>
      )}
    </div>
  );
};