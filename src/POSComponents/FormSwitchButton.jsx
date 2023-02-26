import React from 'react'
import clsx from 'clsx'
// hook
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// slice
import { posActions } from '../store/pos-slice'
// SCSS
import styles from './FormSwitchButton.module.scss'

const FormSwitchButton = ({ page }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className={styles.switch__button__container}>
      <div
        className={clsx(`${styles.switch__button}`, {
          [styles.active]: page === 'revenue',
        })}
        onClick={() => {
          navigate('/forms/revenue')
          dispatch(posActions.setAllOrdersData([]))
          dispatch(posActions.setRankData([]))
        }}
      >
        營收報表
      </div>
      <div
        className={clsx(`${styles.switch__button}`, {
          [styles.active]: page === 'details',
        })}
        onClick={() => {
          navigate('/forms/details')
          dispatch(posActions.setRevenueData([]))
          dispatch(posActions.setRankData([]))
        }}
      >
        訂單明細
      </div>
      <div
        className={clsx(`${styles.switch__button}`, {
          [styles.active]: page === 'rank',
        })}
        onClick={() => {
          navigate('/forms/rank')
          dispatch(posActions.setRevenueData([]))
          dispatch(posActions.setAllOrdersData([]))
        }}
      >
        銷售排行
      </div>
      <div
        className={clsx(`${styles.switch__button}`, {
          [styles.active]: page === 'account',
        })}
        onClick={() => {
          navigate('/forms/account')
          dispatch(posActions.setRevenueData([]))
          dispatch(posActions.setAllOrdersData([]))
          dispatch(posActions.setRankData([]))
        }}
      >
        關帳
      </div>
    </div>
  )
}

export default FormSwitchButton
