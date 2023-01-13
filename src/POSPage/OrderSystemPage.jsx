import React from 'react'
// hook
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
import { informationActions } from '../store/information-slice'
// api
import { categoryGetAllApi, getProductsApi } from '../api/categoryApi'
import { getOrderApi } from '../api/orderApi'
// icon
import { ReactComponent as CustomerPlusIcon } from '../POSComponents/assets/icon/customer_plus_white.svg'
import { ReactComponent as CustomerMinusIcon } from '../POSComponents/assets/icon/customer_minus_white.svg'
// SCSS
import styles from './OrderSystemPage.module.scss'

const OrderSystemPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // useSelector
  const orderInfo = useSelector((state) => state.information.orderInfo)
  // useState
  const [allCategoryData, setAllCategoryData] = useState([])
  const [products, setProducts] = useState([])
  const [orderData, setOrderData] = useState([])
  const [adultCount, setAdultCount] = useState(orderInfo.adultNum)
  const [childrenCount, setChildrenCount] = useState(orderInfo.childrenNum)
  const [soldProducts, setSoldProducts] = useState([])

  // localStorage
  const defaultCategoryId = localStorage.getItem('default_category_id')
  const tableId = localStorage.getItem('table_id')

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  // 取得訂單內容 (餐點、人數)
  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await getOrderApi(tableId)
        await setOrderData(res.data)
        await setAdultCount(res.data.adultNum)
        await setChildrenCount(res.data.childrenNum)
        await setSoldProducts(res.data.soldProducts)
      } catch (error) {
        console.error(error)
      }
    }
    getOrder()
  }, [])

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

  // 取得單一分類裡的所有餐點 (首次進入本頁時)
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getProductsApi(defaultCategoryId)
        await setProducts(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
  }, [defaultCategoryId])

  // 取得單一分類裡的所有餐點 (點選分類結果)
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

  // 訂單
  const orderList = soldProducts.map((data) => (
    <OrderItem data={data} key={data.productId} />
  ))
  // console.log(soldProducts)
  return (
    <div className='main__container'>
      <CheckoutModal />
      <div className={styles.left__side__container}>
        <div className={styles.table__name__container}>
          <p className={StyleSheet.table__name}>A1</p>
        </div>
        <div className={styles.order__list}>{orderList}</div>
        <div className={styles.control__container}>
          <div className={styles.adult__container}>
            <div className={styles.subtitle}>大人</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerPlusIcon className={styles.icon} />
              </div>
              <p className={styles.count}>{adultCount}</p>
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
              <p className={styles.count}>{childrenCount}</p>
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
