import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
// SCSS
import styles from './FormSwitchButton.module.scss'

const FormSwitchButton = ({ page }) => {
  return (
    <div className={styles.switch__button__container}>
      <Link to='/forms/revenue'>
        <div
          className={clsx(`${styles.switch__button}`, {
            [styles.active]: page === 'revenue',
          })}
        >
          營收報表
        </div>
      </Link>
      <Link to='/forms/details'>
        <div
          className={clsx(`${styles.switch__button}`, {
            [styles.active]: page === 'details',
          })}
        >
          訂單明細
        </div>
      </Link>
      <Link to='/forms/rank'>
        <div
          className={clsx(`${styles.switch__button}`, {
            [styles.active]: page === 'rank',
          })}
        >
          銷售排行
        </div>
      </Link>
      <Link to='/forms/account'>
        <div
          className={clsx(`${styles.switch__button}`, {
            [styles.active]: page === 'account',
          })}
        >
          關帳
        </div>
      </Link>
    </div>
  )
}

export default FormSwitchButton
