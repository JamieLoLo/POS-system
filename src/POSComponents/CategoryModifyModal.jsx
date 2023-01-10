import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
// store
import { modalActions } from '../store/modal-slice'
import { updateActions } from '../store/update-slice'
// api
import { categoryModifyApi } from '../api/categoryApi'
// SCSS
import styles from './CategoryModifyModal.module.scss'
import { informationActions } from '../store/information-slice'

const CategoryModifyModal = () => {
  const dispatch = useDispatch()
  // useSelector
  const isCategoryModifyModalOpen = useSelector(
    (state) => state.modal.isCategoryModifyModalOpen
  )
  const categoryName = useSelector((state) => state.information.categoryName)
  const categoryID = useSelector((state) => state.information.categoryID)
  // useState
  const [modifyName, setModifyName] = useState(categoryName)

  // 修改類別名稱
  const modifyHandler = async () => {
    if (!categoryName) {
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
      await categoryModifyApi(categoryID, categoryName)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '修改成功',
        showConfirmButton: false,
        timer: 2000,
      })
      dispatch(updateActions.setIsAllCategoryUpdate())
      dispatch(modalActions.setIsCategoryModifyModalOpen(false))
    } catch (error) {
      console.error(error)
    }
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
            defaultValue={categoryName}
            onChange={(e) =>
              dispatch(informationActions.setCategoryName(e.target.value))
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
              dispatch(modalActions.setIsCategoryModifyModalOpen(false))
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
