import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useDispatch } from 'react-redux'
// slice
import { deleteCategoryApi, categoryActions } from '../store/category-slice'
// SCSS
import styles from './CategoryItem.module.scss'

const CategoryItem = ({ data }) => {
  const dispatch = useDispatch()

  // 刪除分類
  const deleteHandler = async () => {
    try {
      let result = await Swal.fire({
        title: '確定要刪除此分類嗎？',
        text: '刪除後將無法恢復！',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '刪除',
      })
      if (result.isConfirmed) {
        dispatch(deleteCategoryApi(data.id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>{data.name}</div>
      <div className={styles.button__container}>
        <button
          className={styles.modify__button}
          onClick={() => {
            dispatch(categoryActions.setCategoryName(data.name))
            dispatch(categoryActions.setCategoryId(data.id))
            dispatch(categoryActions.setIsCategoryModifyModalOpen(true))
          }}
        >
          修改
        </button>
        <button className={styles.delete__button} onClick={deleteHandler}>
          刪除
        </button>
      </div>
    </div>
  )
}

export default CategoryItem
