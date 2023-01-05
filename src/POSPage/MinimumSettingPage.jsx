import React from 'react'
// hook
import { useLocation } from 'react-router-dom'
// UI
import { SettingSwitchButton } from '../POSComponents'
import { PosMainGridSystem } from '../POSLayout/GridSystem'
// icon
import { ReactComponent as PersonIcon } from '../POSComponents/assets/icon/person.svg'
// SCSS
import styles from './MinimumSettingPage.module.scss'

const MinimumSettingPage = () => {
  const pathname = useLocation().pathname
  return (
    <div>
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.logout__button}>登出</button>
          <SettingSwitchButton page='minimum' />
          <div className={styles.minimum__container}>
            <div className={styles.adult}>
              <PersonIcon className={styles.person__icon} />
              <div className={styles.input__container}>
                <input type='text' placeholder='請輸入金額' />
                <div className={styles.text}> $ / per adult</div>
              </div>
            </div>
            <div className={styles.description__container}>
              <div className={styles.description}>低消描述</div>
              <textarea
                placeholder='請輸入低消描述'
                cols='30'
                rows='9'
              ></textarea>
            </div>
          </div>
          <div className={styles.submit__button__container}>
            <button className={styles.submit__button}>提交</button>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default MinimumSettingPage
