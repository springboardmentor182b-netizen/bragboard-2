import React, { useState } from 'react'
import styles from './FormInput.module.css'

/**
 * Reusable Form Input Component
 * Supports text, email, password, number, textarea
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Input label text
 * @param {string} props.name - Input name attribute
 * @param {string} props.type - Input type (text, email, password, number, textarea)
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message to display
 * @param {boolean} props.required - Is field required
 * @param {boolean} props.disabled - Is field disabled
 * @param {string} props.hint - Helper text below input
 * @param {number} props.rows - Rows for textarea
 * @param {string} props.autoComplete - Autocomplete attribute
 * 
 * @example
 * <FormInput
 *   label="Email"
 *   name="email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   placeholder="your@email.com"
 *   error={emailError}
 *   required
 * />
 */
const FormInput = ({
  label,
  name,
  type = 'text',
  value = '',
  onChange,
  onBlur,
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  hint = '',
  rows = 3,
  autoComplete = 'off',
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true)
  }

  // Handle blur
  const handleBlur = (e) => {
    setIsFocused(false)
    if (onBlur) {
      onBlur(e)
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Determine input display type (for password toggle)
  const displayType =
    type === 'password' && showPassword ? 'text' : type

  // Determine if input has error
  const hasError = !!error

  return (
    <div className={`${styles.formGroup} ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={name} className={styles.label}>
          <span className={styles.labelText}>{label}</span>
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className={styles.inputContainer}>
        {/* Textarea */}
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={`${styles.input} ${styles.textarea} ${
              hasError ? styles.error : ''
            } ${isFocused ? styles.focused : ''}`}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${name}-error` : hint ? `${name}-hint` : undefined}
          />
        ) : (
          // Regular Input
          <input
            id={name}
            type={displayType}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            required={required}
            className={`${styles.input} ${
              hasError ? styles.error : ''
            } ${isFocused ? styles.focused : ''}`}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${name}-error` : hint ? `${name}-hint` : undefined}
          />
        )}

        {/* Password Toggle Button */}
        {type === 'password' && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex="-1"
          >
            {showPassword ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <div id={`${name}-error`} className={styles.errorMessage}>
          {error}
        </div>
      )}

      {/* Hint Text */}
      {hint && !hasError && (
        <div id={`${name}-hint`} className={styles.hint}>
          {hint}
        </div>
      )}
    </div>
  )
}

export default FormInput
