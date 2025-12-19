import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormInput from '../../../components/Form/FormInput'
import styles from './ForgotPasswordForm.module.css'

/**
 * Forgot Password Form Component
 */
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError('Email is required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.header}>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.subtitle}>Enter your email to receive reset instructions</p>
      </div>

      {success ? (
        <div className={styles.successMessage}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <h2>Check Your Email</h2>
          <p>We've sent password reset instructions to {email}</p>
          <Link to="/login" className={styles.backButton}>
            Back to Login
          </Link>
        </div>
      ) : (
        <>
          {error && (
            <div className={styles.alertError} role="alert">
              <span>{error}</span>
            </div>
          )}

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <div className={styles.backLink}>
            <Link to="/login" className={styles.link}>
              ← Back to Login
            </Link>
          </div>
        </>
      )}
    </form>
  )
}

export default ForgotPasswordForm
