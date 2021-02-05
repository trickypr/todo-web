import Head from 'next/head'
import { useState } from 'react'

import styles from 'styles/Loader.module.css'

const Welcome = import('./welcome')

let View = () => (
  <div className={styles.full}>
    <div className={styles.spinner}>
      <div className={styles['double-bounce1']}></div>
      <div className={styles['double-bounce2']}></div>
    </div>
  </div>
)

export default function App() {
  const [forceState, setForceState] = useState(false)
  const forceRerender = () => setForceState(!forceState)

  if (!forceState) {
    Welcome.then((a) => {
      View = a.default
      forceRerender()
    })
  }

  return (
    <div>
      <Head>
        <title>Do</title>
      </Head>

      <View />
    </div>
  )
}
