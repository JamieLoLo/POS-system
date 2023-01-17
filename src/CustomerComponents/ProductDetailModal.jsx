import React from 'react'
// hook
import { useDispatch, useSelector } from 'react-redux'
// store
import { modalActions } from '../store/modal-slice'
// icon
import { ReactComponent as DeleteIcon } from '../POSComponents/assets/icon/delete_black.svg'
// default img
import DefaultFoodImg from '../POSComponents/assets/logo/logo.png'
// SCSS
import styles from './ProductDetailModal.module.scss'

const ProductDetailModal = () => {
  const dispatch = useDispatch()
  // useSelector
  const isProductDetailModalOpen = useSelector(
    (state) => state.modal.isProductDetailModalOpen
  )
  const customerMenuInfo = useSelector(
    (state) => state.information.customerMenuInfo
  )
  return isProductDetailModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() =>
          dispatch(modalActions.setIsProductDetailModalOpen(false))
        }
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.content}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() =>
              dispatch(modalActions.setIsProductDetailModalOpen(false))
            }
          />
          <div className={styles.image__container}>
            <img
              className={styles.image}
              src={
                customerMenuInfo.image ? customerMenuInfo.image : DefaultFoodImg
              }
              alt=''
            />
          </div>
          <div className={styles.text__container}>
            <p className={styles.name}>{customerMenuInfo.name}</p>
            <p className={styles.name__en}>{customerMenuInfo.nameEn}</p>
            <br />
            <p className={styles.description}>{customerMenuInfo.description}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default ProductDetailModal
