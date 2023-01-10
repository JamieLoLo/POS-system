import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// api
import { categoryGetAllApi, categoryPostApi } from '../api/categoryApi'
// store
import { updateActions } from '../store/update-slice'
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
  // useState
  const [allCategoryData, setAllCategoryData] = useState([])
  const [newCategory, setNewCategory] = useState('')
  // useSelector
  const isAllCategoryUpdate = useSelector(
    (state) => state.update.isAllCategoryUpdate
  )

  // 取得所有分類
  useEffect(() => {
    const categoryGetAll = async () => {
      try {
        const res = await categoryGetAllApi()
        await setAllCategoryData(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    categoryGetAll()
  }, [isAllCategoryUpdate])

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
    try {
      await categoryPostApi(newCategory)
      dispatch(updateActions.setIsAllCategoryUpdate())
    } catch (error) {
      console.error(error)
    }
  }

  const allCategoryListHelper = allCategoryData.map((data) => (
    <CategoryItem data={data} key={data.id} />
  ))

  return (
    <div className='main__container'>
      <CategoryModifyModal />
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.logout__button}>登出</button>
          <SettingSwitchButton page='category' />
          <div className={styles.input__container}>
            <input type='text' onChange={newCategoryHandler} />
            <button onClick={addCategoryHandler}>新增類別</button>
          </div>
          <div className={styles.list__container}>
            <div className={styles.title}>類別</div>
            <div className={styles.classification__list}>
              {allCategoryListHelper}
            </div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default CategorySettingPage
