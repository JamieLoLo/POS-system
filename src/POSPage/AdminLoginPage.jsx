import React from 'react'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
import { ReactComponent as PersonIcon } from '../POSComponents/assets/icon/person_grey.svg'
import { ReactComponent as PasswordIcon } from '../POSComponents/assets/icon/password.svg'
// SCSS
import styles from './AdminLoginPage.module.scss'

const AdminLoginPage = () => {
  return (
    <div className={styles.page__container}>
      <div className={styles.logo__container}>
        <img className={styles.logo} src={LogoIcon} alt='' />
      </div>
      <div className={styles.content__container}>
        <div className={styles.input__container}>
          <div className={styles.icon__container}>
            <PersonIcon className={styles.icon} />
          </div>
          <input type='text' id='account' />
        </div>
        <div className={styles.input__container}>
          <div className={styles.icon__container}>
            <PasswordIcon className={styles.icon} />
          </div>
          <input type='password' id='password' />
        </div>
        <button className={styles.login__button}>登入</button>
      </div>
    </div>
  )
}

export default AdminLoginPage
