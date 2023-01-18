import React from 'react'
// SCSS
import styles from './RankItem.module.scss'

const RankItem = ({ data }) => {
  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>{data.Product.name}</div>
      <div className={styles.list__item}>{data.counts}</div>
    </div>
  )
}

export default RankItem
