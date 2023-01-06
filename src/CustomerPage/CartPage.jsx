import React from 'react'
// UI
import { CartItem, MinimumModal, ReceiptModal } from '../CustomerComponents'
// icon
import LogoIcon from '../POSComponents/assets/logo/logo_circle.png'
// SCSS
import styles from './CartPage.module.scss'

const CartPage = () => {
  return (
    <div className='mobile__main__container'>
      {/* <MinimumModal /> */}
      <ReceiptModal />
      <header>
        <div className={styles.logo__container}>
          <img className={styles.logo} src={LogoIcon} alt='' />
        </div>
        <div className={styles.restaurant__name}>咕咕義小餐館</div>
      </header>
      <main className={styles.main}>
        <CartItem
          dish='無錫排骨飯'
          description='我是一個描述，描述描述描述啊啊啊。我是一個描述，描述描述描述啊啊啊。我是一個描述，描述描述描述啊啊啊。'
          price='$320'
          count='1'
        />
        <CartItem dish='奶油明太子義大利麵' price='$320' count='1' />
        <CartItem dish='無錫排骨飯' price='$320' count='1' />
        <CartItem dish='無錫排骨飯' price='$320' count='4' />
        <CartItem dish='無錫排骨飯' price='$320' count='1' />
        <CartItem dish='無錫排骨飯' price='$320' count='1' />
        <CartItem dish='無錫排骨飯' price='$320' count='4' />
        <CartItem dish='無錫排骨飯' price='$320' count='1' />
        <CartItem dish='無錫排骨飯' price='$320' count='1' />
      </main>
      <footer className={styles.button__container}>
        <button className={styles.return__button}>繼續點餐</button>
        <button className={styles.confirm__button}>確認送出</button>
      </footer>
    </div>
  )
}

export default CartPage
