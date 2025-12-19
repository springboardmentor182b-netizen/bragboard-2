import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import FormInput from '../../../components/Form/FormInput'
import { useAuth } from '../../../hooks/useAuth'
import styles from './SignupForm.module.css'

/**
 * Signup Form Component
 * Handles user registration with validation
 */
const SignupForm = () => {
  const navigate = useNavigate()
  const { signup, loading, error, clearError } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
    if (error) {
      clearError()
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain lowercase letters'
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase letters'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Terms validation
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const result = await signup(formData.email, formData.password, formData.name)

    if (result.success) {
      navigate('/login')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Form Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join us today to get started</p>
      </div>

      {/* Global Error */}
      {error && (
        <div className={styles.alertError} role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Name Input */}
      <FormInput
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="John Doe"
        error={errors.name}
        required
        autoComplete="name"
      />

      {/* Email Input */}
      <FormInput
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        error={errors.email}
        required
        autoComplete="email"
      />

      {/* Password Input */}
      <FormInput
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        error={errors.password}
        required
        autoComplete="new-password"
        hint="Min 6 characters, 1 uppercase, 1 lowercase"
      />

      {/* Confirm Password */}
      <FormInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="••••••••"
        error={errors.confirmPassword}
        required
        autoComplete="new-password"
      />

      {/* Terms Checkbox */}
      <div className={styles.termsContainer}>
        <label className={styles.termsCheckbox}>
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => {
              setAgreedToTerms(e.target.checked)
              if (errors.terms) {
                setErrors((prev) => ({ ...prev, terms: '' }))
              }
            }}
            disabled={loading}
          />
          <span>
            I agree to the{' '}
            <Link to="/terms" className={styles.link}>
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link to="/privacy" className={styles.link}>
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.terms && <p className={styles.error}>{errors.terms}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? (
          <>
            <span className={styles.spinner}></span>
            Creating Account...
          </>
        ) : (
          'Sign Up'
        )}
      </button>

      {/* Login Link */}
      <div className={styles.loginLink}>
        <p>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  )
}

export default SignupForm
