import React from 'react'
import Select from 'react-select'
// hook
import { useLocation } from 'react-router-dom'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import { FormSwitchButton, RankItem } from '../POSComponents/index'
// SCSS
import styles from './RankPage.module.scss'

const RankPage = () => {
  const pathname = useLocation().pathname
  const options = [
    { value: '2022/12/1', label: '2022/12/1' },
    { value: '2022/12/2', label: '2022/12/2' },
    { value: '2022/12/3', label: '2022/12/3' },
  ]
  return (
    <div>
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.export__button}>匯出 Excel</button>
          <FormSwitchButton page='rank' />
          <div className={styles.input__container}>
            <Select className={styles.select} options={options} />
          </div>
          <div className={styles.list__container}>
            <div className={styles.title__container}>
              <div className={styles.title}>品項</div>
              <div className={styles.title}>數量</div>
              <div className={styles.title}>小計</div>
            </div>
            <div className={styles.classification__list}>
              <RankItem dish='紅燒牛腩筋飯' counts='10' total='$3200' />
              <RankItem dish='無錫排骨飯' counts='5' total='$1200' />
              <RankItem dish='蜜椒小豬球' counts='5' total='$3400' />
            </div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default RankPage
