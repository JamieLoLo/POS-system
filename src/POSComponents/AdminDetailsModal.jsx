import React from 'react'
// hook
import { useSelector, useDispatch } from 'react-redux'
// icon
import { ReactComponent as DeleteIcon } from './assets/icon/delete.svg'
// UI
import { AdminDetailsItem } from './index'
// store
import { posActions } from '../store/pos-slice'
// SCSS
import styles from './AdminDetailsModal.module.scss'

const AdminDetailsModal = () => {
  const dispatch = useDispatch()
  // useSelector
  const isAdminDetailsModalOpen = useSelector(
    (state) => state.pos.isAdminDetailsModalOpen
  )
  const singleOrderData =
    useSelector((state) => state.pos.singleOrderData) || []
  const productData =
    useSelector((state) => state.pos.singleOrderData).soldProducts || []
  // 訂單內容
  const orderList = productData.map((data) => (
    <AdminDetailsItem data={data} key={data.productId} />
  ))

  return isAdminDetailsModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => dispatch(posActions.setIsAdminDetailsModalOpen(false))}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.delete__button__container}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() =>
              dispatch(posActions.setIsAdminDetailsModalOpen(false))
            }
          />
        </div>
        <div className={styles.title}>交易明細</div>
        <div className={styles.information__container}>
          <p className={styles.information}>
            日期：{singleOrderData.createdAt.slice(0, 10)}
          </p>
          <p className={styles.information}>
            時間：{singleOrderData.createdAt.slice(11)}
          </p>
          <p className={styles.information}>
            人數：{singleOrderData.adultNum}大{singleOrderData.childrenNum}小
          </p>
        </div>
        <div className={styles.subtitle__container}>
          <p className={styles.name}>品名 (數量)</p>
          <p className={styles.price}>小計</p>
        </div>
        <div className={styles.products__container}>{orderList}</div>
        <div className={styles.total__container}>
          <div className={styles.total}>
            合計
            <span className={styles.total__number}>
              ${singleOrderData.totalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default AdminDetailsModal
