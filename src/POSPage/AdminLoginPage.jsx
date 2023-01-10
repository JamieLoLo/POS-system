import React from 'react'
// hook
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
import { ReactComponent as PersonIcon } from '../POSComponents/assets/icon/person_grey.svg'
import { ReactComponent as PasswordIcon } from '../POSComponents/assets/icon/password.svg'
// api
import { posLoginApi } from '../api/posApi'
// SCSS
import styles from './AdminLoginPage.module.scss'

const AdminLoginPage = () => {
  const navigate = useNavigate()
  const [account, setAccount] = useState(null)
  const [password, setPassword] = useState(null)
  const accountHandler = (e) => {
    setAccount(e.target.value)
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  const adminLoginHandler = async () => {
    try {
      const res = await posLoginApi({
        account: account,
        password: password,
      })
      if (res.status !== 200) {
        return
      }
      localStorage.setItem('authToken', res.data.token)
      navigate('/order/table')
    } catch (error) {
      console.error(error)
    }
  }

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
          <input type='text' id='account' onChange={accountHandler} />
        </div>
        <div className={styles.input__container}>
          <div className={styles.icon__container}>
            <PasswordIcon className={styles.icon} />
          </div>
          <input type='password' id='password' onChange={passwordHandler} />
        </div>
        <button className={styles.login__button} onClick={adminLoginHandler}>
          登入
        </button>
      </div>
    </div>
  )
}

export default AdminLoginPage
