import React from 'react'
import clsx from 'clsx'
// hook
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// icon
import LogoIcon from './assets/logo/logo.png'
import { ReactComponent as SettingIcon } from './assets/icon/setting.svg'
import { ReactComponent as FormIcon } from './assets/icon/form.svg'
import { ReactComponent as FoodIcon } from './assets/icon/food.svg'
// slice
import { posActions } from '../store/pos-slice'
// SCSS
import styles from './Navbar.module.scss'

const Navbar = ({ pathname }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <nav>
      <div className={styles.logo__container}>
        <img className={styles.logo} src={LogoIcon} alt='' />
      </div>
      <ul>
        <li
          className={clsx('', {
            [styles.nav__item__active]: pathname.slice(0, 6) === '/order',
            [styles.nav__item]: pathname.slice(0, 6) !== '/order',
          })}
          onClick={() => {
            navigate('/order/table')
            dispatch(posActions.setRevenueData([]))
            dispatch(posActions.setAllOrdersData([]))
            dispatch(posActions.setRankData([]))
          }}
        >
          <FoodIcon className={styles.icon} />
          <p className={styles.nav__text}>點餐</p>
        </li>
        <li
          className={clsx('', {
            [styles.nav__item__active]: pathname.slice(0, 6) === '/forms',
            [styles.nav__item]: pathname.slice(0, 6) !== '/forms',
          })}
          onClick={() => {
            navigate('/forms/revenue')
          }}
        >
          <FormIcon className={styles.icon} />
          <p className={styles.nav__text}>報表</p>
        </li>
        <li
          className={clsx('', {
            [styles.nav__item__active]: pathname.slice(0, 8) === '/setting',
            [styles.nav__item]: pathname.slice(0, 8) !== '/setting',
          })}
          onClick={() => {
            navigate('/setting/category')
            dispatch(posActions.setRevenueData([]))
            dispatch(posActions.setAllOrdersData([]))
            dispatch(posActions.setRankData([]))
          }}
        >
          <SettingIcon className={styles.icon} />
          <p className={styles.nav__text}>設定</p>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
