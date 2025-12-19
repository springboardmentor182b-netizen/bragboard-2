import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../../../hooks/useAuth'
import styles from './LoginPage.module.css'

/**
 * Login Page Component
 * Full page layout for user authentication
 * 
 * Features:
 * - Responsive page layout
 * - Authentication check (redirect if already logged in)
 * - Form container with branding
 * - Background and visual hierarchy
 * 
 * @example
 * <LoginPage />
 */
const LoginPage = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, loading, navigate])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className={styles.pageContainer}>
      {/* Background decoration */}
      <div className={styles.backgroundDecoration}></div>

      {/* Main content wrapper */}
      <div className={styles.contentWrapper}>
        {/* Left section - Branding & Info (Desktop only) */}
        <div className={styles.brandingSection}>
          <div className={styles.brandingContent}>
            {/* Logo */}
            <div className={styles.logoContainer}>
              <div className={styles.logoMark}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="48"
                    height="48"
                    rx="8"
                    fill="var(--color-primary)"
                  />
                  <path
                    d="M16 24L21 29L32 18"
                    stroke="var(--color-btn-primary-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className={styles.brandName}>AuthFlow</h2>
            </div>

            {/* Branding text */}
            <div className={styles.brandingText}>
              <h3 className={styles.brandingTitle}>Welcome to AuthFlow</h3>
              <p className={styles.brandingDescription}>
                A modern authentication solution designed for seamless user experiences and robust security.
              </p>
            </div>

            {/* Features list */}
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Secure authentication</span>
              </li>
              <li className={styles.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Easy account management</span>
              </li>
              <li className={styles.featureItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>24/7 support</span>
              </li>
            </ul>
          </div>

          {/* Footer text */}
          <div className={styles.brandingFooter}>
            <p>© 2025 AuthFlow. All rights reserved.</p>
          </div>
        </div>

        {/* Right section - Login form */}
        <div className={styles.formSection}>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
