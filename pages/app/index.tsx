import Head from 'next/head'
import { useState } from 'react'
import styles from '../../styles/AppMain.module.css'
import { storageExists, initStorage, getStorage, setStorage } from './storage'

import Main from './main'

const isServer = () => typeof window === 'undefined';

function SafeHydrate({ children, className = "" }) {
  return (
    <div suppressHydrationWarning className={className}>
      {isServer() ? null : children}
    </div>
  )
}

export default function App() {
  const [onboard, setOnboard] = useState(!storageExists())

  return (
    <div>
      <Head>
        <title>Do</title>
      </Head>
      <SafeHydrate className={styles.container}>
        {
          onboard ? (
            <div className={styles.welcomeDialog} >
              <h1>Welcome to <span className={styles.primaryText}>Do</span>!</h1>
              <p>A simple, web todo app that just works.</p>
              <button onClick={() => {
                initStorage()
                setOnboard(false)
              }}>Get started</button>
            </div>
          ) : <Main />}
      </SafeHydrate>
    </div >
  )
}