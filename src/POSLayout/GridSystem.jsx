import React from 'react'
import Navbar from '../POSComponents/Navbar'
import styles from './GridSystem.module.scss'

export const PosMainGridSystem = ({ children, pathname }) => {
  return (
    <div className='main__container'>
      <div className={styles.navbar__container}>
        <Navbar pathname={pathname} />
      </div>
      <div className={styles.content__container}>{children}</div>
    </div>
  )
}
