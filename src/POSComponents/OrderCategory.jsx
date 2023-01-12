import clsx from 'clsx'
import React, { useEffect } from 'react'

// SCSS
import styles from './OrderCategory.module.scss'

const OrderCategory = ({ data, onClick }) => {
  const targetHandler = (e) => {
    localStorage.setItem('active_category', e.target.innerText)
  }
  const activeCategory = localStorage.getItem('active_category')
  const defaultCategory = localStorage.getItem('default_category_name')

  useEffect(() => {
    localStorage.setItem('active_category', defaultCategory)
  }, [defaultCategory])

  return (
    <div
      className={clsx('', {
        [styles.active]: data.name === activeCategory,
        [styles.item]: data.name !== activeCategory,
      })}
      onClick={(e) => {
        onClick?.(data.id)
        targetHandler(e)
      }}
    >
      {data.name}
    </div>
  )
}

export default OrderCategory
