import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useDispatch } from 'react-redux'
// api
import { deleteCategoryApi } from '../api/categoryApi'
// store
import { updateActions } from '../store/update-slice'
import { modalActions } from '../store/modal-slice'
import { informationActions } from '../store/information-slice'
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
        await deleteCategoryApi(data.id)
        await dispatch(updateActions.setIsAllCategoryUpdate())
        Swal.fire('Deleted!', '分類已刪除', 'success')
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
            dispatch(informationActions.setCategoryName(data.name))
            dispatch(informationActions.setCategoryId(data.id))
            dispatch(modalActions.setIsCategoryModifyModalOpen(true))
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
