import React from 'react'
import { Link } from 'react-router-dom'
// hook
import { useEffect, useState } from 'react'
// UI
import {
  CustomerOrderClassification,
  CustomerMenuItem,
} from '../CustomerComponents'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
import { ReactComponent as CartIcon } from '../CustomerComponents/assets/icon/cart.svg'
// api
import { getMinimumApi } from '../api/posApi'
// SCSS
import styles from './OrderPage.module.scss'

const OrderPage = () => {
  // useState
  const [description, setDescription] = useState('')

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
        <div className={styles.classification__container}>
          <CustomerOrderClassification classification='套餐' />
          <CustomerOrderClassification classification='風味小菜' />
          <CustomerOrderClassification classification='飲品' />
          <CustomerOrderClassification classification='炸物' />
          <CustomerOrderClassification classification='烤物' />
          <CustomerOrderClassification classification='酒類' />
        </div>
        <div className={styles.menu__container}>
          <CustomerMenuItem
            dish='無錫排骨飯'
            description='我是一個描述，描述描述描述啊啊啊。我是一個描述，描述描述描述啊啊啊。我是一個描述，描述描述描述啊啊啊。'
            price='$420'
            count='1'
          />
          <CustomerMenuItem dish='奶油明太子義大利麵' price='$320' count='1' />
          <CustomerMenuItem dish='無錫排骨飯' price='$320' count='1' />
          <CustomerMenuItem dish='無錫排骨飯' price='$320' count='4' />
          <CustomerMenuItem dish='無錫排骨飯' price='$320' count='1' />
          <CustomerMenuItem dish='無錫排骨飯' price='$320' count='1' />
          <CustomerMenuItem dish='無錫排骨飯' price='$320' count='1' />
          <CustomerMenuItem dish='無錫排骨飯' price='$320' count='1' />
          <CustomerMenuItem dish='無錫排骨飯' price='$320' count='1' />
        </div>
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
