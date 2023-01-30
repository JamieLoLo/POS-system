import React from 'react'
// hook
import { useDispatch } from 'react-redux'
// api
import { getSingleOrderApi } from '../api/posApi'
// store
import { modalActions } from '../store/modal-slice'
import { informationActions } from '../store/information-slice'
// SCSS
import styles from './ReceiptDetailsItem.module.scss'

const ReceiptDetailsItem = ({ data }) => {
  const dispatch = useDispatch()

  // 取得單筆訂單資訊
  const getSingleOrderHandler = async () => {
    try {
      dispatch(modalActions.setIsLoadingModalOpen(true))
      const res = await getSingleOrderApi(data.id)
      if (res) {
        dispatch(informationActions.setSingleOrderData(res.data))
        dispatch(modalActions.setIsLoadingModalOpen(false))
        dispatch(modalActions.setIsAdminDetailsModalOpen(true))
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>{data.createdAt.slice(11)}</div>
      <div className={styles.list__item}>$ {data.totalPrice}</div>
      <div className={styles.list__item}>
        {Number(data.adultNum) + Number(data.childrenNum)}
      </div>
      <div className={styles.list__item}>
        <button
          className={styles.detail__button}
          onClick={getSingleOrderHandler}
        >
          詳細內容
        </button>
      </div>
    </div>
  )
}

export default ReceiptDetailsItem
