import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// UI
import { SettingSwitchButton } from '../POSComponents'
import { PosMainGridSystem } from '../POSLayout/GridSystem'
// icon
import { ReactComponent as PersonIcon } from '../POSComponents/assets/icon/person.svg'
// api
import { getMinimumApi, minimumModifyApi } from '../api/posApi'
// SCSS
import styles from './MinimumSettingPage.module.scss'

const MinimumSettingPage = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  // useState
  const [minimum, setMinimum] = useState('')
  const [description, setDescription] = useState('')

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  // 取得低消金額與描述
  useEffect(() => {
    const getMinimumInformation = async () => {
      try {
        const res = await getMinimumApi()
        setMinimum(res.data.minCharge)
        setDescription(res.data.description)
      } catch (error) {
        console.error(error)
      }
    }
    getMinimumInformation()
  }, [])

  // 編輯低消與描述
  const modifyHandler = async () => {
    try {
      await minimumModifyApi(minimum, description)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '資訊更新成功',
        showConfirmButton: false,
        timer: 2000,
      })
    } catch (error) {
      console.error(error)
    }
  }

  // 登出
  const logoutHandler = () => {
    localStorage.clear()
    navigate('/admin/login')
  }
  return (
    <div className='main__container'>
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.logout__button} onClick={logoutHandler}>
            登出
          </button>
          <SettingSwitchButton page='minimum' />
          <div className={styles.minimum__container}>
            <div className={styles.adult}>
              <PersonIcon className={styles.person__icon} />
              <div className={styles.input__container}>
                <input
                  className={styles.input}
                  type='text'
                  placeholder='請輸入金額'
                  defaultValue={minimum}
                  onChange={(e) => setMinimum(e.target.value)}
                />
                <div className={styles.text}>$ / per adult</div>
              </div>
            </div>
            <div className={styles.description__container}>
              <div className={styles.description}>低消描述</div>
              <textarea
                placeholder='請輸入低消描述'
                cols='16'
                rows='9'
                wrap='Physical'
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className={styles.submit__button__container}>
            <button className={styles.submit__button} onClick={modifyHandler}>
              提交
            </button>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default MinimumSettingPage
