import React from 'react'
import { Link } from 'react-router-dom'
// hook
import { useEffect, useState } from 'react'
// UI
import { CustomerOrderCategory, CustomerMenuItem } from '../CustomerComponents'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
import { ReactComponent as CartIcon } from '../CustomerComponents/assets/icon/cart.svg'
// api
import { getMinimumApi } from '../api/posApi'
import { categoryGetAllApi, getProductsApi } from '../api/categoryApi'
// SCSS
import styles from './OrderPage.module.scss'

const OrderPage = () => {
  // useState
  const [description, setDescription] = useState('')
  const [allCategoryData, setAllCategoryData] = useState([])
  const [products, setProducts] = useState([])
  // localStorage
  const defaultCategoryId = localStorage.getItem('default_category_id')
  const defaultCategoryName = localStorage.getItem('default_category_name')

  // 取得描述
  useEffect(() => {
    const getDecription = async () => {
      try {
        const res = await getMinimumApi()
        setDescription(res.data.description)
      } catch (error) {
        console.error(error)
      }
    }
    getDecription()
  }, [])

  // 取得所有分類
  useEffect(() => {
    const categoryGetAll = async () => {
      try {
        const res = await categoryGetAllApi()
        await setAllCategoryData(res.data)
        localStorage.setItem('default_category_id', res.data[0].id)
        localStorage.setItem('default_category_name', res.data[0].name)
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

  // 取得單一分類裡的所有餐點
  const productsHandler = async (id) => {
    try {
      const res = await getProductsApi(id)
      setProducts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  // 分類列表
  const categoryList = allCategoryData.map((data) => (
    <CustomerOrderCategory
      data={data}
      key={data.id}
      onClick={(id) => productsHandler(id)}
    />
  ))

  // 餐點清單
  const productList = products.map((data) => (
    <CustomerMenuItem key={data.id} data={data} count='1' />
  ))

  return (
    <div className='mobile__main__container'>
      <header>
        <div className={styles.logo__container}>
          <img className={styles.logo} src={LogoIcon} alt='' />
        </div>
        <div className={styles.restaurant__name}>咕咕義小餐館</div>
      </header>
      <div className={styles.information__container}>
        <div className={styles.description}>{description}</div>
        <div className={styles.table__information}>
          <div className={styles.table__number}>桌號：22</div>
          <div className={styles.headcount}>人數：1大1小</div>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.classification__container}>{categoryList}</div>
        <div className={styles.menu__container}>{productList}</div>
      </main>
      <Link to='/customer/cart'>
        <footer className={styles.footer}>
          <div className={styles.cart__container}>
            <div className={styles.cart__icon__container}>
              <CartIcon className={styles.icon} />
            </div>
            <div className={styles.cart__count}>3</div>
          </div>
          <div className={styles.cart__text}>購物車</div>
          <div className={styles.sum}>$350</div>
        </footer>
      </Link>
    </div>
  )
}

export default OrderPage
