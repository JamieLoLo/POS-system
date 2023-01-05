import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
// SCSS
import styles from './SettingSwitchButton.module.scss'

const SettingSwitchButton = ({ page }) => {
  return (
    <div className={styles.switch__button__container}>
      <Link to='/setting/classification'>
        <div
          className={clsx(`${styles.switch__button}`, {
            [styles.active]: page === 'classification',
          })}
        >
          分類設定
        </div>
      </Link>
      <Link to='/setting/dish'>
        <div
          className={clsx(`${styles.switch__button}`, {
            [styles.active]: page === 'dish',
          })}
        >
          所有餐點
        </div>
      </Link>
      <Link to='/setting/table'>
        <div
          className={clsx(`${styles.switch__button}`, {
            [styles.active]: page === 'table',
          })}
        >
          桌號設定
        </div>
      </Link>
      <Link to='/setting/minimum'>
        <div
          className={clsx(`${styles.switch__button}`, {
            [styles.active]: page === 'minimum',
          })}
        >
          低消設定
        </div>
      </Link>
    </div>
  )
}

export default SettingSwitchButton
