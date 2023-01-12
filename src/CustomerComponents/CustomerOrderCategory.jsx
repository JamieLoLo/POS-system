import clsx from 'clsx'
import React from 'react'
// hook
import { useEffect, useRef } from 'react'
// SCSS
import styles from './CustomerOrderCategory.module.scss'

const CustomerOrderCategory = ({ data, onClick }) => {
  // localStorage
  const activeCategory = localStorage.getItem('active_category')
  const defaultCategory = localStorage.getItem('default_category_name')

  // 載入頁面當下取得第一個分類的id，用來渲染初始畫面。
  useEffect(() => {
    localStorage.setItem('active_category', defaultCategory)
  }, [defaultCategory])

  // 獲取 DOM，用來進行scrollIntoView。
  const scrollRef = useRef(undefined)

  const targetHandler = (e) => {
    localStorage.setItem('active_category', e.target.innerText)
    scrollRef.current.scrollIntoView({
      inline: 'center',
      behavior: 'smooth',
    })
  }

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

export default CustomerOrderCategory
