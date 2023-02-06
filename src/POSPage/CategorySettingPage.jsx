import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// icon
import { ReactComponent as LoadingIcon } from '../POSComponents/assets/icon/loading_ball.svg'
// slice
import { categoryGetAllApi, categoryPostApi } from '../store/category-slice'
// UI
import {
  SettingSwitchButton,
  CategoryItem,
  CategoryModifyModal,
} from '../POSComponents/index'
import { PosMainGridSystem } from '../POSLayout/GridSystem'
// SCSS
import styles from './CategorySettingPage.module.scss'

const CategorySettingPage = () => {
  const pathname = useLocation().pathname
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // useState
  const [newCategory, setNewCategory] = useState('')
  // useSelector
  const isAllCategoryUpdate = useSelector(
    (state) => state.category.isAllCategoryUpdate
  )
  const allCategoryData = useSelector((state) => state.category.allCategoryData)

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  // 取得所有分類
  useEffect(() => {
    dispatch(categoryGetAllApi({ page: 'category_setting' }))
  }, [isAllCategoryUpdate, dispatch])

  // 取得新增分類內容
  const newCategoryHandler = (e) => {
    setNewCategory(e.target.value)
  }

  // 新增分類
  const addCategoryHandler = async () => {
    if (!newCategory) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '欄位不可空白',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }
    dispatch(categoryPostApi(newCategory))
    setNewCategory('')
  }

  // 分類列表
  const allCategoryList = allCategoryData.map((data) => (
    <CategoryItem data={data} key={data.id} />
  ))

  // 登出
  const logoutHandler = () => {
    localStorage.clear()
    navigate('/admin/login')
  }

  return (
    <div className='main__container'>
      <CategoryModifyModal />
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.logout__button} onClick={logoutHandler}>
            登出
          </button>
          <SettingSwitchButton page='category' />
          <div className={styles.input__container}>
            <input
              type='text'
              onChange={newCategoryHandler}
              value={newCategory}
            />
            <button onClick={addCategoryHandler}>新增類別</button>
          </div>
          <div className={styles.list__container}>
            <div className={styles.title}>類別</div>
            <div className={styles.classification__list}>
              {allCategoryData.length !== 0 ? (
                allCategoryList
              ) : (
                <LoadingIcon className={styles.loading__icon} />
              )}
            </div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default CategorySettingPage
