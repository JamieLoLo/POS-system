import clsx from 'clsx'
import React from 'react'
// hook
import { useEffect, useRef } from 'react'
// SCSS
import styles from './CustomerOrderCategory.module.scss'

const CustomerOrderCategory = ({ data, onClick }) => {
  // sessionStorage
  const activeCategory = sessionStorage.getItem('active_category')
  const defaultCategory = sessionStorage.getItem('default_category_name')

  // 載入頁面當下取得第一個分類的id，用來渲染初始畫面。
  useEffect(() => {
    sessionStorage.setItem('active_category', defaultCategory)
  }, [defaultCategory])

  // 獲取 DOM，用來進行scrollIntoView。
  const scrollRef = useRef(undefined)

  const targetHandler = (e) => {
    sessionStorage.setItem('active_category', e.target.innerText)
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
