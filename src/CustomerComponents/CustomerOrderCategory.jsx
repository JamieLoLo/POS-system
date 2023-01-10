import clsx from 'clsx'
import React, { useState } from 'react'
// SCSS
import styles from './CustomerOrderCategory.module.scss'

const CustomerOrderCategory = ({ data, onClick }) => {
  // 現在的變色問題出在於沒有重新渲染，所以狀態沒有更新，可以之後打API的時候用useEffect
  const [target, setTarget] = useState('')
  const targetHandler = (e) => {
    setTarget(e.target.innerText)
  }
  return (
    <div
      className={clsx('', {
        [styles.active]: data.name === target,
        [styles.item]: data.name !== target,
      })}
      onClick={() => onClick?.(data.id)}
    >
      {data.name}
    </div>
  )
}

export default CustomerOrderCategory
