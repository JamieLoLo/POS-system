import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useDispatch, useSelector } from 'react-redux'
// slice
import { categoryModifyApi, categoryActions } from '../store/category-slice'
// SCSS
import styles from './CategoryModifyModal.module.scss'

const CategoryModifyModal = () => {
  const dispatch = useDispatch()
  // useSelector
  const isCategoryModifyModalOpen = useSelector(
    (state) => state.category.isCategoryModifyModalOpen
  )
  const name = useSelector((state) => state.category.categoryName)
  const id = useSelector((state) => state.category.categoryID)

  // 修改類別名稱
  const modifyHandler = async () => {
    if (!name) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '欄位不可空白',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }
    dispatch(categoryModifyApi({ id, name }))
  }

  return isCategoryModifyModalOpen ? (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal__container}>
        <div className={styles.title}>請輸入類別名稱</div>
        <div className={styles.input__container}>
          <input
            className={styles.input}
            type='text'
            defaultValue={name}
            onChange={(e) =>
              dispatch(categoryActions.setCategoryName(e.target.value))
            }
          />
        </div>
        <div className={styles.button__container}>
          <button className={styles.confirm__button} onClick={modifyHandler}>
            確認修改
          </button>
          <button
            className={styles.cancel__button}
            onClick={() => {
              dispatch(categoryActions.setIsCategoryModifyModalOpen(false))
            }}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default CategoryModifyModal
