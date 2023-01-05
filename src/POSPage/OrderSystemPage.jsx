import React from 'react'
// hook
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// UI
import {
  OrderItem,
  OrderClassification,
  MenuItem,
  CheckoutModal,
} from '../POSComponents'
// store
import { modalActions } from '../store/modal-slice'
// icon
import { ReactComponent as CustomerPlusIcon } from '../POSComponents/assets/icon/customer_plus_white.svg'
import { ReactComponent as CustomerMinusIcon } from '../POSComponents/assets/icon/customer_minus_white.svg'
// SCSS
import styles from './OrderSystemPage.module.scss'

const OrderSystemPage = () => {
  const dispatch = useDispatch()
  return (
    <div className='main__container'>
      <CheckoutModal />
      <div className={styles.left__side__container}>
        <div className={styles.table__name__container}>
          <p className={StyleSheet.table__name}>A1</p>
        </div>
        <div className={styles.order__list}>
          <OrderItem dish='無錫排骨飯' count='2' price='$360' />
          <OrderItem dish='烏龍茶' count='1' price='$50' />
          <OrderItem dish='蜜椒小豬球' count='1' price='$100' />
          <OrderItem dish='無錫排骨飯' count='2' price='$360' />
          <OrderItem dish='烏龍茶' count='1' price='$50' />
          <OrderItem dish='蜜椒小豬球' count='1' price='$100' />
          <OrderItem dish='無錫排骨飯' count='2' price='$360' />
          <OrderItem dish='烏龍茶' count='1' price='$50' />
          <OrderItem dish='蜜椒小豬球' count='1' price='$100' />
          <OrderItem dish='無錫排骨飯' count='2' price='$360' />
          <OrderItem dish='烏龍茶' count='1' price='$50' />
          <OrderItem dish='蜜椒小豬球' count='1' price='$100' />
          <OrderItem dish='無錫排骨飯' count='2' price='$360' />
          <OrderItem dish='烏龍茶' count='1' price='$50' />
          <OrderItem dish='蜜椒小豬球' count='1' price='$100' />
        </div>
        <div className={styles.control__container}>
          <div className={styles.adult__container}>
            <div className={styles.subtitle}>大人</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerPlusIcon className={styles.icon} />
              </div>
              <p className={styles.count}>3</p>
              <div className={styles.icon__container}>
                <CustomerMinusIcon className={styles.icon} />
              </div>
            </div>
          </div>
          <div className={styles.children__container}>
            <div className={styles.subtitle}>小孩</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerPlusIcon className={styles.icon} />
              </div>
              <p className={styles.count}>2</p>
              <div className={styles.icon__container}>
                <CustomerMinusIcon className={styles.icon} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right__side__container}>
        <div className={styles.classification__container}>
          <OrderClassification classification='套餐' />
          <OrderClassification classification='風味小菜' />
          <OrderClassification classification='飲品' />
          <OrderClassification classification='炸物' />
          <OrderClassification classification='烤物' />
          <OrderClassification classification='酒類' />
        </div>
        <div className={styles.menu__container}>
          <MenuItem dish='紅燒牛腩筋飯' price='$320' />
          <MenuItem dish='烏龍茶' price='$120' />
          <MenuItem dish='紅燒牛腩筋飯' price='$320' />
          <MenuItem dish='紅燒牛腩筋飯' price='$320' />
          <MenuItem dish='紅燒牛腩筋飯' price='$320' />
          <MenuItem dish='紅燒牛腩筋飯' price='$320' />
          <MenuItem dish='紅燒牛腩筋飯' price='$320' />
          <MenuItem dish='紅燒牛腩筋飯' price='$320' />
          <MenuItem dish='紅燒牛腩筋飯' price='$320' />
          <MenuItem dish='紅燒牛腩筋飯' price='$320' />
        </div>
        <div className={styles.button__container}>
          <Link to='/order/table'>
            <button className={styles.return__button}>返回</button>
          </Link>
          <button
            className={styles.checkout__button}
            onClick={() => dispatch(modalActions.setIsCheckoutModalOpen(true))}
          >
            結帳
            <br />
            <p className={styles.price}>應付金額：$320</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSystemPage
