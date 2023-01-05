import React from 'react'
// hook
import { useLocation } from 'react-router-dom'
// UI
import { SettingSwitchButton, ClassificationItem } from '../POSComponents/index'
import { PosMainGridSystem } from '../POSLayout/GridSystem'
// SCSS
import styles from './ClassificationSettingPage.module.scss'

const ClassificationSettingPage = () => {
  const pathname = useLocation().pathname
  return (
    <div>
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.logout__button}>登出</button>
          <SettingSwitchButton page='classification' />
          <div className={styles.input__container}>
            <input type='text' />
            <button>新增類別</button>
          </div>
          <div className={styles.list__container}>
            <div className={styles.title}>類別</div>
            <div className={styles.classification__list}>
              <ClassificationItem name='義大利麵' />
              <ClassificationItem name='私房小點' />
              <ClassificationItem name='風味套餐' />
            </div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default ClassificationSettingPage
