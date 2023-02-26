import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
import { ReactComponent as PersonIcon } from '../POSComponents/assets/icon/person_white.svg'
import { ReactComponent as PasswordIcon } from '../POSComponents/assets/icon/password.svg'
// api
import { posLoginApi } from '../api/loginApi'
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
    if (!account || !password) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '欄位不可空白',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }

    try {
      const res = await posLoginApi({
        account: account,
        password: password,
      })
      if (res.status !== 200) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '帳號或密碼錯誤',
          showConfirmButton: false,
          timer: 2000,
        })

        return
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '登入成功',
        showConfirmButton: false,
        timer: 2000,
      })
      localStorage.setItem('authToken', res.data.token)
      navigate('/order/table')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.page__container}>
      <div className={styles.login__container}>
        <div className={styles.logo__container}>
          <img className={styles.logo} src={LogoIcon} alt='' />
        </div>
        <div className={styles.content__container}>
          <div className={styles.input__container}>
            <div className={styles.icon__container}>
              <PersonIcon className={styles.icon} />
            </div>
            <input
              className={styles.input}
              type='text'
              id='account'
              onChange={accountHandler}
              autoComplete='off'
            />
          </div>
          <div className={styles.input__container}>
            <div className={styles.icon__container}>
              <PasswordIcon className={styles.icon} />
            </div>
            <input
              className={styles.input}
              type='password'
              id='password'
              onChange={passwordHandler}
              autoComplete='off'
            />
          </div>
          <button className={styles.login__button} onClick={adminLoginHandler}>
            登入
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
