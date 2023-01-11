import React from 'react'
// default img
import DefaultFoodImg from './assets/img/default_food.jpeg'
// icon
import { ReactComponent as PlusIcon } from '../POSComponents/assets/icon/plus.svg'
import { ReactComponent as MinusIcon } from '../POSComponents/assets/icon/minus.svg'
// SCSS
import styles from './CustomerMenuItem.module.scss'

const CustomerMenuItem = ({ data, count }) => {
  return (
    <div className={styles.menu__item__container}>
      <div className={styles.image__container}>
        <img
          className={styles.default__img}
          src={data.image ? data.image : DefaultFoodImg}
          alt=''
        />
      </div>
      <div className={styles.right__side__container}>
        <div className={styles.title__container}>
          <div className={styles.title}>
            {data.name} {data.nameEn}
          </div>
          <div className={styles.description}>{data.description}</div>
        </div>
        <div className={styles.price}>${data.price}</div>
        <div className={styles.count__control}>
          <div className={styles.icon__container}>
            <MinusIcon className={styles.icon} />
          </div>
          <div className={styles.count}>{count}</div>
          <div className={styles.icon__container}>
            <PlusIcon className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerMenuItem
