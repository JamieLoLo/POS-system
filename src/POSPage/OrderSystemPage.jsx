import React from 'react'
// hook
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
// UI
import {
  OrderItem,
  OrderCategory,
  MenuItem,
  CheckoutModal,
} from '../POSComponents'
// store
import { modalActions } from '../store/modal-slice'
// api
import { categoryGetAllApi, getProductsApi } from '../api/categoryApi'
// icon
import { ReactComponent as CustomerPlusIcon } from '../POSComponents/assets/icon/customer_plus_white.svg'
import { ReactComponent as CustomerMinusIcon } from '../POSComponents/assets/icon/customer_minus_white.svg'
// SCSS
import styles from './OrderSystemPage.module.scss'

const OrderSystemPage = () => {
  const dispatch = useDispatch()
  const [allCategoryData, setAllCategoryData] = useState([])
  const [products, setProducts] = useState([])

  // 取得所有分類
  useEffect(() => {
    const categoryGetAll = async () => {
      try {
        const res = await categoryGetAllApi()
        await setAllCategoryData(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    categoryGetAll()
  }, [])

  // 取得單一分類裡的所有餐點
  const productsHandler = async (id) => {
    try {
      const res = await getProductsApi(id)
      setProducts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  // 類別清單
  const categoryList = allCategoryData.map((data) => (
    <OrderCategory
      data={data}
      key={data.id}
      onClick={(id) => productsHandler(id)}
    />
  ))

  // 餐點清單
  const productList = products.map((data) => (
    <MenuItem data={data} key={data.id} />
  ))

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
        <div className={styles.classification__container}>{categoryList}</div>
        <div className={styles.menu__container}>{productList}</div>
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
