import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle_dark.png'
import { ReactComponent as PersonIcon } from '../POSComponents/assets/icon/person_grey.svg'
import { ReactComponent as PasswordIcon } from '../POSComponents/assets/icon/password.svg'
import backgroundImage from '../POSComponents/assets/background_image/login_background.jpg'
import { ReactComponent as LoadingIcon } from '../POSComponents/assets/icon/loading_ball.svg'
// api
import { posLoginApi } from '../api/loginApi'
// SCSS
import styles from './AdminLoginPage.module.scss'

const AdminLoginPage = () => {
  const navigate = useNavigate()
  // useState
  const [account, setAccount] = useState(null)
  const [password, setPassword] = useState(null)
  const [loadStatus, setLoadStatus] = useState(false)
  // 用來確認背景圖片是否載入完成
  useEffect(() => {
    const img = new Image()
    img.src = backgroundImage
    img.onload = () => setLoadStatus(true)
  }, [])
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

  return loadStatus === true ? (
    <div
      className={styles.page__container}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
      }}
    >
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
  ) : (
    <div className={styles.loading__icon__container}>
      <LoadingIcon className={styles.loading__icon} />
    </div>
  )
}

export default AdminLoginPage
