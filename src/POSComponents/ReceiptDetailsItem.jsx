import React from 'react'
// hook
import { useDispatch } from 'react-redux'
// slice
import { getSingleOrderApi, posActions } from '../store/pos-slice'
// SCSS
import styles from './ReceiptDetailsItem.module.scss'

const ReceiptDetailsItem = ({ data }) => {
  const dispatch = useDispatch()

  // 取得單筆訂單資訊
  const getSingleOrderHandler = async () => {
    dispatch(posActions.setIsLoadingModalOpen(true))
    dispatch(getSingleOrderApi(data.id))
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
