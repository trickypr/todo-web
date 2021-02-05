import styles from 'styles/AppMain.module.css'
import { storageExists, initStorage } from 'scripts/storage'
import { useState } from 'react'
import Main from 'app/main'

const isServer = () => typeof window === 'undefined'

function SafeHydrate({ children, className = '' }) {
  return (
    <div suppressHydrationWarning className={className}>
      {isServer() ? null : children}
    </div>
  )
}

const Welcome = () => {
  const [onboard, setOnboard] = useState(!storageExists())
  return (
    <SafeHydrate className={styles.container}>
      {onboard ? (
        <div className={styles.welcomeDialog}>
          <h1>
            Welcome to <span className={styles.primaryText}>Do</span>!
          </h1>
          <p>A simple, web todo app that just works.</p>
          <button
            onClick={() => {
              fetch('/api/users', { method: 'POST' })
              initStorage()
              setOnboard(false)
            }}
          >
            Get started
          </button>
        </div>
      ) : (
        <Main />
      )}
    </SafeHydrate>
  )
}

export default Welcome
