import React from 'react'
// hook
import { useNavigate } from 'react-router-dom'
// icon
import { ReactComponent as AdminIcon } from '../POSComponents/assets/icon/chef.svg'
import { ReactComponent as CustomerIcon } from '../POSComponents/assets/icon/person_tall.svg'
// SCSS
import styles from './Homepage.module.scss'

const HomePage = () => {
  const navigate = useNavigate()
  const adminHandler = () => {
    navigate('/admin/login')
  }
  const customerHandler = () => {
    navigate('/customer/login')
  }
  return (
    <div className={styles.page__container}>
      <div className={styles.admin__container}>
        <div className={styles.icon__container} onClick={adminHandler}>
          <AdminIcon className={styles.icon} />
        </div>
        <div className={styles.text__container}>
          <p className={styles.title} onClick={adminHandler}>
            管理者入口
          </p>
          <p className={styles.description} onClick={adminHandler}>
            裝置：平板橫向
          </p>
        </div>
      </div>
      <div className={styles.customer__container}>
        <div className={styles.icon__container} onClick={customerHandler}>
          <CustomerIcon className={styles.icon} />
        </div>
        <div className={styles.text__container}>
          <p className={styles.title} onClick={customerHandler}>
            顧客入口
          </p>
          <p className={styles.description} onClick={customerHandler}>
            裝置：手機直向、平板直向
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
