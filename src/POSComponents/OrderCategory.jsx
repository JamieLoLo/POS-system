import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'

// SCSS
import styles from './OrderCategory.module.scss'

const OrderCategory = ({ data, onClick }) => {
  // 獲取 DOM，用來進行scrollIntoView。
  const scrollRef = useRef(undefined)

  const targetHandler = (e) => {
    localStorage.setItem('active_category', e.target.innerText)
    scrollRef.current.scrollIntoView({
      inline: 'center',
      behavior: 'smooth',
    })
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
      ref={scrollRef}
    >
      {data.name}
    </div>
  )
}

export default OrderCategory
