import React from 'react'
// SCSS
import styles from './RankItem.module.scss'

const RankItem = ({ dish, counts, total }) => {
  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>{dish}</div>
      <div className={styles.list__item}>{counts}</div>
      <div className={styles.list__item}>{total}</div>
    </div>
  )
}

export default RankItem
