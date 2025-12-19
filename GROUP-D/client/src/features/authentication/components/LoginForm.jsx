import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import FormInput from '../../../components/Form/FormInput'
import { useAuth } from '../../../hooks/useAuth'
import styles from './LoginForm.module.css'

/**
 * Login Form Component
 * Handles user authentication with email and password
 * 
 * Features:
 * - Email and password validation
 * - Loading state during submission
 * - Error messages display
 * - Remember me functionality
 * - Links to signup and forgot password
 * 
 * @example
 * <LoginForm />
 */
const LoginForm = () => {
  const navigate = useNavigate()
  const { login, loading, error, clearError } = useAuth()

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [rememberMe, setRememberMe] = useState(false)

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
    // Clear global error
    if (error) {
      clearError()
    }
  }

  // Validation function
  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    // Call login service
    const result = await login(formData.email, formData.password)

    if (result.success) {
      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('rememberedEmail', formData.email)
      } else {
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('rememberedEmail')
      }

      // Redirect to dashboard
      navigate('/dashboard')
    }
    // Error is handled by AuthContext and displayed via error prop
  }

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
      }))
      setRememberMe(true)
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Form Title */}
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to your account to continue</p>
      </div>

      {/* Global Error Message */}
      {error && (
        <div className={styles.alertError} role="alert">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{error}</span>
        </div>
      )}

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
        autoComplete="current-password"
      />

      {/* Remember Me & Forgot Password */}
      <div className={styles.formOptions}>
        <label className={styles.rememberMe}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={loading}
          />
          <span>Remember me</span>
        </label>
        <Link to="/forgot-password" className={styles.forgotLink}>
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className={styles.spinner}></span>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Signup Link */}
      <div className={styles.signupLink}>
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className={styles.link}>
            Sign up here
          </Link>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
