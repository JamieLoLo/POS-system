import React from 'react'
// icon
import { ReactComponent as DeleteIcon } from './assets/icon/delete.svg'
// hook
import { useSelector, useDispatch } from 'react-redux'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './AddDishModal.module.scss'

const AddDishModal = () => {
  const isAddDishModalOpen = useSelector(
    (state) => state.modal.isAddDishModalOpen
  )
  const dispatch = useDispatch()
  return isAddDishModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => dispatch(modalActions.setIsAddDishModalOpen(false))}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.delete__button__container}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() => dispatch(modalActions.setIsAddDishModalOpen(false))}
          />
        </div>
        <div className={styles.list__container}>
          <div className={styles.input__container}>
            <label htmlFor='chinese__name'>品名</label>
            <input type='text' id='chinese__name' />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='english__name'>英文品名</label>
            <input type='text' id='english__name' />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='classification'>類別</label>
            <input type='text' id='classification' />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='costs'>成本</label>
            <input type='text' id='costs' />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='price'>價格</label>
            <input type='text' id='price' />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='photo'>照片</label>
            <input
              style={{ border: 'none' }}
              type='file'
              id='photo'
              className={styles.upload__button}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='description'>描述</label>
            <textarea name='' id='description' cols='30' rows='4'></textarea>
          </div>
          <div className={styles.submit__button__container}>
            <button className={styles.submit__button}>送出</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default AddDishModal
