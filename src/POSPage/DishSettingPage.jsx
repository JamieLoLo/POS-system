import React from 'react'
// hook
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// UI
import {
  SettingSwitchButton,
  DishItem,
  AddDishModal,
} from '../POSComponents/index'
import { PosMainGridSystem } from '../POSLayout/GridSystem'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './DishSettingPage.module.scss'

const DishSettingPage = () => {
  const dispatch = useDispatch()
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  // useSelector
  const isAddDishModalOpen = useSelector(
    (state) => state.modal.isAddDishModalOpen
  )

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  // 登出
  const logoutHandler = () => {
    localStorage.clear()
    navigate('/admin/login')
  }
  return (
    <div>
      <AddDishModal trigger={isAddDishModalOpen} />
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.logout__button} onClick={logoutHandler}>
            登出
          </button>
          <SettingSwitchButton page='dish' />
          <div className={styles.input__container}>
            <button
              onClick={() => {
                dispatch(modalActions.setIsAddDishModalOpen(true))
              }}
            >
              新增品項
            </button>
          </div>
          <div className={styles.list__container}>
            <div className={styles.title__container}>
              <div className={styles.title}>品項</div>
              <div className={styles.title}>類別</div>
            </div>
            <div className={styles.dish__list}>
              <DishItem dish='紅燒牛腩筋飯' classification='風味套餐' />
              <DishItem dish='密椒小豬球' classification='私房小點' />
              <DishItem dish='無錫排骨飯' classification='風味套餐' />
              <DishItem dish='紅燒牛腩筋飯' classification='風味套餐' />
              <DishItem dish='紅燒牛腩筋飯' classification='風味套餐' />
              <DishItem dish='密椒小豬球' classification='私房小點' />
              <DishItem dish='無錫排骨飯' classification='風味套餐' />
              <DishItem dish='紅燒牛腩筋飯' classification='風味套餐' />
              <DishItem dish='紅燒牛腩筋飯' classification='風味套餐' />
              <DishItem dish='密椒小豬球' classification='私房小點' />
              <DishItem dish='無錫排骨飯' classification='風味套餐' />
              <DishItem dish='紅燒牛腩筋飯' classification='風味套餐' />
              <DishItem dish='紅燒牛腩筋飯' classification='風味套餐' />
              <DishItem dish='密椒小豬球' classification='私房小點' />
              <DishItem dish='無錫排骨飯' classification='風味套餐' />
              <DishItem dish='紅燒牛腩筋飯' classification='風味套餐' />
              <DishItem dish='紅燒牛腩筋飯' classification='風味套餐' />
              <DishItem dish='密椒小豬球' classification='私房小點' />
              <DishItem dish='無錫排骨飯' classification='風味套餐' />
              <DishItem dish='紅燒牛腩筋飯' classification='風味套餐' />
            </div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default DishSettingPage
